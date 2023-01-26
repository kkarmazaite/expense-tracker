<template>
  <div class="p-5 pb-20 h-full w-full grid grid-cols-4 grid-rows-2 gap-5">
    <Statistics :account-name="displayData.selectedAccount?.name"
      :account-total-income="displayData.selectedAccountTransactionsTotalIncome"
      :account-total-expenses="displayData.selectedAccountTransactionsTotalExpense"
      :expense-transactions="displayData.selectedAccountExpenseTransactions" ref="statistics"
      class="col-span-3 row-span-1" />

    <Accounts :user-accounts="displayData.userAccounts" :user-id="user?.id" @select-account="fetchAccountData"
      @refresh-accounts="fetchUserAccounts" class="col-span-1 row-span-1" />

    <Transactions :account-categories="displayData.selectedAccountCategories"
      :account-transactions="displayData.selectedAccountTransactions" class="col-span-3 row-span-1"
      @refresh-transactions="fetchAccountTransactionData" />

    <Categories :account-categories="displayData.selectedAccountCategories"
      :account-id="displayData.selectedAccount?.id" class="col-span-1 row-span-1"
      @refresh-categories="fetchAccountCategories" />
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
const statistics = ref<any>(null)

const displayData = reactive<{
  selectedAccount: IAccount | undefined
  userAccounts: IAccount[]
  selectedAccountCategories: ICategory[]
  selectedAccountTransactions: ITransaction[]
  selectedAccountExpenseTransactions: ITransaction[]
  selectedAccountTransactionsTotalIncome: number
  selectedAccountTransactionsTotalExpense: number
}>({
  selectedAccount: undefined,
  userAccounts: [],
  selectedAccountCategories: [],
  selectedAccountTransactions: [],
  selectedAccountExpenseTransactions: [],
  selectedAccountTransactionsTotalIncome: 0,
  selectedAccountTransactionsTotalExpense: 0
})
const initializeData = async () => {
  await fetchUserAccounts()

  if (!displayData.selectedAccount && displayData.userAccounts.length > 0) {
    fetchAccountData(displayData.userAccounts[0].id as string)
  }
}

const fetchUserAccounts = async () => {
  const { accounts } = await getUserAccounts()
  displayData.userAccounts = accounts
}

const fetchAccountCategories = async () => {
  const { categories } = await getAccountCategories()
  displayData.selectedAccountCategories = categories
}

const fetchAccountTransactionData = async () => {

  await fetchAccountTransactions()

  if (statistics.value) {
    statistics.value.initializeGraphs()
  }
}
const fetchAccountTransactions = async () => {
  const { transactions_all, transactions_income_total, transactions_expense_total, transactions_expense } = await getAccountTransactions()
  displayData.selectedAccountTransactions = transactions_all
  displayData.selectedAccountExpenseTransactions = transactions_expense
  displayData.selectedAccountTransactionsTotalIncome = transactions_income_total
  displayData.selectedAccountTransactionsTotalExpense = transactions_expense_total

}

const fetchAccountData = async (selectedAccountId: string) => {
  const { account } = await getAccountById(selectedAccountId)
  displayData.selectedAccount = account

  await fetchAccountCategories()

  await fetchAccountTransactionData()

}


initializeData()

</script>