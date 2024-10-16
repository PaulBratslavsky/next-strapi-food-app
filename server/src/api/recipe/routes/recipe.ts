/**
 * recipe router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::recipe.recipe', {
  config: {
    create: {
      middlewares: [
        'global::set-auth-user'
      ]
    }
  }
});
