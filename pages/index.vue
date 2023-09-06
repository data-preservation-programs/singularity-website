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
    height: calc(100% + toRem(880));
    background-image: url('/images/ring-of-circular-cross-sections.png');
    background-size: 2040px;
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
  padding-bottom: 0;
  &:before {
    content: '';
    position: absolute;
    top: calc(100% - 370px);
    left: 0;
    width: calc(100% + 270px);
    height: 130rem;
    transform: translateX(-270px);
    background-image: url('/images/warped-torus-made-of-segments.png');
    background-size: 2000px;
    background-position: center top;
    background-repeat: no-repeat;
  }
  .text-block {
    .button-row {
      display: flex;
    }
  }
}

:deep(#section-features) {
  div[data-block-id="col_2"] {
    .accordion-block {
      margin-right: toRem(9);
    }
  }
  div[data-block-id="col_3"] {
    .accordion-block {
      margin-left: toRem(9);
    }
    .text-block {
      .button-row {
        display: flex;
        justify-content: flex-end;
      }
      .button {
        transform: translateY(-1rem);
      }
    }
  }
}

:deep(#section-roadmap) {
  div[data-block-id="col_1"] {
    margin-bottom: toRem(45);
  }
}

:deep(#section-subfooter) {
  position: relative;
  padding-bottom: toRem(52);
  &:before {
    content: '';
    position: absolute;
    top: toRem(-68);
    left: calc(50% - $halfGridWidth - 3rem);
    width: toRem(1400);
    height: calc(100% + toRem(68) + toRem(234));
    background-image: url('/images/ring-of-cross-sections-from-above.png');
    background-size: 1300px;
    background-position: center top;
    background-repeat: no-repeat;
    transform: translateX(calc(-50% - 3rem));
  }
}
</style>
