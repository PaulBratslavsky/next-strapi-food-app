import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";
const BASE_URL = process.env.STRAPI_API_URL ?? "http://localhost:1337";

const PAGE_SIZE = 9;

import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/services/get-auth-token";
import { getUserMeLoader } from "@/lib/services/user";

export async function getRecipesLoader(page: number, queryString: string) {
  const path = "/api/recipes";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
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
    sort: [
      {
        createdAt: "desc",
      },
    ],
  });

  return await fetchAPI(url.href, { method: "GET" });
}

export async function getUserRecipesLoader(
  userId: string,
  page: number,
  queryString: string,
  authToken: string
) {
  const path = "/api/recipes";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    pagination: {
      page: page,
      pageSize: PAGE_SIZE,
    },
    filters: {
      authorId: {
        $eq: userId,
      },
      label: {
        $containsi: queryString,
      },
    },
    sort: [
      {
        createdAt: "desc",
      },
    ],
  });

  return await fetchAPI(url.href, { method: "GET", authToken });
}

function extractRecipeDocumentIds(
  favorites: {
    recipeId: string;
  }[]
): string[] {
  return favorites.map((favorite) => {
    return favorite.recipeId;
  });
}

export async function getUserFavoritesLoader(userId: string) {
  if (!userId) redirect("/signin");

  const authToken = await getAuthToken();
  const path = "/api/favorites";

  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    fields: ["recipeId", "userId"],
    filters: {
      userId: {
        $eq: userId,
      },
    },
    sort: [
      {
        createdAt: "desc",
      },
    ],
  });

  const favorites = await fetchAPI(url.href, { method: "GET", authToken });
  const favoriteRecipeDocumentIds = extractRecipeDocumentIds(favorites?.data);

  return favoriteRecipeDocumentIds;
}

export async function getRecipesByDocumentIdsLoader(
  documentIds: string[],
  page: number,
  queryString: string
) {
  const path = "/api/recipes";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    pagination: {
      page: page,
      pageSize: PAGE_SIZE,
    },
    filters: {
      documentId: {
        $in: documentIds,
      },
      label: {
        $containsi: queryString,
      },
    },
  });

  return await fetchAPI(url.href, { method: "GET" });
}

export async function getLikedRecipeLoader(id: string) {
  const user = await getUserMeLoader();
  const userId = user?.data?.documentId;

  if (!userId) return { isLiked: false };

  const authToken = await getAuthToken();
  const path = "/api/favorites";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    fields: ["documentId"],
    filters: {
      userId: {
        $eq: userId,
      },
      recipeId: {
        $eq: id,
      },
    },
  });

  const response = await fetchAPI(url.href, { method: "GET", authToken });
  const isLiked = response.data.length > 0;
  return { isLiked };
}
