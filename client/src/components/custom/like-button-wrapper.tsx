import React from "react";
import { getLikedRecipeLoader } from "@/data/loaders";
import LikeButton from "./like-button";

export async function LikeButtonWrapper({
  id,
  likes,
}: {
  id: string;
  likes: number;
}) {
  const isLiked = await getLikedRecipeLoader(id);
  return (
    <div>
      <LikeButton likes={likes} id={id} isLiked={isLiked.isLiked} />
    </div>
  );
}
