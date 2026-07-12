Docker-Panel Wiki 群晖部署说明

用途
----
本目录用于在群晖 Container Manager 中独立运行 Docker-Panel 中文 Wiki。
服务基于 Material for MkDocs，默认通过宿主机 888 端口访问。

目录结构
--------
请保持以下结构不变：

wiki-deploy/
  docker-compose.yml
  mkdocs.yml
  docs/
    index.md
    Installation.md
    ...

不要把 docs 目录中的文件单独移动到项目根目录。

部署步骤
--------
1. 将整个 wiki-deploy 文件夹上传到群晖，例如：
   /volume1/docker/wiki-deploy

2. 打开 Container Manager，进入“项目”，选择“新增”。

3. 项目名称填写：
   docker-panel-wiki

4. 路径选择上传后的 wiki-deploy 文件夹。

5. Container Manager 会读取该目录中的 docker-compose.yml。
   确认端口映射为：
   宿主机 888 -> 容器 8000

6. 创建并启动项目。

7. 局域网访问：
   http://群晖IP:888

反向代理建议
------------
如需通过群晖反向代理访问，目标建议填写：

协议：HTTP
主机名：127.0.0.1
端口：888

如果开放到公网，请启用 HTTPS，并限制来源或放在可信访问控制之后。
