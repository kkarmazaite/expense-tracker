<template>
    <div class="pt-5 space-y-6 w-full">
        <h1 class="mb-20 text-5xl">Create new user account</h1>
        <UIInput label="Name" placeholder="John" v-model="registrationData.name"/>
        <UIInput label="Email" placeholder="user@email.com" type="email" v-model="registrationData.email"/>
        <UIInput label="Password" placeholder="*********" type="password" v-model="registrationData.password"/>
        <UIInput label="Repeat password" placeholder="*********" type="password" v-model="registrationData.repeatPassword"/>
        <div>
        <UIButton @click="handleRegistration" name="Create account"/>
        </div>
    </div> 
</template>
 
<script lang="ts" setup>
definePageMeta({
  layout: "login",
});
const registrationData = reactive({
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  loading: false,
});

const handleRegistration = async () => {
  const { createNewUser, login } = useAuth();

  registrationData.loading = true;
  try {
    await createNewUser({
      name: registrationData.name,
      email: registrationData.email,
      password: registrationData.password,
      repeatPassword: registrationData.repeatPassword,
    });
    console.log(1);
    await login({
      email: registrationData.email,
      password: registrationData.password,
    });
    console.log(2);
  } catch (error) {
    console.log(error);
  } finally {
    registrationData.loading = false;
  }
};
</script>
