<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Container"
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
