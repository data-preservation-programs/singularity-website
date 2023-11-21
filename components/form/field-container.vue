<template>
  <ZeroFormField
    v-slot="{ field, fieldId, fieldType, state, required, disabled, validationMessage, updateValue, toggleState }"
    v-bind="props">

    <label v-if="scaffold.label" :for="fieldId" :class="['field-label', state]">
      {{ scaffold.label }}
      <sup v-if="required" class="required">*</sup>
    </label>

    <div v-if="scaffold.description" class="description">
      {{ scaffold.description }}
    </div>

    <component
      :is="map[fieldType]"
      :field="field"
      :form-scaffold="formScaffold"
      :disabled="disabled"
      @update-value="updateValue"
      @toggle-state="toggleState"
      @toggle-focused="toggleState" />

    <slot />

    <div v-if="validationMessage" class="validation-message">
      {{ validationMessage }}
    </div>

  </ZeroFormField>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  scaffold: {
    type: Object,
    required: true
  },
  /**
   * Used in the Array field
   */
  formScaffold: {
    type: Object,
    required: false,
    default: () => {}
  },
  forceDisabled: {
    type: Boolean,
    required: false,
    default: false
  },
  forceValidate: {
    type: Boolean,
    required: false,
    default: true
  },
  /**
   * On occasions where the final root element in field-conditional.vue render
   * must be something specific. Such as when wrapping a <tbody> in a field-standalone,
   * it cannot be a div as the wrapper. It must be <tbody> at the root to prevent
   * SSR hydration errors.
   */
  rootHtmlTag: {
    type: String,
    required: false,
    default: 'div'
  }
})

const map = {
  'FieldInput': resolveComponent('FormFieldInput'),
  'FieldTextarea': resolveComponent('FormFieldTextarea'),
  'FieldBoolean': resolveComponent('FormFieldBoolean'),
  'FieldDatepicker': resolveComponent('FormFieldDatepicker'),
  'FieldSelect': resolveComponent('FormFieldSelect'),
  'FieldUpload': resolveComponent('FormFieldUpload')
}
</script>

<style lang="scss" scoped>
@keyframes grow {
  0% { transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}

// ///////////////////////////////////////////////////////////////////// General
.field-container {
  position: relative;
  &:hover,
  &:focus-within {
    .tooltip {
      &:before,
      &:after,
      .icon {
        transition: 150ms ease-in;
        opacity: 1;
      }
      &:before {
        transform: translate(0, -50%) rotate(-90deg);
      }
      &:after {
        transform: translate(0, -50%);
      }
      .icon {
        transform: scale(1);
      }
    }
  }
  &.disabled {
    .field-label {
      cursor: default;
    }
  }
  &:not(:last-child) {
    margin-bottom: toRem(30);
  }
}

:deep(.field) {
  position: relative;
  font-weight: 500;
}

:deep(.description) {
  margin-top: 0.5rem;
  line-height: leading(30, 18);
  margin-bottom: 2.25rem;
}

// ////////////////////////////////////////////////////////////////////// Arrays
.array {
  display: flex;
  flex-direction: column;
}

.group {
  display: flex;
  flex-direction: row;
  .field {
    flex: 1;
    margin-bottom: 2rem;
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
}

.add-group-button {
  margin-left: auto;
}

.icon-trash {
  width: 1.5rem;
}

// /////////////////////////////////////////////////////////////////////// Label
.field-label {
  display: inline-block;
  margin-bottom: toRem(8);
  font-size: toRem(13);
  font-weight: 500;
  cursor: pointer;
  .required {
    color: $burntSienna;
    font-size: toRem(20);
    top: 0;
  }
}

.panel-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  display: none;
  margin-right: toRem(11);
  &.question-mark {
    display: block;
  }
}

// ////////////////////////////////////////////////////////////////// Validation
:deep(.validation-message) {
  position: absolute;
  right: toRem(3);
  margin-top: toRem(6);
  @include formFieldErrorMessage;
  color: $burntSienna;
  sup {
    top: -0.125rem;
    margin-right: 0.0625rem;
    font-size: 100%;
  }
}
</style>
