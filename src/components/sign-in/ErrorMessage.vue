<template>
  <div class="error-box">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: ["errorMessage"]
};
</script>

<style scoped lang="scss">
.error-box {
  background-color: var(--error-box-color);
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
