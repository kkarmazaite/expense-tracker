<template>
  <div class="bg-white rounded-md py-5">
    <div v-if="props.accountName" class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl">{{ props.accountName }}</h2>
        <div class="flex justify-between w-full">
          <div></div>
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

const props = defineProps<{
  accountName: string | undefined
  accountTotalIncome: number
  accountTotalExpenses: number
}>()
const accountBalance = computed(() => (props.accountTotalIncome !== undefined && props.accountTotalExpenses !== undefined) ? props.accountTotalIncome - props.accountTotalExpenses : 0)
</script>