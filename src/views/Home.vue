<template>
  <div class="main-div">
    <transition appear name="fade">
      <section class="main-section">
        <h1>Pay or Fade</h1>
        <p>
          PayOrFade is the easy to use service that can help you with
          non-paying clients. Pay or Fade provides an easy to use method with a
          script provided through 'jsdelivr' to get you started in no time! Visit the
          <router-link to="/examples">examples</router-link>
          page to discover how PayOrFade can help you with non-paying clients.
          Or create an account to get started.
        </p>
      </section>
    </transition>
    <!--    407BFF-->
    <div class="svg-div">
      <LandingSVG />
    </div>
  </div>
</template>

<script>
import LandingSVG from "@/assets/svgs/Programming-rafiki-blue.svg";

export default {
  name: "Home",
  components: {
    LandingSVG
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3em;
  margin-top: 0;
  margin-bottom: 10px;
}
p {
  font-size: 1.2em;
}

.main-div {
  width: 100%;
  height: calc(100vh - 61px);
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
}

.main-section {
  width: 60%;
}

.svg-div {
  width: 40%;
  height: max-content;
}

.fade-enter-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}

@media (max-width: 1465px) {
  h1,
  p {
    padding: 0 25px;
  }
}

@media (max-width: 800px) {
  .main-div {
    flex-direction: column;
    justify-content: space-evenly;
    width: 100vw;

    .main-section {
      width: 100%;
    }
  }

  .svg-div {
    width: 60%;
  }
}
</style>
