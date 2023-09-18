<template>
  <div
    :class="['subfooter-card', { fullwidth }]"
    :style="cardStyles">

    <div class="card-content">
      <div class="grid-noGutter-noBottom-middle no-padding">

        <div
          :class="[fullwidth ? 'col-6_md-7_mi-12' : 'col-12', 'inner-column']"
          :data-push-left="fullwidth ? 'off-1_md-0' : 'off-0'">
          <div class="before">

            <div class="feature">
              <img v-if="image" :src="image" class="image" />
              <pre v-if="code">
                <code v-html="code"></code>
              </pre>
            </div>

            <div class="title-wrapper">

              <div
                v-if="title"
                class="title"
                v-html="title">
              </div>

              <div v-if="!fullwidth && cta" class="cta">
                <ButtonCta
                  :to="cta.to"
                  :tag="cta.tag"
                  :target="cta.target"
                  theme="secondary">
                  <template #button-content>
                    {{ cta.text }}
                  </template>
                </ButtonCta>
              </div>

            </div>

            <div
              v-if="fullwidth"
              class="subheading"
              v-html="subheading">
            </div>

          </div>
        </div>

        <div v-if="fullwidth" class="col-5_mi-12 inner-column">
          <div class="after">

            <div
              class="description"
              v-html="description">
            </div>

            <SubfooterForm
              v-if="fullwidth && form"
              :form="form" />

            <div
              v-if="
                fullwidth"
              class="subheading"
              v-html="subheading">
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  block: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// ==================================================================== Computed
const fullwidth = computed(() => {
  return props.block.fullwidth
})

const cta = computed(() => {
  return props.block.cta
})

const image = computed(() => {
  return props.block.image
})

const title = computed(() => {
  return props.block.title
})

const subheading = computed(() => {
  return props.block.subheading
})

const description = computed(() => {
  return props.block.description
})

const code = computed(() => {
  return props.block.code
})

const form = computed(() => {
  return props.block.subfooter_form
})

const cardStyles = computed(() => {
  if (props.block.borderGradientAngle) {
    return { '--border-gradient-angle': props.block.borderGradientAngle }
  }
  return null
})

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.subfooter-card {
  --border-gradient-angle: 0deg;
  @include cardPanel(var(--border-gradient-angle));
  padding: toRem(41) toRem(31);
  height: 100%;
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    width: 100% !important;
    height: 100%;
  }
  @include medium {
    padding: toRem(23);
  }
  @include tiny {
    padding: toRem(25) toRem(16);
  }
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
}

.inner-column {
  height: 100%;
}

.before {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}

.feature {
  margin-bottom: toRem(37);
  @include tiny {
    margin-bottom: toRem(17);
  }
  .image {
    margin-top: 0.5rem;
    padding: 0 0.5rem;
    width: 100%;
  }
  pre {
    padding: 0 toRem(25);
    background-color: $codeBlack;
    border-radius: toRem(5);
    margin: 0;
    @include medium {
      padding: 0 toRem(20);
    }
  }
  code {
    display: block;
    font-size: toRem(18);
    line-height: leading(27, 18);
    letter-spacing: 0.01em;
    color: $sageGreen;
    @include large {
      font-size: toRem(13);
    }
    @include small {
      font-size: toRem(12);
    }
    :deep(span) {
      &.blue {
        color: #5D9AD1;
      }
    }
    :deep(span) {
      &.purple {
        color: $eastSide;
      }
    }
  }
}

.title {
  @include h1;
  @include gradientText;
  margin-bottom: toRem(14);
  @include small {
    font-size: toRem(30);
    line-height: leading(43, 30);
  }
  @include tiny {
    margin-bottom: toRem(3);
  }
}

.subheading,
.description {
  font-size: toRem(18);
  line-height: leading(24, 18);
  letter-spacing: 0.01em;
}

.description {
  font-weight: 400;
}

:deep(.weight-500) {
  font-weight: 500;
}

.subheading {
  font-weight: 500;
  @include medium {
    font-size: toRem(16);
  }
  @include mini {
    font-size: toRem(14);
  }
  :deep(br) {
    @include small {
      display: none;
    }
    @include mini {
      display: inline;
    }
  }
  :deep(span) {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    display: inline-block;
    cursor: pointer;
    @include transitionDefault;
    &:hover,
    &:focus-visible {
      transform: scale(1.08);
      a {
          color: var(--primary-text-color);
        }
    }
    &.github-link,
    &.slack-link {
      display: inline-block;
      position: relative;
      padding-left: toRem(19);
      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: toRem(15);
        height: toRem(15);
        transform: translateY(-50%);
        @include transitionDefault;
      }
      &:before {
        opacity: 1;
      }
      &:after {
        opacity: 0;
      }
      &:hover,
      &:focus-within {
        &:before {
          opacity: 0;
        }
        &:after {
          opacity: 1;
        }
      }
      &:focus-within {
        @include focusOutline;
      }
    }
    &.github-link {
      &:before {
        @include transitionDefault;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.5 0C3.35625 0 0 3.44114 0 7.6897C0 11.0924 2.14687 13.9664 5.12812 14.9853C5.50312 15.0526 5.64375 14.8219 5.64375 14.62C5.64375 14.4374 5.63438 13.8319 5.63438 13.1878C3.75 13.5435 3.2625 12.7168 3.1125 12.2843C3.02813 12.0632 2.6625 11.3808 2.34375 11.1981C2.08125 11.0539 1.70625 10.6983 2.33437 10.6887C2.925 10.6791 3.34687 11.2462 3.4875 11.4769C4.1625 12.6399 5.24063 12.3131 5.67188 12.1113C5.7375 11.6115 5.93437 11.275 6.15 11.0828C4.48125 10.8905 2.7375 10.2273 2.7375 7.28599C2.7375 6.44974 3.02813 5.75767 3.50625 5.21939C3.43125 5.02714 3.16875 4.23895 3.58125 3.18161C3.58125 3.18161 4.20937 2.97976 5.64375 3.96981C6.24375 3.79679 6.88125 3.71028 7.51875 3.71028C8.15625 3.71028 8.79375 3.79679 9.39375 3.96981C10.8281 2.97015 11.4563 3.18161 11.4563 3.18161C11.8688 4.23895 11.6062 5.02714 11.5312 5.21939C12.0094 5.75767 12.3 6.44013 12.3 7.28599C12.3 10.2369 10.5469 10.8905 8.87813 11.0828C9.15 11.3231 9.38438 11.7845 9.38438 12.5054C9.38438 13.5339 9.375 14.3605 9.375 14.62C9.375 14.8219 9.51562 15.0622 9.89062 14.9853C11.3796 14.4701 12.6734 13.489 13.59 12.1803C14.5066 10.8715 14.9997 9.30093 15 7.6897C15 3.44114 11.6438 0 7.5 0Z' fill='%23FFC582'/%3e%3c/svg%3e ");
      }
      &:after {
        @include transitionDefault;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.5 0C3.35625 0 0 3.44114 0 7.6897C0 11.0924 2.14687 13.9664 5.12812 14.9853C5.50312 15.0526 5.64375 14.8219 5.64375 14.62C5.64375 14.4374 5.63438 13.8319 5.63438 13.1878C3.75 13.5435 3.2625 12.7168 3.1125 12.2843C3.02813 12.0632 2.6625 11.3808 2.34375 11.1981C2.08125 11.0539 1.70625 10.6983 2.33437 10.6887C2.925 10.6791 3.34687 11.2462 3.4875 11.4769C4.1625 12.6399 5.24063 12.3131 5.67188 12.1113C5.7375 11.6115 5.93437 11.275 6.15 11.0828C4.48125 10.8905 2.7375 10.2273 2.7375 7.28599C2.7375 6.44974 3.02813 5.75767 3.50625 5.21939C3.43125 5.02714 3.16875 4.23895 3.58125 3.18161C3.58125 3.18161 4.20937 2.97976 5.64375 3.96981C6.24375 3.79679 6.88125 3.71028 7.51875 3.71028C8.15625 3.71028 8.79375 3.79679 9.39375 3.96981C10.8281 2.97015 11.4563 3.18161 11.4563 3.18161C11.8688 4.23895 11.6062 5.02714 11.5312 5.21939C12.0094 5.75767 12.3 6.44013 12.3 7.28599C12.3 10.2369 10.5469 10.8905 8.87813 11.0828C9.15 11.3231 9.38438 11.7845 9.38438 12.5054C9.38438 13.5339 9.375 14.3605 9.375 14.62C9.375 14.8219 9.51562 15.0622 9.89062 14.9853C11.3796 14.4701 12.6734 13.489 13.59 12.1803C14.5066 10.8715 14.9997 9.30093 15 7.6897C15 3.44114 11.6438 0 7.5 0Z' fill='%23D3D3D3'/%3e%3c/svg%3e ");
      }
    }
    &.slack-link {
      &:before {
        @include transitionDefault;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.15187 9.47812C3.15187 10.3462 2.44313 11.0541 1.57594 11.0541C0.70875 11.0541 0 10.3463 0 9.47906C0 8.61188 0.70875 7.90313 1.575 7.90313H3.15187V9.47812ZM3.945 9.47812C3.945 8.61187 4.65375 7.90313 5.52094 7.90313C6.38812 7.90313 7.09688 8.61187 7.09688 9.47812V13.425C7.09688 14.2912 6.38812 15 5.52187 15C5.10421 14.9993 4.70384 14.8331 4.40834 14.538C4.11283 14.2428 3.94624 13.8427 3.945 13.425V9.47812ZM5.52187 3.15187C4.65375 3.15187 3.945 2.44313 3.945 1.57594C3.945 0.70875 4.65375 0 5.52187 0C6.39 0 7.09688 0.70875 7.09688 1.575V3.15187H5.52187ZM5.52187 3.945C6.38812 3.945 7.09688 4.65375 7.09688 5.52094C7.09688 6.38812 6.38812 7.09688 5.52187 7.09688H1.575C0.709687 7.09688 0 6.38812 0 5.52187C0 4.65375 0.70875 3.945 1.575 3.945H5.52187ZM11.8491 5.52187C11.8491 4.65375 12.5569 3.945 13.4241 3.945C14.2913 3.945 15 4.65375 15 5.52094C15 6.38812 14.2912 7.09688 13.425 7.09688H11.8491V5.52187ZM11.0541 5.52187C11.0541 6.38812 10.3463 7.09688 9.47906 7.09688C9.06156 7.09589 8.66143 6.92966 8.36613 6.63453C8.07083 6.3394 7.90436 5.93937 7.90313 5.52187V1.575C7.90313 0.709687 8.61187 0 9.47812 0C10.3462 0 11.0541 0.70875 11.0541 1.575V5.52187ZM9.47812 11.8481C10.3462 11.8481 11.055 12.5569 11.055 13.4241C11.055 14.2913 10.3462 15 9.47812 15C8.61 15 7.90219 14.2912 7.90219 13.425V11.8481H9.47812ZM9.47812 11.0541C8.61187 11.0541 7.90313 10.3463 7.90313 9.47906C7.90313 8.61188 8.61187 7.90313 9.47812 7.90313H13.425C14.2912 7.90313 15 8.61187 15 9.47812C15 10.3462 14.2912 11.0541 13.425 11.0541H9.47812Z' fill='%23FFC582'/%3e%3c/svg%3e ");
      }
      &:after {
        @include transitionDefault;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.15187 9.47812C3.15187 10.3462 2.44313 11.0541 1.57594 11.0541C0.70875 11.0541 0 10.3463 0 9.47906C0 8.61188 0.70875 7.90313 1.575 7.90313H3.15187V9.47812ZM3.945 9.47812C3.945 8.61187 4.65375 7.90313 5.52094 7.90313C6.38812 7.90313 7.09688 8.61187 7.09688 9.47812V13.425C7.09688 14.2912 6.38812 15 5.52187 15C5.10421 14.9993 4.70384 14.8331 4.40834 14.538C4.11283 14.2428 3.94624 13.8427 3.945 13.425V9.47812ZM5.52187 3.15187C4.65375 3.15187 3.945 2.44313 3.945 1.57594C3.945 0.70875 4.65375 0 5.52187 0C6.39 0 7.09688 0.70875 7.09688 1.575V3.15187H5.52187ZM5.52187 3.945C6.38812 3.945 7.09688 4.65375 7.09688 5.52094C7.09688 6.38812 6.38812 7.09688 5.52187 7.09688H1.575C0.709687 7.09688 0 6.38812 0 5.52187C0 4.65375 0.70875 3.945 1.575 3.945H5.52187ZM11.8491 5.52187C11.8491 4.65375 12.5569 3.945 13.4241 3.945C14.2913 3.945 15 4.65375 15 5.52094C15 6.38812 14.2912 7.09688 13.425 7.09688H11.8491V5.52187ZM11.0541 5.52187C11.0541 6.38812 10.3463 7.09688 9.47906 7.09688C9.06156 7.09589 8.66143 6.92966 8.36613 6.63453C8.07083 6.3394 7.90436 5.93937 7.90313 5.52187V1.575C7.90313 0.709687 8.61187 0 9.47812 0C10.3462 0 11.0541 0.70875 11.0541 1.575V5.52187ZM9.47812 11.8481C10.3462 11.8481 11.055 12.5569 11.055 13.4241C11.055 14.2913 10.3462 15 9.47812 15C8.61 15 7.90219 14.2912 7.90219 13.425V11.8481H9.47812ZM9.47812 11.0541C8.61187 11.0541 7.90313 10.3463 7.90313 9.47906C7.90313 8.61188 8.61187 7.90313 9.47812 7.90313H13.425C14.2912 7.90313 15 8.61187 15 9.47812C15 10.3462 14.2912 11.0541 13.425 11.0541H9.47812Z' fill='%23D3D3D3'/%3e%3c/svg%3e ");
      }
    }
    a {
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      letter-spacing: inherit;
    }
  }
}

.subfooter-card.fullwidth {
  @include medium {
    padding: toRem(50) toRem(28) toRem(33) toRem(28);
  }
  @include small {
    padding: toRem(50) toRem(23) toRem(33) toRem(23);
  }
  @include mini {
    padding: toRem(33) toRem(23);
  }
  @include tiny {
    padding: toRem(25) toRem(16);
  }
  .inner-column {
    @include mini {
      height: unset;
    }
  }
  .before {
    position: relative;
    margin-left: -2rem;
    @include medium {
      margin: 0;
    }
    @include small {
      padding-right: 2rem;
    }
    @include mini {
      padding-right: 0;
    }
    .subheading {
      @include mini {
        display: none;
      }
    }
  }
  .after {
    margin-top: toRem(34);
    padding: 0 toRem(40);
    @include medium {
      margin-top: 0;
      padding: 0;
    }
    .subheading {
      display: none;
      @include mini {
        display: block;
      }
    }
  }
  .feature {
    display: none;
  }
  .title {
    font-size: toRem(80);
    line-height: leading(110, 80);
    white-space: nowrap;
    margin-bottom: toRem(10);
    @include gridMaxMQ {
      font-size: 5.8vw;
    }
    @include mini {
      font-size: toRem(40);
    }
    :deep(img) {
      display: inline;
      width: toRem(214);
      margin-right: toRem(42);
      transform: translateY(0.75rem);
      @include gridMaxMQ {
        width: 16.2vw;
      }
      @include small {
        margin-right: 7%;
      }
      @include mini {
        width: toRem(120);
        margin-right: 1rem;
      }
    }
  }
  .description {
    line-height: leading(27, 18);
    margin-bottom: toRem(30);
    @include medium {
      @include p2;
    }
    @include mini {
      padding-right: 3rem;
    }
    @include tiny {
      padding-right: 0;
    }
  }
  .cta {
    @include mini {
      margin-bottom: toRem(20);
    }
  }
}
</style>
