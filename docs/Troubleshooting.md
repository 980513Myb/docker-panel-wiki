# 故障自检

<section class="dp-page-hero">
  <div class="dp-eyebrow">Self Check</div>
  <h1>按现象快速定位问题</h1>
  <p>如果面板打不开、容器没识别、卡片没生成、地址不正确或更新失败，先按本页顺序排查。</p>
</section>

## 面板无法访问

检查容器状态：

```bash
docker ps -a --filter name=docker-panel
docker logs --tail 120 docker-panel
```

重点确认：

- 容器是否 `Up`。
- 端口映射是否为 `9527:9527` 或你自定义的端口。
- NAS 防火墙是否放行端口。
- 反向代理是否指向正确地址。

## 无法读取 Docker 容器

检查 Docker Socket 挂载：

```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

不要加 `:ro`。只读挂载会导致发现、启动、停止、更新等操作异常。

## 没有自动新增容器卡片

按顺序检查：

1. 容器是否正在运行。
2. 容器是否有可访问端口。
3. 是否被加入隐藏容器。
4. 是否被分组或搜索条件过滤。
5. Docker Labels 是否把服务标记为隐藏。
6. 面板日志中是否有 Docker API 错误。

## 自动地址不正确

常见原因：

- 容器端口没有映射到宿主机。
- Host 网络服务监听端口不明确。
- 服务实际访问路径不是根路径。
- 反向代理域名需要手动填写外网地址。
- NAS IP 变更后没有更新配置。

建议先确认容器端口：

```bash
docker ps
```

## 图标没有自动匹配

可能原因：

- 服务名过于特殊。
- 镜像名无法匹配图标库。
- 图标源访问失败。
- 代理设置不正确。

处理方式：

- 在图标库中手动搜索。
- 上传自定义图标。
- 调整服务名称后重新匹配。
- 检查代理设置。

## Compose 项目无法编辑

如果能查看但不能保存，通常是目录只读挂载。

需要在线编辑 YAML 时使用：

```yaml
volumes:
  - /volume1/docker:/volume1/docker:rw
```

如果只需要查看，可以使用 `:ro`。

## 更新检测或升级失败

检查：

- 镜像仓库是否可访问。
- 网络或代理是否正常。
- 镜像名称是否正确。
- 容器是否正在运行关键任务。
- 数据目录是否持久化。

关键服务建议先手动备份，再执行升级。

## 数据或配置丢失

检查 `/app/data` 是否挂载到稳定宿主机目录。如果没有挂载，重建容器后配置会丢失。

推荐挂载：

```yaml
volumes:
  - /volume1/docker/docker-panel/data:/app/data
```

## 日志出现 `pnpm: not found`

通常是旧镜像缓存或 Compose 文件覆盖了启动命令。

处理：

```bash
docker image rm mouyanbin/docker-panel:latest
docker compose pull
docker compose up -d --force-recreate
```

同时确认 Compose 文件没有写 `command:` 或 `entrypoint:`。
