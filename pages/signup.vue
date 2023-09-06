<template>
  <main :class="[`page page-${tag}`]">
    <div class="grid-center">
      <div class="col-8">

        <SignupCard :signup-card="content.signup_card" />

      </div>
    </div>
  </main>
</template>

<script setup>
import SignupCard from '@/components/signup-card'

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

// eslint-disable-next-line no-console
console.log('content ', content)

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  width: 3rem;
  margin-right: 1rem;
}
</style>
