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
      <p class="text-red-500">{{ accountCreationError }}</p>
      <UIButton
        :disabled="accountCreationDisabled"
        @click="handleAccountCreation"
      >
        Create
      </UIButton>
    </template>
  </UICard>
</template>
<script setup lang="ts">
const accountCreationData = reactive({
  name: '',
  loading: false,
})
const accountCreationError = ref('')
const accountCreationDisabled = computed(() => {
  return !accountCreationData.name || accountCreationData.loading
})

const handleAccountCreation = async () => {
  const { useAuthUser } = useAuth()
  const user = useAuthUser()
  const { createNewAccount } = useAccount()

  accountCreationData.loading = true

  try {
    await createNewAccount({
      name: accountCreationData.name,
      userId: user?.value?.id,
    })
    accountCreationError.value = ''
    accountCreationData.name = ''
  } catch (error: any) {
    accountCreationError.value = error.statusMessage
  } finally {
    accountCreationData.loading = false
  }
}
</script>
