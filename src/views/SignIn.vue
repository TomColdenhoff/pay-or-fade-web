<template>
  <div class="center-box">
    <SignUp />
    <div class="divider"></div>
    <SignInComponent />
  </div>
</template>

<script>
import SignUp from "../components/SignUp";
import SignInComponent from "../components/SignInComponent";

export default {
  name: "SignIn",
  components: {
    SignUp,
    SignInComponent
  }
};
</script>

<style lang="scss" scoped>
.center-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  height: calc(100vh - 61px);
}

.divider {
  width: 2px;
  height: 25%;
  margin: 0 100px;
  background-color: var(--divider-shadow-color);
}

@media (max-width: 800px) {
  .center-box {
    flex-direction: column-reverse;
    justify-content: space-evenly;
  }

  .divider {
    margin: 0;
    height: 2px;
    width: 95vw;
  }
}

@media (max-height: 680px) {
  .center-box {
    margin-top: 50px;
  }
}

@media (max-height: 600px) {
  .center-box {
    margin-top: 110px;
  }
}
</style>
