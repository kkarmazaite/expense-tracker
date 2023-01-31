<template>
    <div class="w-full">
        <label for="" v-if="props.label" class="block pl-3 ml-px text-sm font-medium text-gray-700">
            {{ props.label }}
        </label>
        <div class="mt-1">
            <select class="w-full" :value="props.value"
                @input="(event) => emits('update:modelValue', event.target.value)">
                <option v-for="(option, idx) in props.selectOptionList" :key="idx" :value="option.value" class="
                block
                w-full
                px-4
                border-b border-gray-300
                focus:border-blue-500
                sm:text-sm
              ">
                    {{ option.valueDisplay }}
                </option>
            </select>
        </div>
    </div>
</template>
<script lang="ts" setup>import { ISelect } from '~~/types/ISelect';

const emits = defineEmits(['update:modelValue'])
interface Props {
    label: string
    value: string
    selectOptionList: ISelect[]
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  value: '',
})
</script>