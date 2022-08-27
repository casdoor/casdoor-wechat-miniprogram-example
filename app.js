import * as util from "./utils/util";

App({
  onLaunch() {
    util.getStorage("accessToken")
      .then(res => {
        if (res.data) {
          wx.redirectTo({
            url: "/pages/userinfo/userinfo",
          });
        }
      });
  },
  globalData: {}
});