<template>
  <div :class="['card', `type__${type}`, `theme__${theme}`]">

    <img :src="image" />

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'Card',

  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  computed: {
    type () {
      return this.card.type
    },
    image () {
      return this.card.img
    },
    title () {
      return this.card.title
    },
    lazyLoad () {
      return this.card.lazy_load || true
    },
    contentImage () {
      let image
      switch (this.type) {
        case 'project':
          image = this.card.logo
          break
        case 'person':
        case 'slider':
          image = this.card.img
          break
        default:
          image = null
      }
      return image
    },
    logoTitle () {
      return this.title.toLowerCase().replaceAll(' ', '-').replaceAll('.', '-')
    },
    description () {
      return this.card.description
    },
    ctas () {
      return this.card.ctas ? this.card.ctas : []
    },
    theme () {
      return this.card.theme
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card.type__logo {
  width: fit-content;
  margin: auto;
  display: flex;
  align-items: center;
}
</style>
