<template>
  <div class="subfooter-form">
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
            shape-rendering="crispEdges"
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

    <ButtonCta
      :class="['submit-button', { submitted: formSubmitted }]"
      theme="secondary"
      @clicked="submitForm">
      <span class="button-label"> {{ buttonText }} </span>
    </ButtonCta>

  </div>
</template>

<script setup>
const SINGULARITY_DEMO_SIGNUPS_TOKEN = import.meta.env.VITE_AIRTABLE_SINGULARITY_DEMO_TOKEN
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
const fieldError = ref(false)
const field = ref(false)
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
  if (fieldError) { fieldError.value = false }
  field.value = val
}
/**
 * @method submitForm
 */
const submitForm = async () => {
  if (field.value) {
    const body = {
        records: [
          {
            fields: {
              email: field.value
            }
          }
        ]
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SINGULARITY_DEMO_SIGNUPS_TOKEN}`
      }
    const res = await $fetch('https://api.airtable.com/v0/apphbQmrNLNNXiaqG/tblSB1NYasWQIDGlp', {
      method: 'POST',
      body,
      headers
    })
  if (res) { formSubmitted.value = true; return }
  }
  if(!field.value) { fieldError.value = true }
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.subfooter-form {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  &:focus-visible {
    @include focusBoxShadow;
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
  &.large {
    left: toRem(-31);
    width: calc(100% + toRem(31) - toRem(2));
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
  filter: drop-shadow(0px 2px 14px rgba(255, 197, 130, 0.32));
  .stroke-path {
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
  }
  &:hover {
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
}
.email {
  padding: toRem(10) toRem(17) toRem(10) toRem(3);
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
}
</style>
