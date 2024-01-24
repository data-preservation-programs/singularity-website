// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Path from 'path'

// /////////////////////////////////////////////////////////// Variables & Setup
// -----------------------------------------------------------------------------
const env = process.env.SERVER_ENV

const baseUrls = {
  development: 'https://localhost',
  stable: 'https://singularity-website.on.fleek.co/',
  production: 'https://singularity.storage/'
}

const frontendPort = 10070

const seo = {
  siteName: 'Singularity',
  description: 'Singularity facilitates onboarding of large quantaties of data (PB-scale) to the Filecoin network in an efficient, secure, and flexible way.'
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // ///////////////////////////////////////////////////// Runtime Configuration
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    public: {
      siteUrl: env === 'development' ? `${baseUrls[env]}:${frontendPort}` : baseUrls[env],
      serverFlag: env,
      seo: {
        siteName: seo.siteName
      },
      airtableToken: process.env.AIRTABLE_SINGULARITY_ACCESS_TOKEN
    }
  },
  // ////////////////////////////////////////////////////////// Server & Bundler
  // ---------------------------------------------------------------------------
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // make SCSS variables, functions and mixins globally accessible
          additionalData: '@use "sass:math"; @import "@/assets/scss/settings.scss";'
        }
      }
    },
    assetsInclude: ['**/*.md']
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  // //////////////////////////////////////////////// Custom Sass Theme Override
  // ---------------------------------------------------------------------------
  overrideTheming: {
    themeName: ''
  },
  // //////////////////////////////////////////////////////////////// Dev Server
  // ---------------------------------------------------------------------------
  devServer: {
    port: frontendPort,
    host: process.env.NODE_ENV !== 'development' ? '0.0.0.0' : 'localhost',
    ...(process.env.NODE_ENV === 'development' && {
      https: {
        key: 'localhost_key.pem',
        cert: 'localhost_cert.pem'
      }
    })
  },
  // /////////////////////////////////////////////////////////////////////// App
  // ---------------------------------------------------------------------------
  app: {
    // -------------------------------------------------------------------- head
    head: {
      title: seo.siteName,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: seo.description },
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
        { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' }
      ]
    }
  },
  // ////////////////////////////////////////////////////////////// Auto-imports
  // ---------------------------------------------------------------------------
  imports: {
    presets: [{
      from: 'pinia',
      imports: []
    }]
  },
  // ///////////////////////////////////////////////////////////// Global Styles
  // ---------------------------------------------------------------------------
  css: [
    '@/assets/scss/main.scss'
  ],
  // /////////////////////////////////////////////////////////////////// Modules
  // ---------------------------------------------------------------------------
  modules: [
    '@pinia/nuxt',
    '@/modules/eslint-nuxt3-globals',
    '@nuxtjs/eslint-module',
    '@nuxtjs/algolia',
    // '@/modules/zero', // required
    '@/modules/nuxt-module-plausible',
    '@nuxt/content',
    '@nuxtjs/plausible', // https://github.com/nuxt-modules/plausible
    'nuxt-simple-robots', // https://github.com/harlan-zw/nuxt-simple-robots
    'nuxt-simple-sitemap' // https://github.com/harlan-zw/nuxt-simple-sitemap
  ],
  // ////////////////////////////////////////////////// [Module] @nuxtjs/algolia
  // ---------------------------------------------------------------------------
  algolia: {
    disable: true,
    apiKey: process.env.ALGOLIA_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    indexName: `${process.env.ALGOLIA_INDEX_ID}__${env}`,
    sources: [
      { path: Path.resolve(__dirname, 'content'), contentDirectoryName: 'content' }
    ]
  },
  // ////////////////////////////////////////////////// [Module] @nuxt/plausible
  // ---------------------------------------------------------------------------
  plausible: {
    include: true,
    domain: 'singularity.storage',
    autoOutboundTracking: true
  },
  // //////////////////////////////////////////////////// [Module] @nuxt/content
  // ---------------------------------------------------------------------------
  content: {
    watch: false
  },
  // ////////////////////////////////////////////////////////// [Module] sitemap
  // ---------------------------------------------------------------------------
  sitemap: {}
})
