<template>
  <div class="detail-container">
    <nav-bar :backIcon="true" />
    <div class="detail-content">
      <div class="detail-content-title">{{ imageObj.title }}</div>
      <img
        class="detail-content-img"
        :width="300"
        :height="400"
        :src="imageObj.src"
        alt=""
      />
      <div class="detail-content-desc">
        <span class="detail-content-desc-title">color：</span>
        <span>{{ imageObj.color }}</span>
      </div>
      <div class="detail-content-desc">
        <span class="detail-content-desc-title">size：</span>
        <span>{{ imageObj.size }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";
export default {
  name: "DetailCom",
  created() {
    const imageObj = JSON.parse(sessionStorage.getItem("image") || "{}");
    this.imageObj = imageObj;
  },
  components: {
    NavBar,
  },
  data() {
    return {
      imageObj: {},
    };
  },
  methods: {},
};
</script>

<style>
.detail-container {
  background-color: #f8f8f8;
  width: 100vw;
  height: 100vh;
}
.detail-content {
  text-align: center;
}
.detail-content-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.8333vw;
}
.detail-content-img {
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 0.8333vw;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.detail-content-desc-title {
  font-weight: bold;
}
</style>
