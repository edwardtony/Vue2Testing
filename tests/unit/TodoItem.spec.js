import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import TodoItem from '@/components/TodoItem.vue'

describe('TodoItem.vue', () => {

  // https://vue-test-utils.vuejs.org/api/wrapper/#exists
  it('Should render properly', () => {
    const itemLabel = 'Item 3'
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        item: {
          label: itemLabel,
          completed: true
        }
      }
    })

    const item = wrapper.find('.todo__item--checked')
    const input = wrapper.find('input')
    const span = wrapper.find('.todo__label')
    expect(item.exists()).toBe(true)
    expect(input.element.checked).toBe(true)
    expect(span.text()).toBe(itemLabel)
  })

})

