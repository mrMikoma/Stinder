"use client";
import Link from "next/link";
import { signOut } from "@/utils/actions";
import Logo from "./Logo";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/dictionaries";
import { useEffect, useState } from "react";
import Debugtools from "./Debugtools";

// TODO:
// - Add language support

const Navbar = () => {
  const lang = useParams().lang;

  /* FIX THIS
  const [dict, setDictionary] = useState({});
  useEffect(() => {
    const handleGetDictionary = async (lang) => {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    };
    handleGetDictionary(lang);
  }, []);
  console.log(dict ? dict.nav : "no dictionary");
  */

  const SignOutButton = () => {
    const handleSignOut = async () => {
      return (
        <form
          action={async () => {
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      );
    };
    return handleSignOut();
  };

  return (
    <div className="bg-tinder-pink p-4">
      <nav className="flex flex-col sm:flex-row mx-auto justify-center items-center">
        <div className="flex-initial p-2">
          <Link href="/" className="text-unna-white flex-none">
            <Logo />
          </Link>
        </div>
        <div
          className={`sm:flex mx-auto w-full text-3xl m-2 $ sm:items-center items-stretch mx-auto justify-center sm:justify-start gap-4`}
        >
          <Link
            href="/home/match"
            className="text-white hover:text-tinder-gray m-2 sm:mx-3"
          >
            Match
          </Link>
          <span className="text-grey text-4xl sm:block hidden">|</span>
          <Link
            href="/home/chat"
            className="text-white hover:text-tinder-gray m-2 sm:mx-3"
          >
            Chat
          </Link>
          <span className="text-grey text-4xl sm:block hidden">|</span>
          <Link
            href="/home/profile"
            className="text-white hover:text-tinder-gray m-2 sm:mx-3"
          >
            Profile
          </Link>
        </div>
        <Debugtools />
        <div>
          <div>
            <SignOutButton />
          </div>
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
