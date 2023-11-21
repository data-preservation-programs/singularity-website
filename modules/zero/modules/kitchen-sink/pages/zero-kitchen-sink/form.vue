<template>
  <main class="page">

    <ZeroMarkdownParser :markdown="markdown" class="markdown" />

    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.input_type_text" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.input_type_number_integer" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.input_type_number_float" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.textarea" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.radio" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.radio_conditional_textarea" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.checkbox" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.boolean" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.datepicker_single" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.datepicker_multiple" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.datepicker_single_withTime" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.datepicker_multiple_withTime" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.datepicker_range" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.datepicker_range_withTime" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.select" />

  </main>
</template>

<script setup>
// ======================================================================= Setup
definePageMeta({
  layout: 'zero-layout'
})

// ======================================================================== Data
const { data: content } = await useAsyncData('content', () => {
  return queryContent({
    where: {
      _path: { $contains: '/zero/kitchen-sink/form' }
    }
  }).find()
})

const markdown = content.value.find(item => item._extension === 'md').raw
const scaffold = content.value.find(item => item._extension === 'json')
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.markdown {
  width: 100%;
}

:deep(.field-container) {
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
}
</style>
