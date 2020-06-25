<template>
  <div class="sign-in-form">
    <ErrorMessage
      v-show="authError"
      error-message="Incorrect email or password."
    />
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="">
          Email
          <input v-model="email" type="email" placeholder="Email" />
        </label>
        <span hidden>Required</span>
      </div>
      <div class="form-group">
        <label for="">
          Password
          <input v-model="password" type="password" placeholder="Password" />
        </label>
        <span hidden>Required</span>
      </div>
      <button>Sign in</button>
    </form>
  </div></template
>

<script>
import ErrorMessage from "./sign-in/ErrorMessage";

export default {
  name: "SignInComponent",
  components: {
    ErrorMessage
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    authError() {
      return this.$store.getters.authStatus === "error";
    }
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push(this.$route.query.redirect || "/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped></style>
