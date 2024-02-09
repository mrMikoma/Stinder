"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-tinder-pink p-4">
      <nav className="flex flex-col sm:flex-row mx-auto justify-between items-center">
        <div className="flex-initial p-2">
          <Link href="/" className="text-unna-white flex-none">
            <Logo />
          </Link>
        </div>
        <div className="block sm:hidden">
          <button
            className={`flex items-center px-3 py-2 rounded text-unna-gray hover:text-unna-beige`}
            onClick={() => setIsOpen(!isOpen)}
          ></button>
        </div>
        <div
          className={`sm:flex mx-auto w-full text-2xl m-2 ${
            isOpen ? "flex" : "hidden"
          } sm:items-center items-stretch justify-center sm:justify-start`}
        >
          <Link
            href="/match"
            className="text-white devider-right hover:text-tinder-gray"
          >
            Match
          </Link>
          <Link
            href="/chat"
            className="text-white devider-right hover:text-tinder-gray"
          >
            Chat
          </Link>
          <Link
            href="/profile"
            className="text-white devider-left hover:text-tinder-gray"
          >
            Profile
          </Link>
        </div>
        <div className="flex flex-row sm:flex-col items-center">
          <Link
            href="/fi"
            locale="fi"
            className="text-unna-white m-1 hover:text-unna-beige"
          >
            <p className="">FI</p>
          </Link>
          <span className="devider-bottom text-grey m-2"></span>
          <Link
            href="/en"
            locale="en"
            className="text-unna-white m-1 hover:text-unna-beige"
          >
            <p className="">EN</p>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
