import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxtjs/google-fonts", "@nuxt/icon", "nuxt3-leaflet"],

  vite: {
    plugins: [tailwindcss()],
  },

  googleFonts: {
    families: {
      "Playfair Display": {
        wght: [400, 500, 600, 700, 800, 900],
        ital: [400, 700],
      },
      "Great Vibes": true,
      "Cormorant Garamond": {
        wght: [300, 400, 500, 600, 700],
        ital: [300, 400, 500, 600, 700],
      },
      Montserrat: {
        wght: [300, 400, 500, 600],
      },
      Battambang: {
        wght: [300, 400, 700, 900],
      },
      "Kantumruy Pro": {
        wght: [300, 400, 500, 600, 700],
      },
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
  },

  app: {
    head: {
      title: "Nato & Rita — Wedding Invitation",
      meta: [
        {
          name: "description",
          content:
            "You are cordially invited to celebrate the wedding of Nato & Rita",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: "Nato & Rita — Wedding Invitation" },
        {
          property: "og:description",
          content: "Join us in celebrating our love",
        },
        { name: "theme-color", content: "#C8A96E" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
