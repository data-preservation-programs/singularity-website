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
      @include medium {
        margin-right: 2rem;
      }
      .heading {
        @include medium {
          margin-bottom: toRem(17);
        }
      }
      .description {
        padding-right: toRem(50);
        margin-bottom: toRem(43);
        @include medium {
          margin-bottom: toRem(27);
        }
      }
      .theme__caption {
        margin-top: 1rem;
        .button-content {
          @include disclaimerText;
          white-space: normal;
          @include medium {
            padding-right: 4rem;
          }
        }
      }
    }
  }
  .code-block,
  .card-list-block {
    margin-left: toRem(-50);
    @include medium {
      margin: 0;
    }
    @include small {
      margin-left: -1rem;
    }
  }
  .code-block {
    margin-bottom: toRem(48);
    @include medium {
      margin-bottom: toRem(27);
    }
  }
  div[data-block-id="col_2"] {
    .text-block {
      .button-row {
        display: flex;
        justify-content: flex-end;
        @include large {
          transform: translateY(-1rem);
        }
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
    @include medium {
      background-size: 1750px;
    }
  }
  .text-block {
    .button-row {
      display: flex;
    }
  }
  .card-list-block {
    @include medium {
      margin: 0 -0.5rem;
    }
    .card-wrapper {
      @include medium {
        &:nth-child(1),
        &:nth-child(4) {
          .card {
            height: calc(100% - 2.5rem);
          }
        }
        &:nth-child(3) {
          transform: translateY(-2.5rem);
        }
      }
    }
  }
}

:deep(#section-features) {
  @include medium {
    padding-top: toRem(35);
  }
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
  .accordion-block {
    .accordion-heading {
      .icon {
        @include medium {
          margin-right: 1rem;
        }
      }
      .h3 {
        @include large {
          font-size: toRem(16);
          line-height: leading(27, 16);
        }
      }
    }
  }
}

:deep(#section-how-it-works) {
  @include medium {
    padding-top: 0.875rem;
  }
}

:deep(#section-roadmap) {
  div[data-block-id="col_1"] {
    margin-bottom: toRem(45);
    @include medium {
      margin-bottom: toRem(15);
    }
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
    height: calc(toRem(866) + toRem(68) + toRem(234)); // section height + top displacement + footer height
    background-image: url('/images/ring-of-cross-sections-from-above.png');
    background-size: 1300px;
    background-position: center top;
    background-repeat: no-repeat;
    transform: translateX(calc(-50% - 3rem));
    @include gridMaxMQ {
      top: toRem(-200);
      height: calc(toRem(960) + toRem(68) + toRem(234));
    }
    @include medium {
      height: calc(toRem(856) + toRem(68) + toRem(234));
    }
  }
  div[data-block-id="col_1"],
  div[data-block-id="col_2"] {
    padding-bottom: toRem(12);
  }
  div[data-block-id="col_1"] {
    .column-content{
      margin-right: 0.5rem;
      width: calc(100% - 0.5rem);
    }
  }
  div[data-block-id="col_2"] {
    .column-content{
      margin-left: 0.5rem;
      width: calc(100% - 0.5rem);
    }
  }
}
</style>
