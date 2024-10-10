import { StrapiImage } from "@/components/custom/strapi-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/custom/modal";
import { RecipeDetails } from "@/components/custom/recipe-details";
import { SearchBar } from "@/components/custom/search-bar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "./pagination";

import {LikeButtonWrapper} from "@/components/custom/LikeButtonWrapper";

interface ImageProps {
  url: string;
  alternativeText: string;
  name: string;
}

interface RecipeProps {
  id: number;
  documentId: string;
  label: string;
  likes: number;
  image: ImageProps;
}

export function RecipeList({
  recipes,
  pageCount,
}: {
  readonly recipes: RecipeProps[];
  readonly pageCount: number;
}) {
  return (
    <>
      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <StrapiImage
              src={recipe.image.url}
              alt={recipe.image.alternativeText || recipe.image.name}
              width={400}
              height={800}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{recipe.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{"category"}</Badge>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <LikeButtonWrapper id={recipe.documentId} likes={recipe.likes} />
              <Modal
                isLoggedIn={true}
                heading={recipe.label}
                button={<Button>See Recipe</Button>}
              >
                <RecipeDetails recipe={recipe} />
              </Modal>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination pageCount={pageCount} />
      </div>
    </>
  );
}
