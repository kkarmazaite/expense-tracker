<template>
  <div class="bg-white rounded-md py-5">
    <div class="w-full h-full px-5 overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-5 sticky top-0 bg-white z-10">
        <h2 class="capitalize text-bold text-2xl">Categories</h2>
        <UIButton v-if="selectedAccount" type="plain" class="w-auto px-2 text-xl" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </UIButton>
      </div>
    </div>

    <!-- Modal -->
    <UIModal class="z-50" v-if="showModal" title="Create new category" :modalKeyName="modalKeyName"
      :showModal="showModal">
      <div class="mb-20 flex flex-col gap-5">
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
<script lang="ts" setup>import { ICategoryAccountTypes } from '~~/types/ICategory';

const { createNewCategory } = useCategory()
const { useSelectedAccount } = useAccount()
const selectedAccount = useSelectedAccount()

const modalKeyName = "show_modal_categories"
const { useShowModal, openModal, closeModal } =
  useModal(modalKeyName)
const showModal = useShowModal

const selectList = [
  { "value": "expense", "valueDisplay": "Expense" },
  { "value": "income", "valueDisplay": "Income" }
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

const handleCategoryCreation = async () => {
  categoryCreationData.loading = true

  try {
    await createNewCategory({
      type: categoryCreationData.type,
      name: categoryCreationData.name,
      accountId: selectedAccount?.value?.id,
    })
    categoryCreationError.value = ''
    categoryCreationData.type = undefined
    categoryCreationData.name = ''
    closeModal()
  } catch (error: any) {
    categoryCreationError.value = error.statusMessage
  } finally {
    categoryCreationData.loading = false
  }
}
</script>