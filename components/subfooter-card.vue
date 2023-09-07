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
                  theme="secondary">
                  {{ cta.text }}
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

            <div class="description">
              {{ description }}
            </div>

            <div v-if="fullwidth && cta" class="cta">
              <ButtonCta
                :to="cta.to"
                :tag="cta.tag"
                theme="secondary">
                {{ cta.text }}
              </ButtonCta>
            </div>

            <div
              v-if="fullwidth"
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
  font-weight: 500;
  letter-spacing: 0.01em;
}

.subheading {
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
    padding: 0 toRem(40);
    @include medium {
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
