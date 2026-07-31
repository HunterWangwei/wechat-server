# 微信公众号服务端

用于微信公众号登录验证、Access Token 管理和自定义菜单的 Go 服务端，内置 React 管理界面。

当前版本：`v0.1.3`

## 功能

- 微信 `Access Token` 自动刷新，并提供受令牌保护的查询接口。
- 微信公众号自定义菜单管理。
- 微信登录验证：用户发送“验证码”，或点击菜单中的“登录验证”，均会收到六位验证码。
- 可选 Redis 会话存储和 MySQL 数据库；默认使用 SQLite。

## 快速部署（Ubuntu）

从 [Releases](https://github.com/HunterWangwei/wechat-server/releases) 下载对应的 `wechat-server` 文件后：

```bash
chmod +x wechat-server
mkdir -p logs
./wechat-server --port 3000 --log-dir ./logs
```

访问 `http://服务器IP:3000`。首次登录账号为 `root`，密码为 `123456`；请登录后立即修改密码。

如果需要从源码构建：

```bash
# 构建前端
cd web
npm install
npm run build

# 构建后端
cd ..
go mod download
go build -ldflags "-s -w" -o wechat-server
```

## Docker 部署

```bash
docker build -t wechat-server .
docker run -d --name wechat-server --restart always \
  -p 3000:3000 \
  -v "$(pwd)/data:/data" \
  wechat-server
```

## 微信公众号配置

在公众号后台“基本配置”中填写：

- URL：`https://你的域名/api/wechat`
- Token：与本服务管理后台设置的 Token 保持一致
- EncodingAESKey：在公众号后台生成后，填写至本服务管理后台
- 消息加解密方式：选择“明文模式”

默认菜单可配置为：

```json
{
  "button": [
    {
      "type": "click",
      "name": "登录验证",
      "key": "USER_VERIFICATION"
    }
  ]
}
```

点击“登录验证”会直接返回验证码。

## 环境变量

- `REDIS_CONN_STRING`：启用 Redis，例如 `redis://default:redispw@localhost:49153`
- `SESSION_SECRET`：固定会话密钥
- `SQL_DSN`：使用 MySQL 替代 SQLite，例如 `root:123456@tcp(localhost:3306)/wechat_server`

## API

以下接口需要在请求头中设置 `Authorization: <token>`。

- `GET /api/wechat/access_token`：获取微信公众号 Access Token。
- `GET /api/wechat/user?code=<code>`：通过验证码查询对应微信用户 ID。

## 更新日志

详见 [CHANGELOG.md](CHANGELOG.md)。
