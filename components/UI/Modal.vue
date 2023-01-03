<template>
  <div
    v-if="showModal"
    class="
      fixed
      top-0
      bottom-0
      left-0
      right-0
      flex
      justify-center
      items-center
      bg-black bg-opacity-50
    "
    @click="closeModal()"
  >
    <div class="bg-white rounded-md p-5 pb-10 w-[500px]" @click.stop>
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl capitalize break-words">{{ title }}</h2>
        <UIButton type="plain" class="text-xl" @click="closeModal()">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </UIButton>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['closeModal'])
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  showModal: {
    type: Boolean,
    default: false,
  },
})
const closeModal = () => {
  emits('closeModal')
}
</script>