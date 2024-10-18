<template>
  <div class="h-full flex items-center">
    <div>
      <div class="h-[100px] flex justify-center items-center">
        <img :src="logoSrc" alt="avatar" class="w-[90px] h-[90px]" />
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formData.username"
            name="Email"
            placeholder="Email"
            required
            left-icon="envelop-o"
            :rules="[
              { required: true, message: 'Please fill in your email address' }
            ]"
          />
          <van-field
            v-model="formData.password"
            type="password"
            name="Password"
            placeholder="Password"
            required
            left-icon="lock"
            :rules="[
              { required: true, message: 'Please fill in your email password' }
            ]"
          />
          <van-row type="flex">
            <van-col span="16">
              <van-field
                v-model="formData.code"
                placeholder="Verification Code"
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
            Login
          </van-button>
        </div>
        <!-- <div style="margin: 16px">
          <van-button round block type="primary" @click="toRegister">
            注册
          </van-button>
        </div> -->
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { initCaptcha, drawCodeImage, login } from "@/api/mock/index";
const router = useRouter();
const formData = ref({ username: "", password: "", code: "", captchaId: "" });
const logoSrc = new URL("./assets/registerlogo.png", import.meta.url).href;
const captchaImg = ref("");
const captchaId = ref("");
const onSubmit = () => {
  formData.value.captchaId = captchaId.value;
  login(formData.value).then(res => {
    console.log(res);
  });
};
const getCaptchaImg = () => {
  initCaptcha().then(res => {
    if (res) {
      captchaId.value = res;
      captchaImg.value = drawCodeImage + captchaId.value;
      router.push("/home");
    }
  });
};
getCaptchaImg();
const toRegister = () => {
  router.push("/register");
};
</script>

<style scoped lang="less"></style>
