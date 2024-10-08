import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";
const BASE_URL = process.env.STRAPI_API_URL ?? "http://localhost:1337";
const PAGE_SIZE = 3;

export async function getRecipes(page: number, queryString: string) {
  const path = "/api/recipes";

  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      }
    },
    pagination: {
      page: page,
      pageSize: PAGE_SIZE,
    },
    filters: {
      label: {
        $containsi: queryString,
      },
    },
  });

  return await fetchAPI(url.href, { method: "GET" });
}
