<template>
  <button :disabled="props.disabled" class="px-5 py-1 rounded-full flex justify-center items-center" :class="{
    'bg-gray-400 hover:bg-gray-400 text-white w-full ':
      props.type === 'regular' && props.disabled,
    'bg-blue-500 hover:bg-blue-400 text-white w-full ': props.type === 'regular',
    'text-blue-500 hover:text-blue-400 w-full ': props.type === 'text',
    'text-gray-500 hover:text-gray-400 w-auto px-2': props.type === 'plain',
    'text-gray-500 hover:text-gray-400 border boder-gray-400 w-full':
      props.type === 'plain-border',
  }" @click="emits('onClick')">
    <slot />
  </button>
</template>

<script lang="ts" setup>
const emits = defineEmits(['onClick'])
const props = defineProps({
  type: {
    type: String,
    default: 'regular',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
