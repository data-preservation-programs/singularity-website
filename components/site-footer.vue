<template>
  <footer id="site-footer">

    <div class="panel-top">
      <div class="grid-bottom-noBottom-noGutter">

        <div class="col-2">
          <nuxt-link to="/" class="site-footer-logo">
            <SiteFooterLogo />
          </nuxt-link>
        </div>

        <div class="col-4" data-push-left="off-6">
          <div class="authors">
            <div
              class="text"
              v-html="authors.text">
            </div>
            <div class="logos">
              <ZeroButton to="https://dataprograms.org/" tag="a">
                <DataProgramsLogo />
              </ZeroButton>
              <ZeroButton to="https://protocol.ai/" tag="a">
                <ProtocolLabsLogo />
              </ZeroButton>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="panel-bottom">
      <div class="grid-bottom-noBottom-noGutter">

        <div class="col-3_md-2">
          <!-- dummy div -->
        </div>

        <div class="col-4_md-5">
          <div class="legal">
            <ZeroButton
              v-for="link in legal.links"
              :key="link.text"
              :to="link.to"
              :tag="link.tag"
              class="footer-button">
              {{ link.text }}
            </ZeroButton>
          </div>
        </div>

      </div>
    </div>

  </footer>
</template>

<script setup>
// ===================================================================== Imports
import GeneralSiteData from '@/content/core/general.json'

// ==================================================================== Computed
const authors = computed(() => {
  return GeneralSiteData.footer.authors
})

const legal = computed(() => {
  return GeneralSiteData.footer.legal
})

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
  @include gridMaxMQ {
    padding-top: toRem(72);
    height: unset;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - $halfGridWidth - 3rem);
    width: calc(100% + 10rem);
    height: 100%;
    background-size: 1439px 1200px;
    background-position: 315px -29px;
    background-repeat: no-repeat;
    background-image: url('/images/ring-of-cross-sections-on-angle.png');
    @include gridMaxMQ {
      height: calc(100% + 10rem);
      width: 100%;
      top: -10rem;
      left: calc(100% - 52rem);
      background-position: -227px -33px;
    }
  }
}

.panel-top,
.panel-bottom {
  position: relative;
  width: 100%;
}

.site-footer-logo {
  display: block;
  :deep(svg) {
    @include transitionDefault;
    &:hover {
      transform: scale(1.08);
    }
  }
  @include medium {
    width: toRem(95);
  }
}

.authors {
  .text {
    @include formFieldText;
    margin-bottom: toRem(28);
    @include medium {
      font-size: toRem(14);
      :deep(a) {
        font-size: toRem(14);
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
      @include transitionDefault;
      &:not(:last-child) {
        margin-right: toRem(43);
      }
      &:hover {
        transform: scale(1.08);
      }
    }
  }
}

.legal {
  transform: translateY(-100%);
  @include medium {
    display: flex;
    justify-content: space-between;
    transform: translate(1rem, calc(-100% + 0.375rem));
  }
}

.footer-button {
  position: relative;
  padding: toRem(6) 0;
  @include footerButton;
  color: $sageGreen;
  @include transitionDefault;
  border-bottom: solid 1px rgba($sageGreen, 0);
  white-space: nowrap;
  &:not(:last-child) {
    margin-right: toRem(47);
    @include large {
      margin-right: toRem(27);
    }
    @include medium {
      margin-right: 0;
      margin-left: auto;
    }
  }
  &:hover {
    border-bottom: solid 1px rgba($sageGreen, 1);
  }
  @include medium {
    margin-right: 0;
    margin-left: auto;
  }
}
</style>
