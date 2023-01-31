<template>
  <NuxtLayout>
    <h1 v-if="isAuthLoading">Loading</h1>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { initAuth, authLoading } = useAuth()
    const isAuthLoading = authLoading
    onBeforeMount(() => {
      initAuth()
    })
    return {
      isAuthLoading,
    }
  },
})
</script>