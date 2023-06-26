import { mount } from "@vue/test-utils";
import { expect, describe, it } from 'vitest'
import Input from "./Input.vue";

describe('Input.vue', async() => {
  it('Should render', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'value',
        placeholder: 'placeholder',
        type: 'text',
        label: 'label',
      },
    });
    expect(wrapper.find('label').text()).toBe('label')
    expect(wrapper.find('input').element.value).toBe('value')
    expect(wrapper.find('input').element.placeholder).toBe('placeholder')
    expect(wrapper.find('input').element.type).toBe('text')
    expect(wrapper.find('div:first-child')).toMatchSnapshot()
  })
})
