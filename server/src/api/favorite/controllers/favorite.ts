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

    const recipe = await strapi.service("api::recipe.recipe").findOne(recipeId);
    if (!recipe) return ctx.throw(404, "Recipe not found");

    console.log("##########################");
    console.log(recipe);
    console.log("##########################");

    const favorites = await strapi
      .documents("api::favorite.favorite")
      .findMany({
        filters: {
          userId: userId,
          recipeId: recipe.documentId,
        },
      });

    let isFavorite = favorites.length > 0;

    async function addRecipeLikeCount(recipeId: string) {
      await strapi.service("api::recipe.recipe").update(recipeId, {
        data: {
          likes: recipe.likes + 1,
        }
      })  
    }

    async function removeRecipeLikeCount(recipeId: string) {
      await strapi.service("api::recipe.recipe").update(recipeId, {
        data: {
          likes: recipe.likes - 1,
        }
      })  
    }

    if (!isFavorite) {
      const newFavorite = await strapi
        .documents("api::favorite.favorite")
        .create({
          data: {
            userId: userId,
            recipeId: recipeId,
          },
          status: "published",
        });

      await addRecipeLikeCount(recipeId); 
      
    } else {
      await strapi.documents("api::favorite.favorite").delete({
        documentId: favorites[0].documentId,
      });

      await removeRecipeLikeCount(recipeId);
    }

    // 1 check if favorite exists
    // create favortite

    // 2 cehck if the user liked it
    // update to unlike

    if (isFavorite) {
      console.log("isFavorite");
    } else {
      console.log("not isFavorite");
    }

    // let favorite;

    // if (true) favorite = await strapi.service("api::favorite.favorite").favorite(id, user.id);
    // else favorite = await strapi.service("api::favorite.favorite").unfavorite(id, user.id);

    return (ctx.body = {
      data: {
        id: recipeId,
        user: userId,
        isFavorite: isFavorite,
      },
    });
  },
});
