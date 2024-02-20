import React from "react";
import { getDictionary } from "../../../../utils/dictionaries";
import { Matchcard } from "../../../components/Matchcard";
import { auth } from "@/auth";

const Match = async ({ params: { lang } }) => {
  const session = await auth();
  const dict = await getDictionary(lang);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
        <div className="flex flex-col items-center">Unauthorised</div>
      </div>
    );
  } else {
    const props = {
      text: "This is a match card",
      userId: session.user.email,
    };
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
        <div className="flex flex-col items-center">
          <Matchcard props={props} />
        </div>
      </div>
    );
  }
};

export default Match;
