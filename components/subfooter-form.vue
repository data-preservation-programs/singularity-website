<template>
  <div class="subfooter-form">

    <div class="form-wrapper">
      <div :class="['form-field-container', { error: fieldError}]">
        <div class="detail-wrapper">
          <svg
            width="400"
            viewBox="0 0 400 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="detail">
            <path
              :d="path"
              stroke="#FFC582"
              stroke-width="2"
              shape-rendering="auto"
              class="stroke-path" />
          </svg>
        </div>

        <div class="field-email">
          <input
            class="email"
            :placeholder="placeholder"
            type="email"
            required="true"
            @input="updateValue($event.target.value)" />
        </div>
      </div>

      <ButtonCtaWithLoader
        :class="['submit-button', { submitted: formSubmitted }]"
        theme="secondary"
        loader="subfooter-card-newsletter-signup"
        @clicked="submitForm">
        <template #button-content>
          <span class="button-label"> {{ buttonText }} </span>
        </template>
      </ButtonCtaWithLoader>
    </div>

    <span v-if="submitError" class="submit-error" v-html="errorMessage" />

  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const buttonStore = useZeroButtonStore()
// ======================================================================= Props
const props = defineProps({
  form: {
    type: Object,
    required: false,
    default: () => ({})
  },
  variant: { // 'large', 'small' or none
    type: String,
    required: false,
    default: ''
  }
})

// ======================================================================== Data
const formSubmitted = ref(false)
const submitError = ref(false)
const errorMessage = "Uh oh, we were not able to send that data due to an error — please try again, or reach out to us via Slack"
const fieldError = ref(false)
const fieldValue = ref('')
// ==================================================================== Computed
const path = computed(() => {
  if (props.variant === 'large') {
    return 'M 536 53.6 H 2.7391 C 1.871 53.6 1.232 52.7872 1.34 51.9436 L 9.5042 18.7416 C 12.06 8.04 21.44 1.34 32.16 1.34 H 536'
  }
  if (props.variant === 'small') {
    return 'M 322 32 H 2.25 C 1 32 1 30.75 1 30.75 L 6 11 C 7 5 13 1 19 1 H 322'
  }
  return 'M 400 40 H 2.0441 C 1.3963 40 0.9194 39.3934 1 38.7639 L 7.0927 13.9863 C 9 6 16 1 24 1 H 400'
})

const placeholder = computed(() => { return props.form.placeholder })

const buttonText = computed(() => { return props.form.submit_button_text })

// ===================================================================== Methods
/**
 * @method updateValue
 */
const updateValue = (val) => {
  if (fieldError.value) { fieldError.value = false; fieldErrorType.value = false }
  fieldValue.value = val
}
/**
 * @method validateEmail
 */
const validateEmail = (email) => {
  const regex = /^[^\s\t\r\n]+@[^\s\t\r\n]+\.[^\s\t\r\n]{2,20}$/i
  return regex.test(email)
}
/**
 * @method submitForm
 */
const submitForm = async () => {
  if (formSubmitted.value) {  $button('triple-line-loader').set({ loading: false }); return }
  if (validateEmail(fieldValue.value)) {
    const body = {
      records: [
        {
          fields: {
            email: fieldValue.value.trim()
          }
        }
      ]
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.public.airtableToken}`
    }
    await $fetch('https://api.airtable.com/v0/apphbQmrNLNNXiaqG/tblSB1NYasWQIDGlp', {
      method: 'POST',
      body,
      headers
    }).then(() => {
      formSubmitted.value = true
      return
    }).catch(() => {
      submitError.value = true
    })
  } else {
    fieldError.value = true
  }
  buttonStore.setButton({id: 'subfooter-card-newsletter-signup', loading: false})
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.subfooter-form {
  position: relative;
}

.form-wrapper {
  position: relative;
  display: flex;
  white-space: nowrap;
  margin-left: 1.5625rem;
  &:focus-visible {
    @include focusBoxShadow;
  }
  @include mini {
    margin-bottom: toRem(30);
  }
}

.submit-error {
  display: block;
  width: 57%;
  margin-top: toRem(5);
  word-break: break-word;
  text-align: right;
  @include formFieldErrorMessage;
  color: var(--error);
  @include mini {
    width: calc(100% - toRem(2));
  }
}

// ////////////////////////////////////////////////////////////// Detail Wrapper
.detail-wrapper {
  position: absolute;
  top: 0;
  left: toRem(-25);
  width: calc(100% + toRem(25) - toRem(2));
  height: 100%;
  overflow: hidden;
  @include mini {
    width: calc(100% - toRem(2));
  }
}

.detail {
  height: 100%;
  .fill-path {
    opacity: 0.2;
    fill: #070707;
    @include transitionDefault;
  }
}

// ////////////////////////////////////////////////////////////////// Form field
.form-field-container {
  position: relative;
  display: block;
  height: toRem(41);
  width: fit-content;
  margin-right: clamp(toRem(11), 3vw, toRem(46));
  filter: drop-shadow(0px 2px 14px rgba(255, 197, 130, 0.32));
  .stroke-path {
    @include transitionDefault;
    transition-duration: 300ms;
    stroke: $sageGreen;
  }
  &:before {
    content: '';
    position: absolute;
    left: toRem(28);
    top: 0;
    width: calc(100% - 25px);
    height: 100%;
    box-sizing: border-box;
    border-top: solid 2px $sageGreen;
    border-bottom: solid 2px $sageGreen;
    border-right: solid 2px $sageGreen;
    border-top-right-radius: toRem(5);
    border-bottom-right-radius: toRem(5);
    @include transitionDefault;
    transition-duration: 300ms;
    @include mini {
      width: calc(100% - 45px);
    }
  }
  &:hover,
  &:focus-within {
      .stroke-path {
        stroke: $chardonnay;
      }
      &::before {
        border-top-color: $chardonnay;
        border-right-color: $chardonnay;
        border-bottom-color: $chardonnay;
      }
    }
  &.error {
    .stroke-path {
      stroke: $burntSienna;
    }
    &::before {
      border-top-color: $burntSienna;
      border-right-color: $burntSienna;
      border-bottom-color: $burntSienna;
    }
  }
}

.field-email {
  position: relative;
  display: flex;
  align-items: center;
  @include formFieldText;
  &::placeholder {
    @include formFieldPlaceholder;
  }
  @include mini {
    width: calc(100% - 1.5625rem);
  }
}
.email {
  width: calc(100% - 0.0625rem);
  padding: toRem(10) toRem(17) toRem(10) toRem(3);
  @include small {
    padding-right: toRem(3);
  }
}

.error-message {
  position: absolute;
  left: toRem(-28);
  bottom: -1.4rem;
  @include formFieldErrorMessage;
  color: var(--error);
}

// /////////////////////////////////////////////////////////////// Submit Button
.submit-button.submitted {
  :deep(.button-label) {
    color: $sageGreen;
  }
  :deep(.button-content) {
    &::after {
      color: transparent !important;
      background-image: url('/images/checkmark.svg');
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  &:hover {
    :deep(.button-content) {
      &::after {
        transform: translateX(0);
      }
    }
  }
}
</style>
