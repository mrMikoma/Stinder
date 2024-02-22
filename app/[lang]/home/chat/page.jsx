import Unauthorized from "@/app/components/Unauthorized";
import { getDictionary } from "../../../../utils/dictionaries";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Chat from "@/app/components/Chat";

const Match = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  const session = cookies().get("session");
  let userID = null;

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
    if (decodedSession) {
      userID = decodedSession.userID;
      console.log("Session is valid."); // debug
    } else {
      console.log("Session is invalid."); // debug
    }

    return (
      <div className="bg-white">
        <Chat userID={userID} dict={dict} />
      </div>
    );
  }
};

export default Match;
