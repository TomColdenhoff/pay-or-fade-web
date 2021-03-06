<template>
  <div class="modal-background">
    <transition name="appear" @leave="triggerEndEvent">
      <div v-if="show" class="modal">
        <form @submit.prevent="addSite" novalidate>
          <h2>Add site</h2>
          <div class="form-group">
            <label for="siteName">
              Site name
              <input
                id="siteName"
                type="text"
                v-model="siteName"
                placeholder="Site name"
              />
            </label>
            <span>{{ siteName_error }}</span>
          </div>
          <div class="form-group">
            <label for="startDate">
              Start date
              <input id="startDate" type="date" v-model="startDate" />
            </label>
            <span>{{ startDate_error }}</span>
          </div>
          <div class="form-group">
            <label for="endDate">
              End date
              <input id="endDate" type="date" v-model="endDate" />
            </label>
            <span>{{ endDate_error }}</span>
          </div>
          <div class="form-group">
            <label for="isActive">
              Is active
              <input id="isActive" type="checkbox" v-model="isActive" />
            </label>
          </div>
          <div class="form-group button-bottom-group">
            <button>Add site</button>
            <button class="cancel" @click="cancelModal">Cancel</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateSiteModal",
  data() {
    return {
      show: false,
      siteName: "",
      siteName_error: "",
      startDate: "",
      startDate_error: "",
      endDate: "",
      endDate_error: "",
      isActive: true
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    cancelModal() {
      this.show = false;
    },
    triggerEndEvent() {
      this.$emit("closed");
    },
    addSite() {
      this.siteName_error = "";
      this.startDate_error = "";
      this.endDate_error = "";

      let hasErrors = false;
      if (this.siteName === "") {
        hasErrors = true;
        this.siteName_error = "The site name field is required.";
      }

      if (this.startDate === "") {
        hasErrors = true;
        this.startDate_error = "The start date field is required";
      }

      if (this.endDate === "") {
        hasErrors = true;
        this.endDate_error = "The end date field is required";
      }

      if (hasErrors) {
        return;
      }

      let data = {
        siteName: this.siteName,
        startDate: this.startDate,
        dueDate: this.endDate,
        isActive: this.isActive
      };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_BASE_URL + "api/siteinfo",
          data: data,
          method: "POST"
        })
          .then(response => {
            resolve(response);
            this.$emit("handled");
            this.show = false;
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.modal-background {
  top: 60px;
  left: 0;
  position: absolute;
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: rgba(125, 125, 125, 0.5);
}

.modal {
  width: 500px;
  min-height: 600px;
  height: min-content;
  background-color: var(--background-color);
  border-radius: 15px;
  position: fixed;
  top: calc(50% - 300px);
  left: calc(50% - 250px);
}

h2 {
  margin: 30px 0 10px 15px;
  font-size: 3em;
  font-weight: normal;
}

.appear-enter-active,
.appear-leave-active {
  transition: 1s;
}

.appear-enter {
  top: 100%;
  position: fixed;
}

.appear-enter-to,
.appear-leave {
  top: calc(50% - 300px);
  left: calc(50% - 250px);
  position: fixed;
}

.appear-leave-to {
  left: 150%;
  position: fixed;
}

.button-bottom-group {
  position: absolute;
  width: calc(100% - 30px);
  height: min-content;
  bottom: 0;
  left: 0;
  button {
    margin-top: 10px;
  }

  .cancel {
    background-color: var(--error-box-color);
  }

  .cancel:hover {
    background-color: var(--error-hover-color);
  }

  .cancel:focus {
    border: 2px solid var(--error-box-color);
  }
}

span {
  color: var(--error-span-text-color);
}

@media (max-width: 800px) {
  .modal {
    max-width: 95vw;
    max-height: 90vh;
    top: calc(50% - 35vh);
    left: calc(50% - 47.5vw);
  }

  .appear-enter-active,
  .appear-leave-active {
    transition: 0.5s;
  }

  .appear-enter {
    top: 100%;
    position: fixed;
  }

  .appear-enter-to,
  .appear-leave {
    top: calc(50% - 35vh);
    left: calc(50% - 47.5vw);
    position: fixed;
  }

  .appear-leave-to {
    left: 150%;
    position: fixed;
  }
}

@media (max-height: 640px) {
  .modal {
    position: absolute;
    max-width: 100%;
    max-height: min-content;
    border-radius: 0;
    top: 0;
    left: 0;
  }

  h2 {
    margin-top: 0;
  }

  .button-bottom-group {
    position: static;
    width: calc(100% - 30px);
    height: min-content;
  }
}
</style>
