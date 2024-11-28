<template>
  <div id="navbar">
    <div
      :style="`${isMobile ? 'left: 1.6667vw' : 'left: 0px'}`"
      @click="toggleMenu"
      class="navbar-menu"
    >
      <div
        :class="`${isMenuOpen ? 'open-top-menu' : ''} navbar-menu-top-line`"
      ></div>
      <div
        :class="`${isMenuOpen ? 'open-under-menu' : ''} navbar-menu-under-line`"
      ></div>
    </div>
    <div class="navbar-logo">
      <img
        :width="isMobile ? 40 : 60"
        :height="isMobile ? 60 : 80"
        :src="logo"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  name: "NavBar",
  props: {
    menuOpen: Boolean,
  },
  data() {
    return {
      isMobile: false,
      logo,
      isMenuOpen: false,
    };
  },
  created() {
    let screenWidth = document.documentElement.clientWidth;
    if (screenWidth > 767) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  },
  watch: {
    menuOpen(newVal) {
      this.isMenuOpen = newVal;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.$emit("menu-toggle", this.isMenuOpen);
    },
  },
};
</script>

<style scoped>
#navbar {
  padding: 0.8333vw;
  align-items: center;
  position: fixed;
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0;
  z-index: 1;
  margin-bottom: 1.1111vw;
  background-color: transparent;
}
.navbar-menu {
  position: absolute;
  left: 0px;
  top: 18px;
  z-index: 99;
  cursor: pointer;
}
.navbar-menu-top-line,
.navbar-menu-under-line {
  width: 14px;
  height: 1.5px;
  background-color: #33383cff;
  transition: transform 0.3s;
}
.navbar-menu-top-line {
  margin-bottom: 5px;
}
.open-top-menu {
  transform: translateY(3.25px);
}
.open-under-menu {
  transform: translateY(-3.25px);
}
</style>
