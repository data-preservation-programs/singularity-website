<template>
  <div
    :class="['subfooter-card', { fullwidth }]"
    :style="cardStyles">

    <div class="card-content">
      <div class="grid-noGutter-noBottom-middle">

        <div
          :class="fullwidth ? 'col-6' : 'col-12'"
          :data-push-left="fullwidth ? 'off-1' : 'off-0'">
          <div class="before">

            <div class="feature">
              <img v-if="image" :src="image" class="image" />
              <pre v-if="code">
                <code v-html="code"></code>
              </pre>
            </div>

            <div
              v-if="title"
              class="title"
              v-html="title">
            </div>

            <div
              v-if="fullwidth"
              class="subheading"
              v-html="subheading">
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
        </div>

        <div v-if="fullwidth" class="col-5">
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
  }
}

.card-content {
  position: relative;
  z-index: 2;
}

.feature {
  margin-bottom: toRem(37);
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
  }
  code {
    display: block;
    font-size: toRem(18);
    line-height: leading(27, 18);
    letter-spacing: 0.01em;
    color: $sageGreen;
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
}

.subheading,
.description {
  font-size: toRem(18);
  line-height: leading(24, 18);
  font-weight: 500;
  letter-spacing: 0.01em;
}

.subfooter-card.fullwidth {
  .before {
    position: relative;
    margin-left: -2rem;
  }
  .after {
    padding: 0 toRem(40);
  }
  .feature {
    display: none;
  }
  .title {
    font-size: toRem(80);
    line-height: leading(110, 80);
    white-space: nowrap;
    margin-bottom: toRem(10);
    :deep(img) {
      display: inline;
      max-width: toRem(214);
      margin-right: toRem(42);
      transform: translateY(0.75rem);
    }
  }
  .description {
    line-height: leading(27, 18);
    margin-bottom: toRem(30);
  }
}
</style>
