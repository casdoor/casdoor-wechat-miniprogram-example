import {updateUser} from "../../utils/backend";
import {showMessage} from "../../utils/util";

const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    });
  },
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  updateUserProfile(e) {
    updateUser(
      app.globalData.accessToken, 
      this.data.userInfo.nickName, 
      this.data.userInfo.avatarUrl
    ).then(res => {
      const data = res.data;
      if (data.status === "error") {
        showMessage("none", data.msg);
      } else {
        showMessage("success", "更新成功");
      }
    }).catch(err => {
      showMessage("error", err.errMsg);
    });
  }
})
