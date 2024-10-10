import { RecipeList } from "@/components/custom/recipe-list";
import { recipes } from "@/mock";

export default function SavedRecipes() {
  return <RecipeList recipes={recipes as any} pageCount={1} />
}
