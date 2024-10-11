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

  ]
}