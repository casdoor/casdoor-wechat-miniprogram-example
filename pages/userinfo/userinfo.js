import * as backend from "../../utils/backend";
import * as util from "../../utils/util";

Page({
  data: {
    account: undefined
  },
  onLoad() {
    util.showLoading("获取用户信息中")
      .then(() => this.getUserinfo())
      .catch(error => {
        // the token is missing, invalid or has expired: sign in again
        util.handleError(error);
        util.removeStorage("accessToken")
          .finally(() => wx.redirectTo({
            url: "/pages/index/index",
          }));
      })
      .finally(() => wx.hideLoading());
  },
  getAccessToken() {
    return util.getStorage("accessToken")
      .then(res => {
        if (res.data) {
          return res.data;
        } else {
          return Promise.reject(res.errMsg);
        }
      });
  },
  getUserinfo() {
    return this.getAccessToken()
      .then(backend.getAccount)
      .then(res => {
        if (res.data.status === "ok") {
          this.renderUserinfo(res.data.data);
        } else {
          return Promise.reject(new Error(res.data.msg));
        }
      });
  },
  renderUserinfo(account) {
    this.setData({
      account: {
        id: account.id,
        name: account.name,
        displayName: account.displayName,
        avatar: account.avatar,
        email: account.email,
        phone: account.phone
      }
    });
  },
  updateUserinfo(e) {
    const values = e.detail.value;
    if (this.data.account && this.validate(values)) {
      values.name = this.data.account.name;
      this.getAccessToken()
        .then(accessToken => backend.updateUserinfo(accessToken, values))
        .then(res => {
          if (res.data.status === "ok") {
            return util.showMessage("success", "更新成功", 1500, true)
              .then(() => this.getUserinfo());
          } else {
            return Promise.reject(new Error(res.data.msg));
          }
        })
        .catch(util.handleError);
    }
  },
  validate(values) {
    if (!values["displayName"] || values["displayName"].trim().length === 0) {
      util.showMessage("none", "显示名称不能为空");
      return false;
    }
    values["displayName"] = values["displayName"].trim();
    return true;
  },
  logout() {
    this.getAccessToken()
      .then(accessToken => backend.logout(accessToken))
      .catch(() => {
        // the Casdoor session may already have ended
      })
      .then(() => util.removeStorage("accessToken"))
      .then(() => util.showMessage("success", "退出登录成功"))
      .then(() => wx.redirectTo({
        url: "/pages/index/index"
      }))
      .catch(util.handleError);
  }
})