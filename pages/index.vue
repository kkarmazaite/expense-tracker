<template>
  <div class="p-5 pb-20 h-full w-full grid grid-cols-4 grid-rows-2 gap-5">
    <Statistics class="col-span-3 row-span-1" />
    <Accounts :user-accounts="displayData.userAccounts" :user-id="user?.id" @select-account="fetchAccountData"
      class="col-span-1 row-span-1" />
    <Transactions class="col-span-3 row-span-1" />
    <Categories :account-categories="displayData.selectedAccountCategories"
      :account-id="displayData.selectedAccount?.id" class="col-span-1 row-span-1" />
  </div>
</template>
<script lang="ts" setup>
import { IAccount } from '~~/types/IAccount';
import { ICategory } from '~~/types/ICategory';

const { getUserAccounts, getAccountById } = useAccount()
const { getAccountCategories } = useCategory()
const { useAuthUser, useAuthToken } = useAuth()
const user = useAuthUser()
console.log(useAuthToken().value)

const displayData = reactive<{
  selectedAccount: IAccount | undefined
  userAccounts: IAccount[]
  selectedAccountCategories: ICategory[]
}>({
  selectedAccount: undefined,
  userAccounts: [],
  selectedAccountCategories: []
})

const fetchUserAccounts = async () => {
  const { accounts } = await getUserAccounts()
  displayData.userAccounts = accounts

  if (!displayData.selectedAccount && displayData.userAccounts.length > 0) {
    fetchAccountData(displayData.userAccounts[0].id as string)
  }
}

const fetchAccountData = async (selectedAccountId: string) => {
  const { account } = await getAccountById(selectedAccountId)
  displayData.selectedAccount = account

  const { categories } = await getAccountCategories()
  displayData.selectedAccountCategories = categories

}

fetchUserAccounts()
</script>