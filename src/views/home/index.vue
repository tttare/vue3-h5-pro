<template>
  <!-- <div class="demo-content px-[12px]">
    <div
      class="text-[14px] py-[2px] px-[10px] rounded-[4px] bg-[var(--color-block-background)] mt-[14px]"
    >
      基于 Vue3 全家桶、TypeScript、Vite 构建工具，开箱即用的 H5
      移动端项目基础模板
    </div>
    <div class="main">
      <van-cell v-for="(item, idx) in contentList" :key="idx" :title="item" />
    </div>
  </div> -->
  <div class="p-[10px] text-[14px]">
    <div class="flex justify-between mb-[15px]">
      <img :src="logoSrc" />
      <van-icon name="search" size="6vw" />
    </div>
    <div>
      <van-swipe autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in swiperList" :key="index">
          <div class="relative">
            <img :src="item.src" class="w-full rounded-[10px] h-[232px]" />
            <div
              class="w-full absolute bottom-[20px] text-[#fff] text-center text-[18px] font-semibold"
            >
              {{ item.title }}
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="flex flex-wrap my-[50px]">
      <div
        v-for="(item, index) in functionList"
        :key="index"
        class="shrink-0 w-2/6 [&:nth-child(-n+3)]:mb-[40px]"
      >
        <img
          :src="item.src"
          class="rounded-[8px] w-[64px] h-[64px] mx-auto mb-[10px]"
        />
        <div class="text-center font-semibold">{{ item.title }}</div>
      </div>
    </div>
    <div><img :src="homeBackground" class="rounded-[10px]" /></div>
  </div>
</template>

<script setup lang="ts" name="Home">
type FunctionItem = {
  title: string;
  src: string;
};
const swiperList = ref<FunctionItem[]>([]);
const functionList = ref<FunctionItem[]>([]);
let homeBackground = ref<string>("");
let logoSrc = ref<string>("");
const imgArr = [
  { title: "News", src: "./assets/swiper7.jpg" },
  { title: "My Team", src: "./assets/swiper1.jpg" },
  { title: "Products", src: "./assets/swiper2.jpg" },
  { title: "Abount Us", src: "./assets/swiper3.jpg" },
  { title: "Contact Us", src: "./assets/swiper4.jpg" },
  { title: "Contact Us", src: "./assets/swiper5.jpg" },
  { title: "Contact Us", src: "./assets/swiper6.jpg" }
];
const functionArr = [
  { title: "News", src: "./assets/product.png" },
  { title: "My Team", src: "./assets/team.png" },
  { title: "Products", src: "./assets/product.png" },
  { title: "Abount Us", src: "./assets/about.png" },
  { title: "Contact Us", src: "./assets/tool.png" }
];
imgArr.forEach(item => {
  item.src = new URL(item.src, import.meta.url).href;
});
functionArr.forEach(item => {
  item.src = new URL(item.src, import.meta.url).href;
});
swiperList.value = imgArr;
functionList.value = functionArr;
homeBackground.value = new URL("./assets/bg.jpg", import.meta.url).href;
logoSrc.value = new URL("./assets/logo.png", import.meta.url).href;
</script>

<style lang="less" scoped>
.van-swipe-item {
  padding: 0 1px;
}
</style>
