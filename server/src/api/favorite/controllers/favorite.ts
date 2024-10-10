/**
 * favorite controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::favorite.favorite', {
  async favorite(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    // let favorite;

    // if (true) favorite = await strapi.service("api::favorite.favorite").favorite(id, user.id);
    // else favorite = await strapi.service("api::favorite.favorite").unfavorite(id, user.id);

    return ctx.body = {
      "data": "ok"
    };
  },

});
