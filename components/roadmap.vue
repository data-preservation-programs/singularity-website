<template>
  <div class="roadmap">

    <div
      v-for="item in items"
      :key="item.heading"
      class="roadmap-item">
      <div class="grid-noGutter-noBottom no-padding">

        <div class="col-4_sm-3">
          <div class="heading">

            <ZeroButton
              tag="a"
              to="https://github.com/data-preservation-programs/singularity/milestones"
              class="icon-button">
              <GithubIcon class="icon" />
            </ZeroButton>

            <span class="h2">
              {{ item.heading }}
            </span>

          </div>
        </div>

        <div class="col-8_sm-9">
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
        {{ cta.text }}
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
  &:hover {
    .icon {
      transform: scale(1.15);
      :deep(path) {
        fill: $chardonnay;
      }
    }
  }
}

.heading {
  display: flex;
  align-items: center;
  margin-top: toRem(25);
  .icon-button {
    display: block;
    width: toRem(41);
    height: toRem(41);
    margin-right: toRem(14);
    padding: 0.5rem;
  }
  .icon {
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: 300ms cubic-bezier(0.33, 0.2, 0.41, 0.99);
    :deep(path) {
      transition: inherit;
    }
  }
}

.roadmap-card {
  position: relative;
  margin-left: -2rem;
  @include cardPanel(90deg);
  @include small {
    margin-left: 1rem;
  }
}

.inner-card {
  position: relative;
  z-index: 2;
  padding: toRem(31);
}

.milestone {
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: toRem(31);
  }
  .title {
    width: 19%;
    min-width: 19%;
    margin-top: 0.25em;
    @include h4;
    color: $sageGreen;
    @include medium {
      width: 29%;
      min-width: 29%;
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
}
</style>
