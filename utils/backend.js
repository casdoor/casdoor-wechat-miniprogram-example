import {
  request
} from "./util";

// The Casdoor application. Its first WeChat provider must be the one of this mini program (its AppID and AppSecret).
const CasdoorConfig = {
  endpoint: "https://door.casdoor.com",
  clientId: "294b09fbc17f95daf2fe"
}

// Exchanges the code of wx.login() for a Casdoor access token. "tag" tells Casdoor that the code comes
// from a WeChat Mini Program: Casdoor gets the OpenID from WeChat and signs the user in, creating it the first time.

const getAccessToken = (code) => {
  return request({
    url: `${CasdoorConfig.endpoint}/api/login/oauth/access_token`,
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      "tag": "wechat_miniprogram",
      "client_id": CasdoorConfig.clientId,
      "code": code
    }
  });
};

const updateUserinfo = (accessToken, data) => {
  return request({
    url: `${CasdoorConfig.endpoint}/api/update-user?columns=display_name,avatar,email,phone`,
    method: "POST",
    header: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: data
  });
};

const getAccount = (accessToken) => {
  return request({
    url: `${CasdoorConfig.endpoint}/api/get-account`,
    method: "GET",
    header: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
}

// Ends the Casdoor session of the access token
const logout = (accessToken) => {
  return request({
    url: `${CasdoorConfig.endpoint}/api/logout`,
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      "id_token_hint": accessToken
    }
  });
};

module.exports = {
  getAccessToken,
  updateUserinfo,
  getAccount,
  logout
};
