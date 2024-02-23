"use client";
import Link from "next/link";
import { logAllChats, logAllUsers, signOut } from "@/utils/actions";
import Logo from "./Logo";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/dictionaries";
import { useEffect, useState } from "react";

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

  const LogUsersButton = () => {
    const handlelogAllUsers = async () => {
      return (
        <form
          action={async () => {
            await logAllUsers();
          }}
        >
          <button type="submit">users</button>
        </form>
      );
    };
    return handlelogAllUsers();
  };

  const LogChatsButton = () => {
    const handlelogAllChats = async () => {
      return (
        <form
          action={async () => {
            await logAllChats();
          }}
        >
          <button type="submit">chats</button>
        </form>
      );
    };
    return handlelogAllChats();
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
          className={`sm:flex mx-auto w-full text-2xl m-2 $ sm:items-center items-stretch justify-center sm:justify-start`}
        >
          <Link
            href="/home/match"
            className="text-white devider-right hover:text-tinder-gray"
          >
            Match
          </Link>
          <Link
            href="/home/chat"
            className="text-white devider-right hover:text-tinder-gray"
          >
            Chat
          </Link>
          <Link
            href="/home/profile"
            className="text-white devider-left hover:text-tinder-gray"
          >
            Profile
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <h3>DEBUG TOOLS</h3>
          <LogUsersButton />
          <LogChatsButton />
        </div>
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
