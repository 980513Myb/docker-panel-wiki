# Docker-Panel Wiki

Docker-Panel Wiki 面向 NAS 与 Linux Docker 环境，覆盖服务导航、自动容器卡片、内外网地址编写、图标匹配、容器管理、Compose 项目、实时监控、备份升级与故障排查。

文档站基于 VitePress 与 Vue 构建。

## 本地预览

使用 Docker Compose：

```bash
docker-compose up -d
```

浏览器访问：

```text
http://127.0.0.1:888
```

也可以使用 Node.js 22 与 pnpm：

```bash
pnpm install
pnpm docs:dev
```

## GitHub Pages

仓库包含 GitHub Actions 工作流。推送到 `main` 分支后，GitHub Pages 会自动构建并发布 VitePress 站点。

## 群晖部署

如需在群晖 Container Manager 中独立运行 Wiki，请参考 `README-群晖部署.txt`。
