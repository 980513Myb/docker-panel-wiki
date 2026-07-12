# 安装教程

<section class="dp-page-hero">
  <div class="dp-eyebrow">Installation</div>
  <h1>部署 Docker-Panel</h1>
  <p>按本页完成部署后，面板即可读取 Docker 容器，进入自动生成导航卡片、自动补全地址和后台可视化管理流程。</p>
</section>

## 准备工作

| 项目 | 说明 |
| --- | --- |
| Docker 环境 | NAS 或 Linux 主机已安装 Docker。 |
| 面板数据目录 | 推荐 `/volume1/docker/docker-panel/data`，用于保存数据库、图标、背景和配置。 |
| Compose 项目目录 | 推荐 `/volume1/docker`，用于扫描和管理 Compose 项目。 |
| 会话密钥 | `SESSION_SECRET` 必须替换为随机长字符串。 |

## Docker Compose 部署

在项目目录中新建 `docker-compose.yml`：

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
      DOCKER_COMPOSE_ROOTS: /volume1/docker
    volumes:
      - /volume1/docker/docker-panel/data:/app/data
      - /var/run/docker.sock:/var/run/docker.sock
      - /volume1/docker:/volume1/docker:rw
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

首次访问会进入管理员创建页面。创建完成后进入 Docker-Panel 后台，面板会开始读取容器、镜像、端口和 Compose 项目信息。

> 截图：首次访问 / 管理员创建

## 挂载说明

| 挂载 | 是否必须 | 作用 |
| --- | --- | --- |
| `/app/data` | 必须 | 保存面板数据库、上传图标、背景和所有配置。 |
| `/var/run/docker.sock` | 必须 | 读取并管理 Docker 容器，不能只读挂载。 |
| `/volume1/docker:rw` | 推荐 | 扫描 Compose 项目；需要在线编辑 YAML 或重建项目时使用 `rw`。 |

## 验证安装

```bash
docker ps --filter name=docker-panel
docker logs --tail 100 docker-panel
```

确认容器处于 `Up` 状态，并且日志中没有数据库、Docker Socket 或端口占用错误。

## 安装后下一步

- 进入 [使用教程](Usage.md)，配置自动地址、图标、分组和导航卡片。
- 如果无法访问面板，进入 [故障自检](Troubleshooting.md) 按清单排查。
