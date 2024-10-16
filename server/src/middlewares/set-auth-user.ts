/**
 * `set-auth-user` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In set-auth-user middleware.');
    const userId = ctx.state?.user?.documentId;

    console.log(userId, "userId");
    console.log(ctx.request.body)
    ctx.request.body.data.authorId = userId;

    console.log(ctx.request.body, "body")
    await next();
  };
};
