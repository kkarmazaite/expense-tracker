<template>
  <div class="bg-white rounded-md py-5">
    <div @scroll="handleScroll" class="max-h-[500px] w-full h-full px-5 overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-12 md:pb-5 sticky top-0 bg-white z-10">
        <h2 class="capitalize text-bold text-2xl">Transactions</h2>
        <UIButton data-cy="transaction-creation-button" v-if="props.accountCategories.length > 0" type="plain" class="w-auto px-2 text-3xl md:text-xl"
          @click="openCreationModal">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>

      <!-- Content -->
      <div v-if="props.loading">
        <div class="flex flex-col gap-10 md:gap-5 pb-10">
          <div v-for="idx in 4" :key="idx" class="flex justify-between w-full gap-4 animate-pulse"> 
            <div class="w-[48px] h-[48px] bg-gray-100 rounded-full"></div>
            <div class="flex justify-between items-center w-full gap-4">
              <div>
                <div class="w-52 h-6 bg-gray-100 rounded-md"></div>
                <div class="w-28 h-4 bg-gray-100 rounded-md mt-2"></div>
              </div>
              <div class="w-24 h-6 bg-gray-100 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-10 md:gap-5 pb-10">
        <div class="flex justify-between w-full group overflow-hidden" v-for="transaction in props.accountTransactions"
          :key="transaction.id">
          <div data-cy="transaction" class="flex justify-between w-full gap-4 mt-1 md:mt-0 text-sm md:text-base">
            <div class="flex gap-4 break-all">
              <UICategoryIcon 
                :hex-code="transaction.category.color?.hexCode ? transaction.category.color?.hexCode: ''" 
                :icon-name="transaction.category.icon?.name ? transaction.category.icon?.name: ''" 
                />
              <div>
                <p data-cy="transaction-name" class="font-bold text-left" :class="{
                  'text-green-500': transaction.category.type === 'income',
                  'text-red-500': transaction.category.type === 'expense'
                }">
                  {{ transaction.category.name }}</p>
                <p class="text-gray-400 text-left">{{ transaction.date.toString().substring(0, 10) }}</p>
              </div>
            </div>

            <div>
              <p class="font-bold">{{ displayCurrency(transaction.amount) }}</p>
            </div>
          </div>
          <div data-cy="transaction-buttons" class="flex  justify-start items-start gap-1 pl-2 pr-5 transition-all ease-in-out duration-500 w-28 md:w-0 opacity-100 md:opacity-0 group-hover:w-28 group-hover:opacity-100">
            <UIButton class="w-1 px-2 text-lg md:text-base" type="plain" @click="openUpdateModal(transaction)">
              <font-awesome-icon icon="fa fa-pencil" />
            </UIButton>
            <UIButton data-cy="transaction-delete-button" class="w-1 px-2 text-lg md:text-base" type="plain" @click="handleTransactionDeletion(transaction.id)">
              <font-awesome-icon icon="fa fa-trash" />
            </UIButton>
          </div>
        </div>
        <UISpinner class="w-full mt-5" v-if="props.additionalTransactionsLoading" />

      </div>
    </div>

    <!-- Creation Modal -->
    <UIModal data-cy="transaction-creation-modal" class="z-50" v-if="showModal && modalType === 'creation'" title="Create new transaction" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col gap-10 md:gap-5">
        <UISelect data-cy="transaction-creation-category-input" label="Category" :selectOptionList="selectList" :value="transactionCreationData.categoryId"
          v-model="transactionCreationData.categoryId" />
        <UIInput label="Date" type="date" v-model="transactionCreationData.date" />
        <UIInput data-cy="transaction-creation-amount-input" label="Amount" type="number" v-model="transactionCreationData.amount" />
        <UIInput label="Description" v-model="transactionCreationData.description" />
        <div v-if="transactionCreationData.description && transactionCreationData.description.includes('<') && transactionCreationData.description.includes('>')" v-dompurify-html="transactionCreationData.description" class="w-full"></div>
      </div>
      <p class="text-red-500">{{ transactionCreationData.error }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton data-cy="transaction-creation-create-button" :disabled="transactionCreationDisabled" @click="handleTransactionCreation">
          Create
        </UIButton>
      </div>

    </UIModal>

    <!-- Update Modal -->
    <UIModal class="z-50" v-if="showModal && modalType === 'update'" title="Update transaction" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col gap-10 md:gap-5">
        <UISelect label="Category" :selectOptionList="selectList" :value="transactionUpdateData.categoryId"
          v-model="transactionUpdateData.categoryId" />
        <UIInput label="Date" type="date" v-model="transactionUpdateData.date" />
        <UIInput label="Amount" type="number" v-model="transactionUpdateData.amount" />
        <UIInput label="Description" v-model="transactionUpdateData.description" />
        <div v-if="transactionUpdateData.description && transactionUpdateData.description.includes('<') && transactionUpdateData.description.includes('>')" v-dompurify-html="transactionUpdateData.description" class="w-full"></div>
      </div>
      <p class="text-red-500">{{ transactionUpdateData.error }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton :disabled="transactionUpdateDisabled" @click="handleTransactionUpdate">
          Update
        </UIButton>
      </div>

    </UIModal>
  </div>
</template>
<script lang="ts" setup>
import { ICategory } from '~~/types/ICategory';
import { ITransaction } from '~~/types/ITransaction';
import { displayCurrency } from '~~/helpers/displayCurrency';

const emits = defineEmits([
  'refreshTransactions',
  'loadMoreTransactions',
])

const props = defineProps<{
  accountCategories: ICategory[]
  accountTransactions: ITransaction[]
  loading: boolean
  additionalTransactionsLoading: boolean
}>()

const { createNewTransaction, deleteTransaction, updateTransaction } = useTransaction()

const selectList = computed(() => props.accountCategories.map((category) => {
  return {
    "value": category.id as string,
    "valueDisplay": category.name,
  }
}) || [])

const handleScroll = (el:any) => {
  if((el.srcElement.offsetHeight + el.srcElement.scrollTop) >= el.srcElement.scrollHeight) {
    loadMoreTransactions()
  }
}

const loadMoreTransactions = () => {
  emits('loadMoreTransactions')
}

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
  error: '',
})
const transactionUpdateData = reactive({
  id:'',
  date: new Date().toISOString().substring(0, 10),
  categoryId: '',
  amount: '',
  description: '',
  loading: false,
  error: '',
})
const modalType = ref('')
const transactionCreationDisabled = computed(() => {
  return !transactionCreationData.date || !transactionCreationData.categoryId || !(parseFloat(transactionCreationData.amount) > 0) || transactionCreationData.loading
})
const transactionUpdateDisabled = computed(() => {
  return !transactionUpdateData.date || !transactionUpdateData.categoryId || !(parseFloat(transactionUpdateData.amount) > 0) || transactionUpdateData.loading
})

const openCreationModal = () => {
  modalType.value = 'creation'
  openModal()
}
const openUpdateModal = (transaction: ITransaction) => {
  modalType.value = 'update'
  transactionUpdateData.id = transaction.id as string
  transactionUpdateData.categoryId = transaction.categoryId
  transactionUpdateData.date = transaction.date.toString().substring(0, 10)
  transactionUpdateData.amount = transaction.amount.toString()
  transactionUpdateData.description = transaction.description as string
  openModal()
}

const handleTransactionCreation = async () => {
  transactionCreationData.loading = true

  try {
    await createNewTransaction({
      date: `${transactionCreationData.date}T00:00:00.000Z`,
      categoryId: transactionCreationData.categoryId,
      amount: parseFloat(transactionCreationData.amount),
      description: transactionCreationData.description,
    })

    closeModal()
    emits('refreshTransactions')

    transactionCreationData.error = ''
    transactionCreationData.date = new Date().toISOString().substring(0, 10)
    transactionCreationData.categoryId = ''
    transactionCreationData.amount = ''
    transactionCreationData.description = ''
    
  } catch (error: any) {
    transactionCreationData.error = error.statusMessage

  } finally {
    transactionCreationData.loading = false
  }
}
const handleTransactionUpdate = async () => {
  transactionUpdateData.loading = true

  try {
    await updateTransaction({
      transactionId: transactionUpdateData.id,
      date: `${transactionUpdateData.date}T00:00:00.000Z`,
      categoryId: transactionUpdateData.categoryId,
      amount: parseFloat(transactionUpdateData.amount),
      description: transactionUpdateData.description,
    })

    closeModal()
    emits('refreshTransactions')

    transactionUpdateData.error = ''
    transactionCreationData.date = new Date().toISOString().substring(0, 10)
    transactionUpdateData.categoryId = ''
    transactionUpdateData.amount = ''
    transactionUpdateData.description = ''
    
  } catch (error: any) {
    transactionUpdateData.error = error.statusMessage

  } finally {
    transactionUpdateData.loading = false
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