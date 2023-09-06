<template>
  <div class="code-block">
    <div class="code-list">
      <ul>
        <li
          v-for="(line, n) in lines"
          :key="`line-${n}`"
          :class="['code-line', { 'heading': n === 0 }]">
          <span class="code id">{{ n === 0 ? 'ID' : n }}</span>
          <span class="code type">{{ line.type }}</span>
          <span class="code path">{{ line.path }}</span>
          <span class="code scan-state">{{ line.scanState }}</span>
          <span class="code dag-state">{{ line.dagState }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// ======================================================================= Props
// eslint-disable-next-line
const props = defineProps({
  block: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// ==================================================================== Computed
const lines = computed(() => {
  return Array.isArray(props.block.lines) ? props.block.lines : []
})

</script>

<style lang="scss" scoped>
.code-block {
  position: relative;
}

.code-list {
  padding: toRem(24);
  background-color: $codeBlack;
  border-radius: toRem(6);
}

.code-line {
  display: flex;
  justify-content: space-between;
  @include inlineCode;
  margin-bottom: 0.125rem;
  color: $sageGreen;
  @include medium {
    margin-bottom: 0;
  }
  &.heading {
    color: $eastSide;
  }
}

.code {
  display: inline-block;
  white-space: nowrap;
  @include inlineCode;
  &.id,
  &.type {
    width: 12%;
    @include medium {
      width: 20%;
    }
  }
  &.path {
    width: 40%;
    @include medium {
      width: 60%;
    }
  }
  &.scan-state {
    width: 21%;
    @include medium {
      display: none;
    }
  }
  &.dag-state {
    width: 16%;
    @include gridMaxMQ {
      display: none;
    }
  }
}
</style>
