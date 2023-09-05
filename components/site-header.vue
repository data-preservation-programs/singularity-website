<template>
  <header :class="['site-header', { 'nav-panel-open': navigationOpen }]">

    <!-- ============================================================ Mobile -->
    <div :class="['mobile-background-panel', {'open': navigationOpen }]">

      <div class="grid">
        <div class="col-12">
          <div class="mobile-nav">
            <Navbar :links="navigation" class="mobile" />
          </div>
        </div>
      </div>

    </div>

    <!-- =========================================================== Desktop -->
    <div class="grid-noGutter-noBottom main-content">

      <div class="col-3">
        <NuxtLink to="/" class="logo">
          <SiteLogo />
        </NuxtLink>
      </div>

      <div class="col-4" data-push-left="off-2">
        <Navbar :links="navigation" class="desktop" />
      </div>

      <div class="col-3">

        <div class="nav-ctas">
          <ButtonCta
            v-for="cta in ctas"
            :key="cta.component || cta.text"
            :tag="cta.tag"
            :target="cta.target"
            :theme="cta.theme">
            <component
              :is="getCtaComponent(cta.icon)"
              v-if="cta.icon"
              class="icon" />
            <span v-if="cta.text">
              {{ cta.text }}
            </span>
          </ButtonCta>
        </div>

        <div class="nav-toggle-wrapper">
          <ZeroButton
            tag="button"
            @click="toggleNav">
            <div :class="['hamburger', { open: navigationOpen }]">
              <div class="bottom">
              </div>
            </div>
          </ZeroButton>
        </div>

      </div>

    </div>
  </header>
</template>

<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'
import GeneralSiteData from '@/content/core/general.json'
const GithubIcon = resolveComponent('icon/github-icon')
const SlackIcon = resolveComponent('icon/slack-icon')

// ======================================================================== Data
const generalStore = useGeneralStore()
const { navigationOpen } = storeToRefs(generalStore)

// ==================================================================== Computed
const navigation = computed(() => {
  return GeneralSiteData.header.navigation
})

const ctas = computed(() => {
  return GeneralSiteData.header.ctas
})

// ==================================================================== Watchers
watch(navigationOpen, (val) => {
  if (val) {
    document.body.classList.add('no-scroll')
    window.scrollTo(0, 0)
  } else {
    document.body.classList.remove('no-scroll')
  }
})

// ======================================================================= Hooks
onMounted(() => {
  const instance = getCurrentInstance()
  console.log(instance.appContext.components)
})

// ===================================================================== Methods
/**
 * @method toggleNav
 */
const toggleNav = () => {
  generalStore.setNavigationOpen()
}
/**
 * @method getCtaComponent
 */
const getCtaComponent = (icon) => {
  switch (icon) {
    case 'github' : return GithubIcon;
    case 'slack' : return SlackIcon;
    default : return 'span'
  }
  
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.site-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: $siteHeaderHeight;
  padding: 2rem 0;
  &.nav-panel-open {
    z-index: 1000;
    .main-content {
      position: fixed;
      z-index: 1001;
    }
    .nav-toggle-wrapper {
      top: 0.5rem;
    }
  }
}

.main-content {
  position: relative;
}

.logo {
  display: flex;
  width: fit-content;
  transition: 250ms ease;
  &:hover,
  &:focus-visible {
    transform: scale(1.08);
  }
  :deep(svg) {
    path {
      transition: 250ms ease;
    }
    @include mini {
      width: toRem(75);
      height: toRem(75);
    }
  }
}

.nav-items {
  display: flex;
  justify-content: space-between;
}

:deep(.navbar) {
  &.desktop {
    margin-right: 0.5rem;
    @include small {
      display: none;
    }
  }
}

.nav-ctas {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  padding: 0 toRem(28);
}

.desktop,
.nav-ctas {
  flex-grow: 1;
}

.icon {
  width: toRem(20);
  height: toRem(20);
}

// /////////////////////////////////////////////////////////////////// Hamburger
.nav-toggle-wrapper {
  display: none;
  position: relative;
  justify-content: flex-end;
  @include small {
    display: flex;
  }
  :deep(.button) {
    padding: toRem(5);
  }
}

.hamburger {
  position: relative;
  width: toRem(26);
  height: toRem(18);
  &:before,
  &:after,
  .bottom {
    position: absolute;
    width: 100%;
    left: 0;
    transition: 250ms ease;
  }
  &:before,
  &:after {
    content: '';
    border-bottom: solid toRem(2) $alto;
  }
  &:before {
    top: 0;
  }
  &:after {
    top: 50%;
  }
  .bottom {
    top: 100%;
    border-bottom: solid toRem(5) $alto;
  }
  &.open {
    &:before {
      width: toRem(20);
      border-bottom: solid toRem(2) $alto;
      transform: translate(2px, 4.5px) rotate(45deg);
      @include mini {
        transform: translate(2px, 4px) rotate(45deg);
      }
    }
    &:after {
      width: toRem(20);
      border-bottom: solid toRem(2) $alto;
      transform: translate(2px, -4.5px) rotate(-45deg);
      @include mini {
        transform: translate(2px, -4px) rotate(-45deg);
      }
    }
    .bottom {
      width: 0;
      border-bottom: solid toRem(5) $alto;
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Mobile
.mobile-nav {
  padding-top: toRem(200);
  @include mini {
    padding-top: toRem(162);
  }
}

.mobile-background-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $codGray;
  transition: opacity 250ms ease, transform 250ms ease, visibility 250ms ease;
  visibility: hidden;
  transform: scale(1.1);
  opacity: 0;
  &.open {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  :deep(.navigation) {
    .nav-item {

    }
    .nav-link {

    }
  }
}
</style>
