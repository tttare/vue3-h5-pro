<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: "Home",
    to: {
      name: "Home"
    }
  },
  {
    icon: "newspaper-o",
    title: "Product",
    to: {
      name: "Project"
    }
  },
  {
    icon: "shop-o",
    title: "Team",
    to: {
      name: "Tools"
    }
  },
  {
    icon: "user-o",
    title: "Profile",
    to: {
      name: "About"
    }
  }
]);
</script>
