<template>
    <div>
        <p class="block pl-3 ml-px text-sm font-medium text-gray-700 mb-2">Select an icon</p>
        <div class="flex gap-2 flex-wrap h-20 w-full">
            <UICategoryIcon v-for="icon in props.iconList" :key="icon.id" :icon-name="icon.name" />
        </div>
    </div>
  </template>
  
<script lang="ts" setup>
import { IIcon } from '~~/types/IIcon';

const props = defineProps<{
  iconList: IIcon[],
}>()
</script>
  