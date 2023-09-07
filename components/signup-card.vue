<template>
  <div
    class="signup-card"
    :style="cardStyles">
    <div class="content">

      <div class="text">

        <IconPieChartIcon />

        <div v-if="title" class="title">
          {{ title }}
        </div>

        <div v-if="description" class="description">
          {{ description }}
        </div>

      </div>

      <div class="signup-form">

        <div class="name-fields">
          <input
            class="first-name form-field"
            type="text"
            :placeholder="firstName.placeholder"
            required="true" />
          <input
            class="last-name form-field"
            type="text"
            :placeholder="lastName.placeholder"
            required="true" />
        </div>

        <input
          class="email form-field"
          type="email"
          :placeholder="email.placeholder"
          required="true" />

        <input
          class="org form-field"
          :placeholder="org.placeholder"
          type="text"
          required="true" />

        <ZeroDropdown class="country form-field" :display-selected="true">
          <template #toggle-button="{ togglePanel }">
            <div class="toggle-button" @click="togglePanel">
              <p class="toggle-button-label">
                Country
              </p>
            </div>
          </template>
          <template #dropdown-panel>
            <div class="dropdown-panel">
              <div
                v-for="option in country.options"
                :key="option.code"
                class="country-option">
                <p class="country-label" v-html="option.label" />
              </div>
            </div>
          </template>
        </ZeroDropdown>

        <ZeroDropdown class="familiarity" :display-selected="true">
          <template #toggle-button="{ togglePanel }">
            <h3 class="dropdown-label" v-html="familiarity.label" />
            <div class="toggle-button form-field" @click="togglePanel">
              <p class="toggle-button-label">
                Select an option
              </p>
            </div>
          </template>
          <template #dropdown-panel>
            <div class="dropdown-panel">
              <div
                v-for="(option, index) in familiarity.options"
                :key="index"
                class="country-option">
                <p class="country-label" v-html="option" />
              </div>
            </div>
          </template>
        </ZeroDropdown>

      </div>

    </div>
  </div>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  signupCard: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// ==================================================================== Computed
const title = computed(() => { return props.signupCard.title })

const description = computed(() => { return props.signupCard.description })

const cardStyles = computed(() => {
  if (props.signupCard.borderGradientAngle) {
    return { '--border-gradient-angle': props.signupCard.borderGradientAngle }
  }
  return null
})

const firstName = computed(() => { return props.signupCard.signup_form.first_name })

const lastName = computed(() => { return props.signupCard.signup_form.last_name })

const email = computed(() => { return props.signupCard.signup_form.email })

const org = computed(() => { return props.signupCard.signup_form.org })

const country = computed(() => { return props.signupCard.signup_form.country })

const familiarity = computed(() => { return props.signupCard.signup_form.filecoin_familiarity })


</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.signup-card {
  --border-gradient-angle: 0deg;
  @include cardPanel(var(--border-gradient-angle));
}

.signup-card {
  padding: toRem(30) toRem(24);
  .content {
    position: relative;
    z-index: 2;
  }
  .icon {
    margin-bottom: toRem(45);
  }
  .title {
    @include h3;
    color: $sageGreen;
    margin-bottom: toRem(25);
  }
  .description {
    @include p2;
    margin-bottom: toRem(22);
  }
}

// //////////////////////////////////////////////////////////////////////// Form
.form-field {
  border: var(--brand-color) 1px solid;
  border-radius: toRem(5);
  &:is(:not(.first-name, .last-name, :last-child)) {
    margin-bottom: toRem(24);
  }
}

</style>
