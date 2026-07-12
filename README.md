# Docker-Panel Wiki

Docker-Panel Wiki，面向 NAS 与 Linux 单机 Docker 环境，覆盖安装部署、服务导航、容器管理、Compose 项目、自动地址、定时重启、外观配置、备份升级与故障排查。

## 本地预览

```bash
pip install mkdocs-material
mkdocs serve
```

默认访问：

```text
http://127.0.0.1:8000
```

## GitHub Pages

本仓库包含 GitHub Actions 工作流。推送到 `main` 分支后，GitHub Pages 会自动构建并发布 `docs` 目录中的 MkDocs 站点。

## 群晖部署

如需在群晖 Container Manager 中独立运行 Wiki，请参考 `README-群晖部署.txt`。
