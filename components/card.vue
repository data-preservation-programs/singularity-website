<template>
  <div :class="['card', `type__${type}`, `theme__${theme}`, flipped]">

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
    },
    ctaTabIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data () {
    return {
      flipped: ''
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
    sidebarImage () {
      return this.type === 'project' && this.image ? { 'background-image': `url(${this.image})` } : false
    },
    sidebarText () {
      if (this.card.sidebar_text) { return this.card.sidebar_text }
      const titleLength = this.title.length
      const titleRepeats = Math.ceil(150 / (titleLength + 1))
      return Array(titleRepeats).fill(this.title).join(' ')
    },
    ctas () {
      return this.card.ctas ? this.card.ctas : []
    },
    theme () {
      return this.card.theme
    },
    reverseImg () {
      return this.card.reverse_img
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

</style>
