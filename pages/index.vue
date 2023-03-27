<template>
  <div class="p-5 h-full w-full grid grid-cols-1 md:grid-cols-5 auto-rows-auto gap-5">
    <Statistics :account="displayData.selectedAccount"
      :account-total-income="displayData.selectedAccountTransactionsTotalIncome"
      :account-total-expenses="displayData.selectedAccountTransactionsTotalExpense"
      :expense-transactions="displayData.selectedAccountExpenseTransactions" ref="statistics"
      :selected-date-from="displayData.selectedDateFrom"
      :selected-date-to="displayData.selectedDateTo"
      @select-date="selectDate"
      class="order-1 md:order-1 col-span-1 md:col-span-3 row-span-1 min-h-[500px]" />

    <Accounts :user-accounts="displayData.userAccounts" :user-id="user?.id" @select-account="fetchAccountData"
      @refresh-accounts="fetchUserAccounts" class="order-3 md:order-2 col-span-1 md:col-span-2 row-span-1" />

    <Transactions :account-categories="displayData.selectedAccountCategories"
      :account-transactions="displayData.selectedAccountTransactions"
      class="order-2 md:order-3 col-span-1 md:col-span-3 row-span-1" @refresh-transactions="refreshData" />

    <Categories :account-categories="displayData.selectedAccountCategories" :account="displayData.selectedAccount"
      class="order-4 md:order-4 col-span-1 md:col-span-2 row-span-1" @refresh-categories="fetchAccountCategories" />
  </div>
</template>
<script lang="ts" setup>
import { IAccount } from '~~/types/IAccount';
import { IAccountExtented } from '~~/types/IAccountExtended';
import { ICategoryExtented } from '~~/types/ICategoryExtended';
import { ITransaction } from '~~/types/ITransaction';
import { dateToIsoString } from '~~/helpers/dateToIsoString';
import { monthFirstAndLastDay } from '~~/helpers/monthFirstAndLastDay';

const { selectDateRange } = useDate()
const { getUserAccounts, getAccountById } = useAccount()
const { getAccountCategories } = useCategory()
const { getAccountTransactions } = useTransaction()
const { authUser } = useAuth()
const user = authUser
const statistics = ref<any>(null)

const displayData = reactive<{
  selectedAccount: IAccount | null
  selectedDateFrom: Date 
  selectedDateTo: Date
  userAccounts: IAccountExtented[]
  selectedAccountCategories: ICategoryExtented[]
  selectedAccountTransactions: ITransaction[]
  selectedAccountExpenseTransactions: ITransaction[]
  selectedAccountTransactionsTotalIncome: number
  selectedAccountTransactionsTotalExpense: number
}>({
  selectedAccount: null,
  selectedDateFrom: new Date(),
  selectedDateTo: new Date(),
  userAccounts: [],
  selectedAccountCategories: [],
  selectedAccountTransactions: [],
  selectedAccountExpenseTransactions: [],
  selectedAccountTransactionsTotalIncome: 0,
  selectedAccountTransactionsTotalExpense: 0,
})

const initializeData = async () => {
  const currentdate = new Date()
  const { firstDay:dateFrom, lastDay:dateTo }= monthFirstAndLastDay(currentdate)

  displayData.selectedDateFrom = dateFrom
  displayData.selectedDateTo = dateTo
  
  await selectDateRange(dateToIsoString(dateFrom), dateToIsoString(dateTo))
  
  await fetchUserAccounts()

  if (!displayData.selectedAccount && displayData.userAccounts.length > 0) {
    fetchAccountData(displayData.userAccounts[0].id as string)
  }
}
const selectDate = async (dateFrom:Date, dateTo:Date) => {
  displayData.selectedDateFrom = dateFrom
  displayData.selectedDateTo = dateTo

  await selectDateRange(dateToIsoString(dateFrom), dateToIsoString(dateTo))
  await fetchAccountData(displayData?.selectedAccount?.id as string)
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

  initializeGraphs()
}

const fetchAccountTransactions = async () => {
  const {
    transactions_all, transactions_income_total, transactions_expense_total, transactions_expense,
  } = await getAccountTransactions()
  displayData.selectedAccountTransactions = transactions_all
  displayData.selectedAccountExpenseTransactions = transactions_expense
  displayData.selectedAccountTransactionsTotalIncome = transactions_income_total
  displayData.selectedAccountTransactionsTotalExpense = transactions_expense_total

}

const initializeGraphs = () => {
  if (statistics.value) {
    statistics.value.initializeGraphs()
  }
}

const fetchAccountData = async (selectedAccountId: string) => {
  const { account } = await getAccountById(selectedAccountId)
  displayData.selectedAccount = account

  await fetchAccountCategories()

  await fetchAccountTransactionData()

}

const refreshData = async () => {
  await fetchUserAccounts()

  await fetchAccountData(displayData?.selectedAccount?.id as string)
}

initializeData()

onMounted(() => {
  window.addEventListener("resize", initializeGraphs);
})
onUnmounted(() => {
  window.removeEventListener("resize", initializeGraphs);
})

</script>