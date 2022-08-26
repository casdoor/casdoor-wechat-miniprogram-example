import {request} from "./util";

const CasdoorConfig = {
  endpoint: "http://localhost:8000",
  clientId: "",
  clientSecret: ""
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
      "client_secret": CasdoorConfig.clientSecret,
      "code": code
    }
  });
};

const updateUser = (accessToken, nickName, avatarUrl) => {
  return request({
    url: `${CasdoorConfig.endpoint}/api/update-user?columns=display_name,avatar`,
    method: "POST",
    header: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: {
      "displayName": nickName,
      "avatar": avatarUrl
    }
  });
};

module.exports = {
  getAccessToken,
  updateUser
};
