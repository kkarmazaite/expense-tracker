<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5 overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-5 sticky top-0 bg-white z-10">
        <h2 class="capitalize text-bold text-2xl">Transactions</h2>
        <UIButton v-if="selectedAccount && selectedAccountCategories.length > 0" type="plain"
          class="w-auto px-2 text-xl" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>
    </div>
    <!-- Modal -->
    <UIModal class="z-50" v-if="showModal" title="Create new transaction" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col gap-5">
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
const { createNewTransaction } = useTransaction()

const { useSelectedAccount, setSelectedAccount } = useAccount()
const selectedAccount = useSelectedAccount()
const selectedAccountCategories = computed(() => selectedAccount?.value?.accountCategories || [])

const selectList = computed(() => selectedAccountCategories.value.map((category) => {
  return {
    "value": category.id as string,
    "valueDisplay": category.name
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
  console.log(`${transactionCreationData.date}T00:00:00.000Z`)
  transactionCreationData.loading = true


  try {
    await createNewTransaction({
      date: `${transactionCreationData.date}T00:00:00.000Z`,
      categoryId: transactionCreationData.categoryId,
      amount: parseFloat(transactionCreationData.amount),
      description: transactionCreationData.description,
    })
    transactionCreationError.value = ''
    transactionCreationData.date = ''
    transactionCreationData.amount = ''
    transactionCreationData.description = ''
    closeModal()
    await setSelectedAccount(selectedAccount?.value?.account?.id)
  } catch (error: any) {
    transactionCreationError.value = error.statusMessage
  } finally {
    transactionCreationData.loading = false
  }
}
</script>