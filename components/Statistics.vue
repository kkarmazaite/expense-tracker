<template>
  <div class="bg-white rounded-md py-5">
    <div v-if="props.accountName" class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl">{{ props.accountName }}</h2>
        <div class="flex justify-between w-full">
          <div class="w-64 h-52 flex justify-around items-end" id="graph"></div>
          <button @click="initializeGraph()">hue</button>
          <div class="font-bold flex flex-col gap-5 w-52">
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
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { displayCurrency } from '~~/helpers/displayCurrency';
import * as d3 from "d3";

onMounted(() => {
  initializeGraph()
})
const initializeGraph = () => {
  const DUMMY_DATA = [
    { id: 'd1', value: 10, region: 'USA' },
    { id: 'd2', value: 11, region: 'India' },
    { id: 'd3', value: 12, region: 'China' },
    { id: 'd4', value: 6, region: 'Germany' }
  ]

  const container = d3.select('#graph')
    .style('border', '1px solid red')

  const bars = container
    .selectAll('.bar')
    .data(DUMMY_DATA)
    .enter()
    .append('div')
    .classed('bar', true)
    .style('width', '50px')
    .style('height', data => (data.value * 15) + 'px')
    .style('background-color', 'red')
  console.log(bars)
}

const props = defineProps<{
  accountName: string | undefined
  accountTotalIncome: number
  accountTotalExpenses: number
}>()
const accountBalance = computed(() => (props.accountTotalIncome !== undefined && props.accountTotalExpenses !== undefined) ? props.accountTotalIncome - props.accountTotalExpenses : 0)
</script>