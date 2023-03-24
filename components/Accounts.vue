<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-12 md:pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl">Accounts</h2>
        <UIButton type="plain" class="w-auto px-2 text-3xl md:text-xl" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-10 md:gap-5 pb-10">
        <div v-for="userAccount in props.userAccounts" :key="userAccount.id"
          class="flex justify-between w-full group overflow-hidden">
          <div class="cursor-pointer w-full font-bold text-left text-sm md:text-base" @click="emits('selectAccount', userAccount.id)">
            {{ userAccount.name }}
          </div>
          <div class="transition-all ease-in-out duration-500 w-16 md:w-0 opacity-100 md:opacity-0 group-hover:w-16 group-hover:opacity-100">
            <UIButton class="ml-4 text-xl md:text-base" type="plain" @click="handleAccountDeletion(userAccount.id)">
              <font-awesome-icon class="text-red-500" icon="fa fa-trash" />
            </UIButton>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <UIModal class="z-50" v-if="showModal" title="Create new account" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col  gap-10 md:gap-5">
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

const emits = defineEmits([
  'selectAccount',
  'refreshAccounts',
])
const props = defineProps<{
  userId: string | undefined
  userAccounts: IAccount[]
}>()

const { createNewAccount, deleteAccount } = useAccount()


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
    const { account } = await createNewAccount({
      name: accountCreationData.name,
      userId: props.userId,
    })
    accountCreationError.value = ''
    accountCreationData.name = ''
    closeModal()
    emits('refreshAccounts')
    emits('selectAccount', account.id)
  } catch (error: any) {
    accountCreationError.value = error.statusMessage
  } finally {
    accountCreationData.loading = false
  }
}
const handleAccountDeletion = async (accountId: string | undefined) => {
  if (!accountId) {
    window.alert('An error has occured. Please try again.')
    return
  }
  if (props.userAccounts.length === 1) {
    window.alert('Cannot delete the last account.')
    return
  }
  if (!window.confirm('Do you want to delete this account?')) {
    return
  }

  try {
    await deleteAccount(accountId)
    emits('refreshAccounts')
    emits('selectAccount', props.userAccounts[0].id)
  } catch (error: any) {
    window.alert(error.statusMessage)
    return
  }

}
</script>

