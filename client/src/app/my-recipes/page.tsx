import { RecipeList } from "@/components/custom/recipe-list";
import { getUserMeLoader } from "@/lib/services/user";
import { getUserRecipesLoader } from "@/data/loaders";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

async function loader(page: number, queryString: string) {
  const user = await getUserMeLoader();
  const userId = user?.data?.documentId;  
  const data = await getUserRecipesLoader(userId, page, queryString);
  return { data: data?.data || [], meta: data.meta };
}

export default async function MyRecipes({ searchParams }: SearchParamsProps) { 
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const { data, meta } = await loader(currentPage, query);
  return <RecipeList recipes={data} pageCount={meta.pagination.pageCount} />
}
