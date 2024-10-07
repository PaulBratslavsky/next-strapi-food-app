import { RecipeList } from "@/components/custom/recipe-list";
import { recipes } from "@/mock";

export default function MyRecipes() {
  return <RecipeList recipes={recipes} />
}
