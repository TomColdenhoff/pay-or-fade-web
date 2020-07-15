<template>
  <div>
    <a v-if="!internal" :href="destinationUrl" @click="fireClickedEvent"
      ><div class="actionButton">
        <span><slot></slot></span></div
    ></a>
    <router-link v-else :to="destinationUrl"
      ><div class="actionButton" @click="fireClickedEvent">
        <slot></slot></div
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    internal: Boolean,
    url: String
  },
  computed: {
    destinationUrl() {
      if (this.url === "" || this.url === undefined) return "";

      return this.url;
    }
  },
  methods: {
    fireClickedEvent() {
      this.$emit("clicked");
    }
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: var(--button-text-color);
  font-size: 1.3em;
  font-weight: bold;
  line-height: 40px;
  -moz-transition: all 0.15s ease-in;
  -o-transition: all 0.15s ease-in;
  -webkit-transition: all 0.15s ease-in;
  transition: all 0.15s ease-in;
}

a:hover {
  font-size: 1.4em;
}

a:focus {
  outline: none;
  font-size: 1.35em;
  line-height: 36px;

  .actionButton {
    outline: none;
    background-color: var(--button-hover-color) !important;
    border: 2px solid var(--button-color);
  }
}

.actionButton {
  background-color: var(--button-color);
  border-radius: 25px;
  box-sizing: border-box;
  height: 40px;
  width: 200px;
  border: none;
  max-width: 100%;
  text-align: center;
  -moz-transition: all 0.15s ease-in;
  -o-transition: all 0.15s ease-in;
  -webkit-transition: all 0.15s ease-in;
  transition: all 0.15s ease-in;
}

.actionButton:hover {
  outline: none;
  background-color: var(--button-hover-color);
}

@media (max-width: 800px) {
  div {
    width: 100%;
  }

  .actionButton {
    width: inherit;
  }
}
</style>
