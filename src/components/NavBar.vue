<template>
  <nav class="navBar">
    <Container>
      <h2 class="navBarTitle">Pay or Fade</h2>
      <div id="navDropDownButton">
        <i
          @click="toggleNavBar"
          v-show="!showNavBarDropDown"
          class="fas fa-bars"
        ></i>
        <i
          @click="toggleNavBar"
          v-show="showNavBarDropDown"
          class="fas fa-times"
        ></i>
      </div>
      <transition appear name="slide-fade">
        <ul v-show="showNavBarDropDown">
          <li>
            <router-link to="/" exact>Home</router-link>
          </li>
          <li>
            <router-link to="/examples">Examples</router-link>
          </li>
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
          <li>
            <router-link v-if="!isLoggedIn" to="/sign-in">Sign-in</router-link>
            <a
              v-else-if="!isMobileView"
              href="#"
              id="account-link"
              @mouseenter="onAccountHover"
              @mouseleave="onAccountLeave"
            >
              Account
              <div id="account-dropdown" style="display: none">
                <router-link to="#">My Account</router-link>
                <router-link to="/sites">My Sites</router-link>
                <router-link to="/logout" @click.native="logout">
                  Logout
                </router-link>
                <div class="account-dropdown-shadow"></div>
              </div>
            </a>
            <router-link to="#" v-else>My Account</router-link>
          </li>
          <li v-if="isMobileView && isLoggedIn">
            <router-link to="/sites">My Sites</router-link>
          </li>
          <li v-if="isMobileView && isLoggedIn">
            <router-link to="/logout" @click.native="logout"
              >Logout</router-link
            >
          </li>
        </ul>
      </transition>
    </Container>
  </nav>
</template>

<script>
import Container from "./Container";

export default {
  name: "NavBar",
  components: {
    Container
  },
  data() {
    return {
      showNavBarDropDown: false,
      isMobileView: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    toggleNavBar() {
      this.showNavBarDropDown = !this.showNavBarDropDown;
    },
    onAccountHover() {
      let dropdown = document.getElementById("account-dropdown");
      dropdown.style.display = "flex";
      let rect = document
        .getElementById("account-link")
        .getBoundingClientRect();
      let center = rect.left + (rect.right - rect.left);
      dropdown.style.left = `${center - 98}px`;

      let dropdownRect = dropdown.getBoundingClientRect();
      if (dropdownRect.right >= document.documentElement.clientWidth) {
        dropdown.style.left = `${center - 125}px`;
      }
    },
    onAccountLeave() {
      document.getElementById("account-dropdown").style.display = "none";
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  },
  mounted() {
    this.showNavBarDropDown = window.innerWidth > 800;

    window.onresize = () => {
      this.showNavBarDropDown = window.innerWidth > 800;
      this.isMobileView = window.innerWidth <= 800;
    };
  }
};
</script>

<style lang="scss" scoped>
.navBar {
  background-color: var(--background-color);
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--divider-shadow-color);
  box-shadow: 0 1px 5px 3px var(--divider-shadow-color);
}

.navBarTitle {
  display: inline;
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
  float: right;

  li {
    display: inline;

    a {
      font-size: large;
      margin-left: 30px;
      text-decoration: none;
      color: var(--unselected-navbar-item-color);
    }

    .router-link-active {
      color: var(--selected-navbar-item-color);
    }
  }
}

#account-dropdown {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  top: 40px;
  padding-top: 20px;
  height: 100px;
  z-index: 1;
  min-width: 150px;
  min-height: min-content;
  background-color: var(--background-color);
  box-shadow: 0 6px 5px -3px var(--divider-shadow-color);
}

#navDropDownButton {
  display: none;
}

@media (max-width: 1465px) {
  .navBar > div {
    h2 {
      padding-left: 25px;
    }
    ul {
      padding-right: 25px;
    }
  }
}

@media (max-width: 800px) {
  .navBar > div {
    ul {
      display: flex;
      flex-direction: column;
      z-index: 1;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: min-content;
      float: none;
      margin: 0;
      padding: 0;
      background-color: var(--background-color);
      border-bottom: 1px solid var(--divider-shadow-color);
      box-shadow: 0 5px 5px 1px var(--divider-shadow-color);
      li {
        display: block;
        border-bottom: 1px solid var(--divider-shadow-color);
        border-top: 1px solid var(--divider-shadow-color);
        padding: 10px 0;
        a {
          margin: 0;
          padding-left: 25px;
        }
      }

      li:first-of-type {
        border-top: none;
      }

      li:last-of-type {
        border-bottom: none;
        padding-bottom: 10px;
      }

      li:hover {
        background-color: var(--hover-color);
      }
    }
  }

  #navDropDownButton {
    display: inline;
    float: right;
    height: 60px;
    line-height: 60px;
    padding-right: 25px;
    font-size: 1.3em;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }

  #account-dropdown {
    display: flex;
    flex-direction: column;
    z-index: 1;
    position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    height: min-content;
    float: none;
    margin: 0;
    padding: 0;
  }
}
</style>
