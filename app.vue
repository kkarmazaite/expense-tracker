<template>
  <NuxtLayout>
    <h1 v-if="isAuthLoading">Loading</h1>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { initAuth, useAuthLoading } = useAuth()
const isAuthLoading = useAuthLoading()
onBeforeMount(() => {
  initAuth()
})
</script>