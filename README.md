# 微信公众号服务端

用于微信公众号登录验证、Access Token 管理和自定义菜单的 Go 服务端，内置 React 管理界面。

当前版本：`v0.1.6`

## 功能

- 微信 `Access Token` 自动刷新，并提供受令牌保护的查询接口。
- 微信公众号自定义菜单管理。
- 微信登录验证：用户发送“验证码”，或点击菜单中的“登录验证”，均会收到六位验证码。
- 可选 Redis 会话存储和 MySQL 数据库；默认使用 SQLite。
- 现代化响应式管理控制台，支持桌面端固定侧栏和移动端抽屉菜单。
- 运行概览集中展示服务状态、系统名称、启动时间、版本及核心配置状态。
- 用户管理、微信配置和系统设置采用统一的卡片、表格与表单设计。

## 管理控制台

`v0.1.6` 对内置 React 管理界面进行了整体重构：

- 首页由项目介绍页调整为运行概览仪表盘。
- 顶部显示当前用户、通知入口和退出操作，刷新页面后仍可恢复用户信息。
- 左侧菜单提供运行概览、用户管理和系统设置入口，并根据账号权限显示管理功能。
- 登录、注册、密码重置和 GitHub OAuth 页面使用独立布局，不显示后台侧栏。
- 概览信息直接读取 `/api/status` 返回的真实服务状态，不依赖静态演示数据。
- 管理页面统一使用绿色品牌色、圆角卡片、轻量阴影和响应式布局。

在源码部署或 Docker 部署中，前端会在构建阶段生成并嵌入 Go 可执行文件。修改 `web/src` 后必须重新执行前端和后端构建，仅上传源文件不会更新正在运行的界面。

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
