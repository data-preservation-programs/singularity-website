<template>
  <main class="page page-index">

    <BlockBuilder :sections="sections" />

  </main>
</template>

<script setup>
// ===================================================================== Imports
import BlockBuilder from '@/components/blocks/block-builder'

// ======================================================================== Data
const generalStore = useGeneralStore()
const route = useRoute()
const { data } = await useAsyncData('core', async () => {
  return queryContent('core').find()
})

// ==================================================================== Watchers
watch(data, async (val) => {
  await generalStore.getBaseData('general')
  await generalStore.getBaseData({ key: 'index', data: val.find((item) => item._file === 'core/index.json') })
}, { immediate: true })

// ==================================================================== Computed
const sections = computed(() => {
  return generalStore.siteContent?.index?.page_content
})

// ==================================================================== On Mount
onMounted(() => {
  setTimeout(async () => {
    if (route.query.section) {
      const section = document.getElementById(route.query.section)
      if (section) {
        await nextTick()
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, 1)
})

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @include small {
    padding-top: $siteHeaderHeight;
  }
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
  @include mini {
    padding-top: toRem(38);
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: calc(100% + toRem(880));
    background-image: url('/images/ring-of-circular-cross-sections.jpg');
    background-size: 2040px;
    background-position: center bottom;
    background-repeat: no-repeat;
    @include mini {
      background-size: 820px;
      height: calc(100% + toRem(340));
    }
  }
  div[data-block-id="col_1"] {
    .text-block {
      @include medium {
        margin-right: 2rem;
      }
      @include mini {
        margin-right: 0;
        margin-bottom: toRem(23);
        .button-row {
          display: flex;
          justify-content: flex-end;
        }
        .theme__primary:first-child {
          margin-right: 0;
        }
      }
      @include tiny {
        .theme__primary:first-child{
          margin-right: 1.6rem;
        }
      }
      .heading {
        @include medium {
          margin-bottom: toRem(17);
        }
      }
      .description {
        margin-bottom: toRem(43);
        @include medium {
          margin-bottom: toRem(27);
        }
      }
      .theme__primary {
          @include iOSonly {
            background-color: #070707;
          }
      }
      .theme__caption {
        margin-top: 1rem;
        @include mini {
          display: none;
        }
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
    @include mini {
      margin: 0;
    }
  }
  .code-block {
    margin-bottom: toRem(48);
    @include medium {
      margin-bottom: toRem(34);
    }
  }
  .card-list-block {
    .card-wrapper {
      @include mini {
        margin-bottom: 1rem;
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
            margin-bottom: 1.5rem;
        }
      }
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
        @include mini {
          transform: translateY(-1.5rem);
        }
      }
    }
  }
}

:deep(#section-intro) {
  position: relative;
  padding-bottom: 0;
  @include mini {
    padding-bottom: 1.5rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: calc(100% - 370px);
    left: 0;
    z-index: -1;
    width: calc(100% + 270px);
    height: 130rem;
    transform: translateX(-270px);
    background-image: url('/images/warped-torus-made-of-segments.jpg');
    background-size: 2000px;
    background-position: center top;
    background-repeat: no-repeat;
    @include medium {
      background-size: 1750px;
    }
    @include mini {
      display: none;
    }
  }
  .text-block {
    @include mini {
      margin-bottom: toRem(42);
      .label {
        margin-bottom: toRem(25);
      }
      .heading {
        margin-bottom: toRem(22);
      }
      .description {
        margin-bottom: toRem(31);
      }
    }
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
            @include mini {
              height: 100%;
            }
          }
        }
        &:nth-child(2),
        &:nth-child(3) {
          .card {
            @include mini {
              height: calc(100% + 2.5rem);
            }
          }
        }
        &:nth-child(3) {
          .card {
            transform: translateY(-2.5rem);
            @include mini {
              transform: translateY(0);
            }
          }
        }
        &:nth-child(4) {
          .card {
            @include mini {
              transform: translateY(2.5rem);
            }
          }
        }
      }
    }
  }
}

:deep(#features) {
  padding-top: 0;
  z-index: 10;
  @include medium {
    padding-top: toRem(35);
  }
  @include mini {
    padding-top: toRem(75);
  }
  div[data-block-id="col_2"] {
    .accordion-block {
      margin-right: toRem(9);
      @include small {
        margin: 0;
      }
    }
  }
  div[data-block-id="col_3"] {
    .accordion-block {
      margin-left: toRem(9);
      @include small {
        margin: 0;
      }
    }
    .text-block {
      .button-row {
        display: flex;
        justify-content: flex-end;
      }
      .button {
        transform: translateY(-1rem);
        @include mini {
          transform: none;
        }
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

:deep(#how-it-works) {
  padding-top: toRem(60);
  @include medium {
    padding-top: 0.875rem;
  }
  &:before {
    display: none;
    content: '';
    position: absolute;
    top: toRem(-256);
    left: toRem(-50);
    z-index: -1;
    width: calc(100% + toRem(50));
    height: toRem(1480);
    background-image: url('/images/warped-torus-made-of-segments.jpg');
    background-size: 1520px;
    background-position: center top;
    background-repeat: no-repeat;
    @include mini {
      display: block;
    }
  }
  .text-block {
    .heading {
      white-space: nowrap;
      @include mini {
        margin-bottom: toRem(38);
      }
    }
  }
  .card-list-block {
    .card.type__horizontal {
      @include mini {
        @include cardPanel(135deg);
      }
    }
    @include tiny {
      margin: 0 -0.5rem;
    }
  }
}

:deep(#roadmap) {
  padding-top: toRem(11);
  padding-bottom: 2rem;
  div[data-block-id="col_1"] {
    margin-bottom: toRem(45);
    @include medium {
      margin-bottom: toRem(15);
    }
    @include tiny {
      margin-bottom: toRem(6);
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
    z-index: -1;
    width: toRem(1400);
    height: calc(toRem(866) + toRem(68) + toRem(234) - 1rem); // section height + top displacement + footer height - 1rem
    background-image: url('/images/ring-of-cross-sections-from-above.jpg');
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
    @include mini {
      height: toRem(866);
      width: 100%;
      background-size: toRem(866);
      background-position: right top;
      transform: none;
      left: calc(-50% + 6rem);
      top: -5rem;
    }
  }
  div[data-block-id="col_1"],
  div[data-block-id="col_2"] {
    padding-bottom: toRem(12);
    .subfooter-card {
      @include mini {
        @include cardPanel(135deg);
      }
    }
  }
  div[data-block-id="col_1"] {
    .column-content{
      margin-right: 0.5rem;
      width: calc(100% - 0.5rem);
      @include mini {
        margin-right: 0;
        width: 100%;
      }
    }
  }
  div[data-block-id="col_2"] {
    .column-content{
      margin-left: 0.5rem;
      width: calc(100% - 0.5rem);
      @include mini {
        margin-left: 0;
        width: 100%;
      }
    }
  }
}
</style>
