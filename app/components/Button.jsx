import React from "react";
import Link from "next/link";

const Button = ({ props }) => {
  const { header, url } = props;
  return (
    <div className="m-6 w-fit">
      <Link
        className="bg-white hover:bg-tinder-whiteish text-tinder-gray font-bold py-4 px-8 rounded-full text-xl shadow-2xl"
        href={url}
      >
        {header}
      </Link>
    </div>
  );
};

export default Button;
