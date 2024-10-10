export default {
  routes: [
    { 
      method: 'POST',
      path: '/favorite/:id',
      handler: 'favorite.favorite',
      config: {
        policies: [],
      },
    },

  ]
}