# 故障排查

<section class="dp-page-hero">
  <div class="dp-eyebrow">Troubleshooting</div>
  <h1>定位启动、访问和任务问题</h1>
  <p>从容器状态、日志、端口、挂载和权限入手，快速判断问题位于部署、Docker API 还是应用配置。</p>
</section>

## 基础诊断命令

```bash
docker ps -a --filter name=docker-panel
docker logs --tail 120 docker-panel
docker inspect docker-panel --format '{{json .Config.Cmd}}'
```

## 无法访问面板

检查顺序：

1. 容器是否处于 `Up` 状态。
2. 端口映射是否正确，例如 `9527:9527`。
3. NAS 防火墙或安全套件是否放行端口。
4. 反向代理目标是否指向正确的主机与端口。

## Docker 操作失败

常见原因是 Docker Socket 挂载错误：

```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

不要为 Docker Socket 添加 `:ro`。面板需要通过它执行启动、停止、重启和升级等操作。

## Compose 项目无法保存

如果只能查看不能保存，通常是项目目录只读挂载：

```yaml
volumes:
  - /volume1/docker:/volume1/docker:ro
```

需要保存 YAML 或应用配置时，改为：

```yaml
volumes:
  - /volume1/docker:/volume1/docker:rw
```

## 日志出现 `pnpm: not found`

这通常表示 NAS 仍在使用旧缓存镜像，或 Compose 文件覆盖了镜像默认启动命令。处理方式：

```bash
docker image rm mouyanbin/docker-panel:latest
docker compose pull
docker compose up -d --force-recreate
```

同时确认 `docker-compose.yml` 没有配置 `command:` 或 `entrypoint:`。

## 数据丢失或配置消失

优先检查 `/app/data` 是否正确挂载到宿主机持久化目录。若数据目录变更，面板会像全新安装一样启动。

> 截图：故障排查 / 日志查看
