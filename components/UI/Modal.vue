<template>
  <div v-if="props.showModal" class="
      fixed
      top-0
      bottom-0
      left-0
      right-0
      flex
      justify-center
      items-center
      bg-black bg-opacity-50
    " @click="closeModal()">
    <div class="bg-white rounded-md p-5 pb-10 w-[450px] md:w-[500px] max-h-[90vh] overflow-auto" @click.stop>
      <div class="flex justify-between items-center mb-20">
        <h2 class="text-3xl capitalize break-words">{{ props.title }}</h2>
        <UIButton type="plain" class="text-3xl md:text-2xl" @click="closeModal()">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </UIButton>
      </div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  modalKeyName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  showModal: {
    type: Boolean,
    default: false,
  },
})
const { closeModal } = useModal(props.modalKeyName)

</script>