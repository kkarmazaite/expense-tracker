<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5 overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-12 md:pb-5 sticky top-0 bg-white z-10">
        <h2 class="capitalize text-bold text-2xl">Categories</h2>
        <UIButton v-if="props.account" type="plain" class="w-auto px-2 text-3xl md:text-xl" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>

      <!-- Content -->
      <div v-if="accountCategories" class="flex flex-col gap-10 md:gap-5 pb-10">
        <div class="flex justify-between w-full group overflow-hidden text-sm md:text-base"
          v-for="accountCategory in props.accountCategories" :key="accountCategory.id">
          <div class="flex justify-between w-full">
            <p class="font-bold text-left" :class="{
              'text-green-500': accountCategory.type === 'income',
              'text-red-500': accountCategory.type === 'expense'
            }"> 
              {{ accountCategory.name }} 
            </p>
            <p v-if="accountCategory.transactions" class="font-bold">
              {{ displayCurrency(getTransactionSum(accountCategory.transactions)) }}
            </p>
          </div>
          <div class="transition-all ease-in-out duration-500 w-16 md:w-0 opacity-100 md:opacity-0 group-hover:w-16 group-hover:opacity-100">
            <UIButton class="ml-4 text-xl md:text-base" type="plain" @click="handleCategoryDeletion(accountCategory.id)">
              <font-awesome-icon class="text-red-500" icon="fa fa-trash" />
            </UIButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <UIModal class=" z-50" v-if="showModal" title="Create new category" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col  gap-10 md:gap-5">
        <UISelect label="Type" :selectOptionList="selectList" :value="categoryCreationData.type"
          v-model="categoryCreationData.type" />
        <UIInput label="Name" placeholder="groceries" v-model="categoryCreationData.name" />
      </div>
      <p class="text-red-500">{{ categoryCreationError }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton :disabled="categoryCreationDisabled" @click="handleCategoryCreation">
          Create
        </UIButton>
      </div>
    </UIModal>
  </div>
</template>
<script lang="ts" setup>
import { IAccount } from '~~/types/IAccount';
import { ICategoryAccountTypes } from '~~/types/ICategory';
import { ICategoryExtented } from '~~/types/ICategoryExtended';
import { ITransaction } from '~~/types/ITransaction';
import { displayCurrency } from '~~/helpers/displayCurrency';

const emits = defineEmits(['refreshCategories'])

const props = defineProps<{
  account: IAccount | null
  accountCategories: ICategoryExtented[]
}>()

const { createNewCategory, deleteCategory } = useCategory()

const modalKeyName = "show_modal_categories"
const { useShowModal, openModal, closeModal } =
  useModal(modalKeyName)
const showModal = useShowModal

const selectList = [
  {
    "value": "expense",
    "valueDisplay": "Expense",
  },
  {
    "value": "income",
    "valueDisplay": "Income",
  },
]
const categoryCreationData = reactive({
  name: '',
  type: undefined as ICategoryAccountTypes | undefined,
  loading: false,
})
const categoryCreationError = ref('')
const categoryCreationDisabled = computed(() => {
  return !categoryCreationData.name || !categoryCreationData.type || categoryCreationData.loading
})

const getTransactionSum = (transactions:ITransaction[]) => {
  return transactions.reduce((sum, transaction:ITransaction) => sum + transaction.amount, 0)
}

const handleCategoryCreation = async () => {
  categoryCreationData.loading = true

  try {
    await createNewCategory({
      type: categoryCreationData.type,
      name: categoryCreationData.name,
      accountId: props.account?.id,
    })
    categoryCreationError.value = ''
    categoryCreationData.type = undefined
    categoryCreationData.name = ''
    closeModal()
    emits('refreshCategories')
  } catch (error: any) {
    categoryCreationError.value = error.statusMessage
  } finally {
    categoryCreationData.loading = false
  }
}
const handleCategoryDeletion = async (categoryId: string | undefined) => {
  if (!categoryId) {
    window.alert('An error has occured. Please try again.')
    return
  }
  if (!window.confirm('Do you want to delete this category?')) {
    return
  }

  try {
    await deleteCategory(categoryId)
    emits('refreshCategories')
  } catch (error: any) {
    window.alert(error.statusMessage)
    return
  }
}
</script>