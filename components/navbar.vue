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
// eslint-disable-next-line
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
  @include transitionDefault;
  position: relative;
  padding: 0.25rem 0.5rem;
  transform: translateY(0);
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: toRem(17);
  }
  &:after {
    content: '';
    position: absolute;
    top: calc(100% + 5px);
    left: calc(50% - 0.25rem);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: $chardonnay;
    opacity: 0;
    transition: inherit;
  }
  &:hover {
    transform: translateY(-1.125rem);
    &:before {
      height: toRem(30);
    }
    &:after {
      opacity: 1;
    }
  }
}
</style>
