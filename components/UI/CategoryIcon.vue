<template>
    <div class="h-12 w-12 p-2 bg-[#ddd] rounded-full flex justify-center items-center">
        <img v-if="props.iconName" :src="useAsset(`categoryIcons/${props.iconName}.png`)" :alt="props.iconName">
      </div>
  </template>
  
<script lang="ts" setup>
import { useAsset } from '~~/helpers/useAssets';

const props = defineProps({
  iconName: {
    type: String,
    default: '',
  },
})
</script>
  