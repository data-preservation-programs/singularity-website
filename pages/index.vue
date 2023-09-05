<template>
  <main class="page page-index">

    <BlockBuilder :sections="sections" />

  </main>
</template>

<script setup>
import BlockBuilder from '@/components/blocks/block-builder'

// ======================================================================== Data
const { data } = await useAsyncData('core', async () => {
  return queryContent('core').find()
})

// ==================================================================== Computed
const sections = computed(() => {
  const index = data._rawValue.find((item) => item._file === 'core/index.json')
  return index.page_content
})

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  width: 3rem;
  margin-right: 1rem;
}

.border-test {
  position: relative;
  margin-top: 3rem;
  padding: 3rem;
  transform: translateY(-100px);
  @include cardPanel(315deg);
}

.content {
  position: relative;
  z-index: 2;
}

// //////////////////////////////////////////////////////////////////// Sections
:deep(#hero-header) {
  position: relative;
  padding-top: 4.0625rem;
  padding-bottom: toRem(100);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + toRem(936));
    background-image: url('/images/ring-of-circular-cross-sections.png');
    background-size: 2140px;
    background-position: center bottom;
    background-repeat: no-repeat;
  }
  div[data-block-id="col_1"] {
    .text-block {
      .description {
        padding-right: toRem(50);
        margin-bottom: toRem(43);
      }
      .theme__caption {
        margin-top: 1rem;
        .button-content {
          @include disclaimerText;
        }
      }
    }
  }
  .code-block,
  .card-list-block {
    margin-left: toRem(-50);
  }
  .code-block {
    margin-bottom: toRem(48);
  }
  div[data-block-id="col_2"] {
    .text-block {
      .button-row {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}

:deep(#section-intro) {
  position: relative;
  padding-bottom: toRem(100);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + toRem(3000));
    background-image: url('/images/warped-torus-made-of-segments.png');
    background-size: 2200px;
    background-position: center bottom;
    background-repeat: no-repeat;
  }
  .text-block {
    .button-row {
      display: flex;
    }
  }
}
</style>
