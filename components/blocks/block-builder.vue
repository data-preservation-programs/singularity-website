<template>
  <div class="sectionals">

    <template v-for="section in sections">
      <section
        v-if="!section.hide"
        :id="section.id"
        :key="section.id"
        :class="['sectional', section.id]">
        <!-- ============================================ [Section] Off Grid -->
        <div
          v-if="section.off_grid"
          :id="`${section.id}-background`"
          class="section-background">

          <component
            :is="component.name"
            v-for="(component, i) in section.off_grid"
            :key="`${section.id}-background-${i}`"
            v-bind="component.props" />

        </div>

        <!-- ================================================ [Section] Grid -->
        <div :class="[getGridClasses(section.grid), section.classNames]">
          <template v-for="(block, blockId) in section">
            <div
              v-if="blockAllowed(blockId)"
              :key="blockId"
              :class="[getColumnCount(block)]"
              :data-block-id="blockId"
              :data-push-left="getColumnPushCount(block, 'left')"
              :data-push-right="getColumnPushCount(block, 'right')">
              <div class="column-content">

                <!-- ======================================== [Block] Custom -->
                <template v-if="block.type === 'custom'">
                  <component
                    :is="component.name"
                    v-for="(component, componentKey) in block.customizations"
                    :key="componentKey"
                    v-bind="component.props" />
                </template>

                <!-- ======================================= [Block] Dynamic -->
                <component
                  :is="getComponentName(block)"
                  v-else-if="block.type !== 'sectional'"
                  v-bind="{ block }" />

                <!-- ===================== Recursive Sectional/Block imports -->
                <!-- <BlockBuilder
                  v-else
                  :sections="block.sections" /> -->

              </div>
            </div>
          </template>
        </div>
      </section>
    </template>

  </div>
</template>

<script>
import TextBlock from '@/components/blocks/text-block'
import ImageBlock from '@/components/blocks/image-block'
import MarkdownBlock from '@/components/blocks/markdown-block'
import CodeBlock from '@/components/blocks/code-block'
import CardListBlock from '@/components/blocks/card-list-block'
import SubfooterCard from '@/components/subfooter-card'
import AccordionBlock from '@/components/blocks/accordion-block'
import Roadmap from '@/components/roadmap'
// import BlockBuilder from '@/components/blocks/block-builder'

export default {
  name: 'BlockBuilder',

  components: {
    TextBlock,
    ImageBlock,
    CodeBlock,
    CardListBlock,
    SubfooterCard,
    AccordionBlock,
    Roadmap,
    // BlockBuilder,
    MarkdownBlock
  },

  props: {
    sections: {
      type: Object,
      required: true
    }
  },

  methods: {
    getGridClasses (blockGrid) {
      const classList = ['grid']
      if (typeof blockGrid === 'object' && Array.isArray(blockGrid) && blockGrid.length > 0) {
        blockGrid.forEach(className => classList.push(`-${className}`))
      }
      return classList.join('')
    },
    blockAllowed (blockId) {
      return !['grid', 'classNames', 'off_grid', 'slug', 'hide', 'id'].includes(blockId)
    },
    getColumnCount (block) {
      return block.cols.num
    },
    getColumnPushCount (block, direction) {
      return block.cols.hasOwnProperty(`push_${direction}`) ? block.cols[`push_${direction}`] : undefined
    },
    getComponentName (block) {
      const type = block.type
      let name = ''
      switch (type) {
        case 'text_block' : name = 'TextBlock'; break
        case 'image_block' : name = 'ImageBlock'; break
        case 'markdown_block': name = 'MarkdownBlock'; break
        case 'card_list_block': name = 'CardListBlock'; break
        case 'subfooter_card': name = 'SubfooterCard'; break
        case 'accordion_block': name = 'AccordionBlock'; break
        case 'custom' : name = block.component; break
      }
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
.sectionals {
  width: 100%;
}
.sectional {
  position: relative;
  padding: 5rem 0;
}
</style>
