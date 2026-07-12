# 备份与升级

<section class="dp-page-hero">
  <div class="dp-eyebrow">Maintenance</div>
  <h1>可回滚的维护流程</h1>
  <p>围绕数据目录、镜像版本和 Compose 项目建立升级前检查与回滚路径，降低面板维护风险。</p>
</section>

## 需要备份什么

最重要的是 `/app/data` 对应的宿主机目录。它包含 SQLite 数据库、上传资源和面板配置。

```bash
tar -czf docker-panel-data-$(date +%F).tar.gz /volume1/docker/docker-panel/data
```

Windows 或 NAS 图形界面也可以直接复制该目录，但复制前建议先停止容器，避免数据库正在写入。

## 升级面板

```bash
docker compose pull
docker compose down
docker compose up -d --force-recreate
```

升级后检查：

```bash
docker ps --filter name=docker-panel
docker logs --tail 100 docker-panel
```

## 回滚策略

如果升级后无法启动：

1. 停止新容器。
2. 恢复升级前的数据目录备份。
3. 将镜像标签切回上一个可用版本，或重新拉取此前镜像。
4. 使用 `docker compose up -d --force-recreate` 重建。

> 截图：任务记录 / 升级日志与结果

## 维护建议

- 重大升级前备份数据目录。
- 不要把数据目录放在临时目录或容器内部。
- 记录当前 `docker-compose.yml` 和镜像标签。
- 对外访问的面板先在低峰时间升级。
