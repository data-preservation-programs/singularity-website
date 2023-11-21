<template>
  <div class="tabbed-slider">

    <slot :change-tab="changeTab" name="before-tabs" />

    <slot
      name="tabs"
      :tabs="slides"
      :is-selected="isSelected"
      :change-tab="changeTab" />

    <div class="window">
      <slot
        v-for="slide in slides"
        :key="slide.slug"
        :name="slide.slug"
        :is-selected="isSelected" />
    </div>

    <slot :change-tab="changeTab" name="after-window" />

  </div>
</template>
<script setup>
// ======================================================================= Setup
const props = defineProps({
  slides: {
    type: Array, // Array of tab slug Strings
    required: true
  }
})

const emit = defineEmits(['slideChanged'])

// ======================================================================== Data
const selected = ref(props.slides[0]?.slug)
emit('slideChanged', selected.value)

// ===================================================================== Methods
/**
 * @method isSelected
 */

const isSelected = slug => {
  return selected.value === slug
}

/**
 * @method changeTab
 */

const changeTab = slug => {
  selected.value = slug
  emit('slideChanged', selected.value)
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.window {
  overflow: hidden;
  transition: height 0ms ease-in;
}
</style>
