<template>
  <div class="h-full flex items-center">
    <div>
      <div class="h-[100px] flex justify-center items-center">
        <img :src="logoSrc" alt="avatar" class="w-[240px] h-[90px]" />
      </div>
      <van-form @submit="onSubmit">
        <van-field
          placeholder="Sponsor Name"
          label="Sponsor"
          v-model="from.sponsorName"
          left-icon="manager-o"
          required
          readonly
        />
        <van-field
          placeholder="Name"
          label="Name"
          v-model="from.nickname"
          left-icon="manager-o"
          required
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          placeholder="Email"
          label="Email"
          v-model="from.username"
          left-icon="envelop-o"
          required
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
          placeholder="Phone"
          label="Phone"
          v-model="from.mobilePhone"
          left-icon="phone-o"
          required
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <br />
        <van-radio-group
          v-model="from.sex"
          label="Gender"
          title="Gender"
          direction="horizontal"
          required
          :rules="[{ required: true, message: '请选择性别' }]"
        >
          <van-radio name="0">female</van-radio>
          <van-radio name="1">male</van-radio>
        </van-radio-group>
        <br />

        <van-field
          readonly
          required
          left-icon="gift-o"
          label="Brithday"
          placeholder="Please select your birthday"
          :value="from.birthday"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择生日' }]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
            type="date"
            title="Select your birthday"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="dateConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>

        <van-field
          title="State"
          label="State"
          left-icon="location-o"
          placeholder="Choose your state"
          :value="from.stateText"
          @click="stateShow = true"
          required
          :rules="[{ required: true, message: '请选择所在州' }]"
        />
        <van-popup v-model:show="stateShow" position="bottom">
          <van-picker
            title="Choose your state"
            show-toolbar
            v-if="stateShow"
            :columns="statesArray"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            @confirm="stateConfirm"
            @cancel="stateShow = false"
          />
        </van-popup>
        <van-field
          placeholder="Zip Code"
          label="Zip Code"
          v-model="from.zipCode"
        />
        <van-field placeholder="City" label="City" v-model="from.city" />
        <van-field
          placeholder="Address"
          label="Address"
          v-model="from.address"
        />
        <van-field
          placeholder="Password(minimum length of 8 characters)"
          v-model="from.password"
          left-icon="lock"
          :type="passwordType"
          required
        >
          <van-icon
            slot="right-icon"
            @click="switchPasswordType"
            :name="passwordIcon"
          />
        </van-field>
        <van-field
          placeholder="Please repeat the password"
          v-model="from.password2"
          left-icon="lock"
          :type="passwordType"
          required
        >
          <van-icon
            slot="right-icon"
            @click="switchPasswordType"
            :name="passwordIcon"
          />
        </van-field>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :disabled="registDisable"
          >
            注册
          </van-button>
        </div>
      </van-form>
      <div class="more-wrap">
        <router-link class="link" to="/login">Log in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { statesArray } from "@/assets/libs/states.js";
import { register, checkRegisterInfoReq } from "@/api/mock/index";
import { showFailToast, showNotify } from "vant";
import moment from "moment";
const logoSrc = new URL("./assets/login.png", import.meta.url).href;
const from = ref({
  nickname: null,
  username: null,
  avatar: null,
  sponsorId: null,
  sponsorCode: null,
  sponsorName: null,
  type: 2, //h5端
  sex: "0",
  emailCode: "999999",
  birthday: null,
  state: null,
  stateText: null,
  zipCode: null,
  city: null,
  address: null,
  password: null,
  password2: null
});
let dateShow = ref(false);
let stateShow = ref(false);
let showPicker = ref(false);
let passwordType = ref("password");
let passwordIcon = ref("closed-eye");
let registDisable = ref(true);
const minDate = new Date(1900, 1, 1);
const maxDate = new Date();
const currentDate = ref(["1980", "1", "1"]);

const stateConfirm = (value, index) => {
  from.stateText = value;
  from.state = statesArray[index]["value"];
  stateShow = false;
};
const dateConfirm = date => {
  from.birthday = moment(date).format("MM/DD/YYYY");
  showPicker = false;
};

const getUrlParam = function (name) {
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r != null) return unescape(r[2]);
  return null;
};

const init = function () {
  from.sponsorId = getUrlParam("sponsorId");
  //let shareId = getStore("shareId"); TODO
  var param = {
    sponsorId: 1,
    shareId: null
  };
  checkRegisterInfo(param);
  //通过 获取 shareId，通过这个能判断注册人是通过哪个人分享的文章注册的
};

const onSubmit = function () {
  //邮箱校验
  if (!vailEmail(from.username)) {
    return;
  }
  //密码前后对比验证
  if (from.password != from.password2) {
    showNotify({
      type: "warning",
      message: "前后密码填写不一致",
      color: "#ad0000",
      background: "#ffe1e1"
    });
  }
  if (from.password < 8) {
    showNotify({ type: "warning", message: "密码长度不能低于8" });
  }
  register(from).then(res => {
    console.log("res=>" + res);
    if (res.success) {
      showNotify({ type: "success", message: "注册成功" });
    } else {
      showFailToast(res.message);
    }
  });
};

const vailEmail = function (email) {
  if (email == null || email.trim() == "") {
    showNotify({
      type: "warning",
      message: "请填写邮箱",
      color: "#ad0000",
      background: "#ffe1e1"
    });
    return false;
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    showNotify({ type: "warning", message: "邮箱格式不正确" });
    return false;
  }
  return true;
};

const checkRegisterInfo = function (param) {
  if (param.shareId == null && param.sponsorId == null) {
    registDisable = true;
    return;
  }
  checkRegisterInfoReq(param).then(res => {
    from.sponsorId = res.sponsorId;
    from.sponsorCode = res.sponsorCode;
    from.sponsorName = res.sponsorName;
    registDisable = false;
  });
};

const switchPasswordType = () => {
  passwordType = passwordType === "password" ? "text" : "password";
  passwordType === "password"
    ? (passwordIcon = "closed-eye")
    : (passwordIcon = "eye");
};

init();
</script>

<style scoped lang="less"></style>
