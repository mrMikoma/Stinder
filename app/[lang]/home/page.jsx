import Unauthorized from "@/app/components/Unauthorized";
import { getDictionary } from "../../../utils/dictionaries";
import Matchcard from "../../components/Matchcard";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const Profile = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  const session = cookies().get("session");

  if (!session) {
    return <Unauthorized />;
  } else {
    let decodedSession = null;
    try {
      // Parse session data
      decodedSession = jwt.verify(session.value, process.env.AUTH_SECRET);
    } catch (error) {
      console.log(error); // debug
    }

    // If session is valid
    let props = null;
    if (decodedSession) {
      props = {
        userId: decodedSession.userId,
        username: decodedSession.username,
        imageSrc: decodedSession.image,
        bio: decodedSession.bio,
      };
    } else {
      console.log("Session is invalid."); // debug
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
        <h1 className="text-2xl text-bold">Your profile</h1>
        <div className="flex flex-col items-center">
          <Matchcard props={props} />
        </div>
      </div>
    );
  }
};

export default Profile;
