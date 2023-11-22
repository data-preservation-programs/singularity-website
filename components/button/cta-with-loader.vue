<template>
  <ButtonCta v-bind="props" class="with-loader">

    <template #button-content>
      <slot name="button-content" />
    </template>

    <template #loader="{ loading }">
      <IconTripleLineLoader
        :class="['triple-line-loader', { show: loading }]" />
    </template>

  </ButtonCta>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  tag: { // button, 'a' or nuxt-link
    type: String,
    required: false,
    default: 'button'
  },
  to: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  target: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  loader: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  selected: {
    type: Boolean,
    required: false,
    default: false
  },
  theme: { // primary or secondary
    type: String,
    required: false,
    default: 'primary'
  },
  variant: { // 'large', 'small' or none
    type: String,
    required: false,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.with-loader.theme__primary {
  &:hover,
  &:focus-visible {
    :deep(.inner-content.loading) {
      .fill-path {
        opacity: 0;
        fill: none;
      }
    }
  }
}

:deep(.inner-content)  {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
// ////////////////////////////////////////////////////////////////////// Loader
.triple-line-loader {
  position: absolute;
  opacity: 0;
  @include transitionDefault;
  &.show {
    opacity: 1;
  }
  :deep(.rect) {
    fill: $chardonnay;
  }
}
</style>
