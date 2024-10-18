import { http } from "@/utils/request";

type ListResult = {
  code: number;
  message: string;
  list: Array<any>;
};

export const drawCodeImage: string = "/aeconn/common/captcha/draw/";

export function getListApi(params?: object): Promise<ListResult> {
  return http.request({
    url: "/dev-api/list/get",
    method: "get",
    params
  });
}

export function getListApiError(data?: object): Promise<ListResult> {
  return http.request({
    url: "/dev-api/list/error",
    method: "post",
    data
  });
}

export function initCaptcha(): Promise<any> {
  return http.request({ url: "/aeconn/common/captcha/init", method: "get" });
}

export const login = (data) => {
  return http.request({ url: "/aeconn/login", method: "post" , data});
}


export function register(data?: object): Promise<any> {
  return http.request({ url: "/aeconn/user/register", method: "post" , data});
}

export function checkRegisterInfoReq(data?: object): Promise<any> {
  return http.request({ url: "/aeconn/user/checkRegisterInfo", method: "post" , data});
}