<template>
  <div class="bg-white rounded-md p-2">
    <div v-if="title" class="flex justify-between">
      <h2 class="capitalize text-bold text-2xl">{{ title }}</h2>
      <UIButton class="w-auto px-2" @click="showModal = true">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </UIButton>
    </div>
    <slot name="card-content" />
    <UIModal :showModal="showModal" @click="showModal = false">
      <slot name="modal-content" />
    </UIModal>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
const showModal = ref(false)
</script>
