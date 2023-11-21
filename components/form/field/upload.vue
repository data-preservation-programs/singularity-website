<template>
  <PrimeVueFileUpload
    name="files[]"
    :multiple="true"
    :accept="accept"
    :max-file-size="maxFileSize">

    <!-- ============================================================ Header -->
    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
      <div class="buttons">
        <ZeroButton
          class="button choose"
          @click="chooseCallback()">
          Select file(s)
        </ZeroButton>
        <ZeroButton
          class="button upload"
          :disabled="!files || files.length === 0"
          @click="uploadCallback()">
          Upload
        </ZeroButton>
        <ZeroButton
          class="button clear"
          @click="clearCallback()">
          Clear
        </ZeroButton>
      </div>
    </template>

    <!-- ================================================= Empty placeholder -->
    <template #empty>
      Drag and drop files to here to upload.
    </template>

  </PrimeVueFileUpload>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const scaffold = props.field.scaffold
const maxFileSize = scaffold.maxFileSize || 1000000
const accept = scaffold.accept
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.buttons {
  display: flex;
  flex-direction: row;
}

.button {
  &:hover:not([disabled]) {
    text-decoration: underline;
  }
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  &:not(.clear) {
    padding: toRem(4) toRem(10);
    color: white;
    background-color: black;
    border-radius: toRem(5);
  }
  &[disabled] {
    opacity: 0.5;
    cursor: no-drop;
  }
  &.clear {
    font-weight: 700;
  }
}

:deep(.p-fileupload-content) {
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: toRem(10);
  overflow: hidden;
}

:deep(.p-fileupload-empty) {
  padding: 1rem;
  border: 2px dashed gray;
  border-radius: toRem(10);
  text-align: center;
}

:deep(.p-fileupload-file) {
  display: flex;
  flex-direction: row;
  &:not(:last-child) {
    margin-bottom: 1rem;;
  }
}

:deep(.p-fileupload-file-details) {
  flex: 1;
  margin: 0 1rem;
}

:deep(.p-fileupload-file-size),
:deep(.p-fileupload-file-badge) {
  font-size: toRem(12);
  font-weight: 700;
}

:deep(.p-fileupload-file-badge) {
  margin-left: 0.5rem;
  padding: 0 toRem(6);
  color: white;
  background-color: gray;
  border-radius: toRem(5);
}
</style>
