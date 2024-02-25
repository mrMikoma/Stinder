import Unauthorized from "@/app/components/Unauthorized";
import { getDictionary } from "@/utils/dictionaries";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import MatchC from "@/app/components/Match";

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
      console.log(decodedSession); // debug
    } catch (error) {
      console.log(error); // debug
    }

    // If session is valid, set user ID and props
    if (decodedSession) {
      // Update global variables
      userID = decodedSession.userID;
      console.log("User ID: " + userID); // debug
      return (
        <div>
          <MatchC userID={userID} dict={dict} />
        </div>
      );
    } else {
      console.log("Session is invalid."); // debug
      return <Unauthorized />;
    }
  }
};

export default Match;
