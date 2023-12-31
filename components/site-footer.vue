<template>
  <footer id="site-footer" :class="{ 'no-background-image': noBackgroundImage }">

    <div class="content">
      <div class="grid-bottom-noBottom-noGutter">

        <div class="col-2_sm-5">
          <button
            class="site-footer-logo"
            @click="scrollToTop"
            @keyup.enter="scrollToTop">
            <SiteFooterLogo />
          </button>
        </div>

        <div class="col-4_sm-12 legal-wrapper" data-push-left="off-1_md-0">
          <div v-if="legal" class="legal">
            <ZeroButton
              v-for="(link) in legal.links"
              :key="link.text"
              :to="link.to"
              :tag="link.tag"
              class="footer-button">
              {{ link.text }}
            </ZeroButton>
          </div>
        </div>

        <div class="col-4_sm-5_mi-7" data-push-left="off-1_md-2_mi-0">
          <div v-if="authors" class="authors">
            <div
              class="text"
              v-html="authors.text">
            </div>
            <div class="logos">
              <ZeroButton to="https://dataprograms.org/" tag="a">
                <DataProgramsLogo class="logo" />
              </ZeroButton>
              <ZeroButton to="https://protocol.ai/" tag="a">
                <ProtocolLabsLogo class="logo" />
              </ZeroButton>
            </div>
          </div>
        </div>

      </div>
    </div>

  </footer>
</template>

<script setup>
// ======================================================================== Data
const generalStore = useGeneralStore()

// ======================================================================= Props
const props = defineProps({
  noBackgroundImage: {
    type: Boolean,
    required: false,
    default: false
  }
})

// ==================================================================== Computed
const noBackgroundImage = computed(() => { return props.noBackgroundImage })

const authors = computed(() => {
  return generalStore.siteContent.general?.footer.authors
})

const legal = computed(() => {
  return generalStore.siteContent.general?.footer.legal
})

const scrollToTop = async () => {
  const header = document.getElementById('site-header')
  if (header) {
    await navigateTo({ path: '/' })
    header.scrollIntoView({ behavior: 'smooth' })
  }
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#site-footer {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: toRem(34) 0;
  height: toRem(234);
  z-index: 10;
  @include gridMaxMQ {
    padding-top: toRem(72);
    height: unset;
  }
  &.no-background-image {
    &::before {
      display: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: right bottom;
    background-repeat: no-repeat;
    background-image: url('/images/ring-of-cross-sections-on-angle-footer.png');
    @include mini {
      background-position: 4rem -5.5rem;
    }
    @include tiny {
      background-position: 4rem -3.5rem;
    }
  }
}

.content {
  position: relative;
  width: 100%;
}

.site-footer-logo {
  display: block;
  padding: toRem(6) toRem(6) 0;
  &:hover,
  &:focus-visible {
    :deep(svg) {
      @include transitionDefault;
      transform: scale(1.08);
    }
  }
  &:focus-visible {
    @include focusOutline
  }
  @include medium {
    :deep(svg) {
      width: toRem(95);
    }
  }
}

.authors {
  @include small {
    padding-left: 1rem;
  }
  .text {
    @include formFieldText;
    margin-bottom: toRem(28);
    @include medium {
      font-size: toRem(14);
      :deep(a) {
        font-size: toRem(14);
      }
    }
    @include mini {
      margin-bottom: toRem(22);
    }
    :deep(a) {
      display: inline-block;
      @include transitionDefault;
      &:hover,
      &:focus-visible {
        transform: scale(1.1) translateX(-10px);
      }
      &:focus-visible {
        @include focusOutline;
      }
    }
    :deep(span) {
      &.green {
        color: $sageGreen;
        font-weight: 600;
      }
    }
  }
  .logos {
    display: flex;
    :deep(.button) {
      display: flex;
      @include transitionDefault;
      @include small {
        align-items: flex-end;
      }
      &:first-child {
        margin-right: toRem(43);
        @include small {
          margin-right: 10%;
          width: 50%;
        }
        @include tiny {
          width: 40%;
        }
      }
      &:last-child {
        @include small {
          width: 40%;
        }
        @include tiny {
          width: 32%;
        }
      }
      &:hover,
      &:focus-visible {
        transform: scale(1.08);
      }
      &:focus-visible {
        @include focusOutline;
      }
    }
  }
}

.legal-wrapper {
  @include small {
    order: 1;
  }
}
.legal {
  @include medium {
    display: flex;
    justify-content: space-between;
  }
  @include small {
    margin-top: toRem(39);
  }
}

.footer-button {
  position: relative;
  @include footerButton;
  color: $sageGreen;
  white-space: nowrap;
  &::after {
    content: '';
    position: absolute;
    bottom: toRem(-5);
    right: 0;
    width: 100%;
    height: 1px;
    background-color: $sageGreen;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 200ms cubic-bezier(0.33, 0.2, 0.41, 0.99);
  }
  &:not(:last-child) {
    margin-right: toRem(47);
    @include large {
      margin-right: toRem(27);
    }
  }
  @include medium {
    margin-right: 0;
    margin-left: auto;
  }
  @include small {
    margin: 0;
  }
  &:hover {
    &::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
  &:focus-visible {
    @include focusOutline;
  }
}
</style>
