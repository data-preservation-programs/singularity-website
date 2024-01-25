// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#imports'
// import Config from '@/nuxt.config'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtPlugin(() => {

  // Do not fire Plausible if not in production mode
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const router = useRouter()
  const config = useRuntimeConfig()
  let isInitialPageLoad = true

  router.afterEach((to) => {

    // Ignore initial page because it's fired in the head
    if (isInitialPageLoad) {
      isInitialPageLoad = false
      return
    }

    // Check if we're on client-side
    if (process.client) {
      // Track virtual navigation changes
      window.plausible = window.plausible || function() {
        (window.plausible.q = window.plausible.q || []).push(arguments)
      }
      window.plausible('pageview', {
        url: `${config.public.siteUrl}${to.fullPath}`
      })
    }
  })
})
