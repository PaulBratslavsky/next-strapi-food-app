import { fetchAPI } from "@/lib/fetch-api";
import { getAuthToken } from "@/lib/services/get-auth-token";

const baseUrl = "http://localhost:1337";
const url = new URL(`${baseUrl}/api/recipes`);

export async function createRecipeService(payload: any) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token");

  const data = await fetchAPI(url.href, {
    method: "POST",
    payload,
    authToken,
  });

  return { data };
}
