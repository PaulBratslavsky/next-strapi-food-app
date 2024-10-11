import { fetchAPI } from "@/lib/fetch-api";

import { getAuthToken } from "@/lib/services/get-auth-token";

export async function likeService(recipeId: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  const path = "/api/favorite/" + recipeId ;
  const url = new URL(path, BASE_URL);

  try {
    const authToken = await getAuthToken();
    const response = await fetchAPI(url.href, { method: "POST", authToken });
    return response;
  } catch (error) {
    console.log(error);
  }
}
