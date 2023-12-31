<template>
  <div class="roadmap">

    <div
      v-for="item in items"
      :key="item.heading"
      class="roadmap-item">
      <div class="grid-noGutter-noBottom no-padding">

        <div
          class="col-4_sm-3_mi-10_ti-12"
          data-push-left="off-0_mi-1_ti-0">
          <div class="heading-wrapper">
            <ZeroButton
              tag="a"
              target="_blank"
              to="https://github.com/data-preservation-programs/singularity/milestones"
              class="heading-button">
              <div class="heading">

                <GithubIcon class="icon" />

                <span class="h2">
                  {{ item.heading }}
                </span>

              </div>
            </ZeroButton>
            <div class="year" v-html="item.year" />
          </div>
        </div>

        <div
          class="col-8_sm-9_mi-10_ti-12"
          data-push-left="off-0_mi-1_ti-0">
          <div class="roadmap-card">
            <div class="inner-card">

              <div
                v-for="milestone in item.milestones"
                :key="milestone.title"
                class="milestone">

                <div class="title">
                  {{ milestone.title }}
                </div>

                <div
                  class="content"
                  v-html="milestone.content">
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="cta-wrapper">
      <ButtonCta
        :tag="cta.tag"
        :to="cta.to"
        :theme="cta.theme"
        class="roadmap-cta">
        <template #button-content>
          {{ cta.text }}
        </template>
      </ButtonCta>
    </div>

  </div>
</template>

<script setup>
// ===================================================================== Imports
const GithubIcon = resolveComponent('icon/github-icon')

// ======================================================================= Props
const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

// ==================================================================== Computed
const items = computed(() => {
  return props.block.items
})

const cta = computed(() => {
  return props.block.cta
})

</script>

<style lang="scss" scoped>
.roadmap-item {
  margin-bottom: toRem(12);
  @include mini {
    margin-bottom: toRem(15);
  }
}

.heading-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: toRem(25);
  @include mini {
    position: relative;
    z-index: 5;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .year {
    @include h5;
    letter-spacing: 0.48px;
    margin-top: toRem(15);
    margin-left: toRem(37);
    @include mini {
      margin: 0;
    }
  }
}

.heading-button {
  cursor: pointer;
  width: fit-content;
  @include transitionDefault;
  @include mini {
    margin-top: 0;
  }
  &:hover,
  &:focus-visible {
    transform: scale(1.15) translate(toRem(5), toRem(-1));
    .icon {
      :deep(path) {
        fill: $chardonnay;
      }
    }
  }
  &:focus-visible {
    @include focusOutlineSmall;
    transform: scale(1.15) translate(toRem(5), toRem(-7));
  }
  .heading {
    display: flex;
  }
  .icon {
    width: toRem(23);
    height: toRem(23);
    margin-right: toRem(14);
    transition: 300ms cubic-bezier(0.33, 0.2, 0.41, 0.99);
    @include mini {
      width: toRem(18);
      height: toRem(18);
      margin-right: toRem(7);
      transform: translateY(toRem(-1.5));
    }
    :deep(path) {
      transition: inherit;
    }
  }
  .h2 {
    line-height: 1;
    @include transitionDefault;
    @include medium {
      line-height: 1.4;
    }
    @include tiny {
      line-height: 1;
    }
  }
}

.roadmap-card {
  position: relative;
  margin-left: -2rem;
  @include cardPanel(90deg);
  @include small {
    margin-left: 2rem;
  }
  @include mini {
    margin: 0;
  }
}

.inner-card {
  position: relative;
  z-index: 2;
  padding: toRem(31);
  @include small {
    padding: toRem(24) toRem(30);
  }
  @include tiny {
    padding: toRem(12) toRem(17);
  }
}

.milestone {
  display: flex;
  justify-content: space-between;
  @include customMaxMQ('30rem') {
    flex-direction: column;
  }
  &:not(:last-child) {
    margin-bottom: toRem(31);
    @include tiny {
      margin-bottom: toRem(11);
    }
  }
  .title {
    width: 19%;
    min-width: 19%;
    @include h4;
    line-height: 1.7;
    color: $sageGreen;
    @include medium {
      line-height: 1.7;
      font-size: 1rem;
      width: 29%;
      min-width: 29%;
    }
    @include small {
      font-size: toRem(14);
    }
    @include tiny {
      margin-bottom: 0.25rem;
      width: unset;
    }
  }
  .content {
    flex-grow: 1;
    @include p2;
    :deep(ul) {
      margin-top: 0.5rem;
      padding-left: 1.25rem;
    }
    :deep(li) {
      margin: 0.25rem 0;
    }
  }
}

.cta-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: toRem(30);
  @include mini {
    margin-top: toRem(14);
  }
}
</style>
