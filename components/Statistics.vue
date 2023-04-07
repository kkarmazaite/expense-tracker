<template>
  <div class="bg-white rounded-md py-5">
    <div v-if="props.account" class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="pb-5 sticky top-0 bg-white flex flex-col md:flex-row justify-between">
        <div v-if="props.loading" class="w-52 h-8 mb-5 bg-gray-100 rounded-md animate-pulse"></div>
        <h2 v-else class="capitalize text-bold text-2xl pb-5 break-all">{{ props.account.name }}</h2>
        <div class="flex justify-between items-center w-full md:w-60 my-2 md:my-0">
          <UIButton class="text-xl md:text-base" type="plain" @click="changeMonth('prev')">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
          </UIButton>
          <span>{{ dateDisplay }}</span> 
          <UIButton class="text-xl md:text-base" type="plain" @click="changeMonth('next')">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </UIButton>
        </div>
      </div>
        <div>
          <div class="flex gap-5 md:gap-20 items-center justify-between">
            <div class="h-28 relative">
              <div v-if="props.loading" class="w-[112px] h-[112px] bg-gray-100 rounded-full animate-pulse absolute"></div>
              <GraphDonut class="h-28 w-28" ref="donutGraph" />
            </div>
            <div v-if="props.loading" class="font-bold text-sm md:text-base flex flex-col gap-5 w-52 animate-pulse">
              <div class="w-52 h-6 bg-gray-100 rounded-md"></div>
              <div class="w-52 h-6 bg-gray-100 rounded-md"></div>
              <div class="w-52 h-6 bg-gray-100 rounded-md"></div>
            </div>
            <div v-else class="font-bold text-sm md:text-base flex flex-col gap-5 w-52 ">
              <div class="flex justify-between text-green-500">
                <span>Income:</span>
                <span>{{ displayCurrency(props.accountTotalIncome) }}</span>
              </div>
              <div class="flex justify-between text-red-500">
                <span>Expenses:</span>
                <span>{{ displayCurrency(props.accountTotalExpenses) }}</span>
              </div>
              <div class="flex justify-between" :class="{
                'text-green-500': accountBalance > 0,
                'text-red-500': accountBalance < 0
              }">
                <span>Balance:</span>
                <span>{{ displayCurrency(accountBalance) }}</span>
              </div>

            </div>
          </div>
          <h3 class="font-bold mt-10">Expenses - Last 7 days</h3>
          <div class="h-48 relative">
            <div v-if="props.loading" class="w-full h-48 bg-gray-100 animate-pulse absolute"></div>
            <GraphBar ref="barGraph" class="h-48 w-full" />
          </div>
          
        </div>
      
    </div>
  </div>
</template>
<script lang="ts" setup>
import { displayCurrency } from '~~/helpers/displayCurrency';
import { IAccount } from '~~/types/IAccount';
import { ITransaction } from '~~/types/ITransaction';
import { monthFirstAndLastDay } from '~~/helpers/monthFirstAndLastDay';

const props = defineProps<{
  account: IAccount | null
  accountTotalIncome: number
  accountTotalExpenses: number
  expenseTransactions: ITransaction[]
  selectedDateFrom: Date
  selectedDateTo: Date
  loading: boolean
}>()

const emits = defineEmits(['selectDate'])

const donutGraph = ref<any>(null)
const barGraph = ref<any>(null)

const accountBalance = computed(() => (props.accountTotalIncome !== undefined && props.accountTotalExpenses !== undefined) ? props.accountTotalIncome - props.accountTotalExpenses : 0)
const dateDisplay = computed(() => `${props.selectedDateFrom.getFullYear()} ${props.selectedDateFrom.toLocaleString('default', { month: 'long' })}`)

const initializeGraphs = () => {
  let donutGraphData = [
    props.accountTotalIncome,
    props.accountTotalExpenses,
  ]
  if (donutGraph.value) {
    donutGraph.value.initializeGraph(donutGraphData)
  }

  let barGraphData = lastWeekExpenses()
  if (barGraph.value) {
    barGraph.value.initializeGraph(barGraphData)
  }

}
const lastWeekExpenses = () => {

  const currentDate = new Date();
  let weekExpensesArray = []
  for (let i = 6; i >= 0; i--) {
    let date = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000))
    let dateDisplay = date.toISOString().substring(5, 10)

    let dateExpenseTotal = props.expenseTransactions.filter(transaction =>
      transaction.date.toString().substring(0, 10) === date.toISOString().substring(0, 10)).reduce((partialSum, transaction) => partialSum + transaction.amount, 0);

    weekExpensesArray.push({
      group: dateDisplay,
      value: dateExpenseTotal,
      valueDisplay: displayCurrency(dateExpenseTotal),
    })
  }
  return weekExpensesArray
}

const changeMonth = (action:string) => {
  const monthDifference = action === 'prev' ? -1 : 1

  let newDate = new Date(props.selectedDateFrom)
  newDate.setMonth(newDate.getMonth()+monthDifference)

  const { firstDay:dateFrom, lastDay:dateTo }= monthFirstAndLastDay(newDate)

  emits('selectDate', dateFrom, dateTo)
}

defineExpose({
  initializeGraphs,
});
</script>