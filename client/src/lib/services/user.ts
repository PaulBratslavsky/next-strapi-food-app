import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-auth-token";

export async function getUserMeLoader() {
  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  const url = new URL("/api/users/me", getStrapiURL());

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user data');
    }

    return { ok: true, data, error: null };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { ok: false, data: null, error: error instanceof Error ? error.message : String(error) };
  }
}
