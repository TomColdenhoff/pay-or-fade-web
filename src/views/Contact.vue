<template>
  <div>
    <PageHeader>Contact</PageHeader>
    <div class="main-section">
      <div class="content">
        <p>
          PayOrFade started as a side project by Tom Coldenhoff, the main goal
          of PayOrFade is giving developers more leverage to make their clients
          pay.
          <br />
          <br />
          If you do encounter any problems, bugs or you want to help improve
          PayOrFade. Then feel free to send an email to
          <a href="mailto:tom.coldenhoff@outlook.com"
            >tom.coldenhoff@outlook.com</a
          >
          or to visit the PayOrFade GitHub page.
        </p>
        <a
          href="https://github.com/tomcoldenhoff/pay-or-fade-web"
          target="_blank"
          ><img
            src="https://github-link-card.s3.ap-northeast-1.amazonaws.com/tomcoldenhoff/pay-or-fade-web.png"
            alt="GitHub Repo image"
        /></a>
      </div>

      <div class="svg-div">
        <ContactArtBlue width="100%" viewBox="-50 0 700 600" />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import ContactArtBlue from "@/assets/svgs/undraw_respond_blue.svg";
export default {
  name: "Contact",
  components: {
    PageHeader,
    ContactArtBlue
  }
};
</script>

<style scoped lang="scss">
.main-section {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.content {
  width: 55%;

  img {
    width: 400px;
    display: block;
    margin: 80px auto;
  }
}

p {
  font-size: 1.2em;
}

.svg-div {
  position: relative;
  top: -75px;
  width: 38%;
  height: max-content;
}

@media (max-width: 800px) {
  .main-section {
    flex-direction: column;
    width: 100%;
  }

  .content {
    width: 100%;
    margin-top: -80px;
    position: relative;
    p {
      padding: 15px;
      width: 90%;
      font-size: 1.2em;
    }

    img {
      width: 75px;
      margin: 25px auto;
    }
  }

  .svg-div {
    width: 100%;
    display: none;
  }
}
</style>
