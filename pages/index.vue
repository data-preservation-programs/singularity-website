<template>
  <main :class="[`page page-${tag}`]">

    <h3>Get a Nuxt 3 site up and running fast 🚀</h3>

    <div class="border-test">
      <div class="content">
        test content
      </div>
    </div>

    <BlockBuilder :sections="sections" />

  </main>
</template>

<script setup>
import BlockBuilder from '@/components/blocks/block-builder'

// ======================================================================== Data
const { data } = await useAsyncData('core', async () => {
  return queryContent('core').find()
})

// ==================================================================== Computed
const sections = computed(() => {
  const index = data._rawValue.find((item) => item._file === 'core/index.json')
  return index.page_content
})
// console.log(sections)
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

.border-test {
  position: relative;
  margin-top: 3rem;
  padding: 3rem;
  transform: translateY(-100px);
  @include cardPanel(315deg);
}

.content {
  position: relative;
  z-index: 2;
}
</style>
