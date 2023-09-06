<template>
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['plus-minus-icon', { active }]">
    <circle
      cx="13"
      cy="13"
      r="12.5"
      stroke="#FFC582" />
    <path
      d="M 14 11.9927 V 13.9891 H 14.0075 L 14.0075 18 H 12.0112 L 12.0112 13.9891 H 12 L 12 11.9927 H 12.0112 L 12.0112 8 H 14.0075 V 11.9927 H 14 Z"
      fill="#FFC582"
      class="plus" />
    <path
      d="M14.0073 14H12.0109V14.0075H8V12.0112H12.0109V12H14.0073V12.0112H18V14.0075H14.0073V14Z"
      fill="#FFC582"
      class="minus" />
  </svg>
</template>

<script setup>
// ======================================================================= Props
// eslint-disable-next-line
const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.plus {
  opacity: 0;
  @include transitionDefault;
}

.plus-minus-icon {
  @include transitionDefault;
  transform: rotate(0deg);
  &.active {
    transform: rotate(90deg);
    .plus {
      opacity: 1;
    }
  }
}
</style>

