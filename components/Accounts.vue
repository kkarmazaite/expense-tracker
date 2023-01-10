<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl">Accounts</h2>
        <UIButton type="plain" class="w-auto px-2 text-xl" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-5 pb-10">
        <button class="font-bold text-left" v-for="userAccount in userAccounts" :key="userAccount.id"
          @click="selectAccount(userAccount.id)">
          {{ userAccount.name }}
        </button>
      </div>
    </div>

    <!-- Modal -->
    <UIModal class="z-50" v-if="showModal" title="Create new account" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col gap-5">
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
import { IAccount } from '~~/types/IAccount';

const { getUserAccounts, createNewAccount, getAccountById, setSelectedAccount } = useAccount()
const { useAuthUser, useAuthToken } = useAuth()
const user = useAuthUser()
console.log(useAuthToken().value)

const userAccounts = ref<IAccount[]>([])

const fetchAccounts = async () => {
  const { accounts } = await getUserAccounts()
  userAccounts.value = accounts
}

fetchAccounts()

const selectAccount = async (accountId: string | undefined) => {
  await setSelectedAccount(accountId)
}

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
  accountCreationData.loading = true

  try {
    await createNewAccount({
      name: accountCreationData.name,
      userId: user?.value?.id,
    })
    accountCreationError.value = ''
    accountCreationData.name = ''
    closeModal()
    fetchAccounts()
  } catch (error: any) {
    accountCreationError.value = error.statusMessage
  } finally {
    accountCreationData.loading = false
  }
}
</script>

