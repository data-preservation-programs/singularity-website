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
          class="nav-link"
          @clicked="scrollToSection(link.to)">
          {{ link.text }}
        </ZeroButton>
      </div>

      <slot></slot>

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

const emit = defineEmits(['nav-link-click'])

// ===================================================================== Methods
const scrollToSection = async (el) => {
  emit('nav-link-click')
  const id = el.replaceAll('#', '')
  await navigateTo({
    path: '/',
    query: {
      section: id
    }
  })
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  &.mobile {
    .navigation {
      flex-direction: column;
    }
    .nav-item {
      justify-content: center;
      &:not(:last-child) {
        margin-bottom: toRem(40);
      }
    }
    .nav-link {
      @include hamburgerCTA;
      background: linear-gradient(135deg, rgba(166,200,136,1) 0%, rgba(212,212,212,1) 33%, rgba(211,211,211,1) 66%, rgba(211,211,211,1) 100%);
      @include gradientTextBase;
      background-size: 300%;
      background-position: 50% 0;
      &:active,
      &:hover {
        background-position: 0% 0;
        transform: none;
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }
}

.navigation {
  display: flex;
  justify-content: space-between;
}

.nav-item {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
  @include transitionDefault;
  &:focus-within {
    @include focusOutline;
  }
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
    bottom: 0.5rem;
    left: calc(50% - 0.25rem);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: $chardonnay;
    opacity: 0;
    transition: inherit;
    transition-delay: 50ms;
  }
  &:hover,
  &:focus-visible {
    transform: translateY(-1.125rem);
    &:before {
      height: toRem(30);
    }
    &:after {
      opacity: 1;
      transform: translateY(1.625rem);
    }
  }
}
</style>
