<template>
  <div class="h-full flex items-center">
    <div>
      <div class="h-[100px] flex justify-center items-center">
        <img :src="logoSrc" alt="avatar" class="w-[240px] h-[90px]" />
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formData.email"
            name="邮箱"
            placeholder="请填写邮箱"
            required
            left-icon="envelop-o"
            :rules="[{ required: true, message: '请填写邮箱' }]"
          />
          <van-field
            v-model="formData.password"
            type="password"
            name="密码"
            placeholder="请填写密码"
            required
            left-icon="lock"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-row type="flex">
            <van-col span="16">
              <van-field
                v-model="formData.imgCode"
                placeholder="请填写验证码"
                left-icon="envelop-o"
                required
                use-button-slot
              />
            </van-col>
            <van-col span="8">
              <img
                :src="captchaImg"
                alt=""
                style="width: 110px; cursor: pointer; display: block"
                @click="getCaptchaImg"
              />
            </van-col>
          </van-row>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
        <div style="margin: 16px">
          <van-button round block type="primary" @click="toRegister">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { initCaptcha, drawCodeImage } from "@/api/mock/index";
const router = useRouter();
const formData = ref({ email: "", password: "", imgCode: "" });
const logoSrc = new URL("./assets/login.png", import.meta.url).href;
const captchaImg = ref("");
const captchaId = ref("");
const onSubmit = () => {};
const getCaptchaImg = () => {
  initCaptcha().then(res => {
    if (res) {
      captchaId.value = res;
      captchaImg.value = drawCodeImage + captchaId.value;
    }
  });
};
getCaptchaImg();
const toRegister = () => {
  router.push("/register");
};
</script>

<style scoped lang="less"></style>
