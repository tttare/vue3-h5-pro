<template>
  <div class="bg-[#F2F2F2] h-full">
    <div class="header">
      <div class="z-10">
        <div class="w-[78px] h-[78px] rounded-full mx-auto" @click="toLogin">
          <img :src="userForm.avatar" class="w-full h-full" />
        </div>
        <div class="text-[22px] font-semibold text-[#fff] pt-[15px] pb-[8px]">
          {{ userForm.displayName }}
        </div>
      </div>
      <div class="absolute bottom-0 left-0 top-0 right-0">
        <img :src="bgSrc" class="w-full h-full" />
      </div>
    </div>
    <div class="px-[15px]">
      <div
        class="p-[15px] mb-[10px] flex justify-around bg-[#fff] rounded-[8px] mt-[-25px] z-10 relative"
      >
        <div
          v-for="(item, index) in briefList"
          :key="index"
          class="flex flex-col justify-between"
        >
          <div v-if="index === 0">
            <img
              :src="item.value"
              class="w-[28px] h-[28px] mx-auto"
              @click="show = true"
            />
          </div>
          <div v-else class="text-[20px] text-center">{{ item.value }}</div>
          <div class="pt-[8px] text-[12px]">{{ item.text }}</div>
        </div>
      </div>
      <div class="mb-[10px]">
        <van-cell-group inset>
          <van-cell
            v-for="(item, index) in toolList"
            :key="index"
            :title="item.name"
            :icon="item.icon"
            is-link
          ></van-cell>
        </van-cell-group>
      </div>
      <!-- <div>
        <van-cell-group inset>
          <van-cell title="用户协议" icon="description-o" is-link></van-cell
        ></van-cell-group>
      </div> -->
    </div>
    <van-dialog v-model:show="show" confirmButtonText="关闭">
      <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
    </van-dialog>
  </div>
</template>
<script setup lang="ts" name="About">
import { profile } from "@/api/mock/index";
type BriefItem = {
  value: any;
  text: string;
};
const router = useRouter();
const bgSrc = new URL("./assets/bg.png", import.meta.url).href;
const avatarSrc = new URL("./assets/avatar.png", import.meta.url).href;
const userName = ref<string>("点击登录");
const userForm = ref({
  avatar: new URL("./assets/avatar.png", import.meta.url).href,
  username: "Login",
  nickname: "Login",
  level: "",
  displayName: ""
});
const briefList = ref<BriefItem[]>([
  {
    value: new URL("./assets/qrcode.png", import.meta.url).href,
    text: "QR Code"
  },
  {
    value: 0,
    text: "Team"
  },
  {
    value: 0,
    text: "Commission"
  }
]);
const toolList = [
  { name: "Profile", icon: "description-o" },
  { name: "My Favorite", icon: "like-o" },
  { name: "My Order", icon: "phone-o" },
  { name: "Privacy Policy", icon: "setting-o" }
];
const show = ref(false);
const toLogin = () => {
  if (!sessionStorage.getItem("accessToken")) {
    //如果已登录就不用去登录
    router.push("/login");
  }
};

const userDetail = () => {
  profile().then(res => {
    userForm.value = res;
  });
};
userDetail();
</script>
<style scoped lang="less">
.header {
  background: #daa96b;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: relative;
  padding: 40px 0;
}
.van-cell-group--inset {
  margin: 0;
}
:deep(.van-dialog) {
  .van-dialog__content {
    padding: 10px;
  }
}
</style>
