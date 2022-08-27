import * as backend from "../../utils/backend";
import * as util from "../../utils/util";

Page({
  data: {},
  onLoad() {
  },
  login() {
    this.wrapWxLoginAsPromise()
      .then(res => {
        if (res.code) {
          return res.code;
        } else {
          return Promise.reject(res);
        }
      })
      .then(backend.getAccessToken)
      .then(res => {
        if (res.data.error) {
          const message = `[${res.data.error}] ${res.data.error_description}`;
          return Promise.reject(new Error(message));
        } else {
          return res.data.access_token;
        }
      })
      .then(this.saveAccessTokenAndRedirectToUserinfoPage)
      .catch(util.handleError);
  },
  wrapWxLoginAsPromise() {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout: 2000,
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        }
      })
    });
  },
  saveAccessTokenAndRedirectToUserinfoPage(accessToken) {
    return util.setStorage("accessToken", accessToken)
      .then(() => util.showMessage("success", "登录成功", 1500, true))
      .finally(() => wx.redirectTo({
        url: "/pages/userinfo/userinfo"
      }));
  }
})