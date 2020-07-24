<template>
  <div>
    <PageHeader>My Account</PageHeader>
    <p>
      You can edit your account information here. You'll have to log in again
      after you've changed your account information.
    </p>
    <form @submit.prevent="editUser" novalidate>
      <div class="two-col-inputs">
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
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
            />
          </label>
          <span>{{ email_error }}</span>
        </div>
      </div>
      <div class="two-col-inputs">
        <div class="form-group">
          <label for="password">
            New Password
            <span class="field-info">
              Your password needs to contain at least one digit and one lower
              and upper case character.</span
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
            Confirm New Password
            <span class="field-info"> <br /></span>
            <input
              id="confirm-password"
              v-model="confirm_password"
              type="password"
              placeholder="Password"
            />
          </label>
          <span>{{ confirm_password_error }}</span>
        </div>
      </div>
      <button>Save changes</button>
    </form>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import axios from "axios";
export default {
  name: "Account",
  components: {
    PageHeader
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
      confirm_password_error: ""
    };
  },
  mounted() {
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.VUE_APP_BASE_URL + "api/user/self",
        method: "GET"
      })
        .then(response => {
          this.name = response.data.name;
          this.email = response.data.email;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  methods: {
    editUser() {
      if (this.validateFields()) {
        return;
      }

      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_BASE_URL + "api/user/self",
          method: "PATCH",
          data: data
        })
          .then(response => {
            this.$store.dispatch("logout");
            this.$router.push("/");
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    validateFields() {
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
        return hasError;
      }

      if (this.checkPasswordRequirements()) {
        this.password_error =
          "The given password doesn't meet the requirements";
        hasError = true;
      }
      if (this.password !== this.confirm_password) {
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

<style scoped lang="scss">
span {
  color: var(--error-span-text-color);
}
p {
  font-size: 1.2em;
  padding: 5px;
  margin-bottom: 45px;
}

.two-col-inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  .form-group {
    width: 46%;
  }
}

.field-info {
  display: block;
  color: var(--info-text-color);
  font-size: 0.7em;
}

button {
  margin-left: 15px;
  width: 46%;
}

@media (max-width: 800px) {
  p {
    width: calc(99% - 20px);
    padding: 10px;
  }

  .two-col-inputs {
    flex-direction: column;
    justify-content: normal;

    .form-group {
      width: calc(99% - 20px);
      padding: 10px;
    }
  }

  button {
    width: calc(99% - 20px);
    margin: 0 10px 10px 10px;
  }
}
</style>
