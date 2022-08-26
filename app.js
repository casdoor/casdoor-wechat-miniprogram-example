import {getAccessToken} from "./utils/backend";

App({
  onLaunch() {
    wx.login({
      success: res => {
        getAccessToken(res.code)
          .then(res => {
            this.globalData.accessToken = res.data.access_token;
          });
      }
    });
  },
  globalData: {
    accessToken: ""
  }
});
