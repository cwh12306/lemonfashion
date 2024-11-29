<template>
  <div id="category">
    <nav-bar @category-change="handleMenuChange" :images="images" />
    <div class="img-list">
      <div
        @click="handleDetail(image)"
        class="img-list-item"
        v-for="(image, index) in images[currentCategory]"
        :key="index"
      >
        <div style="font-size: 12px; font-weight: bold">{{ image.title }}</div>
        <img
          :width="isMobile ? 150 : 200"
          :height="isMobile ? 200 : 300"
          :src="image.src"
          :alt="image.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";
import imagesData from "@/assets/images.json";

export default {
  name: "CategoryCom",
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
      currentCategory: this.$route.query.category || "camiseta",
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
    handleDetail(image) {
      this.$router.push(`/detail?category=${this.currentCategory}`);
      sessionStorage.setItem("image", JSON.stringify(image));
    },
    handleMenuChange(category) {
      if (category) this.currentCategory = category;
    },
    // loadImages() {
    //   const contextCamiseta = require.context(
    //     "@/assets/camiseta",
    //     true,
    //     /\.jpg$/
    //   );
    //   const contextVestidos = require.context(
    //     "@/assets/vestidos",
    //     true,
    //     /\.jpg$/
    //   );

    //   const camiseta = contextCamiseta.keys().map((key) => {
    //     const fileName = key.split("/").pop().replace(".jpg", "");
    //     return {
    //       title: fileName,
    //       src: contextCamiseta(key),
    //     };
    //   });

    //   const vestidos = contextVestidos.keys().map((key) => {
    //     const fileName = key.split("/").pop().replace(".jpg", "");
    //     return {
    //       title: fileName,
    //       src: contextVestidos(key),
    //     };
    //   });

    //   this.images = { camiseta, vestidos };
    // },
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
        const imageData = imagesData[fileName] || {}; // 获取 JSON 中的数据
        return {
          title: fileName,
          src: contextCamiseta(key),
          ...imageData, // 将 JSON 中的数据展开
        };
      });

      const vestidos = contextVestidos.keys().map((key) => {
        const fileName = key.split("/").pop().replace(".jpg", "");
        const imageData = imagesData[fileName] || {}; // 获取 JSON 中的数据
        return {
          title: fileName,
          src: contextVestidos(key),
          ...imageData, // 将 JSON 中的数据展开
        };
      });

      this.images = { camiseta, vestidos };
    },
  },
};
</script>

<style scoped>
#category {
  min-height: 100vh;
  width: 100vw;
  background-color: #f8f8f8;
  position: relative;
}

.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.img-list-item {
  margin-right: 12px;
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>
