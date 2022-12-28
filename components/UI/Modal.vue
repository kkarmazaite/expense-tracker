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
    @click="showModal = false"
  >
    <div
      class="text-center bg-white w-[500px] h-[500px] rounded-md"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['closeModal'])
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
})
const closeModal = () => {
  props.showModal = false
  emits('closeModal')
}
</script>
<style scoped>
.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>