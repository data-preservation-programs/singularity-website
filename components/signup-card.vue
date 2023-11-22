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

// ==================================================================== Computed
const title = computed(() => props.signupCard.title )

const img = computed(() => props.signupCard.img )

const description = computed(() => props.signupCard.description )

const cardStyles = computed(() => {
  if (props.signupCard.borderGradientAngle) {
    return { '--border-gradient-angle': props.signupCard.borderGradientAngle }
  }
  return null
})

const formId = computed(() => props.signupCard.signup_form_id)
const firstNameFieldScaffold = computed(() => props.signupCard.signup_form.first_name )
const lastNameFieldScaffold = computed(() => props.signupCard.signup_form.last_name )
const emailFieldScaffold = computed(() => props.signupCard.signup_form.email )
const orgFieldScaffold = computed(() => props.signupCard.signup_form.org )
const countryFieldScaffold = computed(() => props.signupCard.signup_form.country )

const submitButtonLabel = computed(() => formSubmitted.value ? 'Success' : 'Register' )

// ===================================================================== Methdos
/**
 * @method validateFormValues
 */
const validateFormValues = async () => {
  const pass = await useValidateForm(formId.value)
  if (pass) {
    const formFields = useGetFormFields(formId.value)
    const formValues = {}
    formFields.forEach((field) => {
      if (field.scaffold.type === 'input') {
        formValues[field.scaffold.slug] = field.value.trim()
      }
      if (field.scaffold.type === 'select') {
        formValues[field.scaffold.slug] = field.scaffold.options[field.value[0]].label
      }
    })
    return formValues
  } else {
    return false
  }
}
/**
 * @method submitForm
 */
const submitForm = async () => {
  if (formSubmitted.value) { return }
  if (submitError.value) { submitError.value = false }
  const fields = await validateFormValues()
  if (fields) {
    const body = {
        records: [{ fields }]
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
  buttonStore.setButton({id: 'signup-card-form', loading: false})
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
