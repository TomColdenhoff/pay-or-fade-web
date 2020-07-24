<template>
  <!--// eslint-disable-next-line-->
  <div>
    <PageHeader>Examples</PageHeader>
    <div class="text-container">
      <p>
        Before you can start using PayOrFade you'll need to have a PayOrFade
        Account. If you don't have one, you can create one
        <router-link to="/sign-in">here</router-link>. Once you have your
        account, you'll be able to start using PayOrFade.
      </p>
      <h2>Real world example</h2>
      <p>
        Imagine that you've just finished a project for one of your clients, but
        the client is acting shady about the final payment. You can hand the
        project over and hope that the client will make its final payment on
        time. Or you can use PayOrFade to force him into paying you on time
        because otherwise, he won't have a usable website. PayOrFade makes the
        website slowly fade away as long as you have PayOrFade enabled for that
        website. This causes the website to disappear as hard as you want it to
        disappear.<br />
        <br />
        Don't forget to disable PayOrFade once the client has paid!
      </p>

      <div class="images-container">
        <div class="image-container">
          <img
            src="../assets/images/no-pay-or-fade.png"
            alt="Site that isn't fading away."
          />
          <p>Not using PayOrFade</p>
        </div>
        <div class="image-container">
          <img
            src="../assets/images/with-pay-or-fade.png"
            alt="Image showing a site that isn't fading away."
          />
          <p>Using PayOrFade</p>
        </div>
      </div>
      <h2>Add a site</h2>
      <p>
        First off, you'll have to add the site that you want to make use of the
        PayOrFade functionality. This is done in the following steps:
      </p>
      <ol>
        <li>Go to the <router-link to="/sites">My Sites</router-link> page.</li>
        <li>
          Press the "Add" button and fill in the information about your site.
          The start and end date fields are the dates between you want to fade
          your site.
        </li>
        <li>Press "Add site".</li>
      </ol>
      <h2>Make your site use PayOrFade</h2>
      <p>
        Once you've added your site, you can start making your site use
        PayOrFade. This is done in the following steps:
      </p>
      <ol>
        <li>Go to the <router-link to="/sites">My Sites</router-link> page.</li>
        <li>
          Press the "CDN" text that is in the same row as the site you want to
          use PayOrFade for.
        </li>
        <li>Follow the instructions you see in the pop up.</li>
      </ol>
      <p>Done! that was all you needed to do, to start using PayOrFade.</p>
      <h2>Edit site</h2>
      <p>
        You can easily edit the information you entered when you added the site
        to PayOrFade. This is done in the following steps:
      </p>
      <ol>
        <li>Go to the <router-link to="/sites">My Sites</router-link> page.</li>
        <li>
          Press the site you want to edit.
        </li>
        <li>Edit the site.</li>
        <li>Press "Edit site".</li>
      </ol>
    </div>
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
.text-container {
  width: 70%;
}
p {
  font-size: 1.2em;
  padding: 5px;
}

h2 {
  font-size: 2em;
  margin-bottom: -20px;
  padding-bottom: 0;
}

li {
  font-size: 1.2em;
}

.images-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.image-container {
  display: inline;
  width: 46%;
  text-align: center;
  img {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 800px) {
  .text-container {
    width: calc(99% - 20px);
    padding: 10px;
    p {
      width: 100%;
    }

    .images-container {
      flex-direction: column;
    }

    .image-container {
      width: 100%;
    }
  }
}
</style>
