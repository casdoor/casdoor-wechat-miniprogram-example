# Casdoor WeChat Mini Program Example

[![Build](https://github.com/casdoor/casdoor-wechat-miniprogram-example/actions/workflows/build.yml/badge.svg)](https://github.com/casdoor/casdoor-wechat-miniprogram-example/actions/workflows/build.yml)
[![License](https://img.shields.io/github/license/casdoor/casdoor-wechat-miniprogram-example)](https://github.com/casdoor/casdoor-wechat-miniprogram-example/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/1022748306096537660?logo=discord&label=discord&color=5865F2)](https://discord.gg/5rPsrAzK7S)

An example [WeChat Mini Program](https://developers.weixin.qq.com/miniprogram/dev/framework/) that signs users in with [Casdoor](https://casdoor.ai/), and shows and edits the user's profile. Complete docs: [Casdoor: WeChat Mini Program](https://casdoor.ai/docs/integration/javascript/wechat_miniprogram/).

## How it works

A mini program can't open the Casdoor sign-in page, so it signs in with the WeChat account instead ([WeChat login](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)):

1. **Casdoor登录** calls `wx.login()` and gets a one-time code from WeChat ([pages/index/index.js](pages/index/index.js)).
2. The code goes to Casdoor's token endpoint with `tag=wechat_miniprogram` ([utils/backend.js](utils/backend.js)):

   ```js
   wx.request({
     url: `${endpoint}/api/login/oauth/access_token`,
     method: "POST",
     header: {"Content-Type": "application/x-www-form-urlencoded"},
     data: {
       tag: "wechat_miniprogram", // required: the code comes from a WeChat Mini Program
       client_id: clientId,
       code: res.code,
     },
   })
   ```

3. Casdoor exchanges the code with WeChat for the user's OpenID, signs the user in (creating the user the first time) and returns a Casdoor access token. The mini program keeps it in storage.
4. [The user page](pages/userinfo/userinfo.js) calls Casdoor's APIs with `Authorization: Bearer <access token>`: `GET /api/get-account` to show the user and `POST /api/update-user` to edit the display name, avatar, email and phone. **退出登录** ends the Casdoor session (`/api/logout`) and removes the token.

## Prerequisites

- [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- A WeChat Mini Program, with its AppID and AppSecret from the [WeChat Official Accounts Platform](https://mp.weixin.qq.com/)
- A Casdoor server (1.41.0 or later) reachable over HTTPS, see [Casdoor installation](https://casdoor.ai/docs/basic/server-installation). The demo server https://door.casdoor.com doesn't have your mini program, so use your own Casdoor.

## Configuration

1. In Casdoor, add a **WeChat** provider with the AppID and AppSecret of the mini program.
2. Create (or reuse) an application and add the provider to it. Casdoor uses the first WeChat provider of the application for mini programs, so add only one.
3. Fill in [utils/backend.js](utils/backend.js):

   | Name       | Description                  |
   |------------|------------------------------|
   | `endpoint` | Casdoor server URL           |
   | `clientId` | Client ID of the application |

4. Put the AppID of the mini program in `appid` of [project.config.json](project.config.json).
5. In the mini program's settings on the WeChat platform, add the Casdoor server to the **request legal domains** (request合法域名). In WeChat DevTools you can skip this while developing with "不校验合法域名".

Editing the profile needs the users of the organization to be allowed to update their own profile in Casdoor.

## Run

```shell
git clone https://github.com/casdoor/casdoor-wechat-miniprogram-example
```

Open the folder in WeChat DevTools, then tap **Casdoor登录** in the simulator or on a phone (preview).

## Resources

- [Casdoor documentation](https://casdoor.ai/docs/overview)
- [Casdoor: WeChat Mini Program](https://casdoor.ai/docs/integration/javascript/wechat_miniprogram/)
- [WeChat Mini Program login](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

## License

[Apache-2.0](LICENSE)
