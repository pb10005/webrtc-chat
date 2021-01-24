import pkg from "./package.json";

export default {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  plugins: ["@/plugins/theme"],
  loading: { color: "#3b8070" },
  css: [
    "bulma/css/bulma.css",
    "~/css/main.css",
    "@zeit-ui/themes/index.css",
    "@zeit-ui/vue/dist/zeit-ui.css"
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ["script", "style", "font"].includes(type);
      }
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/vuetify",
    // TODO: Remove it if you want to eject from codeSandbox
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // TODO: Remove it if you want to eject from codeSandbox
    "./codesandbox"
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  router: {
    extendRoutes(routes) {
      routes.push({
        path: "*",
        redirect: { name: "home" }
      });
    },
    /*
     ** Build configuration
     */
    build: {
      /*
       ** You can extend webpack config here
       */
      extend(config, ctx) {}
    }
  }
};
