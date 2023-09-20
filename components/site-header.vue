<template>
  <header
    id="site-header"
    :class="['site-header', { 'nav-panel-open': navigationOpen }]">

    <!-- ============================================================ Mobile -->
    <div :class="['mobile-background-panel', {'open': navigationOpen }]">

      <div class="grid">
        <div class="col-12">
          <div class="mobile-nav">
            <Navbar
              :links="navigation"
              class="mobile"
              @nav-link-click="handleNavClick">
              <div class="nav-item">
                <ButtonCta
                  tag="nuxt-link"
                  to="/signup"
                  theme="primary"
                  variant="large"
                  class="modal-sign-up-cta"
                  @clicked="handleNavClick">
                  <template #button-content>
                    Sign up
                  </template>
                </ButtonCta>
              </div>
            </Navbar>
          </div>
        </div>
      </div>

    </div>

    <!-- =========================================================== Desktop -->
    <div class="grid-noGutter-noBottom main-content">

      <div class="col-3_md-2_sm-4_mi-6">
        <NuxtLink to="/" class="logo">
          <SiteLogo />
        </NuxtLink>
      </div>

      <div class="col-4_md-5_sm-hidden" data-push-left="off-2_md-1">
        <Navbar :links="navigation" class="desktop" />
      </div>

      <div class="col-3_md-4_sm-5_mi-6" data-push-left="off-0_sm-3_mi-0">
        <div class="nav-ctas">

          <div class="nav-toggle-wrapper before">
            <ZeroButton
              tag="button"
              @click="toggleNav">
              <div :class="['hamburger', { open: navigationOpen }]">
                <div class="bottom">
                </div>
              </div>
            </ZeroButton>
          </div>

          <ButtonCta
            v-for="cta in ctas"
            :key="cta.component || cta.text"
            :tag="cta.tag"
            :target="cta.target"
            :theme="cta.theme"
            class="nav-cta"
            :to="cta.to">
            <template #button-content>
              <component
                :is="getCtaComponent(cta.icon)"
                v-if="cta.icon"
                class="icon" />
              <span v-if="cta.text">
                {{ cta.text }}
              </span>
            </template>
          </ButtonCta>

          <div class="nav-toggle-wrapper after">
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
const breakpointSmall = ref(false)
const headerResizeEventListener = ref(null)
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

watch(breakpointSmall, () => {
  if (navigationOpen.value) { toggleNav() }
})

// ======================================================================= Hooks
onMounted(() => {
  headerResizeEventListener.value = useThrottle(() => {
    if (window.matchMedia('(max-width: 53.125rem)').matches) {
      if (!breakpointSmall.value) {
        breakpointSmall.value = true
      }
    } else {
      if (breakpointSmall.value) {
        breakpointSmall.value = false
      }
    }
  })
  headerResizeEventListener.value()
  window.addEventListener('resize', headerResizeEventListener.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', headerResizeEventListener.value)
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

const handleNavClick = () => {
  if (navigationOpen.value) { toggleNav() }
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.site-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 2rem;
  @include small {
    position: absolute;
    width: 100%;
    height: $siteHeaderHeight;
    z-index: 2;
  }
  @include mini {
    padding: 1.25rem 0;
  }
  &.nav-panel-open {
    position: fixed;
    width: 100%;
    z-index: 1000;
    .main-content,
    .mobile-background-panel {
      z-index: 1001;
    }
    .nav-ctas {
      @include mini {
        :deep(.theme__icon) {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }
}

.main-content {
  position: relative;
  @include medium {
    margin: 0 -1rem;
  }
  @include small {
    margin: 0;
  }
}

.logo {
  display: flex;
  width: fit-content;
  transition: 250ms ease;
  padding-top: .5rem;
  &:hover,
  &:focus-visible {
    transform: scale(1.08);
  }
  &:focus-visible {
    @include focusOutline;
  }
  @include medium {
    transform: translateX(-1rem);
    &:hover,
    &:focus-visible {
      transform: translateX(-1rem) scale(1.08);
    }
  }
  @include small {
    transform: none;
    &:hover,
    &:focus-visible {
      transform: scale(1.08);
    }
  }
  :deep(svg) {
    path {
      transition: 250ms ease;
    }
    @include mini {
      max-width: toRem(205);
    }
    @include tiny {
      max-width: toRem(150);
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
    @include gridMaxMQ {
      margin-right: 1rem;
      margin-left: -2rem;
    }
    @include large {
      margin-right: 1.5rem;
      margin-left: -4.5rem;
    }
    @include medium {
      margin: 0;
    }
    @include small {
      display: none;
    }
  }
  // &.mobile {
  //   .navigation {}
  // }
}

.nav-ctas {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  padding: 0.5rem toRem(28) 0;
  .theme__primary {
    filter: drop-shadow(0px 2px 14px rgba(255, 197, 130, 0.32));
    :deep(.fill-path) {
      opacity: 1;
    }
  }
  @include gridMaxMQ {
    padding: 0;
    justify-content: flex-end;
    :deep(.button) {
      margin-left: 0.75rem;
    }
  }
  @include medium {
    transform: translateX(1rem);
  }
  @include small {
    transform: unset;
  }
  @include mini {
    :deep(.theme__primary) {
      display: none;
    }
    :deep(.button) {
      margin-left: 0.5rem;
    }
  }
}

.desktop,
.nav-ctas {
  flex-grow: 1;
}

.icon {
  width: toRem(20);
  height: toRem(20);
  @include mini {
    width: toRem(14);
    height: toRem(14);
  }
}

// /////////////////////////////////////////////////////////////////// Hamburger
.nav-toggle-wrapper {
  display: none;
  position: relative;
  @include small {
    &.before {
      display: flex;
      justify-content: flex-end;
    }
  }
  @include mini {
    margin-left: toRem(10);
    &.before {
      display: none;
    }
    &.after {
      display: flex;
      justify-content: flex-end;
    }
  }
  :deep(.button) {
    padding: toRem(5);
  }
}

.hamburger {
  position: relative;
  width: toRem(22);
  height: toRem(12);
  &:before,
  &:after,
  .bottom {
    position: absolute;
    width: 100%;
    left: 0;
    transition: 250ms ease;
    border-top-right-radius: toRem(1.5);
    border-bottom-right-radius: toRem(1.5);
    border-top-left-radius: toRem(0);
    border-bottom-left-radius: toRem(0);
  }
  &:before,
  &:after {
    content: '';
  }
  &:before {
    top: 0;
    width: toRem(16.5);
    left: toRem(5.5);
    border-bottom: solid toRem(3) $sageGreen;
  }
  &:after {
    top: 50%;
    border-bottom: solid toRem(3) rgba($sageGreen, 0.5);
  }
  .bottom {
    top: 100%;
    border-bottom: solid toRem(3) rgba($sageGreen, 0.5);
  }
  &.open {
    &:before,
    &:after,
    .bottom {
      border-top-left-radius: toRem(1.5);
      border-bottom-left-radius: toRem(1.5);
    }
    &:before {
      width: toRem(20);
      border-bottom: solid toRem(3) $sageGreen;
      transform: translate(-4px, 4.5px) rotate(45deg);
    }
    &:after {
      width: toRem(20);
      border-bottom: solid toRem(3) $sageGreen;
      transform: translate(1px, -1.5px) rotate(-45deg)
    }
    .bottom {
      width: 0;
      border-bottom: solid toRem(3) $sageGreen;
      transform: translateX(11px);
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Mobile
.mobile-nav {
  padding-top: toRem(96);
  *:focus-visible {
    background-color: salmon;
  }
}

.mobile-background-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $codGray;
  transition: opacity 250ms ease, transform 250ms ease, visibility 250ms ease, z-index 250ms ease;
  visibility: hidden;
  transform: scale(1.1);
  opacity: 0;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/ring-of-circular-cross-sections.png');
    background-size: toRem(735);
    background-position: center toRem(300);
    background-repeat: no-repeat;
  }
  &.open {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    z-index: 1000;
  }
  .nav-item {
    display: flex;
    justify-content: center;
  }
}

.modal-sign-up-cta {
  height: toRem(55);
  :deep(.inner-content) {
    height: 100%;
    padding: toRem(9) toRem(46) toRem(9) toRem(23);
  }
  :deep(.button-content) {
    @include hamburgerCTA;
  }
}
</style>
