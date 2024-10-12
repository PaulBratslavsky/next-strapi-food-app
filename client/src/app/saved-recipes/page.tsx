// Types
import { type SearchParamsProps } from "@/types";

// Libs & Utils
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/services/get-auth-token";

// Data Loaders & Services
import { getUserFavoritesLoader, getRecipesByDocumentIdsLoader } from "@/data/loaders";
import { getUserMeLoader } from "@/lib/services/user";

// UI Components
import { RecipeList } from "@/components/custom/recipe-list";

async function loader(page: number, queryString: string) {
  const authToken = await getAuthToken();
  if (!authToken) redirect("/signin");

  const user = await getUserMeLoader();
  const userId = user?.data?.documentId;  
  const favoriteIds = await getUserFavoritesLoader(userId);

  if (favoriteIds?.length === 0) return { data: [], meta: { pagination: { pageCount: 0 } } };
  const data = await getRecipesByDocumentIdsLoader(favoriteIds, page, queryString);

  return { data: data?.data || [], meta: data.meta };
}

export default async function SavedRecipes({ searchParams }: Readonly<SearchParamsProps>  ) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const { data, meta } = await loader(currentPage, query);
  return <RecipeList recipes={data} pageCount={meta.pagination.pageCount} />
}
