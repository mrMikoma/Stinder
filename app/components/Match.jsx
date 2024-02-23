"use client";
import { useState, useEffect } from "react";
import {
  getNextUser,
  getUserData,
  getLikeUser,
  getDisLikeUser,
} from "@/utils/actions";
import Matchcard from "./Matchcard";
import Likeicon from "./icons/likeicon";
import Dislikeicon from "./icons/dislikeicon";

const Match = ({ userID, dict }) => {
  const [nextUserProps, setNextUserProps] = useState(null);
  const [matchID, setMatchID] = useState(null);

  useEffect(() => {
    const nextUser = async () => {
      // Get next user
      console.log("Getting next user..."); // debug
      let nextUserID = await getNextUser(userID);
      console.log("Next user is:"); // debug
      console.log(nextUserID); // debug

      // Set matchID and handle error
      if (nextUserID === "no more users" || !nextUserID) {
        setNextUserProps(null);
        setMatchID(null);
      } else {
        // Set nextUserID
        setMatchID(nextUserID);
        // Get next user props
        let nextUserProps = await getUserData(nextUserID);
        console.log("Next user props are:"); // debug
        console.log(nextUserProps); // debug
        setNextUserProps(nextUserProps);
      }
    };

    nextUser();
  }, [userID]);

  const handleUserLike = (formData) => {
    const likeUser = async (formData) => {
      // Validate form data
      if (!formData) {
        throw new Error("Form data is required.");
      } else if (!formData.get("userID")) {
        throw new Error("User ID is required.");
      }

      // Parse form data
      const userID = formData.get("userID");

      // Like user
      await getLikeUser(formData);

      // Get next user
      let nextUserID = await getNextUser(userID);

      // Set data and handle error
      if (nextUserID === "no more matches") {
        setNextUserProps(null);
        setMatchID(null);
      } else {
        // Set matchID
        setMatchID(nextUserID);

        // Get next user props
        let nextUserProps = await getUserData(nextUserID);
        console.log("Next user props are:"); // debug
        console.log(nextUserProps); // debug
        setNextUserProps(nextUserProps);
      }
    };
    likeUser(formData);
  };

  const handleUserDisLike = (formData) => {
    const likeUser = async (formData) => {
      // Validate form data
      if (!formData) {
        throw new Error("Form data is required.");
      } else if (!formData.get("userID")) {
        throw new Error("User ID is required.");
      }

      // Parse form data
      const userID = formData.get("userID");

      // Like user
      await getDisLikeUser(formData);

      // Get next user
      let nextUserID = await getNextUser(userID);

      // Set data and handle error
      if (nextUserID === "no more matches") {
        setNextUserProps(null);
        setMatchID(null);
      } else {
        // Set matchID
        setMatchID(nextUserID);

        // Get next user props
        let nextUserProps = await getUserData(nextUserID);
        console.log("Next user props are:"); // debug
        console.log(nextUserProps); // debug
        setNextUserProps(nextUserProps);
      }
    };
    likeUser(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
      <div className="flex flex-col items-center">
        {matchID !== "no more users" && nextUserProps ? (
          <Matchcard props={nextUserProps} />
        ) : (
          <h1 className="text-2xl font-bold">{dict.match.no_more_matches}</h1>
        )}
      </div>
      {matchID !== "no more users" && nextUserProps ? (
        <div className="flex justify-center w-full p-4 gap-4">
          <form action={handleUserLike}>
            <input type="hidden" name="userID" value={userID} />
            <input type="hidden" name="matchID" value={matchID} />
            <button type="submit">
              <Likeicon />
            </button>
          </form>
          <form action={handleUserDisLike}>
            <input type="hidden" name="userID" value={userID} />
            <input type="hidden" name="matchID" value={matchID} />
            <button type="submit">
              <Dislikeicon />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Match;
