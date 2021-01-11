<template>
  <div>
    <h2>TODO</h2>
    <h5>{{ subtitle }}</h5>
    <div class="todo__list">
      <TodoItem
        v-for="item in items"
        :key="item.id"
        v-model="item.completed"
        :item="item"
      />
      <input
        class="todo__input"
        type="text"
        placeholder="Press enter to add..."
        @keyup.enter="addItem"
        v-model.trim="newItem.label"
        v-focus
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

const itemCreator = () => ({
  id: Date.now(),
  completed: false,
  label: "",
});

export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  components: {
    TodoItem,
  },
  data: function () {
    return {
      items: [
        {
          id: 1609951904918,
          label: "Item 1",
          completed: false,
        },
        {
          id: 1609951906630,
          label: "Item 2",
          completed: true,
        },
        {
          id: 1609951907430,
          label: "Item 3",
          completed: true,
        },
      ],
      newItem: itemCreator(),
    };
  },
  methods: {
    addItem() {
      if(this.newItem.label.length) {
        const newItem = {...this.newItem}
        this.newItem = itemCreator()
        this.items.push(newItem);
      }
    },
  },
  computed: {
    subtitle() {
      const itemsLength = this.items.length;
      const plural = itemsLength > 1;

      return `(${itemsLength} Item${plural ? "s" : ""})`;
    },
  },
};
</script>

<style>
.todo__list {
  width: 600px;
  max-width: 90%;
  margin: 0 auto;
}
</style>