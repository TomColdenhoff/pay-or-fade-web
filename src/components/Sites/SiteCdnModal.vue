<template>
  <div class="modal-background">
    <transition name="fade" @leave="triggerEndEvent">
      <div class="modal">
        <h2>CDN</h2>
        <i @click="triggerEndEvent" class="fas fa-times"></i>
        <p>Add the following two classes to the element you want fade.</p>
        <code>payorfade payorfadeid_{{ siteId }}</code>
        <p>Place the following script near the end of your page.</p>
        <code
          >&lt;script type="text/javascript" src="https://cdn.jsdelivr.net/gh/TomColdenhoff/pay-or-fade-web@1.0.0/public/payorfadeservice.js"&gt;&lt;/script&gt;</code
        >
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SiteCdnModal",
  props: {
    siteId: {
      type: String,
      required: true
    }
  },
  methods: {
    triggerEndEvent() {
      this.$emit("closed");
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 500px;
  min-height: 250px;
  height: min-content;
  background-color: var(--background-color);
  border-radius: 15px;
}

h2 {
  margin: 8px 0 0 15px;
  font-size: 3em;
  font-weight: normal;
  display: inline;
}

i {
  float: right;
  display: inline-block;
  font-size: 1.4em;
  margin: 8px 15px 0 0;
  cursor: pointer;
  -moz-transition: all 0.15s ease-in;
  -o-transition: all 0.15s ease-in;
  -webkit-transition: all 0.15s ease-in;
  transition: all 0.15s ease-in;
}

i:hover {
  font-size: 1.6em;
}

p {
  margin-left: 15px;
}

code {
  overflow-x: scroll;
  display: block;
  background-color: var(--code-background-color);
  padding: 5px;
  border-radius: 5px;
  width: calc(100% - 40px);
  margin: 0 15px;
    white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 800px) {
  .modal {
    max-width: 95vw;
    max-height: 90vh;
    top: calc(50% - 35vh);
    left: calc(50% - 47.5vw);
  }
}
</style>
