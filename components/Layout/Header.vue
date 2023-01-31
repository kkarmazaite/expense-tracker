<template>
  <div class="bg-white w-full flex justify-between items-center p-5">
    <UILogo />
    <div v-if="user">
      <span>Hi, {{ user.name }}</span>
      <button @click="logout()">Logout</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { authUser, logout } = useAuth()
const user = authUser
</script>