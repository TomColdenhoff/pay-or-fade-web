<template>
  <div class="success-box">
    <p>{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "SuccessMessage",
  props: ["successMessage"]
};
</script>

<style scoped>
.success-box {
  background-color: var(--success-box-color);
  border-radius: 10px;
  min-height: 30px;
  height: min-content;
  color: var(--button-text-color);
  margin-bottom: 15px;
  padding-left: 15px;
  line-height: 30px;
  font-size: 1.1em;
}
</style>
