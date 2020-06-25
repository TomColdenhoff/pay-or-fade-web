<template>
  <div id="app">
    <SiteContainer>
      <template v-slot:header>
        <NavBar></NavBar>
      </template>
      <template v-slot:main>
        <RouterView></RouterView>
      </template>
    </SiteContainer>
  </div>
</template>

<script>
import SiteContainer from "@/components/SiteContainer";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    SiteContainer,
    NavBar
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
  margin: 0;
  font-family: "Roboto", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
