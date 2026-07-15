---
title: 安装教程
next:
  text: 使用教程
  link: /Usage
---

<section class="dp-page-hero">
  <div class="dp-eyebrow">Installation</div>
  <h1>部署 Docker-Panel</h1>
  <p>按本页完成部署后，面板即可读取 Docker 容器，进入自动生成导航卡片、自动补全地址和后台可视化管理流程。</p>
</section>

## 准备工作

| 项目 | 说明 |
| --- | --- |
| Docker 环境 | 飞牛 NAS 已安装并启用 Docker。 |
| 面板数据目录 | 使用项目目录下的 `./data`，用于保存数据库、图标、背景和配置。 |
| Compose 项目目录 | 飞牛常用 Docker 目录为 `/vol1/1000/docker`，用于扫描和管理 Compose 项目。 |
| 会话密钥 | `SESSION_SECRET` 必须替换为随机长字符串。 |

## Docker Compose 部署

在飞牛 NAS 的 Docker 项目目录中新建 `docker-compose.yml`。以下示例将面板数据固定保存到 `/vol1/1000/docker/docker-panel/data`：

```yaml
services:
  panel:
    image: mouyanbin/docker-panel:latest
    pull_policy: always
    container_name: docker-panel
    restart: unless-stopped
    ports:
      - "9527:9527"
    environment:
      NODE_ENV: production
      PORT: "9527"
      DATABASE_URL: "file:/app/data/panel.db"

      # 必须修改，升级时保持不变
      SESSION_SECRET: "请替换成至少32位的随机字符串"

      DOCKER_SOCKET: "/var/run/docker.sock"
      DOCKER_COMPOSE_ROOTS: "/vol1/1000/docker"
    volumes:
      # 面板数据库及配置
      - /vol1/1000/docker/docker-panel/data:/app/data

      # Docker 管理权限
      - /var/run/docker.sock:/var/run/docker.sock

      # 飞牛 Compose 项目根目录
      - /vol1/1000/docker:/vol1/1000/docker:rw
```

启动：

```bash
docker compose pull
docker compose up -d
```

::: warning 必须修改 SESSION_SECRET
请将 `SESSION_SECRET` 替换为至少 32 位随机字符串。不要直接使用示例密钥，也不要将真实密钥公开在截图、仓库或聊天记录中。
:::

## Docker Run 部署

不使用 Compose 时，也可以直接执行以下命令部署。首次使用前请修改 `SESSION_SECRET`：

```bash
docker run -d \
  --name docker-panel \
  --restart unless-stopped \
  --pull always \
  -p 9527:9527 \
  -e NODE_ENV=production \
  -e PORT=9527 \
  -e DATABASE_URL=file:/app/data/panel.db \
  -e SESSION_SECRET='请替换成至少32位的随机字符串' \
  -e DOCKER_SOCKET=/var/run/docker.sock \
  -e DOCKER_COMPOSE_ROOTS=/vol1/1000/docker \
  -v /vol1/1000/docker/docker-panel/data:/app/data \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /vol1/1000/docker:/vol1/1000/docker:rw \
  mouyanbin/docker-panel:latest
```

## ARM64 Compose 部署

适用于 Apple Silicon Mac、ARM64 NAS 或其他 ARM64 Docker 主机。将以下内容保存为 `docker-compose.yml` 后，在该文件所在目录执行 `docker compose up -d`。

```yaml
services:
  panel:
    image: mouyanbin/docker-panel:latest
    platform: linux/arm64
    pull_policy: always
    container_name: docker-container-panel
    restart: unless-stopped

    ports:
      - "9527:9527"

    environment:
      NODE_ENV: production
      PORT: 9527
      DATABASE_URL: file:/app/data/panel.db
      INITIAL_ADMIN_USERNAME: admin
      INITIAL_ADMIN_PASSWORD: password
      SESSION_SECRET: "请替换成至少32位的随机字符串"
      DOCKER_SOCKET: /var/run/docker.sock
      AGENT_REQUIRE_HTTPS: "false"
      DOCKER_COMPOSE_ROOTS: "/Users/你的Mac用户名/docker"

    volumes:
      - panel-data:/app/data
      - /var/run/docker.sock:/var/run/docker.sock
      - /Users/你的Mac用户名/docker:/Users/你的Mac用户名/docker:rw

volumes:
  panel-data:
```

::: warning ARM64 部署注意事项
- `platform: linux/arm64` 仅用于 ARM64 主机；Intel/AMD64 主机请删除该行或改为 `linux/amd64`。
- 将 `/Users/你的Mac用户名/docker` 替换为主机实际的 Compose 项目根目录，`DOCKER_COMPOSE_ROOTS` 与 `volumes` 中的路径必须完全一致。该目录未正确挂载时，面板无法扫描、编辑或删除 Compose 项目文件。
- `INITIAL_ADMIN_USERNAME`、`INITIAL_ADMIN_PASSWORD` 和 `SESSION_SECRET` 应在首次启动前改为自己的安全值；首次初始化完成后，修改这两个初始账号变量不会重置已有管理员账户。
- `AGENT_REQUIRE_HTTPS: "false"` 仅适合本地或受信任内网中允许 HTTP 的 Agent 接入。通过公网或反向代理部署时，建议配置 HTTPS 并移除该项或设为 `true`。
- `panel-data` 是 Docker 命名卷，保存数据库和面板配置。迁移或备份时请同时备份该卷。
:::

## 首次进入

浏览器访问：

```text
http://NAS-IP:9527
```

首次进入后使用默认管理员账户登录：

| 项目 | 默认值 |
| --- | --- |
| 账户 | `admin` |
| 密码 | `password` |

登录 Docker-Panel 后台后，面板会开始读取容器、镜像、端口和 Compose 项目信息。建议登录后尽快修改默认密码，避免长期使用公开默认密码。

![首次访问 / 默认管理员登录](/assets/wiki/first-login.png)

## 挂载说明

| 挂载 / 配置 | 是否必须 | 作用 |
| --- | --- | --- |
| `/vol1/1000/docker/docker-panel/data:/app/data` | 必须 | 保存面板数据库、上传图标、背景和所有配置；不挂载时，重建容器会丢失这些数据。 |
| `/var/run/docker.sock` | 必须 | 读取并管理 Docker 容器，不能只读挂载。 |
| `/vol1/1000/docker:/vol1/1000/docker:rw` | 推荐 | 将 NAS 中的 Compose 项目目录映射进容器，用于扫描项目；需要在线编辑 YAML 或重建项目时使用 `rw`。 |
| `DOCKER_COMPOSE_ROOTS: "/vol1/1000/docker"` | 推荐 | 用于让面板定位 Compose 项目文件。若未填写、路径错误或没有对应挂载，面板无法扫描、查看、在线编辑，也无法删除对应的 Compose 项目文件。 |

## 验证安装

```bash
docker ps --filter name=docker-panel
docker logs --tail 100 docker-panel
```

确认容器处于 `Up` 状态，并且日志中没有数据库、Docker Socket 或端口占用错误。

## 安装后下一步

- 进入 [使用教程](Usage.md)，配置自动地址、图标、分组和导航卡片。
- 如果无法访问面板，进入 [故障自检](Troubleshooting.md) 按清单排查。

## Telegram 频道

获取 Docker-Panel 的版本更新、功能公告和使用交流信息：

[加入 Docker-Panel Telegram 频道](https://t.me/+w2PSTtftX4A4NGY9)

## 支持开发

Docker-Panel 当前完全免费提供使用，也承诺以后永久免费使用，不收取任何费用。若它帮助你更轻松地管理 Docker 服务，欢迎自愿打赏开发者，感谢你的认可与支持。

<div class="dp-support-grid">
  <figure>
    <figcaption>支付宝</figcaption>
    <img src="/assets/wiki/support-alipay-qr-v2.png" alt="支付宝打赏二维码" />
  </figure>
  <figure>
    <figcaption>微信支付</figcaption>
    <img src="/assets/wiki/support-wechat-qr-v2.png" alt="微信支付打赏二维码" />
  </figure>
</div>
