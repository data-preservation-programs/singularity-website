<template>
  <div
    class="signup-card"
    :style="cardStyles">
    <div class="content">

      <div class="title-wrapper">
        <img class="title-img" :src="img" />

        <h1 v-if="title" class="title">
          {{ title }}
        </h1>


      </div>

      <div v-if="description" class="description">
        {{ description }}
      </div>

      <div class="signup-form">

        <div class="name-fields">
          <div class="field-wrapper">
            <input
              :class="['first-name input-field form-field', { error: fieldError.firstName }]"
              type="text"
              :placeholder="firstNameField.placeholder"
              required="true"
              @input="updateInputValue($event.target.value, 'firstName')" />
            <span v-if="fieldError.firstName" class="error message" v-html="errorMessage" />
          </div>

          <div class="field-wrapper">
            <input
              :class="['last-name input-field form-field', { error: fieldError.lastName }]"
              type="text"
              :placeholder="lastNameField.placeholder"
              required="true"
              @input="updateInputValue($event.target.value, 'lastName')" />
            <span v-if="fieldError.lastName" class="error message" v-html="errorMessage" />
          </div>
        </div>

        <div class="field-wrapper">
          <input
            :class="['email input-field form-field', { error: fieldError.email }]"
            type="email"
            :placeholder="emailField.placeholder"
            required="true"
            @input="updateInputValue($event.target.value, 'email')" />
          <span v-if="fieldError.email" class="error message" v-html="errorMessage" />
        </div>

        <div class="field-wrapper">
          <input
            :class="['organization input-field form-field', { error: fieldError.organization }]"
            :placeholder="orgField.placeholder"
            type="text"
            required="true"
            @input="updateInputValue($event.target.value, 'organization')" />
          <span v-if="fieldError.organization" class="error message" v-html="errorMessage" />
        </div>

        <div class="field-wrapper">
          <ZeroDropdown class="country dropdown-field" :display-selected="true">
            <template #toggle-button="{ togglePanel, panelOpen, selected }">
              <div :class="['toggle-button form-field', { error: fieldError.country }, { open: panelOpen } ]" @click="togglePanel">
                <p v-if="selected" class="toggle-button-label selected">
                  {{ selected.label }}
                </p>
                <p v-else class="toggle-button-label">
                  Country
                </p>
                <IconChevron />
              </div>
            </template>
            <template #dropdown-panel="{ setSelected, closePanel }">
              <div class="dropdown-panel">
                <p
                  v-for="option in countryField.options"
                  :key="option.code"
                  class="option"
                  @click="selectOption(setSelected, closePanel, option, 'country')"
                  v-html="option.label" />
              </div>
            </template>
          </ZeroDropdown>
          <span v-if="fieldError.country" class="error message" v-html="errorMessage" />
        </div>

        <ButtonCta
          :class="['submit-button', { submitted: formSubmitted }]"
          theme="primary"
          @clicked="submitForm">
          <span class="button-label"> {{ submitButtonLabel }} </span>
        </ButtonCta>

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
const formSubmitted = ref(false)
const errorMessage = '[ Field is required ]'
const fieldError = ref({
  firstName: false,
  lastName: false,
  email: false,
  organization: false,
  country: false
})
const firstName = ref(false)
const lastName = ref(false)
const email = ref(false)
const organization = ref(false)
const country = ref(false)

// ==================================================================== Computed
const title = computed(() => { return props.signupCard.title })

const img = computed(() => { return props.signupCard.img })

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

const submitButtonLabel = computed(() => { return formSubmitted.value ? 'Success' : 'Submit' })

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
    case 'organization':
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
    }
   }
}
/**
 * @method submitForm
 */
const submitForm = async () => {
  if (firstName.value && lastName.value && email.value && organization.value && country.value) {
    const body = {
        records: [
          {
            fields: {
              email: email.value,
              firstName: firstName.value,
              lastName: lastName.value,
              organization: organization.value,
              country: country.value.label
            }
          }
        ]
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SINGULARITY_DEMO_SIGNUPS_TOKEN}`
      }
    const res = await $fetch('https://api.airtable.com/v0/apphbQmrNLNNXiaqG/tblDUSr66nczukX9Y', {
      method: 'POST',
      body,
      headers
    })
  if (res) { formSubmitted.value = true; return }
}
  if(!firstName.value) { fieldError.value.firstName = true }
  if(!lastName.value) { fieldError.value.lastName = true }
  if(!email.value) { fieldError.value.email = true }
  if(!organization.value) { fieldError.value.organization = true }
  if(!organization.value) { fieldError.value.organization = true }
  if(!country.value) { fieldError.value.country = true }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.signup-card {
  --border-gradient-angle: 0deg;
  @include cardPanel(var(--border-gradient-angle));
  padding: toRem(58) toRem(103) toRem(93);
  .content {
    position: relative;
    z-index: 2;
  }
  .title-img {
    width: toRem(60);
    height: toRem(60);
    margin-bottom: toRem(12);
  }
  .title {
    font-size: toRem(36);
    line-height: leading(48, 36);
    font-weight: 500;
    letter-spacing: 0.03em;
    color: $sageGreen;
    margin-bottom: toRem(25);
  }
  .description {
    @include p2;
    margin-bottom: toRem(22);
  }
}


// //////////////////////////////////////////////////////////////////////// Form
//---------------------------------------------------------------------- General
.signup-form {
  display: flex;
  flex-direction: column;
}

.form-field {
  border: var(--brand-color) 1px solid;
  border-radius: toRem(5);
  padding: toRem(8) toRem(20);
  &:hover,
  &:focus {
    border-color: var(--secondary-text-color);
  }
  &.error {
    border-color: var(--error);
  }
}
.message {
  position: absolute;
  right: 0;
  bottom: -1.3rem;
  @include formFieldErrorMessage;
}
.error {
  color: var(--error);
}

.field-wrapper {
  position: relative;
  flex: 1;
  margin-bottom: toRem(24);
}

.submit-button {
  align-self: flex-end;
  &.submitted {
    filter: drop-shadow(0px 2px 14px rgba(203, 221, 187, 0.32));
    :deep(.fill-path) {
      opacity: 1;
      fill: var(--brand-color);
    }
    :deep(.stroke-path) {
      stroke: var(--brand-color);
    }
    &::before {
      border-color: var(--brand-color);
      background-color: var(--brand-color);
    }
    :deep(.button-content) {
      color: var(--background-color);
    }
  }
}

//----------------------------------------------------------------- Input Fields
.name-fields {
  display: flex;
  justify-content: space-between;
  @include medium {
    flex-flow: row wrap;
    .field-wrapper {
      width: 100%;
      flex: unset;
    }
  }
  .field-wrapper:is(:first-child) {
    margin-right: toRem(20);
    @include medium {
      margin-right: 0;
    }
  }
}

.input-field {
  @include formFieldText;
  color: var(--primary-text-color);
  width: 100%;
  &::placeholder {
    @include formFieldPlaceholder;
    opacity: 1;
  }
}

//-------------------------------------------------------------- Dropdown Fields
.toggle-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.open {
    border-color: var(--secondary-text-color);
    border-bottom-color: transparent;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding-bottom: toRem(4);
  }
}
.toggle-button-label {
  @include formFieldPlaceholder;
  color: var(--primary-text-color);
  &.selected {
    @include formFieldText;
  }
}

:deep(.panel-container) {
  width: 100%;
  z-index: 1;
  top: calc(100% - 0.1rem);
  padding-top: 0;
  border: var(--secondary-text-color) 1px solid;
  height: toRem(93);
  overflow-y: scroll;
  border-top-color: transparent;
  border-bottom-left-radius: toRem(5);
  border-bottom-right-radius: toRem(5);
}
.option {
  @include formFieldPlaceholder;
  cursor: pointer;
  padding: 0 toRem(20) toRem(4);
  background-color: #121212;
  &:hover {
    background-color: var(--secondary-text-color);
    color: var(--background-color);
  }
}
</style>
