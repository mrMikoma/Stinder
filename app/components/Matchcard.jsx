"use client";
import React from "react";
import Likeicon from "./icons/likeicon";
import { likeUser, nextUser } from "@/utils/actions";

export const Matchcard = ({ props }) => {
  const userId = props.userId;
  console.log(userId); // debug

  const addLikedUser = async () => {
    await likeUser({ userId });
    await nextUser({ userId });
  }

  return (
    <div>
      <div>{props.text}</div>
      <div>
        <form action={addLikedUser}>
          <button type="submit">
            <Likeicon />
          </button>
        </form>
      </div>
    </div>
  );
};
