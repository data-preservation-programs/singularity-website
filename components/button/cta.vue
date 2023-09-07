<template>
  <ZeroButton
    v-slot="{ loading }"
    v-bind="props"
    :class="['button-x', `theme__${props.theme}`, { large: variantLarge }]">
    <div class="inner-content">

      <div :class="['detail-wrapper', { large: variantLarge }]">
        <svg
          v-if="theme === 'primary'"
          width="400"
          :height="variantLarge ? 57 : 41"
          :viewBox="`0 0 400 ${ variantLarge ? 57 : 41 }`"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="detail">
          <path
            :d="path"
            fill="#070707"
            shape-rendering="crispEdges"
            class="fill-path" />
          <path
            :d="path"
            stroke="#FFC582"
            stroke-width="2"
            shape-rendering="crispEdges" />
        </svg>
      </div>

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
  },
  variantLarge: {
    type: Boolean,
    required: false,
    default: false
  }
})

// ==================================================================== Computed
const path = computed(() => {
  return props.variantLarge ?
    'M 536 53.6 H 2.7391 C 1.871 53.6 1.232 52.7872 1.34 51.9436 L 9.5042 18.7416 C 12.06 8.04 21.44 1.34 32.16 1.34 H 536' :
    'M 400 40 H 2.0441 C 1.3963 40 0.9194 39.3934 1 38.7639 L 7.0927 13.9863 C 9 6 16 1 24 1 H 400'
})

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
:deep(.button) {
  white-space: nowrap;
  cursor: pointer;
  &:not(.disabled) {
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
  .disabled {
    box-shadow: none;
    // opacity: 0.5;
    cursor: default;
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
  white-space: nowrap;
  @include transitionDefault;
  &.hide {
    opacity: 0;
  }
}

.detail-wrapper {
  position: absolute;
  top: 0;
  left: toRem(-25);
  width: calc(100% + toRem(25) - toRem(2));
  height: 100%;
  overflow: hidden;
  &.large {
    left: toRem(-31);
    width: calc(100% + toRem(31) - toRem(2));
  }
}

.detail {
  .fill-path {
    opacity: 0.2;
    fill: #070707;
    @include transitionDefault;
  }
}

// ////////////////////////////////////////////////////////////////////// Themes
.theme__primary {
  display: block;
  width: fit-content;
  filter: drop-shadow(0px 2px 14px rgba(255, 197, 130, 0.32));
  padding-left: toRem(25);
  cursor: pointer;
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
    @include transitionDefault;
  }
  &.large {
    &:before {
      top: 0.5px;
      height: calc(100% - 1px);
    }
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
    position: relative;
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
        fill: $chardonnay;
      }
    }
    .button-content {
      color: $codGray;
    }
  }
}

.theme__secondary {
  display: block;
  width: fit-content;
  padding-right: toRem(25);
  .button-content {
    @include b2;
    color: $chardonnay;
    &:after {
      content: '↗';
      position: absolute;
      margin-left: 0.5rem;
      @include transitionDefault;
    }
    &:hover {
      &:after {
        transform: translateX(0.5rem);
      }
    }
  }
}

.theme__icon {
  padding: toRem(9);
  border-radius: 50%;
  border: 2px solid $sageGreen;
  background-color: rgba($sageGreen, 0);
  @include transitionDefault;
  @include mini {
    padding: toRem(6);
  }
  .button-content {
    display: flex;
  }
  :deep(.icon) {
    path {
      @include transitionDefault;
    }
  }
  &:hover {
    background-color: rgba($sageGreen, 1);
    :deep(.icon) {
      path {
        fill: $codGray;
      }
    }
  }
}

.theme__big-number {
  display: block;
  width: fit-content;
  :deep(.button-content) {
    @include h1;
    @include gradientText;
    .caption {
      display: block;
      @include h4;
      -webkit-text-fill-color: $alto;
      -moz-text-fill-color: $alto;
      text-fill-color: $alto;
    }
  }
}
</style>
