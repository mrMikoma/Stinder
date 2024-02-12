import React from "react";
import { BiSolidLike } from "react-icons/bi";

const Likeicon = () => {
  return (
    <div className="text-green mr-2 ml-2 p-2 rounded-full shadow-lg border border-green bg-white">
      <BiSolidLike size={40} />
    </div>
  );
};

export default Likeicon;
