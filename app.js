import * as util from "./utils/util";

App({
  onLaunch() {
    // signed in before: show the user
    util.getStorage("accessToken")
      .then(res => {
        if (res.data) {
          wx.redirectTo({
            url: "/pages/userinfo/userinfo",
          });
        }
      })
      .catch(() => {
        // not signed in yet
      });
  },
  globalData: {}
});