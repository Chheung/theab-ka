import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxtjs/google-fonts", "@nuxt/icon", "nuxt3-leaflet"],

  components: [{ path: "~/components" }],

  vite: {
    plugins: [tailwindcss()],
  },

  googleFonts: {
    families: {
      "Playfair Display": {
        wght: [400, 700],
      },
      "Great Vibes": true,
      "Cormorant Garamond": {
        wght: [300, 400],
        ital: [400],
      },
      Montserrat: {
        wght: [300, 400, 500],
      },
      Battambang: {
        wght: [400, 700],
      },
      "Kantumruy Pro": {
        wght: [400],
      },
    },
    display: "swap",
    preconnect: true,
    download: true,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3344",
    },
  },

  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#C8A96E" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
