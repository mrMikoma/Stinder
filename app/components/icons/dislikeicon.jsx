import React from "react";
import { BiSolidDislike } from "react-icons/bi";

const Dislikeicon = () => {
  return (
    <div className="text-red mr-2 ml-2 p-2 rounded-full shadow-lg border border-red bg-white">
      <BiSolidDislike size={40} />
    </div>
  );
};

export default Dislikeicon;
