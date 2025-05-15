module.exports = {
  content: ['./src/**/*.{html,js}'], // asegúrate que apunta bien
  safelist: [
    {
      pattern: /bg-(pink|blue|green|red|yellow)-500\/50/,
    },
    {
      pattern: /border-(pink|blue|green|red|yellow)-500\/10/,
    },
    {
      pattern: /shadow-(pink|blue|green|red|yellow)-500\/25/,
    },
  ],
};