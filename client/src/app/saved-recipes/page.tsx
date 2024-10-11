import { RecipeList } from "@/components/custom/recipe-list";
import { getUserMeLoader } from "@/lib/services/user";
import { getUserFavoritesLoader, getRecipesByDocumentIds } from "@/data/loaders";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

async function loader(page: number, queryString: string) {
  const user = await getUserMeLoader();
  const userId = user?.data?.documentId;  

  const favoriteIds = await getUserFavoritesLoader(userId);

  console.log("##########################");
  console.log(favoriteIds);
  console.log("##########################");

  if (favoriteIds?.length === 0) return { data: [], meta: { pagination: { pageCount: 0 } } };


  const data = await getRecipesByDocumentIds(favoriteIds, page, queryString);

  console.log("##########################");
  console.log(data);
  console.log("##########################");

  return { data: data?.data || [], meta: data.meta };
}

export default async function SavedRecipes({ searchParams }: SearchParamsProps  ) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const { data, meta } = await loader(currentPage, query);
  return <RecipeList recipes={data} pageCount={meta.pagination.pageCount} />
}
