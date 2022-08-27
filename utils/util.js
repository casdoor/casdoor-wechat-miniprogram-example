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
      fail: error => {
        reject(error);
      }
    });
  });
};

const showMessage = (type, text, duration = 1500, mask = false) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: text,
      icon: type,
      duration: duration,
      mask: mask,
      success: () => {
        resolve();
      },
      fail: error => {
        reject(error);
      }
    });
  });
};

const handleError = (error) => {
  if (typeof (error) === "undefined") {
    showMessage("none", "unkonwn error");
  } else if (typeof (error) === "string") {
    showMessage("none", error);
  } else if (typeof (error) === "object") {
    if (error.errMsg) {
      showMessage("none", error.errMsg);
    } else {
      showMessage("none", error.toString());
    }
  }
};

const setStorage = (key, data, encrypt = false) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      data: data,
      key: key,
      encrypt: encrypt,
      success: () => {
        resolve();
      },
      fail: error => {
        reject(error);
      }
    });
  });
};

const getStorage = (key, encrypt = false) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      encrypt: encrypt,
      success: res => {
        resolve(res);
      },
      fail: error => {
        reject(error);
      }
    });
  });
}

const showLoading = title => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: title,
      success: () => {
        resolve();
      },
      fail: error => {
        reject(error);
      }
    });
  });
};

module.exports = {
  request,
  showMessage,
  handleError,
  setStorage,
  getStorage,
  showLoading
};