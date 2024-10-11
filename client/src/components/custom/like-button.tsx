"use client";

import { Heart } from "lucide-react";
import { useOptimistic } from "react";
import { toggleLike } from "@/lib/actions/liked";
import { useFormState, useFormStatus } from "react-dom";

export default function LikeButton({
  likes: initialLikes,
  id,
  isLiked,
}: {
  likes: number;
  id: string;
  isLiked: boolean;
}) {

  const [state, formAction] = useFormState(toggleLike, {
    likes: initialLikes,
    isLiked: isLiked,
  });
  const [optimisticState, addOptimisticState] = useOptimistic(
    state,
    (state, action: { likes: number; isLiked: boolean }) => action
  );
  const { pending } = useFormStatus();

  return (
    <form
      action={async () => {
        const newState = {
          likes: optimisticState.isLiked
            ? optimisticState.likes - 1
            : optimisticState.likes + 1,
          isLiked: !optimisticState.isLiked,
        };
        addOptimisticState(newState);
        await formAction(id);
      }}
    >
      <div className="flex items-center space-x-2">
        <button
          className="flex items-center space-x-1"
          disabled={pending}
          type="submit"
        >
          <Heart
            className={`w-4 h-4 ${
              optimisticState.isLiked
                ? "text-red-500 fill-red-500"
                : "text-gray-500"
            } ${pending ? "opacity-50" : ""}`}
          />
          <span className="text-sm font-medium">Like</span>
        </button>
        <span className="text-sm font-medium">
          {optimisticState.likes} likes
        </span>
      </div>
    </form>
  );
}
