<template>
  <div class="bg-white rounded-md p-2">
    <!-- Header -->
    <div class="flex justify-between">
      <h2 class="capitalize text-bold text-2xl">Accounts</h2>
      <UIButton type="plain" class="w-auto px-2 text-xl" @click="openModal()">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </UIButton>
    </div>

    <!-- Content -->
    <div>Hue</div>

    <!-- Modal -->
    <UIModal v-if="showModal" title="Create new account" :modalKeyName="modalKeyName" :showModal="showModal">
      <h1 class="mb-20 text-5xl"></h1>
      <div class="mb-20">
        <UIInput label="Name" placeholder="wallet" v-model="accountCreationData.name" />
      </div>
      <p class="text-red-500">{{ accountCreationError }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton :disabled="accountCreationDisabled" @click="handleAccountCreation">
          Create
        </UIButton>
      </div>
    </UIModal>
  </div>
</template>
<script lang="ts" setup>
const modalKeyName = "show_modal_account"
const { useShowModal, openModal, closeModal } =
  useModal(modalKeyName)
const showModal = useShowModal

const accountCreationData = reactive({
  name: '',
  loading: false,
})
const accountCreationError = ref('')
const accountCreationDisabled = computed(() => {
  return !accountCreationData.name || accountCreationData.loading
})

const handleAccountCreation = async () => {
  const { createNewAccount } = useAccount()
  const { useAuthUser } = useAuth()
  const user = useAuthUser()

  accountCreationData.loading = true

  try {
    await createNewAccount({
      name: accountCreationData.name,
      userId: user?.value?.id,
    })
    accountCreationError.value = ''
    accountCreationData.name = ''
    closeModal()
  } catch (error: any) {
    accountCreationError.value = error.statusMessage
  } finally {
    accountCreationData.loading = false
  }
}
</script>

