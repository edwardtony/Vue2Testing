<template>
  <div id="app">
    <Form v-if="!isLogged" />
    <Todo v-else />
  </div>
</template>

<script>
import Form from "./components/Form.vue";
import Todo from "./components/Todo.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Form,
    Todo,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["isLogged"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
