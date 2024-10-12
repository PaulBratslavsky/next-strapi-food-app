/**
 * favorite service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::favorite.favorite", {
  async toggleFavorite(userId: string, recipeId: string) {
    const recipe = await strapi.service("api::recipe.recipe").findOne(recipeId);
    if (!recipe) throw new Error("Recipe not found");

    const favorites = await strapi
      .documents("api::favorite.favorite")
      .findMany({
        filters: {
          userId: userId,
          recipeId: recipe.documentId,
        },
      });

    const isAlreadyFavorited = favorites.length > 0;

    if (!isAlreadyFavorited) {
      await strapi.documents("api::favorite.favorite").create({
        data: {
          userId: userId,
          recipeId: recipeId,
        },
        status: "published",
      });

      recipe.likes += 1;
    } else {
      await strapi.documents("api::favorite.favorite").delete({
        documentId: favorites[0].documentId,
      });

      recipe.likes -= 1;
    }

    const updatedRecipe = await strapi
      .service("api::recipe.recipe")
      .update(recipeId, {
        data: {
          likes: recipe.likes,
        },
      });

    return { isAlreadyFavorited, updatedRecipe };
  },
});
