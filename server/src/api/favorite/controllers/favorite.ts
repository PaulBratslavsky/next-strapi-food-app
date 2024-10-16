/**
 * favorite controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::favorite.favorite", {
  async favorite(ctx) {
    const { recipeId } = ctx.params;
    const { user } = ctx.state;

    if (!user) return ctx.throw(401, "Unauthorized");
    const userId = user?.documentId;

    const favoriteService = strapi.service("api::favorite.favorite");
    const { isAlreadyFavorited, updatedRecipe } = await favoriteService.toggleFavorite(userId, recipeId);

    return (ctx.body = {
      data: {
        id: recipeId,
        isFavorite: !isAlreadyFavorited,
        likes: updatedRecipe.likes,
      },
    });
  },
});