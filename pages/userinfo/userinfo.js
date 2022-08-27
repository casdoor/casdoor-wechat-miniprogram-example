import * as backend from "../../utils/backend";
import * as util from "../../utils/util";

Page({
  data: {
    account: undefined
  },
  onLoad() {
    util.showLoading("获取用户信息中")
      .then(this.getUserinfo)
      .catch(error => {
        util.handleError(error)
          .then(() => wx.redirectTo({
            url: "/pages/index/index",
          }));
      })
      .finally(wx.hideLoading);
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
    this.getAccessToken()
      .then(backend.getAccount)
      .then(res => {
        if (res.data.status === "ok") {
          this.renderUserinfo(res.data.data);
        } else {
          return Promise.reject(new Error(res.data.msg));
        }
      })
      .catch(util.handleError);
  },
  renderUserinfo(account) {
    this.setData({
      account: {
        id: account.id,
        name: account.name,
        displayName: account.displayName,
        avatar: account.avatar,
        email: account.email,
        phone: account.phone,
        password: account.password
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
            util.showMessage("success", "更新成功", 1500, true)
              .then(this.getUserinfo);
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
    } else if (!values["password"] || values["password"].trim().length === 0) {
      util.showMessage("none", "密码不能为空");
      return false;
    }
    values["displayName"] = values["displayName"].trim();
    values["password"] = values["password"].trim();
    return true;
  },
  logout() {
    util.setStorage("accessToken", undefined)
      .then(() => util.showMessage("success", "退出登录成功"))
      .then(() => wx.redirectTo({
        url: "/pages/index/index"
      }))
      .catch(util.handleError);
  }
})