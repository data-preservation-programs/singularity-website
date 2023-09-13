<template>
  <main :class="[`page page-${tag}`]">
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
const tag = 'signup'
const { data } = await useAsyncData( async () => {
  return queryContent('core').find()
})

// ==================================================================== Computed
const content = computed(() => {
  const signup = data._rawValue.find((item) => item._file === 'core/signup.json')
  return signup.page_content[0]
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
  :deep(.button-content) {
    &::before {
      content: '↖';
      position: absolute;
      left: 0.5rem;
      @include transitionDefault;
    }
    &::after {
      display: none;
    }
    &:hover {
      &:before {
        transform: translateX(-0.5rem);
      }
    }
  }
}
</style>
