import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="p-2 hover:bg-white">
      <Image
        src="/images/slinder-logo.png"
        alt="LUT-Stinder"
        width={64}
        height={64}
      />
    </div>
  );
};

export default Logo;