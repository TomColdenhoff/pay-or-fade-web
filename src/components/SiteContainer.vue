<template>
  <!--Portfolio: https://tomcoldenhoff.com/ -->
  <!--Hello there!-->
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <Container>
        <slot name="main"></slot>
      </Container>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import Container from "./Container";

export default {
  name: "SiteContainer",
  components: {
    Container
  }
};
</script>
