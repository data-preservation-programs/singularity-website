<template>
  <ZeroFieldInput v-bind="{...props, ...$attrs}">
    <template #step-control-up>
      <IconChevron class="up" />
    </template>
    <template #step-control-down>
      <IconChevron class="down" />
    </template>
  </ZeroFieldInput>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  forceDisabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style lang="scss" scoped>
$height: toRem(35);

// ///////////////////////////////////////////////////////////////////// General
.field-input {
  max-width: toRem(500);
  height: $height;
  border: 2px solid $sageGreen;
  background-color: $sageGreen;
  border-radius: toRem(5);
  transition: 150ms ease-in-out;
  &:not(.disabled) {
    &:hover {
      border-color: rgba($chardonnay, 0.5);
    }
    &.in-progress {
      border-color: rgba($chardonnay, 0.9);
    }
    &.error {
      border-color: $burntSienna;
    }
    :deep(.step-controls) {
      .step-control {
        &:hover {
          .icon {
            path {
              fill: $chardonnay;
            }
          }
        }
      }
    }
  }
  &.disabled {
    cursor: no-drop;
    :deep(.input) {
      // color: rgba($whisper, 0.7);
    }
    :deep(.step-control) {
      cursor: no-drop;
      .icon {
        path {
          fill: rgba($chardonnay, 0.7);
        }
      }
    }
  }
  &.with-controls {
    :deep(.input) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
    }
  }
  &.number {
    max-width: toRem(130);
  }
}

:deep(.input-container) {
  display: flex;
  flex-direction: row;
}

:deep(.input) {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 toRem(12);
  padding-top: toRem(3);
  @include placeholder {
    // color: $whisper;
    font-weight: 400;
    opacity: 0.7;
  }
}

:deep(.step-controls) {
  display: flex;
  flex-direction: column;
  width: $height;
  color: white;
  border-radius: 0 toRem(5) toRem(5) 0;
  overflow: hidden;
  .step-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
  }
  .icon {
    display: block;
    width: toRem(8);
    &.down {
      transform: rotate(0deg);
    }
  }
}
</style>
