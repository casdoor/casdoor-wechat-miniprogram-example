# casdoor-wechat-miniprogram-example

[![LICENSE](https://img.shields.io/github/license/casdoor/casdoor-wechat-miniprogram-example)](https://github.com/casdoor/casdoor-wechat-miniprogram-example/blob/master/LICENSE)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/casbin/casdoor)

>Casdoor supports WeChat Mini Program after version 1.41.0

## Introduction

Since WeChat Mini Program do not support standardized OAuth, it cannot jump to the self-host Casdoor webpage for login.
Therefore, the process of using Casdoor for WeChat Mini Program is different from that of ordinary programs.

This document will talk about how to access Casdoor to WeChat Mini Program. More detailed information can be found in 
the WeChat Mini Program [login document](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html).

## What you need

### Deploy the Casdoor.

You can refer to the Casdoor official documentation for the [install guide](https://casdoor.org/docs/basic/server-installation). Please deploy your Casdoor instance in **production mode**.

After a successful deployment, you need to ensure:

- Open your favorite browser and visit **http://localhost:8000**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

### Configure Casdoor application

1. Create a **wechat idp** in casdoor and fill your `APPID` and `APPSECRET` given to you by WeChat Mini Program develop platform.
2. Create or use an existing Casdoor application.
3. Add the idp added above to the **application** you want to use.

>For convenience, casdoor will read the first WeChat type idp in the application as the WeChat Mini Program idp by default.
>So if you want to use the WeChat Mini Program in this app, don't add multiple WeChat type idp in one app.

## Run the example

### Step1. Download the code

```
git clone https://github.com/casdoor/casdoor-wechat-miniprogram-example.git
```

- Open this example in your [wechat devtools](https://developers.weixin.qq.com/miniprogram/en/dev/devtools/download.html).

> The `updateUserinfo` function of the `userinfo` page needs to open the corresponding permission in Casdoor.

### Step2. Init example

First, You need to init requires 2 parameters, which are all string type:

| Name         | Description                                                                                             | File                  |
| ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
| `endpoint`   | Your Casdoor server host/domain                                                                         | `/utils/backend.js` |
| `clientID`   | The Client ID of your Casdoor application                                                               | `/utils/backend.js` |

Then, configure the `appid` of the `project.config.json` file.

## Step3. Write WeChat MiniProgram code

WeChat Mini Program provides an API to login internally and get the Code, all you need to do is to send this Code to Casdoor,
Casdoor will use this Code to get some information from WeChat server (such as OpenID, SessionKey, etc.).

The following code shows how to accomplish the above process:

```js
// login in mini program
wx.login({
  success: res => {
    // this is your login code you need to send to casdoor
    console.log(res.code)
    
    wx.request({
      url: `${CASDOOR_HOSTNAME}/api/login/oauth/access_token`,
      method: "POST",
      data: {
        "tag": "wechat_miniprogram", // required
        "client_id": "6825f4f0af45554c8952",
        "code": res.code,
        "username": this.data.userInfo.nickName, // update user profile, when you login.
        "avatar": this.data.userInfo.avatarUrl,
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success: res => {
        console.log(res)
        this.globalData.accessToken = res.data.access_token // get casdoor's accessToken
      }
    })
  }
})
```

It is worth mentioning that the `tag` parameter is mandatory and you need to make casdoor understand that this is a request from the WeChat Mini Program.

The above code passes in the username and avatar uri of the WeChat Mini Program user while logging in. You can also pass these two parameters without passing them first, and then pass them to casdoor after the login is successful and accessToken is obtained:

```js
wx.getUserProfile({
  desc: 'share your info to casdoor', 
  success: (res) => {
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true
    })
    console.log(app.globalData.accessToken)
    wx.request({
      url: `${CASDOOR_HOSTNAME}/api/update-user`, // casdoor uri
      method: "POST",
      data: {
        "owner": "test",
        "name": "wechat-oGk3T5tIiMFo3SazCO75f0HEiE7Q",
        "displayName": this.data.userInfo.nickName,
        "avatar": this.data.userInfo.avatarUrl
      },
      header: {
        "Authorization": "Bearer " + app.globalData.accessToken, // Bearer token
        "content-type": "application/json"
      },
      success: (res) => {
        console.log(res)
      }
    })
  }
})
```

Also, you can use accessToken as a bearer token for any Casdoor operation you want.
