<template>
  <ZeroFieldDatepicker v-bind="{...props, ...$attrs}" />
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
$height: toRem(35);
$highlight: $chardonnay;

// ///////////////////////////////////////////////////////////////////// General
.field-datepicker {
  max-width: toRem(380);
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
  }
  &.disabled {
    cursor: no-drop;
  }
}

:deep(input.dp__input_reg) {
  padding: 0;
  padding-left: calc(#{$height} - 4px);
  // color: $whisper;
  font-size: toRem(14);
  background: transparent;
  border-color: transparent;
  @include placeholder {
    // color: $whisper;
    font-weight: 400;
    opacity: 0.7;
  }
  + div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: calc(#{$height} - 4px);
    height: calc(#{$height} - 4px);
    .dp__input_icon {
      position: static;
      transform: unset;
    }
    + svg {
      width: toRem(14);
      height: toRem(14);
      padding: toRem(10) toRem(6);
    }
  }
}

:deep(div.dp__outer_menu_wrap) {
  width: 255px;
}

:deep(.dp__menu) {
  position: relative;
  width: 100%;
  min-width: 100%;
  border-radius: toRem(5);
  // font-family: $font_Primary;
  font-family: $fontSuisseIntl;
  font-size: toRem(14);
}

:deep(.dp__menu),
:deep(.dp__arrow_top),
:deep(.dp__arrow_bottom) {
  background-color: $sageGreen;
  border-color: $sageGreen;
}

:deep(.dp__menu_inner) {
  padding: 0;
}

:deep(.dp__month_year_row) {
  justify-content: center;
  height: auto;
  padding: toRem(8) toRem(16) toRem(4) toRem(16);
  .dp__month_year_select,
  .dp__inner_nav {
    border-radius: toRem(3);
    transition: 150ms ease-out;
    &:hover {
      transition: 150ms ease-in;
      background-color: $highlight;
    }
  }
  .dp__month_year_wrap {
    width: auto;
    margin: 0 toRem(8);
    button[aria-label="Toggle overlay"] {
      &:hover {
        background-color: transparent;
        &:before {
          transition: 150ms ease-in;
          // background-color: $outerSpace;
          color: white;
        }
      }
      &:before {
        content: 'back to dates';
        color: black;
        font-weight: 500;
        font-size: toRem(12);
        padding: toRem(4) toRem(8);
        border: 1px solid $sageGreen;
        border-radius: toRem(4);
        transition: 150ms ease-out;
      }
      svg {
        display: none;
      }
    }
  }
  .dp--year-select,
  .dp__month_year_select {
    height: auto;
    padding: toRem(8) toRem(16);
    padding-top: toRem(10)
  }
  .dp__icon {
    width: toRem(12);
    path {
      fill: black;
      stroke: black;
    }
  }
}

:deep(.dp__calendar_header) {
  padding: 0 toRem(14);
  padding-bottom: toRem(4);
}

:deep(.dp__calendar_header_item) {
  width: auto;
  height: auto;
  padding: 0;
}

:deep(.dp__calendar_header_separator) {
  position: relative;
  left: toRem(6);
  width: calc(100% - #{toRem(12)});
  background-color: black;
}

:deep(.dp__calendar[role=rowgroup]) {
  padding: 0 toRem(16);
}

:deep(.dp__calendar_item) {
  width: toRem(32);
  height: toRem(32);
  .dp__cell_inner {
    width: 100%;
    height: 100%;
    padding: 0;
    padding-top: toRem(2);
    transition: 75ms ease-out;
    &:hover {
      transition: 75ms ease-in;
      border-color: $highlight;
      background-color: transparent;
      &.dp__active_date,
      &.dp__range_start,
      &.dp__range_end {
        background-color: $highlight;
        border-color: $highlight;
      }
      &.dp__today {
        border-color: $highlight;
      }
    }
    &.dp__today {
      border-color: black;
    }
    &.dp__active_date,
    &.dp__range_start,
    &.dp__range_end {
      color: black;
      background-color: $highlight;
      border-color: $highlight;
    }
    &.dp__range_start {
      &.dp__range_end {
        border-radius: toRem(5);
      }
    }
    &.dp__range_between {
      background-color: $eastSide;
      &:not(.dp__today) {
        border-color: $eastSide;
      }
    }
  }
  .dp__cell_offset {
    color: $siam;
  }
}

:deep(.dp--tp-wrap) {
  button[aria-label="Open time picker"] {
    height: auto;
    &:hover {
      background-color: transparent;
      &:before {
        transition: 150ms ease-in;
        // background-color: $outerSpace;
        color: white;
      }
    }
    &:before {
      content: 'select a time';
      color: black;
      font-weight: 500;
      font-size: toRem(12);
      padding: toRem(4) toRem(8);
      border: 1px solid $sageGreen;
      border-radius: toRem(4);
      transition: 150ms ease-out;
    }
    svg {
      display: none;
    }
  }
  button[aria-label="Close time Picker"] {
    &:hover {
      background-color: transparent;
      &:before {
        transition: 150ms ease-in;
        // background-color: $outerSpace;
        color: white;
      }
    }
    &:before {
      content: 'back to dates';
      color: black;
      font-weight: 500;
      font-size: toRem(12);
      padding: toRem(4) toRem(8);
      border: 1px solid $sageGreen;
      border-radius: toRem(4);
      transition: 150ms ease-out;
    }
    svg {
      display: none;
    }
  }
  .dp__overlay {
    .dp__overlay {
      button[aria-label="Toggle overlay"] {
        &:hover {
          background-color: transparent;
          &:before {
            transition: 150ms ease-in;
            // background-color: $outerSpace;
            color: white;
          }
        }
        &:before {
          content: 'back to times';
          color: black;
          font-weight: 500;
          font-size: toRem(12);
          padding: toRem(4) toRem(8);
          border: 1px solid $sageGreen;
          border-radius: toRem(4);
          transition: 150ms ease-out;
        }
        svg {
          display: none;
        }
      }
    }
  }
  .dp__inc_dec_button,
  .dp--time-overlay-btn {
    &:hover {
      background-color: $highlight;
    }
  }
  .dp__inc_dec_button {
    border-radius: toRem(5);
    &:active {
      transform: scale(0.8);
    }
    path {
      fill: black;
      stroke: transparent;
    }
  }
}

:deep(.dp__overlay) {
  background-color: $sageGreen;
  .dp__overlay_container {
    overflow-x: hidden;
  }
  .dp__overlay_cell_pad {
    transition: 75ms ease-out;
    border: 1px solid transparent;
    &:hover {
      transition: 75ms ease-in;
      border-color: $highlight;
      background-color: transparent;
    }
    &.dp__overlay_cell_active {
      background-color: $highlight;
      color: black;
    }
  }
}

:deep(.dp__action_row) {
  width: 100% !important;
  padding: 0 toRem(16) toRem(8) toRem(16);
  .dp__selection_preview {
    &[title=""] {
      + .dp__action_buttons {
        .dp__action_select {
          opacity: 0.5;
          cursor: no-drop;
        }
      }
    }
  }
  .dp__action_cancel,
  .dp__action_select {
    height: auto;
    font-weight: 500;
    font-size: toRem(12);
    line-height: 1;
    padding: toRem(6) toRem(6);
    border-radius: toRem(4);
    border: 1px solid;
  }
  .dp__action_cancel {
    margin-right: toRem(6);
    color: black;
    border-color: $sageGreen;
  }
  .dp__action_select {
    border-color: $sageGreen;
    // background-color: $outerSpace;
    color: white;
  }
}
</style>
