<template>
  <h1><slot></slot></h1>
</template>

<script>
export default {
  name: "PageHeader"
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 5em;
  font-weight: normal;
}

@media (max-width: 800px) {
  h1 {
    margin-left: 10px;
  }
}
</style>
