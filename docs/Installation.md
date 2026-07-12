# 安装指南

<section class="dp-page-hero">
  <div class="dp-eyebrow">Deployment</div>
  <h1>安装 Docker-Panel</h1>
  <p>使用 Docker Compose 部署面板，并把数据、Docker Socket 与可选 Compose 项目目录挂载到容器中。</p>
</section>

## 部署前准备

- 一台已经安装 Docker 的 Linux / NAS 主机。
- 一个用于保存面板数据的持久化目录，例如 `/volume1/docker/docker-panel/data`。
- 一个足够长的随机 `SESSION_SECRET`，用于登录会话签名。
- 仅在需要在线编辑 Compose 文件时，才为项目目录使用可写挂载。

## Docker Compose 部署

在你的 Docker 项目目录创建 `docker-compose.yml`：

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

!!! warning "必须更换 SESSION_SECRET"
    示例中的 `SESSION_SECRET` 不能直接用于生产环境。请替换为长随机字符串，并避免出现在截图、公开仓库或共享文档中。

启动服务：

```bash
docker compose pull
docker compose up -d
```

访问 `http://NAS-IP:9527`，首次进入会打开管理员创建页面。完成账号设置后即可进入控制台。

> 截图：首次访问 / 管理员创建页面

## Docker Run 部署

适合快速验证或没有 Compose 管理习惯的环境：

```bash
docker pull mouyanbin/docker-panel:latest

docker run -d \
  --name docker-panel \
  --restart unless-stopped \
  -p 9527:9527 \
  -e NODE_ENV=production \
  -e PORT=9527 \
  -e DATABASE_URL=file:/app/data/panel.db \
  -e SESSION_SECRET=change-this-to-a-long-random-value \
  -e DOCKER_SOCKET=/var/run/docker.sock \
  -e DOCKER_COMPOSE_ROOTS=/volume1/docker \
  -v /volume1/docker/docker-panel/data:/app/data \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /volume1/docker:/volume1/docker:rw \
  mouyanbin/docker-panel:latest
```

## 挂载策略

| 挂载 | 建议 | 说明 |
| --- | --- | --- |
| `/app/data` | 必须 | 保存 SQLite 数据库、上传资源与面板配置。 |
| `/var/run/docker.sock` | 必须 | 面板发现和管理 Docker 的控制入口，不能只读挂载。 |
| Compose 项目目录 | 可选 | 只查看可使用 `:ro`；需要保存 YAML 或重建项目时使用 `:rw`。 |

## 验证结果

```bash
docker ps --filter name=docker-panel
docker logs --tail 80 docker-panel
```

确认容器处于 `Up` 状态，并且日志中没有数据库、Socket 或端口占用错误。

!!! tip "端口调整"
    只需要修改映射左侧即可，例如 `8080:9527` 表示宿主机通过 `8080` 访问，容器内部仍监听 `9527`。
