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

        <div class="col-3">
          <!-- dummy div -->
        </div>

        <div class="col-4">
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
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - $halfGridWidth - 3rem);
    width: 100%;
    height: 100%;
    background-size: 1439px 1200px;
    background-position: 315px -29px;
    background-repeat: no-repeat;
    background-image: url('/images/ring-of-cross-sections-on-angle.png');
  }
}

.site-footer-logo {
  :deep(svg) {
    @include transitionDefault;
    &:hover {
      transform: scale(1.08);
    }
  }
}

.authors {
  .text {
    @include formFieldText;
    margin-bottom: toRem(28);
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
}

.footer-button {
  position: relative;
  padding: toRem(6) 0;
  @include footerButton;
  color: $sageGreen;
  @include transitionDefault;
  border-bottom: solid 1px rgba($sageGreen, 0);
  &:not(:last-child) {
    margin-right: toRem(47);
  }
  &:hover {
    border-bottom: solid 1px rgba($sageGreen, 1);
  }
}
</style>
