import { RecipeList } from "@/components/custom/recipe-list";
import { getRecipes } from "@/data/loaders";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

async function loader(page: number, queryString: string) {
  const data = await getRecipes(page, queryString);
  console.dir(data, { depth: null });
  return { data: data?.data || [], meta: data.meta };
}

export default async function HomeRoute({ searchParams }: Readonly<SearchParamsProps>) {
  
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";

  const { data, meta } = await loader(currentPage, query);
  return <RecipeList recipes={data} pageCount={meta.pagination.pageCount} />
}
