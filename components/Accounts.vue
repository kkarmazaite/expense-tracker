<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-12 md:pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl">Accounts</h2>
        <UIButton type="plain" class="w-auto px-2 text-3xl md:text-xl" @click="openCreationModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>

      <!-- Content -->
      <div v-if="props.loading">
        <div class="flex flex-col gap-10 md:gap-5 pb-10">
          <div v-for="idx in 8" :key="idx"
          class="flex justify-between w-full animate-pulse">
            <div class="w-52 h-6 bg-gray-100 rounded-md"></div>
            <div class="w-24 h-6 bg-gray-100 rounded-md"></div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-10 md:gap-5 pb-10">
        <div v-for="userAccount in props.userAccounts" :key="userAccount.id"
          class="flex justify-between w-full group overflow-hidden">
          <div class="flex justify-between gap-4 cursor-pointer w-full mt-1 md:mt-0 font-bold text-left text-sm md:text-base" @click="emits('selectAccount', userAccount.id)">
            <p class="break-all">{{ userAccount.name }}</p>
            <p v-if="userAccount.categories" class="font-bold">
              {{ displayCurrency(getCategorySum(userAccount.categories)) }}
            </p>
          </div>
          <div class="flex justify-between items-start gap-1 pl-4 transition-all ease-in-out duration-500 w-24 md:w-0 opacity-100 md:opacity-0 group-hover:w-24 group-hover:opacity-100">
            <UIButton class="w-4 text-xl md:text-base" type="plain" @click="openUpdateModal(userAccount)">
              <font-awesome-icon icon="fa fa-pencil" />
            </UIButton>
            <UIButton class="w-4 text-xl md:text-base" type="plain" @click="handleAccountDeletion(userAccount.id)">
              <font-awesome-icon icon="fa fa-trash" />
            </UIButton>
          </div>
        </div>

      </div>
    </div>

    <!-- Creation Modal -->
    <UIModal class="z-50" v-if="showModal && modalType === 'creation'" title="Create new account" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col  gap-10 md:gap-5">
        <UIInput label="Name" placeholder="wallet" v-model="accountCreationData.name" />
      </div>
      <p class="text-red-500">{{ accountCreationData.error }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton :disabled="accountCreationDisabled" @click="handleAccountCreation">
          Create
        </UIButton>
      </div>
    </UIModal>

    <!-- Update Modal -->
    <UIModal class="z-50" v-if="showModal && modalType === 'update'" title="Update account" :modalKeyName="modalKeyName"
    :showModal="showModal">
    <div class="mb-20 flex flex-col  gap-10 md:gap-5">
      <UIInput label="Name" v-model="accountUpdateData.name" />
    </div>
    <p class="text-red-500">{{ accountUpdateData.error }}</p>
    <div class="flex justify-between gap-5">
      <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
      <UIButton :disabled="accountUpdateDisabled" @click="handleAccountUpdate">
        Update
      </UIButton>
    </div>
  </UIModal>
  </div>
</template>
<script lang="ts" setup>
import { IAccountExtented } from '~~/types/IAccountExtended';
import { displayCurrency } from '~~/helpers/displayCurrency';
import { getTransactionSum } from '~~/helpers/getTransactionSum';
import { ICategoryExtented } from '~~/types/ICategoryExtended';
import { IAccount } from '~~/types/IAccount';

const emits = defineEmits([
  'selectAccount',
  'refreshAccounts',
])
const props = defineProps<{
  userId: string | undefined
  userAccounts: IAccountExtented[]
  loading: boolean
}>()

const { createNewAccount, updateAccount, deleteAccount } = useAccount()


const modalKeyName = "show_modal_account"
const { useShowModal, openModal, closeModal } =
  useModal(modalKeyName)
const showModal = useShowModal

const accountCreationData = reactive({
  name: '',
  loading: false,
  error: '',
})
const accountUpdateData = reactive({
  id:'',
  name: '',
  loading: false,
  error: '',
})
const modalType = ref('')
const accountCreationDisabled = computed(() => {
  return !accountCreationData.name || accountCreationData.loading
})
const accountUpdateDisabled = computed(() => {
  return !accountUpdateData.name || accountUpdateData.loading
})

const openCreationModal = () => {
  modalType.value = 'creation'
  openModal()
}
const openUpdateModal = (account: IAccount) => {
  modalType.value = 'update'
  accountUpdateData.id = account.id as string
  accountUpdateData.name = account.name
  openModal()
}

const getCategorySum = (categories:ICategoryExtented[]) => {
  return categories.reduce((sum, category:ICategoryExtented) => sum + (getTransactionSum(category.transactions) * (category.type === 'expense' ? -1 : 1)), 0)
}


const handleAccountCreation = async () => {
  accountCreationData.loading = true

  try {
    const { account } = await createNewAccount({
      name: accountCreationData.name,
      userId: props.userId,
    })

    closeModal()
    emits('refreshAccounts')
    emits('selectAccount', account.id)

    accountCreationData.error = ''
    accountCreationData.name = ''

  } catch (error: any) {
    accountCreationData.error = error.statusMessage

  } finally {
    accountCreationData.loading = false
  }
}
const handleAccountUpdate = async () => {
  accountUpdateData.loading = true

  try {
    await updateAccount({
      accountId: accountUpdateData.id,
      name: accountUpdateData.name,
    })

    closeModal()
    emits('refreshAccounts')
    emits('selectAccount', accountUpdateData.id)

    accountUpdateData.id = ''
    accountUpdateData.name = ''
    accountUpdateData.error = ''

  } catch (error: any) {
    accountUpdateData.error = error.statusMessage

  } finally {
    accountUpdateData.loading = false
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

