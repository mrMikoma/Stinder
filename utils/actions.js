"use server";

import { dbConnect } from "../utils/mongodb";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Chat from "../models/Chat";
import { revalidatePath } from "next/cache";

// References:
// - https://nextjs.org/docs/app/building-your-application/authentication
// - https://nextjs.org/docs/app/api-reference/functions/cookies
// - https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

// TODO:
// -

/**********************************
AUTHENTICATION AND USER MANAGEMENT
***********************************/

export async function register(formData) {
  try {
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("username")) {
      throw new Error("Username is required.");
    } else if (!formData.get("email")) {
      throw new Error("Email is required.");
    } else if (!formData.get("password")) {
      throw new Error("Password is required.");
    }

    // Parse form data
    const validatedFormData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Connect to database
    await dbConnect();

    // Check if user exists
    let newUser = await User.findOne({
      email: validatedFormData.email,
    });
    if (newUser) {
      throw new Error("User already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedFormData.password, 10);

    // Create user
    newUser = new User({
      username: validatedFormData.username,
      email: validatedFormData.email,
      password: hashedPassword,
    });

    // Save user
    await newUser.save();

    // Return response
    console.log("User saved."); // debug
    return "success";
  } catch (error) {
    console.log(error); // debug
  }
}

// TODO:
// - Add error handling
export async function authenticate(formData) {
  try {
    console.log("Authenticating..."); // debug
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("email")) {
      throw new Error("Email is required.");
    } else if (!formData.get("password")) {
      throw new Error("Password is required.");
    }

    // Parse form data
    const validatedFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Connect to database
    await dbConnect();

    // Check if user exists
    let user = await User.findOne({
      email: validatedFormData.email,
    });
    if (!user) {
      throw new Error("User doesn't exists.");
    }

    // Validate password
    const passwordIsValid = await bcrypt.compare(
      validatedFormData.password,
      user.password
    );
    if (!passwordIsValid) {
      throw new Error("Invalid credentials");
    }

    // Generate payload
    const payload = {
      userID: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: "/images/ai_bot_kuva_1.png",
    };

    // Generate JWT token
    const encryptedSessionData = jwt.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: "24h",
    });

    // Set token in cookie
    cookies().set("session", encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 1000,
      path: "/",
    });

    // Return user
    console.log("User authenticated!"); // debug
  } catch (error) {
    console.log(error); // debug
    // make it handle errors
  }
  redirect("/home");
}

export async function signOut() {
  try {
    console.log("Signing out..."); // debug
    // Remove session cookie
    cookies().delete("session");
    console.log("Signed out."); // debug
  } catch (error) {
    console.log(error); // debug
  }
  redirect("/");
}

/**********************************
CREATE NEW MATCH
***********************************/

export async function getNextUser(userID) {
  try {
    // Validate userID
    if (!userID) {
      throw new Error("User ID is required.");
    }
    console.log(userID); // debug

    // Connect to database
    await dbConnect();

    // Get user's liked users
    const likedUsers = await User.findOne({ _id: userID }, "goodFriends");
    const likedUsersIDs = likedUsers.goodFriends || [];
    console.log(likedUsersIDs); // debug

    // Get user's disliked users
    const disliked = await User.findOne({ _id: userID }, "notFriends");
    const dislikedUsersIDs = disliked.notFriends || [];
    console.log(dislikedUsersIDs); // debug

    // Combine liked and disliked users arrays
    const excludedUserIDs = [...likedUsersIDs, ...dislikedUsersIDs];

    // Find next user, who is not in liked users
    let nextUser = await User.findOne({
      _id: { $ne: userID, $nin: excludedUserIDs },
    });

    // If no more users
    if (!nextUser) {
      console.log("No more users."); // debug
      return "no more users";
    }

    // Get next user's ID
    const nextUserID = nextUser._id.toString();

    // Return userID as response
    return nextUserID;
  } catch (error) {
    console.log(error); // debug
  }
}

/**********************************
USER LIKES AND DISLIKES
***********************************/

// TODO:
// - Add error handling to database operations
export async function getLikeUser(formData) {
  try {
    console.log("Liking user..."); // debug
    // Validate userID
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("userID")) {
      throw new Error("User ID is required.");
    } else if (!formData.get("matchID")) {
      throw new Error("Match ID is required.");
    }

    // Parse form data
    const userID = formData.get("userID");
    const matchID = formData.get("matchID");

    // Connect to database
    await dbConnect();

    // Check that both users exist in database
    const user = await User.findById(userID);
    const match = await User.findById(matchID);
    if (!user || !match) {
      throw new Error("User or match not found.");
    }

    // Like user with error handling
    if (userID === matchID) {
      throw new Error("User cannot like themselves.");
    } else if (user.goodFriends.includes(matchID)) {
      console.log("User already liked match.");
    } else {
      await User.updateOne(
        { _id: userID },
        { $push: { goodFriends: matchID } }
      );
    }

    console.log("User liked."); // debug

    // Return response
    return "success";
  } catch (error) {
    console.log(error); // debug
    // add error handling
  }
}

// TODO:
// - Add error handling to database operations
export async function getDisLikeUser(formData) {
  try {
    console.log("Disliking user..."); // debug
    // Validate userID
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("userID")) {
      throw new Error("User ID is required.");
    } else if (!formData.get("matchID")) {
      throw new Error("Match ID is required.");
    }

    // Parse form data
    const userID = formData.get("userID");
    const matchID = formData.get("matchID");

    // Connect to database
    await dbConnect();

    // Check that both users exist in database
    const user = await User.findById(userID);
    const match = await User.findById(matchID);
    if (!user || !match) {
      throw new Error("User or match not found.");
    }

    // Like user with error handling
    if (userID === matchID) {
      throw new Error("User cannot dislike themselves.");
    } else if (user.notFriends.includes(matchID)) {
      console.log("User already disliked match.");
    } else {
      await User.updateOne({ _id: userID }, { $push: { notFriends: matchID } });
    }

    console.log("User disliked."); // debug

    // Return response
    return "success";
  } catch (error) {
    console.log(error); // debug
    // add error handling
  }
}

/**********************************
USER DATA MANAGEMENT
***********************************/

export async function getUserData(userID) {
  // Validate userID
  if (!userID) {
    throw new Error("User ID is required.");
  } else if (userID == "no more users" || userID == null) {
    console.log("No more found."); // debug
    return "no more users";
  }

  console.log(typeof userID + " " + userID); // debug

  // Connect to database
  await dbConnect();

  // Get user
  let user = await User.findOne({ _id: userID });
  if (!user) {
    console.log("User not found."); // debug
    return "no more users";
  }

  // Convert user to object
  const userProps = {
    username: user.username,
    bio: user.bio,
    imageSrc: user.image,
  };

  // Return user
  return userProps;
}

export async function getUpdateUser(formData) {
  try {
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("userID")) {
      throw new Error("User ID is required.");
    } else if (!formData.get("username")) {
      throw new Error("Username is required.");
    } else if (!formData.get("bio")) {
      throw new Error("Bio is required.");
    }

    // Parse form data
    const userID = formData.get("userID");
    const username = formData.get("username");
    const bio = formData.get("bio");

    // Connect to database
    await dbConnect();

    // Get user
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new Error("User not found.");
    }

    // Update user
    user.username = username;
    user.bio = bio;
    await user.save();

    // Return response
    revalidatePath("/[lang]/home/profile", "page");
    return "success";
  } catch (error) {
    console.log(error); // debug
  }
}

/**********************************
GET MATCHES
***********************************/

export async function getLikedUsers(userID) {
  try {
    // Validate userID
    if (!userID) {
      throw new Error("User ID is required.");
    }

    // Connect to database
    await dbConnect();

    // Get user's liked users
    let users = await User.findOne({ _id: userID }, "goodFriends");

    // Get liked users' data
    users = await User.find({ _id: { $in: users.goodFriends } });
    let usersProps = [];
    users.map((user) => {
      usersProps.push({
        id: user._id,
        username: user.username,
        bio: user.bio,
      });
    });

    console.log(usersProps); // debug

    // Return liked users
    return usersProps;
  } catch (error) {
    console.log(error); // debug
  }
}

export async function getDisLikedUsers(userID) {
  try {
    // Validate userID
    if (!userID) {
      throw new Error("User ID is required.");
    }

    // Connect to database
    await dbConnect();

    // Get user's liked users
    let users = await User.findOne({ _id: userID }, "notFriends");

    // Get liked users' data
    users = await User.find({ _id: { $in: users.notFriends } });
    let usersProps = [];
    users.map((user) => {
      usersProps.push({
        id: user._id,
        username: user.username,
        bio: user.bio,
      });
    });

    console.log(usersProps); // debug

    // Return liked users
    return usersProps;
  } catch (error) {
    console.log(error); // debug
  }
}

/**********************************
CHAT
***********************************/

export async function getChatUsers(userID) {
  try {
    // Validate userID
    if (!userID) {
      throw new Error("User ID is required.");
    }

    // Connect to database
    await dbConnect();

    // Get user's liked users
    let users = await User.findOne({ _id: userID }, "goodFriends");

    // Get liked users' data
    users = await User.find({
      _id: { $in: users.goodFriends },
      goodFriends: userID,
    });

    // Create user props
    const usersProps = users.map((user) => ({
      id: user._id.toString(),
      username: user.username,
    }));

    console.log(usersProps); // debug

    // Return liked users
    return usersProps;
  } catch (error) {
    console.log(error); // debug
  }
}

export async function getChatMessages(userID, matchID) {
  try {
    // Validate userIDs
    if (!userID) {
      throw new Error("User ID is required.");
    } else if (!matchID) {
      throw new Error("Match ID is required.");
    }

    // Connect to database
    await dbConnect();

    // Get chat messages
    let messages = await Chat.find({
      $or: [
        { senderID: userID, receiverID: matchID },
        { senderID: matchID, receiverID: userID },
      ],
    });

    // Handle no messages
    let parsedMessages = [];
    if (!messages || messages.length === 0) {
      parsedMessages = [
        {
          id: "1",
          senderName: "ERROR",
          text: "no messages",
          time: "now",
        },
      ];
      console.log("No messages."); // debug
    } else {
      // Find sender's username
      let matchUsername = "not found";
      const user = await User.findOne({ _id: matchID });
      if (user) {
        matchUsername = user.username;
      }

      // Parse messages
      parsedMessages = messages.map((message) => ({
        senderName: message.senderID == userID ? "you" : matchUsername,
        text: message.message,
        time: message.createdAt,
      }));
    }
    console.log(parsedMessages); // debug
    // Return parsed messages
    return parsedMessages;
  } catch (error) {
    console.log(error); // debug
  }
}

export async function getHandleMessageSend(formData) {
  try {
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("userID")) {
      throw new Error("User ID is required.");
    } else if (!formData.get("matchID")) {
      throw new Error("Match ID is required.");
    } else if (!formData.get("message")) {
      console.log("Message is required."); // debug
    }

    // Parse form data
    const userID = formData.get("userID");
    const matchID = formData.get("matchID");
    const message = formData.get("message");

    // Connect to database
    await dbConnect();

    // Create chat message
    const chatMessage = new Chat({
      senderID: userID,
      receiverID: matchID,
      message: message,
    });

    // Save chat message
    await chatMessage.save();
    console.log("Message saved."); // debug

    // Return response
    return "success";
  } catch (error) {
    console.log(error); // debug
  }
}

/**********************************
DEBUGGING FUNCTIONS
***********************************/
export async function logAllUsers() {
  try {
    console.log("***LOGGING ALL USERS FROM DB***"); // debug
    // Connect to database
    await dbConnect();

    // Get all users
    const allUsers = await User.find({});
    allUsers.forEach((user) => {
      console.log(user); // debug
    });

    console.log("***ALL USERS LOGGED***"); // debug
  } catch (error) {
    console.log(error); // debug
  }
}

export async function logAllChats() {
  try {
    console.log("***LOGGING ALL CHATS FROM DB***"); // debug
    // Connect to database
    await dbConnect();

    // Get all users
    const allChats = await Chat.find({});
    allChats.forEach((chat) => {
      console.log(chat); // debug
    });

    console.log("***ALL CHATS LOGGED***"); // debug
  } catch (error) {
    console.log(error); // debug
  }
}

export async function createDummyUsers() {
  try {
    console.log("***CREATING DUMMY USERS***"); // debug
    // Connect to database
    await dbConnect();

    // Create dummy users
    const dummyUsers = [];

    // Use for loop to create 5 dummy users
    for (let i = 1; i <= 5; i++) {
      const randomNumber = Math.floor(Math.random() * 10000);
      const dummyUser = {
        username: `Dummy Virtanen ${randomNumber}`,
        email: `asd${randomNumber}@example.com`,
        password: "123123",
        bio: "I'm a dummy user.",
      };
      dummyUsers.push(dummyUser);
    }

    // Save dummy users
    dummyUsers.forEach(async (dummyUser) => {
      const user = new User(dummyUser);
      await user.save();
      console.log(user); // debug
    });
    console.log("***DUMMY USERS CREATED***"); // debug
  } catch (error) {
    console.log(error); // debug
  }
}

export async function likeMe() {
  try {
    console.log("***LIKING ME***"); // debug
    // Get userID
    const session = cookies().get("session");
    const decodedSession = jwt.verify(session.value, process.env.AUTH_SECRET);
    const userID = decodedSession.userID;

    // Connect to database
    await dbConnect();

    // Make all users like user
    await User.updateMany({}, { $push: { goodFriends: userID } });

    console.log("***LIKED ME***"); // debug
  } catch (error) {
    console.log(error); // debug
  }
}
