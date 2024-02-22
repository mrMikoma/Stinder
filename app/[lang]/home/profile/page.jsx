import Unauthorized from "@/app/components/Unauthorized";
import { getDictionary } from "../../../../utils/dictionaries";
import {
  getUserData,
  getUpdateUser,
  getLikedUsers,
  getDisLikedUsers,
} from "../../../../utils/actions";
import { cookies } from "next/headers";
import Image from "next/image";
import jwt from "jsonwebtoken";
import Userlist from "../../../components/Userlist";

// TODO:
// - Add submit messages
// - Add AI profile image selection

const Profile = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  const session = cookies().get("session");
  let userID = null;
  let user = null;
  let likedUsers = [];
  let disLikedUsers = [];
  let message = null;

  const userData = async (formData) => {
    "use server";
    // Get user data
    const user = await getUserData(formData);
    console.log(user); // debug
    return user;
  };

  const updateUser = async (formData) => {
    "use server";
    // Update user data
    let message = await getUpdateUser(formData);
    if (message === "success") {
      message = dict.profile.success;
    } else {
      message = dict.profile.error;
    }
    console.log(message); // debug
    return message;
  };

  if (!session) {
    return <Unauthorized />;
  } else {
    let decodedSession = null;
    try {
      // Parse session data
      decodedSession = jwt.verify(session.value, process.env.AUTH_SECRET);
      console.log(decodedSession); // debug
    } catch (error) {
      console.log(error); // debug
    }

    // If session is valid, set user ID and props
    if (decodedSession) {
      // Update global variables
      userID = decodedSession.userID;
      user = await userData(userID);
      console.log("User ID: " + userID); // debug
      likedUsers = await getLikedUsers(userID);
      disLikedUsers = await getDisLikedUsers(userID);
    } else {
      console.log("Session is invalid."); // debug
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
        <div className="flex flex-col items-stretch max-w-xl w-xl min-h-screen">
          <div className="flex flex-col justify-center w-full p-4 gap-4 items-center mx-auto bg-gray-200">
            <h1 className="text-4xl font-bold">{dict.profile.title}</h1>
            <Image
              src="/images/ai_bot_kuva_1.png"
              alt="Profile"
              className="rounded-lg mb-4"
              width="200"
              height="200"
            />
            <h2 className="text-2xl font-bold">{dict.profile.edit_profile}</h2>
            <form action={updateUser}>
              <div className="flex flex-row items-center gap-4 p-4">
                <div className="flex flex-col items-center">
                  <label htmlFor="username">{dict.profile.username}</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={user.username}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="bio">{dict.profile.bio}</label>
                  <input type="text" name="bio" defaultValue={user.bio} />
                </div>
              </div>
              <div className="flex flex-row items-center justify-center p-4">
                <button
                  className="bg-white py-2 px-4 rounded border border-black"
                  type="submit"
                >
                  {dict.profile.submit}
                </button>
              </div>
              {message ? (
                <div className="flex flex-row items-center justify-center p-4">
                  {" "}
                  <p>{message}</p>
                </div>
              ) : null}
              <input type="hidden" name="userID" defaultValue={userID} />
            </form>
          </div>
          <div className="flex flex-col flex-1 items-center mx-auto w-full md:max-w-3xl bg-gray-200 p-4">
            <h2 className="text-2xl font-bold">
              {dict.profile.liked_profiles}
            </h2>
            {likedUsers && likedUsers.length > 0 ? (
              <Userlist users={likedUsers} />
            ) : (
              <p>{dict.profile.no_liked_profiles}</p>
            )}
            <h2 className="text-2xl font-bold">
              {dict.profile.disliked_profiles}
            </h2>
            {disLikedUsers && disLikedUsers.length > 0 ? (
              <Userlist users={disLikedUsers} />
            ) : (
              <p>{dict.profile.no_disliked_profiles}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
