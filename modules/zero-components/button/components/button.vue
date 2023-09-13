<template>
  <component
    :is="component"
    :to="tag === 'nuxt-link' ? to : undefined"
    :href="tag === 'a' ? to : undefined"
    :disabled="disabled || loading"
    :target="target"
    :class="['button', { selected }, { disabled }]"
    @click="clickHandler($event)">

    <slot :loading="loading" />

  </component>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  tag: { // 'button', 'a' or 'nuxt-link'
    type: String,
    required: false,
    default: 'button'
  },
  to: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  target: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  loader: {
    type: [String, Object],
    required: false,
    default: undefined
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  selected: {
    type: Boolean,
    required: false,
    default: false
  }
})

// ======================================================================== Data
const emit = defineEmits(['clicked'])
const store = useZeroButtonStore()
const id = props.loader
const loading = ref(false)

// ======================================================================= Setup
if (id) {
  store.set({ id, loading: false })
}

// ==================================================================== Computed
const component = computed(() => {
  const tag = props.tag
  if (tag !== 'nuxt-link') { return tag }
  return resolveComponent('NuxtLink')
})

// ======================================================================= Watch
watch(store.buttons, (buttons) => {
  const found = buttons.find(button => button.id === id)
  if (found) {
    loading.value = found.loading
  }
})

// ===================================================================== Methods
const clickHandler = (e) => {
  e.stopPropagation()
  if (!props.disabled) {
    if (typeof props.loader === 'string') {
      store.set({ id, loading: true })
    }
    emit('clicked', e)
  }
}

// ======================================================================= Hooks
onBeforeUnmount(() => {
  store.remove(id)
})
</script>
