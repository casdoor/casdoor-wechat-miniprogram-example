const request = (config) => {
  config = config || {};
  config.url = config.url || "";
  config.method = config.method || "GET";
  config.header = config.header || {};
  config.data = config.data || {};
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url,
      method: config.method,
      header: config.header,
      data: config.data,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

const showMessage = (type, text) => {
  wx.showToast({
    title: text,
    icon: type,
    duration: 2000
  });
}

module.exports = {
  request,
  showMessage
};
