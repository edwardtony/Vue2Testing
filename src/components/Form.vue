<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" />
    <form @submit.prevent="submitForm" class="form">
      <h2>Log in</h2>
      <label>
        Email:
        <input id="email-input" type="text" v-model="credentials.email" />
      </label>
      <label>
        Password:
        <input
          id="password-input"
          type="password"
          v-model="credentials.password"
        />
      </label>
      <label>
        Confirm password:
        <input
          id="re_password-input"
          type="password"
          v-model="credentials.re_password"
        />
      </label>
      <p v-if="validationData && validationData.error" class="error-message">
        {{ validationData.message }}
      </p>

      <button class="button" type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FormUtils from "../utils/FormUtils";

export default {
  name: "Form",
  props: {},
  data: function () {
    return {
      credentials: {
        email: "",
        password: "",
        re_password: "",
      },
      validationData: null,
    };
  },
  methods: {
    validateEmail() {
      const { email } = this.credentials;
      return FormUtils.validateEmail(email);
    },
    validatePassword() {
      const { password } = this.credentials;
      return FormUtils.validatePassword(password);
    },
    validateRePassword() {
      const { password, re_password } = this.credentials;
      return FormUtils.validateRePassword(password, re_password);
    },
    validateForm() {
      const validEmail = this.validateEmail();
      const validPassword = this.validatePassword();
      const validRePassword = this.validateRePassword();

      if (!validEmail) return { error: true, message: "Invalid email" };
      if (!validPassword)
        return {
          error: true,
          message: "Password must have more than 7 characters",
        };
      if (!validRePassword)
        return { error: true, message: "Passwords don't match" };

      return { success: true };
    },
    submitForm() {
      this.validationData = this.validateForm();
      if (this.validationData?.success !== undefined) {
        this.setIsLogged(true)
      }
    },
    ...mapActions(['setIsLogged'])
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
label {
  width: 400px;
  text-align: left;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
}

.button{
  padding: .8rem;
  background: #41b883;
  color: white;
  border-radius: .5rem;
  border: none;
  width: 100px;
  margin-top: 1rem;
}

.error-message {
  color: red;
}
</style>
