<template>
  <main class="page page-signup">
    <div id="section-signup">
      <div class="grid-center-noGutter">
        <div class="col-8_sm-12">

          <ButtonCta
            class="back-home-button"
            :theme="pageContent.back_home_cta.theme"
            :arrow-direction="pageContent.back_home_cta.arrow_direction"
            :tag="pageContent.back_home_cta.tag"
            :to="pageContent.back_home_cta.to">
            <template #button-content>
              <span class="button-label"> {{ pageContent.back_home_cta.text }} </span>
            </template>
          </ButtonCta>

          <SignupCard :signup-card="pageContent.signup_card" />
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
// ===================================================================== Imports
import Content from '@/content/core/signup.json'

// ======================================================================= Setup
definePageMeta({
  layout: 'warped-torus-background'
})

// ======================================================================== Data
const pageContent = Content.page_content
// const generalStore = useGeneralStore()
// const { data } = await useAsyncData('signup', async () => {
//   return queryContent('core').find()
// })

// ==================================================================== Watchers
// watch(data, async (val) => {
//   await generalStore.getBaseData('general')
//   await generalStore.getBaseData({ key: 'signup', data: val.find((item) => item._file === 'core/signup.json') })
// }, { immediate: true })

// ==================================================================== Computed
// const content = computed(() => {
//   return generalStore.siteContent?.signup?.page_content
// })
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
