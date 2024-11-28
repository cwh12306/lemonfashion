<template>
  <div :style="`${isMobile ? 'padding: 0px' : 'padding: 0 24px'}`" id="home">
    <nav-bar :menu-open="menuOpen" @menu-toggle="handleMenuToggle" />
    <div id="carousel">
      <el-carousel
        ref="carousel"
        @change="handleCarouselChange"
        indicator-position="none"
        :interval="4000"
        :type="isMobile ? '' : 'card'"
        height="400px"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <el-carousel-item
          v-for="(item, index) in images[currentCategory]"
          :key="index"
        >
          <img
            :src="item.src"
            :alt="item.title"
            style="width: 100%; height: 100%"
          />
        </el-carousel-item>
      </el-carousel>
      <div ref="carouselControls" class="carousel-controls">
        <div
          @mouseenter="handleControlsHover(index)"
          @mouseleave="handleControlsLeave"
          @click="handleControlsClick(index)"
          :style="`${
            isMobile ? '' : 'width: 10px;height: 10px;margin-right: 5px'
          }`"
          :class="`${
            activeIndex === index ? 'active-carousel-control-item' : ''
          } carousel-control-item`"
          v-for="(item, index) in images[currentCategory]"
          :key="index"
        ></div>
        <div ref="popover" class="carousel-controls-popover">
          <div ref="popoverTitle"></div>
          <img
            ref="popoverImage"
            alt="Carousel Image"
            :width="80"
            :height="80"
          />
        </div>
      </div>
    </div>
    <div ref="menuModalContainer" class="menu-modal-container">
      <div @click="handleMenuToggle(false)" class="menu-modal-container-close">
        <i class="el-icon-close"></i>
      </div>
      <div
        @click="handleMenuChange(category)"
        v-for="(category, index) in Object.keys(images)"
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
import NavBar from "@/components/navbar.vue";
export default {
  name: "HomeCom",
  components: {
    NavBar,
  },
  data() {
    return {
      isMobile: false,
      menuOpen: false,
      images: {
        camiseta: [],
        vestidos: [],
      },
      currentCategory: "camiseta",
      activeIndex: 0,
      startX: 0,
      endX: 0,
    };
  },
  created() {
    let screenWidth = document.documentElement.clientWidth;
    if (screenWidth > 767) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
    this.loadImages();
  },
  methods: {
    handleMenuChange(category) {
      this.currentCategory = category;
      this.activeIndex = 0;
      this.handleMenuToggle(false);
    },
    handleControlsLeave() {
      if (this.isMobile) return;
      this.$refs.popover.style.opacity = 0;
    },
    handleControlsHover(index) {
      if (this.isMobile) return;
      const controlItem = this.$refs.carouselControls.children[index];
      const controlItemRect = controlItem.getBoundingClientRect();
      const popoverRect = this.$refs.popover.getBoundingClientRect();
      // 计算 popover 的 left 位置
      const leftPosition =
        controlItemRect.left -
        24 -
        popoverRect.width / 2 +
        controlItemRect.width / 2;

      this.$refs.popover.style.opacity = 1;
      this.$refs.popover.style.left = `${leftPosition}px`;
      this.$refs.popoverImage.src =
        this.images[this.currentCategory][index].src;
      this.$refs.popoverTitle.innerText =
        this.images[this.currentCategory][index].title;
    },
    handleControlsClick(index) {
      if (this.isMobile) return;
      this.activeIndex = index;
      this.$refs.carousel.setActiveItem(index);
    },
    handleCarouselChange(curr) {
      // 两个参数的意思是curr, prev
      this.activeIndex = curr;
    },
    handleMenuToggle(isOpen) {
      this.$refs.menuModalContainer.style.height = isOpen ? "500px" : "0px";
      this.$refs.menuModalContainer.style.opacity = isOpen ? 1 : 0;
      this.$refs.menuModalContainer.style.zIndex = isOpen ? 98 : -1;
      this.menuOpen = isOpen;
    },
    loadImages() {
      const contextCamiseta = require.context(
        "@/assets/camiseta",
        true,
        /\.jpg$/
      );
      const contextVestidos = require.context(
        "@/assets/vestidos",
        true,
        /\.jpg$/
      );

      const camiseta = contextCamiseta.keys().map((key) => {
        const fileName = key.split("/").pop().replace(".jpg", "");
        return {
          title: fileName,
          src: contextCamiseta(key),
        };
      });

      const vestidos = contextVestidos.keys().map((key) => {
        const fileName = key.split("/").pop().replace(".jpg", "");
        return {
          title: fileName,
          src: contextVestidos(key),
        };
      });

      this.images = { camiseta, vestidos };
    },
    handleTouchStart(event) {
      this.startX = event.touches[0].clientX;
    },
    handleTouchEnd(event) {
      this.endX = event.changedTouches[0].clientX;
      const distance = this.startX - this.endX;
      const threshold = 50; // 滑动距离阈值

      if (distance > threshold) {
        // 向右滑动，切换到下一张
        this.$refs.carousel.next();
      } else if (distance < -threshold) {
        // 向左滑动，切换到上一张
        this.$refs.carousel.prev();
      }
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  width: 100vw;
  background-color: #f8f8f8;
  position: relative;
  padding: 0 24px;
}

#carousel {
  margin: 0 auto;
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
}

.menu-modal-container-close {
  position: absolute;
  right: 4px;
  top: 4px;
  cursor: pointer;
}

.carousel-controls {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.carousel-control-item {
  width: 6px;
  height: 6px;
  margin-right: 3px;
  border-radius: 50%;
  background-color: rgb(141, 122, 111, 0.2);
  cursor: pointer;
}

.active-carousel-control-item {
  background-color: rgb(141, 122, 111);
}

.carousel-controls-popover {
  position: absolute;
  opacity: 0;
  top: -130px;
  z-index: 99;
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  transition: opacity 0.3s ease-in-out;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-size: 12px;
  font-weight: bold;
}
.carousel-controls-popover::before {
  content: "";
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
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
</style>
