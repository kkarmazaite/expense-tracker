<template>
    <div class="pt-5 space-y-6 w-full">
        <h1 class="mb-20 text-5xl">Sign In</h1>
        <UIInput label="Email" placeholder="user@email.com" type="email" v-model="loginData.email"/>
        <UIInput label="Password" placeholder="*********" type="password" v-model="loginData.password"/>
        <div>
        <UIButton @click="handleLogin" name="Sign In" :disabled="loginDisabled"/>
        </div>
        <UIButton @click="useRouter().push('/register');" type="text" name="Create new account"/>
    </div> 
</template>
 
<script lang="ts" setup>
definePageMeta({
  layout: "login",
});
const loginData = reactive({
  email: "",
  password: "",
  loading: false,
});
const loginDisabled = computed(() => {
  return !loginData.email || !loginData.password || loginData.loading;
});
console.log(loginDisabled);

const handleLogin = async () => {
  const { login } = useAuth();

  loginData.loading = true;
  try {
    await login({
      email: loginData.email,
      password: loginData.password,
    });
  } catch (error) {
    console.log(error);
  } finally {
    loginData.loading = false;
  }
};
</script>
