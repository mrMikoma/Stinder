import Unauthorized from "@/app/components/Unauthorized";
import { getDictionary } from "../../../../utils/dictionaries";
import { cookies } from "next/headers";

const Match = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  const session = cookies().get("session");

  if (!session) {
    return (
      <Unauthorized />
    );
  } else {
    const props = {
      text: "This is a match card",
      userId: "asd@asd.fi",
    };
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
        <div className="flex flex-col items-center">
          <h1>Ooot ines bro</h1>
        </div>
      </div>
    );
  }
};

export default Match;
