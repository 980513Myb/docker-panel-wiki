# NAS 部署

<section class="dp-page-hero">
  <div class="dp-eyebrow">NAS Operation</div>
  <h1>在 NAS 上运行 Docker-Panel</h1>
  <p>针对群晖、飞牛、极空间、绿联和通用 Linux NAS，重点处理路径、权限、Compose 项目发现和反向代理。</p>
</section>

## 推荐目录

| 用途 | 群晖示例 | 说明 |
| --- | --- | --- |
| 面板数据 | `/volume1/docker/docker-panel/data` | 保存数据库和上传资源。 |
| Compose 项目根目录 | `/volume1/docker` | 用于扫描已有 Compose 项目。 |
| Wiki 部署目录 | `/volume1/docker/wiki-deploy` | 仅用于独立部署本文档站。 |

其他 NAS 请替换为设备上的真实 Docker 项目路径。关键原则是：宿主机路径与容器内挂载路径尽量保持一致，避免相对路径无法解析。

## 群晖 Container Manager

1. 在共享文件夹中创建 `docker/docker-panel`。
2. 将 `docker-compose.yml` 放入项目目录。
3. 在 Container Manager 中选择“项目”并导入该目录。
4. 创建前检查 `SESSION_SECRET`、端口映射和卷挂载路径。
5. 启动后访问 `http://群晖IP:9527`。

> 截图：群晖 Container Manager / 项目创建

## Compose 项目发现

如需让面板识别没有运行容器的 Compose 项目，请配置：

```yaml
environment:
  DOCKER_COMPOSE_ROOTS: /volume1/docker
volumes:
  - /volume1/docker:/volume1/docker:ro
```

需要在线编辑 Compose 文件时改为：

```yaml
volumes:
  - /volume1/docker:/volume1/docker:rw
```

!!! info "只读优先"
    如果只是查看项目和管理现有容器，建议使用 `:ro`。只有明确需要保存 YAML、应用配置或重建项目时，再使用 `:rw`。

## 反向代理建议

- 反向代理目标协议使用 `HTTP`。
- 目标主机填写 NAS 内网 IP 或 `127.0.0.1`。
- 目标端口填写宿主机映射端口，默认 `9527`。
- 面板属于高权限后台，不建议直接开放到公网。

!!! danger "公网暴露风险"
    Docker-Panel 可以通过 Docker Socket 操作宿主机容器。即使使用反向代理，也应限制来源、启用 HTTPS，并优先放在 VPN、内网穿透访问控制或可信局域网中。
