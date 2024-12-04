export default {
  routes: [
    { 
      method: 'POST',
      path: '/favorite/:recipeId',
      handler: 'favorite.favorite',
      config: {
        policies: [],
      },
    },

    {
      method: 'GET',
      path: '/favorite/user-favorites',
      handler: 'favorite.getUserFavorites',
    },

  ]
}