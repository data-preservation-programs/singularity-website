<template>
  <main class="page page-signup">
    <div id="section-signup">
      <div class="grid-center-noGutter">
        <div class="col-8_sm-12">

          <ButtonCta
            class="back-home-button"
            :theme="content.back_home_cta.theme"
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
const { data } = await useAsyncData('core', async () => {
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
  const signup = data._rawValue.find((item) => item._file === 'core/signup.json')
  return signup.page_content[0]
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
    height: calc(100% + toRem(234) + toRem(100));
    background-image: url('/images/warped-torus-made-of-segments.png');
    background-size: toRem(2040);
    background-origin: border-box;
    background-position: center 64%;
    background-repeat: no-repeat;
    @include gridMaxMQ {
      height: calc(100% + toRem(355));
    }

    @include medium {
      height: calc(100% + toRem(425));
    }
    @include customMaxMQ(toRem(983)) {
      background-position: center bottom;

    }
    @include small {
      height: calc(100% + toRem(234));
    }
    @include tiny {
      background-size: 820px;
      height: calc(100% + toRem(234));
      top: unset;
      bottom: -15%;
    }
  }
}

.back-home-button {
  padding-right: 0;
  padding-left: 1.5625rem;
  margin-bottom: toRem(17);
  :deep(.button-content) {
    display: flex;
    align-items: center;
    &::before {
      content: '↖';
      position: absolute;
      top: 0;
      left: -1rem;
      @include transitionDefault;
    }
    &::after {
      display: none;
    }
  }
  &:hover,
  &:focus-visible {
    padding-right: 0;
    :deep(.button-content) {
      &:before {
        transform: translateX(-0.5rem);
      }
    }
  }
}

// //////////////////////////////////////////////////////////////////// Sections
#section-signup {
  width: 100%;

}

</style>
