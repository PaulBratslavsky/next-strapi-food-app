// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: {
    name: string;
    image: string;
  };
}

// TODO: Implement user avatar

export function UserAvatar({ user }: Readonly<UserAvatarProps>) {
  return (
    <div className="flex items-center space-x-2">
      {/* <Avatar>
        <AvatarImage src={recipe.authorAvatar} />
        <AvatarFallback>
          {recipe.author
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm text-muted-foreground">{recipe.author}</span> */}
    </div>
  );
}
