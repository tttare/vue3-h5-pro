<template>
  <div class="h-full flex items-center">
    <div>
      <div class="h-[100px] flex justify-center items-center">
        <img :src="logoSrc" alt="avatar" class="w-[90px] h-[90px]" />
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="from.sponsorName"
          placeholder="Sponsor Name"
          label="Sponsor"
          left-icon="manager-o"
          required
          readonly
        />
        <van-field
          v-model="from.nickname"
          placeholder="Name"
          label="Name"
          left-icon="manager-o"
          required
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="from.username"
          placeholder="Email"
          label="Email"
          left-icon="envelop-o"
          required
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
          v-model="from.mobilePhone"
          placeholder="Phone"
          label="Phone"
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
          :modelValue="from.birthday"
          :rules="[{ required: true, message: '请选择生日' }]"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
            v-model="currentDate"
            type="date"
            title="Select your birthday"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
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
          required
          :rules="[{ required: true, message: '请选择所在州' }]"
          @click="stateShow = true"
        />
        <van-popup v-model:show="stateShow" position="bottom">
          <van-picker
            v-if="stateShow"
            title="Choose your state"
            show-toolbar
            :columns="statesArray"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            @confirm="stateConfirm"
            @cancel="stateShow = false"
          />
        </van-popup>
        <van-field
          v-model="from.zipCode"
          placeholder="Zip Code"
          label="Zip Code"
        />
        <van-field v-model="from.city" placeholder="City" label="City" />
        <van-field
          v-model="from.address"
          placeholder="Address"
          label="Address"
        />
        <van-field
          v-model="from.password"
          placeholder="Password(minimum length of 8 characters)"
          left-icon="lock"
          :type="passwordType"
          required
        >
          <template v-slot:right-icon>
            <van-icon :name="passwordIcon" @click="switchPasswordType" />
          </template>
        </van-field>
        <van-field
          v-model="from.password2"
          placeholder="Please repeat the password"
          left-icon="lock"
          :type="passwordType"
          required
        >
          <template v-slot:right-icon>
            <van-icon :name="passwordIcon" @click="switchPasswordType" />
          </template>
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
import { FieldType, showFailToast, showNotify } from "vant";
import moment from "moment";
const logoSrc = new URL("./assets/registerlogo.png", import.meta.url).href;
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
  password2: null,
  mobilePhone: null
});
let dateShow = ref(false);
let stateShow = ref(false);
let showPicker = ref(false);
let passwordType = ref<FieldType>("password");
let passwordIcon = ref("closed-eye");
let registDisable = ref(true);
const minDate = new Date(1900, 1, 1);
const maxDate = new Date();
const currentDate = ref(["1980", "1", "1"]);

const stateConfirm = (value, index) => {
  from.value.stateText = value;
  from.value.state = statesArray[index]["value"];
  stateShow.value = false;
};
const dateConfirm = date => {
  from.value.birthday = moment(date.selectedValues.join("-")).format(
    "MM/DD/YYYY"
  );
  showPicker.value = false;
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
  from.value.sponsorId = getUrlParam("sponsorId");
  //let shareId = getStore("shareId"); TODO
  var param = {
    sponsorId: from.value.sponsorId,
    shareId: null
  };
  checkRegisterInfo(param);
  //通过 获取 shareId，通过这个能判断注册人是通过哪个人分享的文章注册的
};

const onSubmit = function () {
  //邮箱校验
  if (!vailEmail(from.value.username)) {
    return;
  }
  //密码前后对比验证
  if (from.value.password != from.value.password2) {
    showNotify({
      type: "warning",
      message: "前后密码填写不一致",
      color: "#ad0000",
      background: "#ffe1e1"
    });
  }
  if (from.value.password < 8) {
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
    registDisable.value = true;
    return;
  }
  checkRegisterInfoReq(param).then(res => {
    from.value.sponsorId = res.sponsorId;
    from.value.sponsorCode = res.sponsorCode;
    from.value.sponsorName = res.sponsorName;
    registDisable.value = false;
  });
};

const switchPasswordType = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
  passwordType.value === "password"
    ? (passwordIcon.value = "closed-eye")
    : (passwordIcon.value = "eye");
};

init();
</script>

<style scoped lang="less">
.name {
  width: 100px;
}
</style>
