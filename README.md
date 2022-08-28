# casdoor-wechat-miniprogram-example

See complete docs at: https://casdoor.org/docs/integration/wechat_miniprogram

## Init example

First, You need to init requires 3 parameters, which are all string type:

| Name         | Description                                                                                             | File                  |
| ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
| `endpoint`   | Your Casdoor server host/domain                                                                         | `/utils/backend.js` |
| `clientID`   | The Client ID of your Casdoor application                                                               | `/utils/backend.js` |
| `clientSecret` | The Client Secret of your Casdoor application | `/utils/backend.js` |

Then, configure the `appid` of the `project.config.json` file.

## How to run it

### Wechat Devtools

- Download the code.

    ```bash
    git clone https://github.com/casdoor/casdoor-wechat-miniprogram-example.git
    ```

- Open this example in your [wechat devtools](https://developers.weixin.qq.com/miniprogram/en/dev/devtools/download.html).

> The `updateUserinfo` function of the `userinfo` page needs to open the corresponding permission in Casdoor.
