/**
 * favorite service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::favorite.favorite', {
  async favorite(id, userId) {
    console.log(id, userId);
  },
  async unfavorite(id, userId) {
    console.log(id, userId);
  },
});
