<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5 overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-12 md:pb-5 sticky top-0 bg-white z-10">
        <h2 class="capitalize text-bold text-2xl">Categories</h2>
        <UIButton v-if="props.account" type="plain" class="w-auto px-2 text-3xl md:text-xl" @click="openCreationModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>

      <!-- Content -->
      <div v-if="accountCategories" class="flex flex-col gap-10 md:gap-5 pb-10">
        <div class="flex justify-between w-full group overflow-hidden text-sm md:text-base"
          v-for="accountCategory in props.accountCategories" :key="accountCategory.id">
          <div class="flex justify-between w-full mt-1 md:mt-0">
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
          <div class="flex justify-between gap-1 pl-4 transition-all ease-in-out duration-500 w-24 md:w-0 opacity-100 md:opacity-0 group-hover:w-24 group-hover:opacity-100">
            <UIButton class="text-xl md:text-base" type="plain" @click="openUpdateModal(accountCategory)">
              <font-awesome-icon icon="fa fa-pencil" />
            </UIButton>
            <UIButton class="text-xl md:text-base" type="plain" @click="handleCategoryDeletion(accountCategory.id)">
              <font-awesome-icon icon="fa fa-trash" />
            </UIButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Creation Modal -->
    <UIModal class=" z-50" v-if="showModal && modalType === 'creation'" title="Create new category" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col  gap-10 md:gap-5">
        <UISelect label="Type" :selectOptionList="selectList" :value="categoryCreationData.type"
          v-model="categoryCreationData.type" />
        <UIInput label="Name" placeholder="groceries" v-model="categoryCreationData.name" />
      </div>
      <p class="text-red-500">{{ categoryCreationData.error }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton :disabled="categoryCreationDisabled" @click="handleCategoryCreation">
          Create
        </UIButton>
      </div>
    </UIModal>

    <!-- Update Modal -->
    <UIModal class=" z-50" v-if="showModal && modalType === 'update'" title="Update category" :modalKeyName="modalKeyName"
    :showModal="showModal">
      <div class="mb-20 flex flex-col  gap-10 md:gap-5">
        <UIInput label="Name" v-model="categoryUpdateData.name" />
      </div>
      <p class="text-red-500">{{ categoryUpdateData.error }}</p>
      <div class="flex justify-between gap-5">
        <UIButton type="plain-border" @click="closeModal()"> Cancel </UIButton>
        <UIButton :disabled="categoryUpdateDisabled" @click="handleCategoryUpdate">
          Update
        </UIButton>
      </div>
    </UIModal>
  </div>
</template>
<script lang="ts" setup>
import { IAccount } from '~~/types/IAccount';
import { ICategoryAccountTypes } from '~~/types/ICategory';
import { ICategoryExtented } from '~~/types/ICategoryExtended';
import { displayCurrency } from '~~/helpers/displayCurrency';
import { getTransactionSum } from '~~/helpers/getTransactionSum';


const emits = defineEmits([
  'refreshCategories',
  'refreshCategoriesWithTransactions',
])

const props = defineProps<{
  account: IAccount | null
  accountCategories: ICategoryExtented[]
}>()

const { createNewCategory, deleteCategory, updateCategory } = useCategory()

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
  error: '',
})
const categoryUpdateData = reactive({
  id:'',
  name: '',
  loading: false,
  error: '',
})
const modalType = ref('')
const categoryCreationDisabled = computed(() => {
  return !categoryCreationData.name || !categoryCreationData.type || categoryCreationData.loading
})
const categoryUpdateDisabled = computed(() => {
  return !categoryUpdateData.name || categoryUpdateData.loading
})

const openCreationModal = () => {
  modalType.value = 'creation'
  openModal()
}
const openUpdateModal = (category: ICategoryExtented) => {
  modalType.value = 'update'
  categoryUpdateData.id = category.id as string
  categoryUpdateData.name = category.name
  openModal()
}

const handleCategoryCreation = async () => {
  categoryCreationData.loading = true

  try {
    await createNewCategory({
      type: categoryCreationData.type,
      name: categoryCreationData.name,
      accountId: props.account?.id,
    })

    closeModal()
    emits('refreshCategories')

    categoryCreationData.error = ''
    categoryCreationData.type = undefined
    categoryCreationData.name = ''

  } catch (error: any) {
    categoryCreationData.error = error.statusMessage

  } finally {
    categoryCreationData.loading = false
  }
}

const handleCategoryUpdate = async () => {
  categoryUpdateData.loading = true

  try {
    await updateCategory({
      categoryId: categoryUpdateData.id,
      name: categoryUpdateData.name,
    })

    closeModal()
    emits('refreshCategoriesWithTransactions')

    categoryUpdateData.id = ''
    categoryUpdateData.name = ''
    categoryUpdateData.error = ''

  } catch (error: any) {
    categoryUpdateData.error = error.statusMessage

  } finally {
    categoryUpdateData.loading = false
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