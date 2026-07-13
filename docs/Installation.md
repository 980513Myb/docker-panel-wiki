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

在飞牛 NAS 的 Docker 项目目录中新建 `docker-compose.yml`。例如项目放在 `/vol1/1000/docker/docker-panel` 时，下面的 `./data` 会自动保存到该项目目录中的 `data` 文件夹：

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
      PORT: 9527
      DATABASE_URL: file:/app/data/panel.db
      SESSION_SECRET: change-this-to-a-long-random-value
      DOCKER_SOCKET: /var/run/docker.sock
      DOCKER_COMPOSE_ROOTS: /docker
    volumes:
      - ./data:/app/data
      - /var/run/docker.sock:/var/run/docker.sock
      - /vol1/1000/docker:/docker:rw
```

启动：

```bash
docker compose pull
docker compose up -d
```

!!! warning "必须修改 SESSION_SECRET"
    不要直接使用示例密钥。建议使用随机长字符串，并避免出现在截图、公开仓库或聊天记录中。

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

| 挂载 | 是否必须 | 作用 |
| --- | --- | --- |
| `./data:/app/data` | 必须 | 保存面板数据库、上传图标、背景和所有配置；`./data` 位于当前项目目录。 |
| `/var/run/docker.sock` | 必须 | 读取并管理 Docker 容器，不能只读挂载。 |
| `/vol1/1000/docker:/docker:rw` | 推荐 | 扫描 Compose 项目；需要在线编辑 YAML 或重建项目时使用 `rw`。如果你的项目不在该目录，只修改左侧的 NAS 实际路径即可。 |

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

Docker-Panel 当前完全免费提供使用。若它帮助你更轻松地管理 Docker 服务，欢迎自愿打赏开发者，感谢你的认可与支持。

<div class="dp-support-grid">
  <figure>
    <figcaption>支付宝</figcaption>
    <img src="/assets/wiki/support-alipay.jpg" alt="支付宝打赏二维码" />
  </figure>
  <figure>
    <figcaption>微信支付</figcaption>
    <img src="/assets/wiki/support-wechat.jpg" alt="微信支付打赏二维码" />
  </figure>
</div>
