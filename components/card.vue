<template>
  <div
    :class="['card', `type__${type}`, `theme__${theme}`]"
    :style="cardStyles">
    <div class="content">

      <img v-if="type !== 'vertical' && image" :src="image" class="image" />

      <div v-if="type !== 'logo'" class="text">

        <component
          :is="iconComponent"
          v-if="props.card.icon"
          class="icon" />

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
const NetworkIcon = resolveComponent('icon/network-icon')
const GraphIcon = resolveComponent('icon/graph-icon')
const InboxIcon = resolveComponent('icon/inbox-icon')

// ======================================================================= Props
const props = defineProps({
  card: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// ==================================================================== Computed
const type = computed(() => { return props.card.type })

const image = computed(() => { return props.card.image })

const title = computed(() => { return props.card.title })

const description = computed(() => { return props.card.description })

const theme = computed(() => { return props.card.theme })

const cardStyles = computed(() => {
  if (props.card.borderGradientAngle) {
    return { '--border-gradient-angle': props.card.borderGradientAngle }
  }
  return null
})

const iconComponent = computed(() => {
  switch (props.card.icon) {
    case 'pie-chart' : return PieChartIcon;
    case 'network' : return NetworkIcon;
    case 'graph' : return GraphIcon;
    case 'inbox' : return InboxIcon;
    default : return 'span'
  }
})

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card.type__vertical,
.card.type__horizontal {
  --border-gradient-angle: 0deg;
  @include cardPanel(var(--border-gradient-angle));
}

.card.type__logo {
  width: fit-content;
  margin: auto;
  display: flex;
  align-items: center;
}

.card.type__vertical {
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
