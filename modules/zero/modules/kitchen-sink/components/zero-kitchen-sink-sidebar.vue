<template>
  <div class="sidebar">

    <!-- ============================================================== Logo -->
    <nuxt-link
      to="/zero-kitchen-sink"
      class="logo-link">
      <svg
        class="logo"
        viewBox="0 0 45 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 8.04706C9 7.4928 9.44931 7.04349 10.0036 7.04349H12.2821H13.2847H16.528C17.0823 7.04349 17.5316 7.4928 17.5316 8.04706V10.3052C17.5316 10.8594 17.9809 11.3087 18.5352 11.3087L20.7933 11.3087C21.3476 11.3087 21.7969 10.8594 21.7969 10.3052V8.04706C21.7969 7.4928 22.2462 7.04349 22.8004 7.04349H33.589C34.1432 7.04349 34.5925 7.4928 34.5925 8.04706V10.3052C34.5925 10.8594 34.1432 11.3087 33.589 11.3087L31.4269 11.3087C30.8727 11.3087 30.4233 11.7581 30.4233 12.3123V14.4884C30.4233 15.0427 29.974 15.492 29.4198 15.492H27.691C27.1367 15.492 26.6874 15.9413 26.6874 16.4956V18.7126C26.6874 19.2669 27.1367 19.7162 27.691 19.7162H29.4198C29.974 19.7162 30.4233 20.1655 30.4233 20.7198V22.9369C30.4233 23.4911 30.8727 23.9404 31.4269 23.9404H37.9458C38.5001 23.9404 38.9494 24.3897 38.9494 24.944V27.1611C38.9494 27.7154 38.5001 28.1647 37.9458 28.1647H31.5651C31.0109 28.1647 30.5616 28.614 30.5616 29.1682V31.2945C30.5616 31.8487 31.0109 32.298 31.5651 32.298H33.7968C34.3511 32.298 34.8004 32.7474 34.8004 33.3016V35.655C34.8004 36.2092 34.3511 36.6585 33.7968 36.6585H31.4269C30.8727 36.6585 30.4233 37.1079 30.4233 37.6621V39.8338C30.4233 40.3881 29.974 40.8374 29.4198 40.8374H27.1422C26.588 40.8374 26.1387 40.3881 26.1387 39.8338V37.6167C26.1387 37.0625 26.588 36.6132 27.1422 36.6132H29.3739C29.9282 36.6132 30.3775 36.1638 30.3775 35.6096V33.3017C30.3775 32.7474 29.9282 32.2981 29.3739 32.2981H27.1422C26.588 32.2981 26.1387 31.8488 26.1387 31.2945V29.1228C26.1387 28.5686 26.588 28.1193 27.1422 28.1193H29.3764C29.9307 28.1193 30.38 27.67 30.38 27.1157V24.944C30.38 24.3898 29.9307 23.9405 29.3764 23.9405H27.1422C26.588 23.9405 26.1387 23.4911 26.1387 22.9369V20.7652C26.1387 20.211 25.6894 19.7617 25.1351 19.7617H22.7982C22.244 19.7617 21.7947 20.211 21.7947 20.7652V24.1045V28.0416V39.8338C21.7947 40.3881 21.3454 40.8374 20.7911 40.8374L17.5316 40.8374H13.2847H12.2821H10.0036C9.44931 40.8374 9 40.3881 9 39.8338V8.04706ZM25.1351 15.2195C25.6894 15.2195 26.1387 14.7702 26.1387 14.2159V12.3123C26.1387 11.7581 25.6894 11.3087 25.1351 11.3087L23.1263 11.3087C22.5721 11.3087 22.1228 11.7581 22.1228 12.3123V14.2159C22.1228 14.7702 22.5721 15.2195 23.1263 15.2195H25.1351ZM36.7272 11.2223C35.4588 11.2223 34.4305 12.2505 34.4305 13.5189C34.4305 14.7873 35.4588 15.8156 36.7272 15.8156C37.9956 15.8156 39.0238 14.7873 39.0238 13.5189C39.0238 12.2505 37.9956 11.2223 36.7272 11.2223Z"
          fill="#181818" />
        <rect
          x="1.50536"
          y="1.50531"
          width="41.9893"
          height="43.5548"
          rx="3.47033"
          stroke="#181818"
          stroke-width="3.01072" />
      </svg>
      <div class="heading">
        Nuxt 3 Starter
      </div>
    </nuxt-link>

    <!-- ================================================== Sections & Links -->
    <div class="sections">
      <div
        v-for="section in sections"
        :key="section.title"
        class="section">

        <div class="title h5">
          {{ section.title }}
        </div>

        <nuxt-link
          v-for="link in section.links"
          :key="link.path"
          :to="baseURL + link.path"
          class="page-link">
          {{ link.text }}
        </nuxt-link>

      </div>
    </div>

  </div>
</template>

<script setup>
// ======================================================================== Data
const baseURL = '/zero-kitchen-sink'

const sections = [
  {
    title: 'Modules/Components',
    links: [
      { path: '/markdown-parser', text: 'Markdown Parser' },
      { path: '/dropdown', text: 'Dropdown' },
      { path: '/algolia', text: 'Algolia Search' },
      { path: '/api-preview', text: 'API Preview' },
      { path: '/form', text: 'Form' }
    ]
  },
  {
    title: 'Authentication',
    links: [
      { path: '/authentication', text: 'Authentication' },
      { path: '/authentication/protected', text: 'Protected 🛡️ ' },
      { path: '/authentication/redirect-unauthenticated', text: 'redirectUnauthenticated' },
      { path: '/authentication/redirect-after-login', text: 'redirectAfterLogin 🛡️' },
      { path: '/authentication/redirect-after-logout', text: 'redirectAfterLogout' }
    ]
  }
]
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20rem 2rem;
  min-height: 100vh;
  height: 100%;
  background-color: #E7E7E7;
}

.heading {
  font-weight: 700;
}

.logo-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3rem;
}

.logo {
  width: 1.25rem;
  margin-right: 0.5rem;
}

// //////////////////////////////////////////////////////////// Sections & Links
.sections {
  width: 100%;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:not(:first-child) {
    margin-top: 2rem;
  }
}

.title {
  font-weight: 600;
}

.page-link {
  color: blue;
  font-size: toRem(14);
  &:hover {
    text-decoration: underline;
  }
}
</style>
