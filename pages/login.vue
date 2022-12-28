<template>
  <div class="pt-5 space-y-6 w-full">
    <h1 class="mb-20 text-5xl">Sign In</h1>
    <UIInput
      label="Email"
      placeholder="user@email.com"
      type="email"
      v-model="loginData.email"
    />
    <UIInput
      label="Password"
      placeholder="*********"
      type="password"
      v-model="loginData.password"
    />
    <p class="text-red-500">{{ loginError }}</p>
    <UIButton @click="handleLogin" :disabled="loginDisabled">
      Sign In
    </UIButton>
    <UIButton @click="useRouter().push('/register')" type="text">
      Create new account
    </UIButton>
  </div>
</template>
 
<script lang="ts" setup>
definePageMeta({
  layout: 'login',
})
const loginData = reactive({
  email: '',
  password: '',
  loading: false,
})
const loginError = ref('')
const loginDisabled = computed(() => {
  return !loginData.email || !loginData.password || loginData.loading
})

const handleLogin = async () => {
  const { login } = useAuth()

  loginData.loading = true
  try {
    await login({
      email: loginData.email,
      password: loginData.password,
    })
  } catch (error: any) {
    loginError.value = error.statusMessage
  } finally {
    loginData.loading = false
  }
}
</script>
