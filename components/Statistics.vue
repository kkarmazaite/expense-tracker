<template>
  <div class="bg-white rounded-md py-5">
    <div v-if="props.accountName" class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl">{{ props.accountName }}</h2>
        <div class="flex justify-between w-full">
          <div></div>
          <div>
            <p>Income: {{ props.accountTotalIncome }}</p>
            <p>Expenses: {{ props.accountTotalExpenses }}</p>
            <p>Balance: {{ accountBalance }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  accountName: string | undefined
  accountTotalIncome: number | undefined
  accountTotalExpenses: number | undefined
}>()
const accountBalance = computed(() => (props.accountTotalIncome && props.accountTotalExpenses) ? props.accountTotalIncome - props.accountTotalExpenses : 0)
</script>