<template>
  <div class="p-5 pb-20 h-full w-full grid grid-cols-4 grid-rows-2 gap-5">
    <Statistics :account-name="displayData.selectedAccount?.name"
      :account-total-income="displayData.selectedAccountTransactionsTotalIncome"
      :account-total-expenses="displayData.selectedAccountTransactionsTotalExpense" class="col-span-3 row-span-1" />

    <Accounts :user-accounts="displayData.userAccounts" :user-id="user?.id" @select-account="fetchAccountData"
      class="col-span-1 row-span-1" />

    <Transactions :account-categories="displayData.selectedAccountCategories"
      :account-transactions="displayData.selectedAccountTransactions" class="col-span-3 row-span-1" />

    <Categories :account-categories="displayData.selectedAccountCategories"
      :account-id="displayData.selectedAccount?.id" class="col-span-1 row-span-1" />
  </div>
</template>
<script lang="ts" setup>
import { IAccount } from '~~/types/IAccount';
import { ICategory } from '~~/types/ICategory';
import { ITransaction } from '~~/types/ITransaction';

const { getUserAccounts, getAccountById } = useAccount()
const { getAccountCategories } = useCategory()
const { getAccountTransactions } = useTransaction()
const { useAuthUser, useAuthToken } = useAuth()
const user = useAuthUser()
console.log(useAuthToken().value)

const displayData = reactive<{
  selectedAccount: IAccount | undefined
  userAccounts: IAccount[]
  selectedAccountCategories: ICategory[]
  selectedAccountTransactions: ITransaction[]
  selectedAccountTransactionsTotalIncome: number
  selectedAccountTransactionsTotalExpense: number
}>({
  selectedAccount: undefined,
  userAccounts: [],
  selectedAccountCategories: [],
  selectedAccountTransactions: [],
  selectedAccountTransactionsTotalIncome: 0,
  selectedAccountTransactionsTotalExpense: 0
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

  const { transactions_all, transactions_income_total, transactions_expense_total } = await getAccountTransactions()
  displayData.selectedAccountTransactions = transactions_all
  displayData.selectedAccountTransactionsTotalIncome = transactions_income_total
  displayData.selectedAccountTransactionsTotalExpense = transactions_expense_total

}

fetchUserAccounts()
</script>