# 配置说明

<section class="dp-page-hero">
  <div class="dp-eyebrow">Configuration</div>
  <h1>运行参数与挂载</h1>
  <p>集中说明环境变量、持久化目录、Docker 标签和运行参数，便于部署前逐项核对。</p>
</section>

## 环境变量

| 变量 | 默认值 | 用途 |
| --- | --- | --- |
| `NODE_ENV` | `development` | 容器部署应设置为 `production`。 |
| `PORT` | `9527` | 面板容器内部监听端口。 |
| `DATABASE_URL` | `file:./dev.db` | SQLite 地址；生产环境建议使用 `file:/app/data/panel.db`。 |
| `SESSION_SECRET` | 开发占位值 | 登录会话签名密钥，生产环境必须替换。 |
| `DOCKER_SOCKET` | `/var/run/docker.sock` | Docker API Socket 路径。 |
| `DOCKER_COMPOSE_ROOTS` | 空 | 扫描 Compose 项目的根目录，多个路径按运行时约定配置。 |
| `DOCKER_PANEL_HOST_PATH_MAP` | 空 | 宿主机路径与容器内挂载路径的映射。 |

## 数据与权限

- `/app/data`：保存数据库、上传图标、背景和面板配置，必须持久化。
- `/var/run/docker.sock`：容器控制入口，面板需要完整读写能力。
- Compose 项目目录：只读挂载可查看；可写挂载可保存 YAML 并执行项目重建。

## Docker Labels

容器标签优先于自动推断，适合为服务提供稳定展示信息：

```yaml
labels:
  panel.name: "服务名称"
  panel.group: "默认分组"
  panel.icon: "https://example.com/icon.png"
  panel.internal_url: "http://192.168.1.10:8080"
  panel.external_url: "https://service.example.com"
  panel.hidden: "false"
```

没有标签时，面板会根据容器名称、镜像名称和端口信息推断卡片。
