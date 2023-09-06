<template>
  <div
    class="signup-card"
    :style="cardStyles">
    <div class="content">

      <img v-if="type !== 'vertical' && image" :src="image" class="image" />

      <div v-if="type !== 'logo'" class="text">

        <PieChartIcon />

        <div v-if="title" class="title">
          {{ title }}
        </div>

        <div v-if="description" class="description">
          {{ description }}
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
// ===================================================================== Imports
const PieChartIcon = resolveComponent('icon/pie-chart-icon')

// ======================================================================= Props
const props = defineProps({
  signupCard: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// ==================================================================== Computed
const title = computed(() => { return props.signupCard.title })

const description = computed(() => { return props.signupCard.description })

const cardStyles = computed(() => {
  if (props.signupCard.borderGradientAngle) {
    return { '--border-gradient-angle': props.signupCard.borderGradientAngle }
  }
  return null
})


</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.signup-card {
  --border-gradient-angle: 0deg;
  @include cardPanel(var(--border-gradient-angle));
}

.signup-card {
  padding: toRem(30) toRem(24);
  .content {
    position: relative;
    z-index: 2;
  }
  .icon {
    margin-bottom: toRem(45);
  }
  .title {
    @include h3;
    color: $sageGreen;
    margin-bottom: toRem(25);
  }
  .description {
    @include p2;
    margin-bottom: toRem(22);
  }
}
</style>
