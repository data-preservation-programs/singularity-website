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

      <!-- <div class="signup-form">

        <div class="name-fields">
          <div class="field-wrapper">
            <input
              :class="['first-name input-field form-field', { error: fieldError.firstName }]"
              type="text"
              :placeholder="firstNameField.placeholder"
              required="true"
              @input="updateInputValue($event.target.value, 'firstName')" />
            <span :class="[{error: fieldError.firstName}, 'message']">
              That name doesn't appear to be valid
            </span>
          </div>

          <div class="field-wrapper">
            <input
              :class="['last-name input-field form-field', { error: fieldError.lastName }]"
              type="text"
              :placeholder="lastNameField.placeholder"
              required="true"
              @input="updateInputValue($event.target.value, 'lastName')" />
            <span :class="[{error: fieldError.lastName}, 'message']">
              That name doesn't appear to be valid
            </span>
          </div>
        </div>

        <div class="field-wrapper">
          <input
            :class="['email input-field form-field', { error: fieldError.email }]"
            type="email"
            :placeholder="emailField.placeholder"
            required="true"
            @input="updateInputValue($event.target.value, 'email')" />
          <span :class="[{error: fieldError.email}, 'message']">
            {{ fieldError.email === 'invalid' ? "That email doesn't appear to be valid" : 'Field is required' }}
          </span>
        </div>

        <div class="field-wrapper">
          <input
            :class="['organization input-field form-field', { error: fieldError.organization }]"
            :placeholder="orgField.placeholder"
            type="text"
            required="true"
            @input="updateInputValue($event.target.value, 'organization')" />
          <span :class="[{error: fieldError.organization}, 'message']">
            That organization name doesn't appear to be valid
          </span>
        </div>

        <div class="field-wrapper">
          <ZeroDropdown class="country" :display-selected="true">
            <template #toggle-button="{ togglePanel, panelOpen, selected }">
              <div
                :class="['toggle-button form-field', { error: fieldError.country }, { open: panelOpen } ]"
                :tabindex="0"
                @click="togglePanel"
                @keyup.enter="togglePanel">
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
              <p
                v-for="option in countryField.options"
                :key="option.code"
                class="option"
                @click="selectOption(setSelected, closePanel, option, 'country')"
                v-html="option.label" />
            </template>
          </ZeroDropdown>
          <span :class="[{error: fieldError.country}, 'message']">
            Field is required
          </span>
        </div>

        <div class="button-row">
          <div v-if="submitError" class="submit-error">
            Uh oh, we were not able to send that data due to an error — please try again, or reach out to us via Slack
          </div>

          <ButtonCtaWithLoader
            :class="['submit-button', { submitted: formSubmitted }]"
            theme="primary"
            loader="signup-card-form"
            @clicked="submitForm">
            <template #button-content>
              <span class="button-label"> {{ submitButtonLabel }} </span>
            </template>
          </ButtonCtaWithLoader>
        </div>

      </div> -->

      <div class="signup-form">

        <div class="name-fields">
          <FormFieldContainer
            :scaffold="firstNameFieldScaffold" />
          <FormFieldContainer
            :scaffold="lastNameFieldScaffold" />
        </div>
        <FormFieldContainer
          :scaffold="emailFieldScaffold" />
        <FormFieldContainer
          :scaffold="orgFieldScaffold" />
        <FormFieldContainer
          :scaffold="orgFieldScaffold" />
        <FormFieldContainer
          :scaffold="countryFieldScaffold" />

        <div class="button-row">
          <div v-if="submitError" class="submit-error">
            Uh oh, we were not able to send that data due to an error — please try again, or reach out to us via Slack
          </div>

          <ButtonCtaWithLoader
            :class="['submit-button', { submitted: formSubmitted }]"
            theme="primary"
            loader="signup-card-form"
            @clicked="submitForm">
            <template #button-content>
              <span class="button-label"> {{ submitButtonLabel }} </span>
            </template>
          </ButtonCtaWithLoader>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const buttonStore = useZeroButtonStore()
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
const submitError = ref(false)
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

const firstNameFieldScaffold = computed(() => { return props.signupCard.signup_form.first_name })

const lastNameFieldScaffold = computed(() => { return props.signupCard.signup_form.last_name })

const emailFieldScaffold = computed(() => { return props.signupCard.signup_form.email })

const orgFieldScaffold = computed(() => { return props.signupCard.signup_form.org })

const countryFieldScaffold = computed(() => { return props.signupCard.signup_form.country })

const submitButtonLabel = computed(() => { return formSubmitted.value ? 'Success' : 'Register' })

// ===================================================================== Methdos
// /**
//  * @method updateInputValue
//  */
// const updateInputValue = (val, field) => {
//   if (fieldError.value[field]) { fieldError.value[field] = false}
//   switch(field) {
//     case 'firstName':
//       firstName.value = val
//       break
//     case 'lastName':
//       lastName.value = val
//       break
//     case 'email':
//       email.value = val
//       break
//     case 'organization':
//       organization.value = val
//       break
//   }
// }
// /**
//  * @method selectOption
//  */
// const selectOption = (setSelected, closePanel, option, field) => {
//   if (option) {
//     if (fieldError.value[field]) { fieldError.value[field] = false }
//     setSelected(option)
//     closePanel()
//     switch(field) {
//       case 'country':
//         country.value = option
//         break
//     }
//    }
// }
/**
 * @method validateFieldValue
 */
const validateFieldValue = (field, val) => {
  const regex = /^[^\s\t\r\n]{2,50}$/
  if(!val || !regex.test(val)) {
    fieldError.value[field] = true
    return false
  }
  return true
}
/**
 * @method validateEmail
 */
const validateEmail = (email) => {
  const regex = /^[^\s\t\r\n]+@[^\s\t\r\n]+\.[^\s\t\r\n]{2,20}$/i
  if(typeof email === 'string' && email.length > 0) {
    if (regex.test(email)) {
      return true
    } else {
      fieldError.value.email = 'invalid'
      return false
    }
  } else {
    fieldError.value.email = 'empty'
    return false
  }
}
/**
 * @method validateFormValues
 */
const validateFormValues = () => {
  const validFirstName = validateFieldValue('firstName', firstName.value)
  const validLastName = validateFieldValue('lastName', lastName.value)
  const validEmail = validateEmail(email.value)
  const validOrganization = validateFieldValue('organization', organization.value)
  const validCountry = validateFieldValue('country', country.value.label)
  return validFirstName && validLastName && validEmail && validOrganization && validCountry
}
/**
 * @method submitForm
 */
const submitForm = async () => {
  if (formSubmitted.value) { return }
  if (submitError.value) { submitError.value = false }
  if (validateFormValues()) {
    const body = {
        records: [
          {
            fields: {
              email: email.value.trim(),
              firstname: firstName.value.trim(),
              lastname: lastName.value.trim(),
              company: organization.value.trim(),
              country: country.value.label
            }
          }
        ]
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.public.airtableToken}`
      }

    await $fetch('https://api.airtable.com/v0/apphbQmrNLNNXiaqG/tblDUSr66nczukX9Y', {
      method: 'POST',
      body,
      headers
    }).then(() => {
      formSubmitted.value = true
      return
    }).catch(() => {
      submitError.value = true
    })
  }
  buttonStore.set({id: 'signup-card-form', loading: false})
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.signup-card {
  --border-gradient-angle: 0deg;
  @include cardPanel(var(--border-gradient-angle));
  padding: clamp(toRem(32), 3.5vw, toRem(58)) clamp(toRem(14), 7vw, toRem(103)) clamp(toRem(32), 6.3vw, toRem(93));
  margin-bottom: toRem(76);
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
.button-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include mini {
    flex-direction: column;
  }
}
.submit-error {

  color: var(--error);
  margin: 0 toRem(94) 0 toRem(5);
  @include mini {
    margin: 0 toRem(10) 1rem;
  }
}
.submit-button {
  height: fit-content;
  @include mini {
    align-self: flex-end;
  }
  &.submitted,
  &.submitted:hover {
    cursor: default;
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

//---------------------------------------------------------- Field Customization
.name-fields {
  display: flex;
  justify-content: space-between;
  margin-bottom: toRem(30);
  @include medium {
    flex-flow: row wrap;
  }
  :deep(.field-container) {
    flex: 1;
    margin-bottom: 0;
  }
  :deep(.field-container:is(:first-child)) {
    margin-right: toRem(20);
    @include medium {
      margin-right: 0;
    }
  }
}
</style>
