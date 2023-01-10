<template>
  <div class="bg-white rounded-md py-5">
    <div v-if="selectedAccount" class="w-full h-full px-5  overflow-auto">
      <!-- Header -->
      <div class="flex justify-between pb-5 sticky top-0 bg-white">
        <h2 class="capitalize text-bold text-2xl">{{ selectedAccount.account.name }}</h2>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
const { useSelectedAccount } = useAccount()
const selectedAccount = useSelectedAccount()
</script>