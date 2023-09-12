// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { ref } from '#imports'
import GeneralSiteData from '@/content/core/general.json'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const clipboard = ref(false)
const siteContent = ref({})
const theme = ref('light')
const navigationOpen = ref(false)

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
// //////////////////////////////////////////////////////////////// clearStore
const clearStore = () => {
  siteContent.value = {}
}

// /////////////////////////////////////////////////////////////// getBaseData
const getBaseData = async (payload) => {
  const key = typeof payload === 'string' ? payload : payload.key
  let data = false
  switch (key) {
    case 'general': data = GeneralSiteData; break
    default : data = payload.data; break
  }
  if (data) {
    siteContent.value[key] = data
  }
}

// //////////////////////////////////////////////////////////////////// setTheme
const setTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  document.documentElement.className = newTheme
}

// /////////////////////////////////////////////////////////// setNavigationOpen
const setNavigationOpen = () => {
  navigationOpen.value = !navigationOpen.value
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useGeneralStore = defineStore('general', () => ({
  // ----- state
  clipboard,
  siteContent,
  theme,
  navigationOpen,
  // ----- actions
  clearStore,
  getBaseData,
  setTheme,
  setNavigationOpen
}))
