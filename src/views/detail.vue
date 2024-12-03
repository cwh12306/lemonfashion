<template>
  <div class="detail-container">
    <nav-bar :backIcon="true" />
    <div class="detail-content">
      <div class="detail-content-title">{{ imageObj.title }}#</div>
      <div :style="isMobile ? '' : 'display: flex;justify-content: center;'">
        <img
          class="detail-content-img"
          :style="
            isMobile
              ? `width: 100vw;${
                  imageObj.isSquare ? 'height: 400px;' : 'height: 500px;'
                }`
              : 'width: 600px;height: 600px;margin-right: 20px'
          "
          :src="imageObj.src"
          :alt="imageObj.title"
        />
        <div>
          <div
            :style="isMobile ? '' : 'margin-bottom: 12px;'"
            class="detail-content-desc"
          >
            <span class="detail-content-desc-content">QTY</span>
            <span class="detail-content-desc-content">{{ imageObj.QTY }}</span>
          </div>
          <div :style="isMobile ? '' : 'display: flex;'">
            <div
              :style="isMobile ? '' : 'flex-direction: column;'"
              class="detail-content-desc"
            >
              <span
                :style="isMobile ? '' : 'margin-bottom: 20px;'"
                class="detail-content-desc-content"
                >COLOR</span
              >
              <template v-if="isMobile">
                <span
                  :style="isMobile ? '' : 'margin-bottom: 20px;'"
                  class="detail-content-desc-content"
                  v-for="color in imageObj.colors"
                  :key="color"
                  >{{ color.includes("/") ? `${color.split("/")[0]}/` : color }}
                  <br />
                  {{ color.includes("/") ? color.split("/")[1] : "" }}
                </span>
              </template>
              <template v-else>
                <span
                  :style="isMobile ? '' : 'margin-bottom: 20px;'"
                  class="detail-content-desc-content"
                  v-for="color in imageObj.colors"
                  :key="color"
                  >{{ color }}
                </span>
              </template>
            </div>
            <div
              :style="isMobile ? '' : 'flex-direction: column;'"
              v-for="(size, index) in Object.keys(imageObj.sizes || {})"
              :key="index"
              class="detail-content-desc"
            >
              <span
                :style="isMobile ? '' : 'margin-bottom: 20px;'"
                class="detail-content-desc-content"
                >{{ size }}</span
              >
              <span
                :style="isMobile ? '' : 'margin-bottom: 20px;'"
                v-for="(item, index2) in imageObj.sizes[size]"
                :key="index2"
                class="detail-content-desc-content"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isMobile" class="detail-content-contact">
        <div style="text-align: left">tel: +34 <br />673233504</div>
        <div style="text-align: center">
          WhatsApp <br /><img :width="50" :height="50" :src="whatsapp" alt="" />
        </div>
        <div style="text-align: right">wechat <br />15058754830</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";
import whatsapp from "@/assets/whatsapp.jpg";
export default {
  name: "DetailCom",
  created() {
    const imageObj = JSON.parse(sessionStorage.getItem("image") || "{}");
    this.imageObj = imageObj;
    let screenWidth = document.documentElement.clientWidth;
    if (screenWidth > 767) {
      this.isMobile = false;
    } else {
      // :style="`${isMobile ? 'width: 100vw' : 'width: 700px'}${
      //     imageObj.isSquare ? 'height: 400px' : 'height: 500px'
      //   }`"
      this.isMobile = true;
    }
  },
  components: {
    NavBar,
  },
  data() {
    return {
      whatsapp,
      imageObj: {},
      isMobile: false,
    };
  },
  methods: {},
};
</script>

<style>
.detail-container {
  background-color: #f8f8f8;
  width: 100vw;
  min-height: 100vh;
  position: relative;
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
.detail-content-desc {
  display: flex;
  justify-content: space-around;
}
.detail-content-desc-content {
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  display: block;
  width: 100px;
}
.detail-content-contact {
  display: flex;
  margin-top: 20px;
  padding: 10px;
  font-weight: bold;
}
.detail-content-contact div {
  width: 33%;
}
</style>
