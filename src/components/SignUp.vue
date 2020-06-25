<template>
  <div class="sign-in-form">
    <SuccessMessage
      v-show="registered"
      success-message="Successfully registered!"
    />
    <form @submit.prevent="register" novalidate>
      <div class="form-group">
        <label for="name">
          Name
          <input id="name" type="text" v-model="name" placeholder="Name" />
        </label>
        <span>{{ name_error }}</span>
      </div>
      <div class="form-group">
        <label for="email">
          Email
          <input id="email" v-model="email" type="email" placeholder="Email" />
        </label>
        <span>{{ email_error }}</span>
      </div>
      <div class="form-group">
        <label for="password">
          Password
          <span id="field-info">
            Your password needs to contain at least one digit and one lower and
            upper case character.</span
          >
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
          />
        </label>
        <span>{{ password_error }}</span>
      </div>
      <div class="form-group">
        <label for="confirm-password">
          Confirm Password
          <input
            id="confirm-password"
            v-model="confirm_password"
            type="password"
            placeholder="Password"
          />
        </label>
        <span>{{ confirm_password_error }}</span>
      </div>
      <button>Sign up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import SuccessMessage from "./sign-in/SuccessMessage";

export default {
  name: "SignUp",
  components: {
    SuccessMessage
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      name_error: "",
      email_error: "",
      password_error: "",
      confirm_password_error: "",
      registered: false
    };
  },
  methods: {
    register() {
      if (this.validateInput()) {
        return;
      }
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      return new Promise((resolve, reject) => {
        axios({
          url: "https://localhost:5001/api/user/register",
          data: data,
          method: "POST"
        })
          .then(resp => {
            this.registered = true;
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    validateInput() {
      this.name_error = "";
      this.email_error = "";
      this.password_error = "";
      this.confirm_password_error = "";

      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let hasError = false;
      if (this.name === "") {
        this.name_error = "The name field is required.";
        hasError = true;
      }
      if (this.email === "") {
        this.email_error = "The email field is required.";
        hasError = true;
      } else if (!emailRegex.test(this.email)) {
        this.email_error = "The entered email is not a valid email format.";
        hasError = true;
      }
      if (this.password === "") {
        this.password_error = "The password field is required.";
        hasError = true;
      } else if (this.checkPasswordRequirements()) {
        this.password_error =
          "The given password doesn't meet the requirements";
        hasError = true;
      }
      if (this.confirm_password === "") {
        this.confirm_password_error = "The confirm password field is required.";
        hasError = true;
      } else if (this.password !== this.confirm_password) {
        this.confirm_password_error = "The passwords do not match.";
        hasError = true;
      }

      return hasError;
    },
    checkPasswordRequirements() {
      const requirementsRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/gm;
      return !requirementsRegex.test(this.password);
    }
  }
};
</script>

<style scoped>
span {
  color: var(--error-span-text-color);
}

#field-info {
  display: block;
  color: var(--info-text-color);
  font-size: 0.7em;
}
</style>
