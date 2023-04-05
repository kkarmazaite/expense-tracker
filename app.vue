<template>
  <NuxtLayout>
    <LoadingPage v-if="isAuthLoading" />
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script lang="ts"  setup>

const { initAuth, authLoading } = useAuth()
const isAuthLoading = authLoading

onBeforeMount(() => {
  initAuth()
})

</script>