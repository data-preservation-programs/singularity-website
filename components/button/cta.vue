<template>
  <ZeroButton
    v-slot="{ loading }"
    v-bind="props"
    :class="['button-x', `theme__${props.theme}`]">
    <div class="inner-content">

      <svg
        v-if="theme === 'primary'"
        width="25"
        height="41"
        viewBox="0 0 25 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="detail">
        <path
          d="M 24 40 H 2.0441 C 1.3963 40 0.9194 39.3934 1 38.7639 L 7.0927 13.9863 C 9 6 16 1 24 1"
          fill="#070707"
          fill-opacity="0.2"
          shape-rendering="crispEdges" />
        <path
          d="M 24 40 H 2.0441 C 1.3963 40 0.9194 39.3934 1 38.7639 L 7.0927 13.9863 C 9 6 16 1 24 1"
          fill="#FFC582"
          shape-rendering="crispEdges"
          class="fill-path" />
        <path
          d="M 24 40 H 2.0441 C 1.3963 40 0.9194 39.3934 1 38.7639 L 7.0927 13.9863 C 9 6 16 1 24 1"
          stroke="#FFC582"
          stroke-width="2"
          shape-rendering="crispEdges" />
      </svg>

      <div :class="['button-content', { hide: loading }]">
        <slot />
      </div>

    </div>
  </ZeroButton>
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
  }
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.button {
  white-space: nowrap;
  cursor: pointer;
  &:not([disabled="true"]) {
    &:hover {
      .button-content {
        @include transitionDefault;
        text-decoration: none;
      }
    }
    &:focus-visible {
      @include focusBoxShadow;
    }
  }
  &[disabled="true"] {
    box-shadow: none;
    opacity: 0.5;
    cursor: no-drop;
  }
}

.triple-dot-loader,
.button-content {
  width: 100%;
  height: 100%;
}

.triple-dot-loader {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  &.show {
    opacity: 1;
  }
  :deep(.dot) {
    background-color: var(--secondary-text-color);
  }
}

.button-content {
  @include transitionDefault;
  &.hide {
    opacity: 0;
  }
}

.detail {
  position: absolute;
  top: 0;
  right: calc(100% - 1px);
  .fill-path {
    opacity: 0;
    @include transitionDefault;
  }
}

// ////////////////////////////////////////////////////////////////////// Themes
.theme__primary {
  display: block;
  width: fit-content;
  filter: drop-shadow(0px 2px 14px rgba(255, 197, 130, 0.32));
  padding-left: toRem(25);
  &:before {
    content: '';
    position: absolute;
    left: toRem(25);
    top: 0;
    width: calc(100% - 25px);
    height: 100%;
    box-sizing: border-box;
    border-top: solid 2px $chardonnay;
    border-bottom: solid 2px $chardonnay;
    border-right: solid 2px $chardonnay;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: rgba(7, 7, 7, 0.2);
    @include transitionDefault;
  }
  .inner-content {
    position: relative;
    height: toRem(41);
    padding: toRem(10) toRem(17) toRem(10) toRem(3);
  }
  .button-content {
    display: flex;
    align-items: center;
    width: fit-content;
    @include b1;
    :deep(div) {
      @include b1;
      @include transitionDefault;
    }
  }
  &:hover {
    .detail {
      .fill-path {
        opacity: 1;
      }
    }
    &:before {
      background-color: $chardonnay;
    }
    .button-content {
      color: $codGray;
    }
  }
}

.theme__secondary {
  .button-content {
    @include b2;
  }
}

.theme__icon {
  padding: toRem(9);
  border-radius: 50%;
  border: 2px solid $sageGreen;
  .button-content {
    display: flex;
  }
}
</style>
