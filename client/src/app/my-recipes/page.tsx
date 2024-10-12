// Types
import { type SearchParamsProps } from "@/types";

// Libs & Utils
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/services/get-auth-token";

// Data Loaders & Services
import { getUserMeLoader } from "@/lib/services/user";
import { getUserRecipesLoader } from "@/data/loaders";

// UI Components
import { RecipeList } from "@/components/custom/recipe-list";

async function loader(page: number, queryString: string) {
  const authToken = await getAuthToken();
  if (!authToken) redirect("/signin");

  const user = await getUserMeLoader();
  const userId = user?.data?.documentId;
  const data = await getUserRecipesLoader(userId, page, queryString, authToken);
  return { data: data?.data || [], meta: data.meta };
}

export default async function MyRecipes({
  searchParams,
}: Readonly<SearchParamsProps>) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const { data, meta } = await loader(currentPage, query);
  return <RecipeList recipes={data} pageCount={meta.pagination.pageCount} />;
}
