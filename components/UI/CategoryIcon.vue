<template>
    <div class="min-h-[48px] min-w-[48px] max-h-[48px] max-w-[48px] p-2 rounded-full flex justify-center items-center" :style="props.hexCode ? `background:${props.hexCode}` : 'background: #999999'">
      <img v-if="props.iconName" :src="useAsset(`categoryIcons/${props.iconName}.png`)" :alt="props.iconName">
    </div>
  </template>
  
<script lang="ts" setup>
import { useAsset } from '~~/helpers/useAssets';

const props = defineProps<{
  iconName: string | null | undefined,
  hexCode: string | null | undefined
}>()

</script>
  