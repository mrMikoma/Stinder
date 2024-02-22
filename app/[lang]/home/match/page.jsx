import Unauthorized from "@/app/components/Unauthorized";
import { getDictionary } from "../../../../utils/dictionaries";
import { getNextUser, getLikeUser, getDisLikeUser } from "../../../../utils/actions";
import Matchcard from "@/app/components/Matchcard";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Likeicon from "../../../components/icons/likeicon";
import Dislikeicon from "../../../components/icons/dislikeicon";
import { revalidatePath } from "next/cache";

const Match = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  const session = cookies().get("session");
  let nextUserProps = null;
  let userID = null;
  let matchID = null;

  const nextUser = async (userID) => {
    "use server";
    // Get next user
    console.log("Getting next user..."); // debug
    let nextUserProps = await getNextUser(userID);
    console.log("Next user is:"); // debug
    console.log(nextUserProps); // debug
    revalidatePath("/[lang]/home/match", "page");
    return nextUserProps;
  };

  const likeUser = async (formData) => {
    "use server";
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("userID")) {
      throw new Error("User ID is required.");
    }

    // Parse form data
    const userID = formData.get("userID");

    // Like user
    await getLikeUser(formData);

    // Get next user
    let matchID = await nextUser(userID);
    return matchID;
  };

  const disLikeUser = async (formData) => {
    "use server";
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("userID")) {
      throw new Error("User ID is required.");
    }

    // Parse form data
    const userID = formData.get("userID");

    // Like user
    await getDisLikeUser(formData);

    // Get next user
    let matchID = await nextUser(userID);
    return matchID;
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
      matchID = await nextUser(userID);

      console.log("User ID: " + userID); // debug
      console.log("Match ID: " + matchID); // debug

      // Generate user props
      nextUserProps = {
        userID: nextUser._id,
        username: nextUser.username,
        imageSrc: nextUser.image,
        bio: nextUser.bio,
      };
    } else {
      console.log("Session is invalid."); // debug
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">{matchID}</h2>
          <Matchcard props={nextUserProps} />
        </div>
        <div className="flex justify-center w-full p-4 gap-4">
          <form action={likeUser}>
            <input type="hidden" name="userID" value={userID} />
            <input type="hidden" name="matchID" value={matchID} />
            <button type="submit">
              <Likeicon />
            </button>
          </form>
          <form action={disLikeUser}>
            <input type="hidden" name="userID" value={userID} />
            <input type="hidden" name="matchID" value={matchID} />
            <button type="submit">
              <Dislikeicon />
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Match;
