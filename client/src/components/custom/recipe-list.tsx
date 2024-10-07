import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecipeProps {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  likes: number;
  image: string;
}

export function RecipeList({ recipes }: { readonly recipes: RecipeProps[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {recipes.map((recipe) => (
      <Card key={recipe.id} className="overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">{recipe.category}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={recipe.authorAvatar} />
              <AvatarFallback>
                {recipe.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {recipe.author}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium">{recipe.likes} likes</span>
          </div>
        </CardFooter>
      </Card>
    ))}
  </div>
  )
}
