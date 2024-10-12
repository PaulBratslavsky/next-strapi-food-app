// Types
import { type SearchParamsProps } from "@/types";

// Data Loaders
import { getRecipesLoader } from "@/data/loaders";

// UI Components
import { RecipeList } from "@/components/custom/recipe-list";

async function loader(page: number, queryString: string) {
  const data = await getRecipesLoader(page, queryString);
  return { data: data?.data || [], meta: data.meta };
}

export default async function HomeRoute({
  searchParams,
}: Readonly<SearchParamsProps>) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";

  const { data, meta } = await loader(currentPage, query);
  return <RecipeList recipes={data} pageCount={meta.pagination.pageCount} />;
}
