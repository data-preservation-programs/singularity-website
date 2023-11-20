<template>
  <ZeroFieldBoolean v-bind="{...props, ...$attrs}" />
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.field-boolean {
  display: flex;
  position: relative;
  width: toRem(29);
  height: toRem(15);
  border-radius: toRem(12);
  // background-color: $outerSpace;
  cursor: pointer;
  transition: 150ms ease-out;
  &:after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 15px;
    height: 15px;
    // background-color: $whisper;
    border: 1px solid rgba(#7D7C7D, 0.4);
    border-radius: 50%;
    pointer-events: none;
    transition: 150ms ease-out;
  }
  &:not(.disabled):not(.checked) {
    &:hover {
      // background-color: rgba($whisper, 0.2);
    }
    &.error {
      background-color: $burntSienna;
      &:after {
        border-color: $burntSienna;
      }
    }
  }
  &.disabled {
    cursor: no-drop;
  }
  &.checked {
    background-color: $chardonnay;
    &:after {
      transition: 150ms ease-in;
      border-color: rgba($chardonnay, 0.3);
      transform: translateX(100%);
    }
  }
}

:deep(.boolean-container) {
  width: 100%;
  height: 100%;
}

:deep(input.boolean) {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
