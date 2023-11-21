<template>
  <ZeroFieldTextarea v-bind="{...props, ...$attrs}" />
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
$height: toRem(120);

// ///////////////////////////////////////////////////////////////////// General
.field-textarea {
  max-width: toRem(500);
  height: $height;
  border: 2px solid $sageGreen;
  background-color: $sageGreen;
  border-radius: toRem(5);
  transition: 150ms ease-in-out;
  &:not(.no-validate):not(.disabled) {
    &:hover {
      border-color: rgba($chardonnay, 0.5);
    }
    &.in-progress {
      border-color: rgba($chardonnay, 0.9);
    }
    &.error {
      border-color: $burntSienna;
    }
  }
  &.disabled {
    cursor: no-drop;
    :deep(.textarea) {
      // color: rgba($whisper, 0.7);
      overflow-y: scroll;
    }
  }
}

:deep(.textarea) {
  padding: toRem(12);
  @include placeholder {
    // color: $whisper;
    font-weight: 400;
    opacity: 0.7;
  }
}
</style>
