import {
  request
} from "./util";

const CasdoorConfig = {
  endpoint: "http://localhost:8000",
  clientId: ""
}

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
    url: `${CasdoorConfig.endpoint}/api/update-user?columns=display_name,avatar,email,phone,password`,
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

module.exports = {
  getAccessToken,
  updateUserinfo,
  getAccount
};