<template>
  <div>
    <div id="navbar">
      <div
        :style="`${isMobile ? 'left: 1.6667vw' : 'left: 24px'}`"
        class="navbar-menu"
      >
        <div class="navbar-menu-back" v-if="backIcon" @click="back">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div @click="handleMenuChange(true)" v-else>
          <div
            :style="
              isHome ? 'background-color: #fff' : 'background-color: #000'
            "
            :class="`${isMenuOpen ? 'open-top-menu' : ''} navbar-menu-top-line`"
          ></div>
          <div
            :style="
              isHome ? 'background-color: #fff' : 'background-color: #000'
            "
            :class="`${
              isMenuOpen ? 'open-under-menu' : ''
            } navbar-menu-under-line`"
          ></div>
        </div>
      </div>
      <div class="navbar-logo">
        <img
          :style="isHome ? 'filter: invert(100%)' : ''"
          :width="isMobile ? 40 : 60"
          :height="isMobile ? 60 : 80"
          :src="logo"
          alt=""
        />
      </div>
      <div class="navbar-tel" :style="isHome ? 'color: #fff' : ''">
        <span>tel:xxxxx</span>
      </div>
    </div>
    <div ref="menuModalContainer" class="menu-modal-container">
      <div @click="handleMenuChange(false)" class="menu-modal-container-close">
        <i class="el-icon-close"></i>
      </div>
      <div
        @click="handleMenuChange(false, category)"
        v-for="(category, index) in Object.keys(images || {})"
        :key="index"
        class="menu-modal-container-item"
      >
        <img
          :width="60"
          :height="60"
          :src="images[category][0].src"
          :alt="category"
        />
        <div class="menu-modal-container-item-title">
          <span>{{ category }}</span>
          <span class="menu-modal-container-item-title-arrow">
            <i
              style="font-size: 12px; color: #adacac"
              class="el-icon-arrow-right"
            ></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  name: "NavBar",
  props: {
    images: Object,
    backIcon: Boolean,
  },
  data() {
    return {
      isHome: false,
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
    this.isHome = this.$route.path === "/";
  },
  methods: {
    back() {
      this.$router.push(`/category?category=${this.$route.query.category}`);
    },
    handleMenuChange(isOpen, category) {
      this.isMenuOpen = isOpen;
      this.$refs.menuModalContainer.style.height = isOpen ? "500px" : "0px";
      this.$refs.menuModalContainer.style.opacity = isOpen ? 1 : 0;
      this.$refs.menuModalContainer.style.zIndex = isOpen ? 99 : -1;
      this.$emit("category-change", category);
    },
  },
};
</script>

<style scoped>
#navbar {
  padding: 0.8333vw 0.8333vw 0px;
  align-items: center;
  position: fixed;
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0;
  z-index: 1;
  margin-bottom: 1.1111vw;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: transparent;
}
.navbar-menu {
  position: absolute;
  left: 0px;
  top: 18px;
  z-index: 99;
  cursor: pointer;
}

.navbar-menu-back {
  position: relative;
  top: -8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}
.navbar-menu-top-line,
.navbar-menu-under-line {
  width: 14px;
  height: 1.5px;
  background-color: #33383cff;
  transition: transform 0.3s;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
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

.menu-modal-container {
  height: 0px;
  width: 300px;
  padding: 16px;
  background-color: #f0f0f1;
  border-radius: 6px;
  transition: all 0.5s ease-in-out;
  opacity: 0;
  position: absolute;
  overflow: auto;
  top: 18px;
  left: 1.3889vw;
  z-index: 0;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.menu-modal-container-close {
  position: absolute;
  right: 4px;
  top: 4px;
  cursor: pointer;
}

.menu-modal-container-item {
  display: flex;
  height: 70px;
  cursor: pointer;
  align-items: center;
}

.menu-modal-container-item-title {
  margin-left: 6px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
}
.navbar-tel {
  position: absolute;
  right: 1.66667vw;
  top: 18px;
  font-size: 18px;
  font-weight: bold;
}
</style>
