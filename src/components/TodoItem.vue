<template>
  <div
    class="todo__item"
    :class="{ 'todo__item--checked': isCompleted }"
    @click="$emit('input', !isCompleted)"
  >
    <input
      type="checkbox"
      @change="$emit('input', $event.target.checked)"
      :checked="isCompleted"
    />
    <span class="todo__label">{{ item.label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        label: "Type something...",
        completed: false,
      }),
    },
  },
  computed: {
    isCompleted() {
      return this.item.completed;
    },
  },
};
</script>

<style lang="scss">
.todo {
  &__item, &__input {
    width: 100%;
    border: 1px solid #666;
    border-radius: 0.25rem;
    margin: 1rem 0;
    padding: 0.5rem;
    text-align: left;
    cursor: pointer;
  }

  &__label {
    display: inline-block;
    margin-left: 0.5rem;
  }

  &__item--checked &__label {
    text-decoration: line-through solid rgb(205, 133, 63);
  }
}
</style>