<template>
  <!--// eslint-disable-next-line-->
  <div class="payorfade payorfadeid_08d81933-4e65-465d-8c1b-4fc39eeaf049">
    <PageHeader>Examples</PageHeader>
    <p>
      Before you can start using PayOrFade you need to have a PayOrFade Account.
      If you don't have one, you can create one
      <router-link to="/sign-in">here</router-link>. Once you have your account,
      you'll be able to start using PayOrFade.
    </p>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";

export default {
  name: "Examples",
  components: {
    PageHeader
  }
};
</script>

<style scoped lang="scss">
p {
  font-size: 1.2em;
  padding: 5px;
    width: 70%;
}
</style>
