import React from "react";
import { Registerform } from "../../../components/Registerform";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-black relative">
      <div className="flex flex-col items-center">
        <Registerform />
      </div>
    </div>
  );
};

export default Register;
