<template>
  <div class="navbar">
    <nav class="navigation">
      <div
        v-for="link in links"
        :key="`${link.text}`"
        class="nav-item">
        <ZeroButton
          :tag="link.tag"
          :to="link.to"
          class="nav-link">
          {{ link.text }}
        </ZeroButton>
      </div>
    </nav>
  </div>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  links: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.navigation {
  display: flex;
  justify-content: space-between;
}

.nav-item {
  display: flex;
  justify-content: flex-end;
}

.nav-link {
  @include navButton;
}
</style>
