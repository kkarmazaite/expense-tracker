<template>
  <div class="bg-white w-full flex justify-between items-center p-5">
    <UILogo />
    <div class="flex gap-1" v-if="user">
      <p>Hi, <b class="capitalize">{{ user.name }}</b></p>
      <div class="relative" @mouseenter="showMenu = true" @mouseleave="showMenu = false">
        <UIButton type="plain">
          <font-awesome-icon icon="fa-solid fa-caret-down" />
        </UIButton>
        <div v-if="showMenu" class="absolute top-full -right-5 pt-5 z-50">
          <div class="bg-white py-5 px-10 border">
            <UIButton type="plain" @click="logout()">
              Logout
            </UIButton>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
const { authUser, logout } = useAuth()
const user = authUser
const showMenu = ref(false)
</script>