<template>
  <div class="bg-white rounded-md p-2">
    <div v-if="cardTitle" class="flex justify-between">
      <h2 class="capitalize text-bold text-2xl">{{ cardTitle }}</h2>
      <UIButton
        type="plain"
        class="w-auto px-2 text-xl"
        @click="showModal = true"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </UIButton>
    </div>
    <slot name="card-content" />
    <UIModal
      :title="modalTitle"
      :showModal="showModal"
      @closeModal="showModal = false"
    >
      <slot name="modal-content" />
    </UIModal>
  </div>
</template>
<script setup>
const props = defineProps({
  cardTitle: {
    type: String,
    default: '',
  },
  modalTitle: {
    type: String,
    default: '',
  },
})
const showModal = ref(false)
</script>
