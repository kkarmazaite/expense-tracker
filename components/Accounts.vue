<template>
  <UICard cardTitle="accounts" modalTitle="create new account">
    <template v-slot:card-content> Hue</template>
    <template v-slot:modal-content>
      <h1 class="mb-20 text-5xl"></h1>
      <div class="mb-20">
        <UIInput
          label="Name"
          placeholder="wallet"
          v-model="accountCreationData.name"
        />
      </div>
      <UIButton>Create</UIButton>
    </template>
  </UICard>
</template>
<script setup lang="ts">
const accountCreationData = reactive({
  name: '',
})
</script>
