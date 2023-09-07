<template>
  <div
    class="signup-card"
    :style="cardStyles">
    <div class="content">

      <div class="title-wrapper">

        <IconPieChartIcon />

        <div v-if="title" class="title">
          {{ title }}
        </div>


      </div>

      <div v-if="description" class="description">
        {{ description }}
      </div>

      <div class="signup-form">

        <div class="name-fields">
          <input
            class="first-name form-field"
            type="text"
            :placeholder="firstNameField.placeholder"
            required="true"
            @input="updateInputValue($event.target.value, 'firstName')" />
          <input
            class="last-name form-field"
            type="text"
            :placeholder="lastNameField.placeholder"
            required="true"
            @input="updateInputValue($event.target.value, 'lastName')" />
        </div>

        <input
          class="email form-field"
          type="email"
          :placeholder="emailField.placeholder"
          required="true"
          @input="updateInputValue($event.target.value, 'email')" />


        <input
          class="org form-field"
          :placeholder="orgField.placeholder"
          type="text"
          required="true"
          @input="updateInputValue($event.target.value, 'org')" />


        <ZeroDropdown class="country form-field" :display-selected="true">
          <template #toggle-button="{ togglePanel, selected }">
            <div class="toggle-button" @click="togglePanel">
              <p v-if="selected" class="toggle-button-label">
                {{ selected.label }}
              </p>
              <p v-else class="toggle-button-label">
                Country
              </p>
            </div>
          </template>
          <template #dropdown-panel="{ setSelected, closePanel }">
            <div class="dropdown-panel">
              <div
                v-for="option in countryField.options"
                :key="option.code"
                class="options">
                <p
                  class="option-label"
                  @click="selectOption(setSelected, closePanel, option, 'country')"
                  v-html="option.label" />
              </div>
            </div>
          </template>
        </ZeroDropdown>

        <ZeroDropdown class="familiarity" :display-selected="true">
          <template #toggle-button="{ togglePanel, selected }">
            <h3 class="dropdown-label" v-html="familiarityField.label" />
            <div class="toggle-button form-field" @click="togglePanel">
              <p v-if="selected" class="toggle-button-label">
                {{ selected }}
              </p>
              <p v-else class="toggle-button-label">
                Select an option
              </p>
            </div>
          </template>
          <template #dropdown-panel="{ setSelected, closePanel }">
            <div class="dropdown-panel">
              <div
                v-for="(option, index) in familiarityField.options"
                :key="index"
                class="options">
                <p
                  class="option-label"
                  @click="selectOption(setSelected, closePanel, option, 'familiarity')"
                  v-html="option" />
              </div>
            </div>
          </template>
        </ZeroDropdown>

        <ZeroButton
          class="submit-button"
          @clicked="submitForm">
          <span class="button-label"> Register </span>
        </ZeroButton>

      </div>

    </div>
  </div>
</template>

<script setup>
const SINGULARITY_DEMO_SIGNUPS_TOKEN = import.meta.env.VITE_AIRTABLE_SINGULARITY_DEMO_TOKEN
// ======================================================================= Props
const props = defineProps({
  signupCard: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// ======================================================================== Data
const firstName = ref(false)
const lastName = ref(false)
const email = ref(false)
const organization = ref(false)
const country = ref(false)
const filecoinFamiliarity = ref(false)


// ==================================================================== Computed
const title = computed(() => { return props.signupCard.title })

const description = computed(() => { return props.signupCard.description })

const cardStyles = computed(() => {
  if (props.signupCard.borderGradientAngle) {
    return { '--border-gradient-angle': props.signupCard.borderGradientAngle }
  }
  return null
})

const firstNameField = computed(() => { return props.signupCard.signup_form.first_name })

const lastNameField = computed(() => { return props.signupCard.signup_form.last_name })

const emailField = computed(() => { return props.signupCard.signup_form.email })

const orgField = computed(() => { return props.signupCard.signup_form.org })

const countryField = computed(() => { return props.signupCard.signup_form.country })

const familiarityField = computed(() => { return props.signupCard.signup_form.filecoin_familiarity })

// ===================================================================== Methdos
/**
 * @method updateInputValue
 */
const updateInputValue = (val, field) => {
  switch(field) {
    case 'firstName':
      firstName.value = val
      break
    case 'lastName':
      lastName.value = val
      break
    case 'email':
      email.value = val
      break
    case 'org':
      organization.value = val
      break
  }
}
/**
 * @method selectOption
 */
const selectOption = (setSelected, closePanel, option, field) => {
  if (option) {
    setSelected(option)
    closePanel()
    switch(field) {
      case 'country':
        country.value = option
        break
      case 'familiarity':
        filecoinFamiliarity.value = option
        break
    }
   }
}
/**
 * @method submitForm
 */
const submitForm = async () => {
  if (firstName.value && lastName.value && email.value && organization.value && country.value && filecoinFamiliarity.value) {
    const body = {
        records: [
          {
            fields: {
              email: email.value,
              firstName: firstName.value,
              lastName: lastName.value,
              organization: organization.value,
              country: country.value.label,
              filecoinFamiliarity: filecoinFamiliarity.value
            }
          }
        ]
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SINGULARITY_DEMO_SIGNUPS_TOKEN}`
      }
    await $fetch('https://api.airtable.com/v0/apphbQmrNLNNXiaqG/tblDUSr66nczukX9Y', {
      method: 'POST',
      body,
      headers
    })
  }
}
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

.option-label {
  cursor: pointer;
}

</style>
