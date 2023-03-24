<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5 overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-12 md:pb-5 sticky top-0 bg-white z-10">
        <h2 class="capitalize text-bold text-2xl">Transactions</h2>
        <UIButton v-if="props.accountCategories.length > 0" type="plain" class="w-auto px-2 text-3xl md:text-xl"
          @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>

      <!-- Content -->
      <div v-if="props.accountTransactions.length > 0" class="flex flex-col gap-10 md:gap-5 pb-10">
        <div class="flex justify-between w-full group overflow-hidden" v-for="transaction in props.accountTransactions"
          :key="transaction.id">
          <div class="flex justify-between w-full mt-1 md:mt-0 text-sm md:text-base">
            <div>
              <p class="font-bold text-left" :class="{
                'text-green-500': transaction.category.type === 'income',
                'text-red-500': transaction.category.type === 'expense'
              }">
                {{ transaction.category.name }}</p>
              <p class="text-gray-400 text-left">{{ transaction.date.toString().substring(0, 10) }}</p>
            </div>
            <div>
              <p class="font-bold">{{ displayCurrency(transaction.amount) }}</p>
            </div>
          </div>
          <div class="transition-all ease-in-out duration-500 w-16 md:w-0 opacity-100 md:opacity-0 group-hover:w-16 group-hover:opacity-100">
            <UIButton class="ml-4 text-xl md:text-base" type="plain" @click="handleTransactionDeletion(transaction.id)">
              <font-awesome-icon class="text-red-500" icon="fa fa-trash" />
            </UIButton>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <UIModal class="z-50" v-if="showModal" title="Create new transaction" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col gap-10 md:gap-5">
        <UISelect label="Category" :selectOptionList="selectList" :value="transactionCreationData.categoryId"
          v-model="transactionCreationData.categoryId" />
        <UIInput label="Date" type="date" v-model="transactionCreationData.date" />
        <UIInput label="Amount" type="number" v-model="transactionCreationData.amount" />
        <UIInput label="Description" v-model="transactionCreationData.description" />
      </div>
      <p class="text-red-500">{{ transactionCreationError }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton :disabled="transactionCreationDisabled" @click="handleTransactionCreation">
          Create
        </UIButton>
      </div>

    </UIModal>
  </div>
</template>
<script lang="ts" setup>
import { ICategory } from '~~/types/ICategory';
import { ITransaction } from '~~/types/ITransaction';
import { displayCurrency } from '~~/helpers/displayCurrency';


const emits = defineEmits(['refreshTransactions'])

const props = defineProps<{
  accountCategories: ICategory[]
  accountTransactions: ITransaction[]
}>()

const { createNewTransaction, deleteTransaction } = useTransaction()

const selectList = computed(() => props.accountCategories.map((category) => {
  return {
    "value": category.id as string,
    "valueDisplay": category.name,
  }
}) || [])

const modalKeyName = "show_modal_transactions"
const { useShowModal, openModal, closeModal } =
  useModal(modalKeyName)
const showModal = useShowModal

const transactionCreationData = reactive({
  date: new Date().toISOString().substring(0, 10),
  categoryId: '',
  amount: '',
  description: '',
  loading: false,
})
const transactionCreationError = ref('')
const transactionCreationDisabled = computed(() => {
  return !transactionCreationData.date || !transactionCreationData.categoryId || !(parseFloat(transactionCreationData.amount) > 0) || transactionCreationData.loading
})

const handleTransactionCreation = async () => {
  transactionCreationData.loading = true

  try {
    await createNewTransaction({
      date: `${transactionCreationData.date}T00:00:00.000Z`,
      categoryId: transactionCreationData.categoryId,
      amount: parseFloat(transactionCreationData.amount),
      description: transactionCreationData.description,
    })
    transactionCreationError.value = ''
    transactionCreationData.date = new Date().toISOString().substring(0, 10)
    transactionCreationData.categoryId = ''
    transactionCreationData.amount = ''
    transactionCreationData.description = ''
    closeModal()
    emits('refreshTransactions')
  } catch (error: any) {
    transactionCreationError.value = error.statusMessage
  } finally {
    transactionCreationData.loading = false
  }
}
const handleTransactionDeletion = async (transactionId: string | undefined) => {
  if (!transactionId) {
    window.alert('An error has occured. Please try again.')
    return
  }
  if (!window.confirm('Do you want to delete this transaction?')) {
    return
  }

  try {
    await deleteTransaction(transactionId)
    emits('refreshTransactions')
  } catch (error: any) {
    window.alert(error.statusMessage)
    return
  }
}
</script>