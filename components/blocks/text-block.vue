<template>
  <div
    :class="['block text-block', `align__${block.align ? block.align : 'left'}`]">

    <h5 v-if="block.label" class="label h5">
      <span>{{ block.label }}</span>
    </h5>

    <template v-if="block.heading">
      <component
        :is="block.h ? `h${block.h}` : 'h2'"
        :class="['heading', { 'heading-image': block.img }]">
        <img v-if="block.img" :src="block.img" />
        <span
          :class="block.h ? `h${block.h}` : 'h2'"
          v-html="block.heading">
        </span>
      </component>
    </template>

    <div class="text-wrapper">
      <div v-if="block.description" class="description">
        <MarkdownParser :markdown="block.description" />
      </div>
    </div>

    <div v-if="block.ctas" class="button-row">
      <template v-if="ctaData">
        <ButtonCta
          v-for="(cta, index) in ctaData"
          :key="index"
          :tag="cta.tag"
          :to="cta.to"
          :theme="cta.theme"
          :target="cta.target"
          :variant="ctaVariant || cta.variant"
          :disabled="cta.disabled">
          <template #button-content>
            <span class="text" v-html="cta.text" />
            <span
              v-if="cta.caption"
              class="caption">
              {{ cta.caption }}
            </span>
          </template>
        </ButtonCta>
      </template>
    </div>
  </div>
</template>

<script>
// import Button from '@/components/button'
import MarkdownParser from '@/components/markdown-parser'

export default {
  name: 'TextBlock',

  components: {
    // Button,
    MarkdownParser
  },

  props: {
    block: {
      /**
       * align: String (left, right, center)
       * label: String
       * heading: String
       * description: String
       * ctas: [{Button}]
       */
      type: Object,
      required: true
    }
  },

  data () {
    return {
      resize: false,
      ctaVariant: false
    }
  },

  computed: {
    ctaData () {
      if (this.block.ctas && Array.isArray(this.block.ctas)) {
        return this.block.ctas.map((object) => {
          return { ...object, disabled: object.to === undefined || object.to === '' }
        })
      }
      return false
    }
  },

  mounted () {
    if (this.ctaData && this.ctaData.some(cta => cta.theme === 'primary' && cta.variant !== 'large')) {
      this.resizeCta()
      this.resize = () => { this.resizeCta() }
      window.addEventListener('resize', this.resize )
    }
  },

  beforeUnmount () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    resizeCta () {
      if (window.matchMedia('(max-width: 40rem)').matches) {
        if (!this.ctaVariant) { this.ctaVariant = 'small' }
      } else if (this.ctaVariant) {
        this.ctaVariant = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-block {
  position: relative;
  &.align__center {
    text-align: center;
    .label,
    .button-row {
      justify-content: center;
    }
  }
  &.align__right {
    text-align: right;
    .label,
    .button-row {
      justify-content: flex-end;
    }
  }
  > * {
    margin-bottom: toRem(30);
    position: relative;
  }
}

.button-row {
  margin-bottom: 0;
  .button:first-child {
    margin-right: toRem(35);
  }
  .button:only-child {
    margin-right: 0;
  }
}

.heading {
  &.heading-image {
    display: flex;
    align-items: center;
    img {
      width: toRem(90);
      height: toRem(90);
      margin-right: toRem(35);
      @include medium {
        width: toRem(60);
        height: toRem(60);
      }
      @include tiny {
        margin-right: toRem(17);
      }
    }
  }
  span {
    @include gradientText;
  }
  :deep(.highlight) {
    color: $alto;
    -webkit-text-fill-color: $alto;
    -moz-text-fill-color: $alto;
    text-fill-color: $alto;
    &::-moz-selection {
      -webkit-text-fill-color: $codGray;
      -moz-text-fill-color: $codGray;
      text-fill-color: $codGray;
    }
    &::selection {
      -webkit-text-fill-color: $codGray;
      -moz-text-fill-color: $codGray;
      text-fill-color: $codGray;
    }
  }
}

.button-row {
  :deep(.button) {
    &.theme__primary {
      @include mini {
        height: toRem(33);
      }
      .inner-content {
        @include mini {
          height: toRem(33);
          padding: toRem(8) toRem(28) toRem(8) toRem(10);
          @include iOSonly {
            height: toRem(29);
            padding: 0 toRem(17);
          }
        }
      }
      .detail-wrapper {
        @include mini {
          left: toRem(-19);
          width: calc(100% + toRem(19) - toRem(2));
          @include iOSonly {
            display: none;
          }
        }
      }
    }
  }
}
</style>
