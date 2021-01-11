import { mount, shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Todo from '@/components/Todo.vue'
import TodoItem from '@/components/TodoItem.vue'


// EXAMPLES
// https://www.newline.co/public/content/thirty-days-of-vue/Vx9TY4okKhDnaK04DLUojr/thirty-days-of-vue-fullstackio.pdf?inf_contact_key=9a26bef57f20d996e3c9d174a66d71b0d18a532c4142cb79caf2b269de1401fa
describe('Todo.vue', () => {

  it('Should add if label is not empty', async () => {
    const wrapper = shallowMount(Todo, {
      data() {
        return {
          items: [],
        }
      }
    })

    const elem = wrapper.find('input')
    wrapper.vm.addItem()

    await nextTick()
    const itemsBefore = wrapper.findAllComponents(TodoItem)
    expect(itemsBefore.length).toBe(0)

    elem.setValue('Some text')
    wrapper.vm.addItem()

    await nextTick()
    const itemsAfter = wrapper.findAllComponents(TodoItem)
    expect(itemsAfter.length).toBe(1)
  })


  // https://es.vuejs.org/v2/guide/events.html
  it('Should add if label is not empty (by event) ', async () => {
    const wrapper = shallowMount(Todo, {
      data() {
        return {
          items: [
          ],
          newItem: {
            id: 1609951904918,
            completed: false,
            label: "",
          }
        }
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keyup.enter')
    expect(wrapper.vm.items.length).toBe(0)

    input.setValue('New item')
    await input.trigger('keyup.enter')
    expect(wrapper.vm.items.length).toBe(1)

  })

  it('Should render one item', () => {
    const wrapper = shallowMount(Todo, {
      data() {
        return {
          items: [
            {
              id: 1609951904918,
              label: "Item 1",
              completed: true,
            }
          ],
        }
      }
    })

    const elem = wrapper.find('h5')
    const items = wrapper.findAllComponents(TodoItem)

    expect(elem.text()).toBe('(1 Item)')
    expect(items.length).toBe(1)
  })

  it('Should render two items', () => {
    const wrapper = shallowMount(Todo, {
      data() {
        return {
          items: [
            {
              id: 1609951904918,
              label: "Item 1",
              completed: true,
            },
            {
              id: 1609951904919,
              label: "Item 2",
              completed: true,
            }
          ],
        }
      }
    })

    const elem = wrapper.find('h5')
    const items = wrapper.findAllComponents(TodoItem)
    // const inputs = wrapper.findAll('input')

    expect(elem.text()).toBe('(2 Items)')
    expect(items.length).toBe(2)
  })

  it('Should show 2 inputs being checked', () => {
    const wrapper = mount(Todo, {
      data() {
        return {
          items: [
            {
              id: 1609951904918,
              label: "Item 1",
              completed: true,
            },
            {
              id: 1609951904920,
              label: "Item 2",
              completed: false,
            },
            {
              id: 1609951904919,
              label: "Item 3",
              completed: true,
            }
          ],
        }
      }
    })

    const inputs = wrapper.findAll('input:checked')
    expect(inputs.length).toBe(2)
  })

})

