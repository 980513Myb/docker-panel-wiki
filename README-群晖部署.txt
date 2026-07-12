Docker-Panel Wiki 群晖部署说明

用途
----
本目录用于在群晖 Container Manager 中独立运行 Docker-Panel Wiki。
站点基于 VitePress 与 Vue 构建，默认通过宿主机 888 端口访问。

目录结构
--------
请保持整个仓库目录结构不变，关键文件包括：

docker-panel-wiki/
  docker-compose.yml
  package.json
  pnpm-lock.yaml
  docs/
    .vitepress/
    index.md
    Installation.md
    Usage.md
    Troubleshooting.md
    Changelog.md

不要只上传 docs 目录，否则容器无法安装依赖和启动预览服务。

部署步骤
--------
1. 将整个 docker-panel-wiki 文件夹上传到群晖，例如：
   /volume1/docker/docker-panel-wiki

2. 打开 Container Manager，进入“项目”，选择“新增”。

3. 项目名称填写：
   docker-panel-wiki

4. 路径选择上传后的 docker-panel-wiki 文件夹。

5. Container Manager 会读取 docker-compose.yml。确认端口映射为：
   宿主机 888 -> 容器 888

6. 首次启动会安装 VitePress 依赖，需要能够访问 npm 软件源。

7. 项目启动后，在局域网访问：
   http://群晖IP:888

反向代理建议
------------
目标协议：HTTP
目标主机：127.0.0.1
目标端口：888

如果开放到公网，请启用 HTTPS，并通过身份验证、VPN 或访问控制限制来源。
