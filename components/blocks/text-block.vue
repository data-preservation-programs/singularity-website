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
      <template v-if="block.ctas && Array.isArray(block.ctas)">
        <ButtonCta
          v-for="(cta, index) in ctaData"
          :key="index"
          :tag="cta.tag"
          :to="cta.to"
          :theme="cta.theme"
          :disabled="cta.disabled">
          {{ cta.text }}
          <span
            v-if="cta.caption"
            class="caption">
            {{ cta.caption }}
          </span>
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

  computed: {
    ctaData () {
      return this.block.ctas.map((object) => {
        return { ...object, disabled: object.to === undefined || object.to === '' }
      })
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
  }
}
</style>
