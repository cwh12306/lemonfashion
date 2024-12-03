<template>
  <div id="home">
    <nav-bar @category-change="handleMenuChange" :images="images" />
    <div class="home-bg">
      <img
        src="@/assets/bg.jpg"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        "
      />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";
import camisetaCover from "@/assets/camiseta/HL30462.jpg";
import vestidosCover from "@/assets/vestidos/HL30470.jpg";

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
        camiseta: [{ src: camisetaCover, title: "Camiseta" }],
        vestidos: [{ src: vestidosCover, title: "Vestidos" }],
      },
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
  methods: {
    handleMenuChange(category) {
      if (category) {
        this.$router.push(`./category?category=${category}`);
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
}
</style>
