<template>
  <ZeroFieldSelect
    v-bind="{...props, ...$attrs}"
    :options="options">

    <template #disabled-window="{ placeholder, label }">
      <div class="selection-window">
        <div class="text is-placeholder">
          {{ placeholder || label }}
        </div>
        <div class="icon-container disabled">
          <IconChevron />
        </div>
      </div>
    </template>

    <template #option-native-default-text="{ placeholder, label }">
      {{ placeholder || label }}
    </template>

    <template #option-native-text="{ option }">
      {{ getOptionDescription(option) ? `${option.label}, ${getOptionDescription(option)}` : option.label }}
    </template>

    <template #selection-window="{ selected, placeholder, label, empty }">
      <div class="selection-window">
        <div :class="['text', { 'is-placeholder': empty }]">
          {{ !empty ? getSelectedOptionLabels(selected, placeholder) : (placeholder || label) }}
        </div>
        <div class="icon-container">
          <IconChevron />
        </div>
      </div>
    </template>

    <template #option-custom="{ option, highlighted, selected }">
      <div :class="['option', { highlighted, selected }]">
        <div class="label">
          <ZeroKitchenSinkFieldIconCheckmark v-if="multi && selected" />
          {{ option.label }}
        </div>
        <div v-if="getOptionDescription(option)" class="description">
          {{ getOptionDescription(option) }}
        </div>
      </div>
    </template>

  </ZeroFieldSelect>
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

// ======================================================================== Data
const scaffold = props.field.scaffold
const options = scaffold.options
const multi = !scaffold.isSingleOption
const isSingleSelection = scaffold.isSingleSelection

// ===================================================================== Methods
const getOptionDescription = (option) => {
  const description = option.description
  return option && description !== '' ? description : false
}

const getSelectedOptionLabels = (selection, placeholder) => {
  if (isSingleSelection) {
    if (selection === -1) { return placeholder }
    const option = options[selection]
    if (option) {
      return option.label
    }
  } else {
    if (selection.length === 0) { return placeholder }
    const selections = selection.map((index) => {
      return options[index].label
    })
    return selections.join(', ')
  }
}
</script>

<style lang="scss" scoped>
$height: toRem(35);

// ///////////////////////////////////////////////////////////////////// General
div.field-select {
  max-width: toRem(380);
  height: $height;
  padding: 0 toRem(12);
  border: 2px solid $sageGreen;
  background-color: $sageGreen;
  border-radius: toRem(5);
  transition: 150ms ease-in-out;
  &:not(.disabled) {
    &:hover {
      border-color: rgba($chardonnay, 0.5);
      .icon-container {
        transition: 150ms ease-in;
        transform: scale(1.2);
      }
    }
    &.in-progress {
      transition: border-color 150ms ease-in;
      border-color: rgba($chardonnay, 0.9);
    }
    &.error {
      transition: border-color 150ms ease-in;
      border-color: $burntSienna;
    }
  }
  &.disabled {
    :deep(div.select) {
      cursor: no-drop;
    }
  }
  &.dropdown-open {
    .icon-container {
      transition: 150ms ease-in;
      transform: rotate(-180deg);
    }
    :deep(div.dropdown) {
      transform-origin: top center;
      scale: 1 1;
    }
  }
}

:deep(select.select) {
  transition: 150ms ease-out;
  &.native {
    &:focus-visible {
      @include focusBoxShadow;
    }
  }
}

:deep(div.dropdown) {
  transform-origin: top center;
  scale: 1 0;
  transition: scale 150ms ease-out;
  max-height: calc(#{$height} * 5.5);
  width: calc(100% + 4px);
  left: -2px;
  background-color: $sageGreen;
  // border: 2px solid rgba($whisper, 0.5);
  border-radius: 0.3125rem;
}

.selection-window {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 toRem(12);
  transition: 150ms ease-out;
  .text {
    flex: 1;
    padding-top: toRem(3);
    padding-right: toRem(4);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &.is-placeholder {
      // color: rgba($whisper, 0.7);
    }
  }
  .icon-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-left: auto;
    transition: 150ms ease-out;
    &.disabled {
      opacity: 0.7;
    }
  }
  .icon.chevron {
    width: 0.6875rem;
  }
}

.option {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: 150ms ease-out;
  &:hover,
  &.highlighted,
  &.selected {
    // background-color: rgba($whisper, 0.1);
  }
}

.label {
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 10;
  :deep(svg.icon-checkmark) {
    width: toRem(12);
    margin-right: 0.5rem;
    path {
      // stroke: rgba($whisper, 0.5);
    }
  }
}
</style>
