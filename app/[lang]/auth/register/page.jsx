import React from "react";
import { Registerform } from "../../../components/Registerform";
import { getDictionary } from "@/utils/dictionaries";

const Register = async ({params: lang}) => {
  const dict = await getDictionary(lang.lang);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-black relative">
      <div className="flex flex-col items-center">
        <Registerform dict={dict}/>
      </div>
    </div>
  );
};

export default Register;
