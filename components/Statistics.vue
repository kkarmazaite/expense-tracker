<template>
  <div class="bg-white rounded-md py-5">
    <div v-if="props.account" class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl pb-5">{{ props.account.name }}</h2>
        <div>
          <div class="flex gap-5 md:gap-20 items-center justify-between">
            <GraphDonut class="h-28 w-28" ref="donutGraph" />
            <div class="font-bold text-sm md:text-base flex flex-col gap-5 w-52">
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

const props = defineProps<{
  account: IAccount | null
  accountTotalIncome: number
  accountTotalExpenses: number
  expenseTransactions: ITransaction[]
}>()
const accountBalance = computed(() => (props.accountTotalIncome !== undefined && props.accountTotalExpenses !== undefined) ? props.accountTotalIncome - props.accountTotalExpenses : 0)
const donutGraph = ref<any>(null)
const barGraph = ref<any>(null)
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

defineExpose({
  initializeGraphs,
});
</script>