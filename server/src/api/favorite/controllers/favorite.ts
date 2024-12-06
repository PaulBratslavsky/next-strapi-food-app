/**
 * favorite controller
 */

import { factories } from "@strapi/strapi";
// const { sanitize, validate } = strapi.contentAPI;

export default factories.createCoreController("api::favorite.favorite", {
  async favorite(ctx) {
    const { recipeId } = ctx.params;
    const { user } = ctx.state;

    if (!user) return ctx.throw(401, "Unauthorized");
    const userId = user?.documentId;

    const favoriteService = strapi.service("api::favorite.favorite");
    const { isAlreadyFavorited, updatedRecipe } =
      await favoriteService.toggleFavorite(userId, recipeId);

    return (ctx.body = {
      data: {
        id: recipeId,
        isFavorite: !isAlreadyFavorited,
        likes: updatedRecipe.likes,
      },
    });
  },

  async getUserFavorites(ctx) {
    const { user } = ctx.state;
    const userId = user?.documentId;
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    
    sanitizedQueryParams.filters = {
      userId,
    };

    const { results, pagination } = await strapi
      .service("api::favorite.favorite")
      .find(sanitizedQueryParams);

    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });

  },

  // async getUserFavorites(ctx) {
  //   const { user } = ctx.state;

  //   const contentType = strapi.contentType("api::favorite.favorite");
  //   await validate.query(ctx.query, contentType, { auth: ctx.state.auth });

  //   const sanitizedQueryParams = await sanitize.query(ctx.query, contentType, {
  //     auth: ctx.state.auth,
  //   });

  //   // console.log(sanitizedQueryParams);

  //   if (!user) return ctx.throw(401, "Unauthorized");
  //   const userId = user?.documentId;

  //   sanitizedQueryParams.filters = {
  //     userId,
  //   };

  //   const documents = await strapi
  //     .documents(contentType.uid)
  //     .findMany(sanitizedQueryParams);

  //   return await sanitize.output(documents, contentType, {
  //     auth: ctx.state.auth,
  //   });
  // },
});
