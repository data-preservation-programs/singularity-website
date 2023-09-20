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
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include small{
    margin-top: 4.875rem;
  }
}

.back-home-button {
  padding-right: 0;
  padding-left: 1.5625rem;
  margin-bottom: toRem(17);
  // :deep(.button-content) {
  //   display: flex;
  //   align-items: center;
  //   .arrow {
  //     position: absolute;
  //     right: unset;
  //     left: toRem(-18);
  //     transform: scaleX(-1);
  //   }
  // }
  &:hover,
  &:focus-visible {
    padding-right: 0;
    // :deep(.button-content) {
    //   .arrow {
    //     left: toRem(-26);
    //   }
    // }
  }
}
</style>
