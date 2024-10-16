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
          <img :src="item" class="w-full rounded-[10px] h-[232px]" />
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
        <div class="text-center font-semibold">{{ item.name }}</div>
      </div>
    </div>
    <div><img :src="homeBackground" class="rounded-[10px]" /></div>
  </div>
</template>

<script setup lang="ts" name="Home">
type FunctionItem = {
  name: string;
  src: string;
};
const swiperList = ref<string[]>([]);
const functionList = ref<FunctionItem[]>([]);
let homeBackground = ref<string>("");
let logoSrc = ref<string>("");
const imgArr = [
  "./assets/swiper7.jpg",
  "./assets/swiper1.jpg",
  "./assets/swiper2.jpg",
  "./assets/swiper3.jpg",
  "./assets/swiper4.jpg",
  "./assets/swiper5.jpg",
  "./assets/swiper6.jpg"
];
const functionArr = [
  { name: "关于AmCan", src: "./assets/about.png" },
  { name: "产品中心", src: "./assets/product.png" },
  { name: "新手入门", src: "./assets/newer.png" },
  { name: "我的团队", src: "./assets/team.png" },
  { name: "活动中心", src: "./assets/activity.png" },
  { name: "工具箱", src: "./assets/tool.png" }
];
const imgSrc = imgArr.map(item => {
  return new URL(item, import.meta.url).href;
});
functionArr.forEach(item => {
  item.src = new URL(item.src, import.meta.url).href;
});
swiperList.value = imgSrc;
functionList.value = functionArr;
homeBackground.value = new URL("./assets/bg.jpg", import.meta.url).href;
logoSrc.value = new URL("./assets/logo.png", import.meta.url).href;
</script>

<style lang="less" scoped>
.van-swipe-item {
  padding: 0 1px;
}
</style>
