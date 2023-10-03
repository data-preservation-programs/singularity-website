<template>
  <main class="page page-signup">
    <div id="section-signup">
      <div class="grid-center-noGutter">
        <div class="col-8_sm-12">

          <ButtonCta
            class="back-home-button"
            :theme="content.back_home_cta.theme"
            :arrow-direction="content.back_home_cta.arrow_direction"
            :tag="content.back_home_cta.tag"
            :to="content.back_home_cta.to">
            <template #button-content>
              <span class="button-label"> {{ content.back_home_cta.text }} </span>
            </template>
          </ButtonCta>


          <SignupCard :signup-card="content.signup_card" />
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>

// ======================================================================== Data
const generalStore = useGeneralStore()
const { $GetSeo, $CompileSeo } = useNuxtApp()
const { data } = await useAsyncData('signup', async () => {
  return queryContent('core').find()
})

// ==================================================================== Watchers
watch(data, async (val) => {
  await generalStore.getBaseData('general')
  await generalStore.getBaseData({ key: 'signup', data: val.find((item) => item._file === 'core/signup.json') })
  useHead($CompileSeo($GetSeo('general', 'signup')))
}, { immediate: true })

// ==================================================================== Computed
const content = computed(() => {
  return generalStore.siteContent?.signup?.page_content
})

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page-signup {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include small{
    position: relative;
    margin-top: 4.875rem;
  }
  &:before {
    content: '';
    position: absolute;
    display: block;
    z-index: -1;
    overflow: visible;
    top: 0;
    left: -8vw;
    width: 120vw;
    height: calc(100% + toRem(365));
    background-image: url('/images/warped-torus-made-of-segments.jpg');
    background-size: vw(2200px);
    background-origin: border-box;
    background-position: center 64%;
    background-repeat: no-repeat;
    @include gridMaxMQ {
      height: calc(100% + toRem(430));
      background-position: center 54%;
    }
    @include large {
      background-size: clamp(toRem(1700), vw(2200px), toRem(1833));
      background-position: center 44%;
    }

    @include medium {
      height: calc(100% + toRem(480));
    }
    @include customMaxMQ(toRem(983)) {
      background-position: center bottom;
      top: 2rem;
    }
    @include small {
      height: 100%;
    }
    @include mini {
      background-size: vw(1030px, 375px);
      height: calc(100% + toRem(200));
      top: unset;
      bottom: -2rem;
    }
  }
}

.back-home-button {
  padding-right: 0;
  padding-left: 1.5625rem;
  margin-bottom: toRem(17);
  &:hover,
  &:focus-visible {
    padding-right: 0;
  }
}

// //////////////////////////////////////////////////////////////////// Sections
#section-signup {
  width: 100%;

}

</style>
