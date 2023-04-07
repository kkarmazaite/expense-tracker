<template>
  <div class="p-5 h-full w-full grid grid-cols-1 md:grid-cols-5 auto-rows-auto gap-5">
    <Statistics 
      class="order-1 md:order-1 col-span-1 md:col-span-3 row-span-1 min-h-[500px] max-h-[550px]"
      :account="displayData.selectedAccount"
      :account-total-income="displayData.selectedAccountTransactionsTotalIncome"
      :account-total-expenses="displayData.selectedAccountTransactionsTotalExpense"
      :expense-transactions="displayData.selectedAccountExpenseTransactions" ref="statistics"
      :selected-date-from="displayData.selectedDateFrom"
      :selected-date-to="displayData.selectedDateTo"
      :loading="displayData.statisticsLoading"
      @select-date="selectDate"/>
      

    <Accounts  
      class="order-3 md:order-2 col-span-1 md:col-span-2 row-span-1 min-h-[400px] max-h-[550px]"
      :user-accounts="displayData.userAccounts" 
      :user-id="user?.id" @select-account="selectAccount"
      :loading="displayData.accountsLoading"
      @refresh-accounts="refreshData(['accounts'])" />

    <Transactions 
      class="order-2 md:order-3 col-span-1 md:col-span-3 row-span-1 min-h-[400px] max-h-[550px]" 
      :account-categories="displayData.selectedAccountCategories"
      :account-transactions="displayData.selectedAccountTransactions"
      :loading="displayData.transactionsLoading"
      @refresh-transactions="refreshData(['accounts', 'categories', 'transactions', 'statistics'])" />

    <Categories 
      class="order-4 md:order-4 col-span-1 md:col-span-2 row-span-1 min-h-[400px] max-h-[550px]" 
      :account-categories="displayData.selectedAccountCategories" 
      :account="displayData.selectedAccount"
      :loading="displayData.categoriesLoading"
      @refresh-categories="refreshData(['categories'])" 
      @refresh-categories-with-transactions="refreshData(['categories', 'transactions'])" />
  </div>
</template>
<script lang="ts" setup>
import { IAccount } from '~~/types/IAccount';
import { IAccountExtented } from '~~/types/IAccountExtended';
import { ICategoryExtented } from '~~/types/ICategoryExtended';
import { ITransaction } from '~~/types/ITransaction';
import { dateToIsoString } from '~~/helpers/dateToIsoString';
import { monthFirstAndLastDay } from '~~/helpers/monthFirstAndLastDay';

type components = "accounts" | "categories" | "transactions" | "statistics";

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
  accountsLoading: boolean
  categoriesLoading: boolean
  transactionsLoading: boolean
  statisticsLoading: boolean
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
  accountsLoading: true,
  categoriesLoading: true,
  transactionsLoading: true,
  statisticsLoading: true,
})

const fetchUserAccounts = async () => {
  displayData.accountsLoading = true

  const { accounts } = await getUserAccounts()
  displayData.userAccounts = accounts

  displayData.accountsLoading = false
}

const fetchAccountCategories = async () => {
  displayData.categoriesLoading = true

  const { categories } = await getAccountCategories()
  displayData.selectedAccountCategories = categories

  displayData.categoriesLoading = false
}

const fetchAccountTransactions = async () => {
  displayData.transactionsLoading = true

  const {
    transactions_all, transactions_income_total, transactions_expense_total, transactions_expense,
  } = await getAccountTransactions()
  displayData.selectedAccountTransactions = transactions_all
  displayData.selectedAccountExpenseTransactions = transactions_expense
  displayData.selectedAccountTransactionsTotalIncome = transactions_income_total
  displayData.selectedAccountTransactionsTotalExpense = transactions_expense_total

  displayData.transactionsLoading = false
}

const initializeGraphs = () => {
  displayData.statisticsLoading = true

  if (statistics.value) {
    statistics.value.initializeGraphs()
  }

  displayData.statisticsLoading = false
}

const refreshData = async (components:components[]) => {
  if(components.includes('accounts')){
    await fetchUserAccounts()
  }
  if(components.includes('categories')){
    await fetchAccountCategories()
  }
  if(components.includes('transactions')){
    await fetchAccountTransactions()
  }
  if(components.includes('statistics')){
    await initializeGraphs()
  }
}

const initializeData = async () => {
  const currentdate = new Date()
  const { firstDay:dateFrom, lastDay:dateTo }= monthFirstAndLastDay(currentdate)

  displayData.selectedDateFrom = dateFrom
  displayData.selectedDateTo = dateTo
  
  await selectDateRange(dateToIsoString(dateFrom), dateToIsoString(dateTo))
  
  await refreshData(['accounts'])

  if (!displayData.selectedAccount && displayData.userAccounts.length > 0) {
    await selectAccount(displayData.userAccounts[0].id as string)
  }
}

const selectAccount = async (selectedAccountId: string) => {
  const { account } = await getAccountById(selectedAccountId)
  displayData.selectedAccount = account

  refreshData([
    'categories',
    'transactions',
    'statistics',
  ])
}

const selectDate = async (dateFrom:Date, dateTo:Date) => {
  displayData.selectedDateFrom = dateFrom
  displayData.selectedDateTo = dateTo

  await selectDateRange(dateToIsoString(dateFrom), dateToIsoString(dateTo))
  await refreshData([
    'categories',
    'transactions',
    'statistics',
  ])
}

initializeData()

onMounted(() => {
  window.addEventListener("resize", initializeGraphs);
})
onUnmounted(() => {
  window.removeEventListener("resize", initializeGraphs);
})

</script>