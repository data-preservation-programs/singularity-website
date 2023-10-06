<template>
  <div class="layout warped-torus-background" tabindex="-1">

    <SiteHeader />

    <slot />

    <SiteFooter :no-background-image="true" />

  </div>
</template>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.layout {
  display: flex;
  flex-direction: column;
  &:before {
    content: '';
    position: absolute;
    display: block;
    z-index: -1;
    overflow: visible;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url('/images/warped-torus-made-of-segments.jpg');
    background-size: auto vw(1800px);
    background-origin: border-box;
    background-position: center 75%;
    background-repeat: no-repeat;
    @include medium {
      background-position: center 45%;
    }
    @include small {
      background-position: center 30%;
    }
    @include mini {
      background-size: auto vw(1100px, 640px);
      background-position: center bottom 18rem;
    }
    @include tiny {
      background-size: auto vw(1200px, 415px);
      background-position: center top -30%;
    }
  }
}
</style>
