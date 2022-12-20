<template>
  <button
    :disabled="disabled"
    class="w-full px-5 py-1 rounded-full"
    :class="{
      'bg-gray-400 hover:bg-gray-400 text-white':
        type === 'regular' && disabled,
      'bg-blue-500 hover:bg-blue-400 text-white': type === 'regular',
      'text-blue-500 hover:text-blue-400': type === 'text',
    }"
    @click="(event) => emits('onClick', event)"
  >
    {{ name }}
  </button>
</template>

<script setup>
const emits = defineEmits(['onClick'])
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'regular',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
console.log(props.type === 'regular', props.disabled)
</script>
