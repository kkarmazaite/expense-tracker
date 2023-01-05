<template>
  <div class="pt-5 space-y-6 w-full">
    <h1 class="mb-20 text-5xl">Create new user account</h1>
    <UIInput label="Name" placeholder="John" v-model="registrationData.name" />
    <UIInput label="Email" placeholder="user@email.com" type="email" v-model="registrationData.email" />
    <UIInput label="Password" placeholder="*********" type="password" v-model="registrationData.password" />
    <UIInput label="Repeat password" placeholder="*********" type="password"
      v-model="registrationData.repeatPassword" />
    <p class="text-red-500">{{ registrationError }}</p>
    <UIButton @click="handleRegistration" :disabled="registrationDisabled">
      Create account
    </UIButton>
  </div>
</template>
 
<script lang="ts" setup>
definePageMeta({
  layout: 'login',
})
const registrationData = reactive({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  loading: false,
})
const registrationDisabled = computed(() => {
  return (
    !registrationData.email ||
    !registrationData.name ||
    !registrationData.password ||
    !registrationData.repeatPassword ||
    registrationData.loading
  )
})

const registrationError = ref('')

const handleRegistration = async () => {
  const { createNewUser, login } = useAuth()

  registrationData.loading = true
  try {
    await createNewUser({
      name: registrationData.name,
      email: registrationData.email,
      password: registrationData.password,
      repeatPassword: registrationData.repeatPassword,
    })

    await login({
      email: registrationData.email,
      password: registrationData.password,
    })
  } catch (error: any) {
    registrationError.value = error.statusMessage
  } finally {
    registrationData.loading = false
  }
}
</script>
