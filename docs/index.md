<section class="dp-hero">
  <div class="dp-eyebrow">NAS / Linux Docker Console</div>
  <h1>Docker-Panel 中文 Wiki</h1>
  <p>面向单机 Docker 与 NAS 环境的控制台文档。这里整理了部署、服务导航、容器生命周期、Compose 项目、自动地址、任务记录与安全运维的完整路径。</p>
  <div class="dp-actions">
    <a class="md-button md-button--primary" href="Installation/">开始部署</a>
    <a class="md-button" href="Navigation/">查看能力</a>
  </div>
</section>

<section class="dp-metrics">
  <div><strong>9527</strong><span>默认面板端口</span></div>
  <div><strong>SQLite</strong><span>本地持久化</span></div>
  <div><strong>Docker Socket</strong><span>容器控制入口</span></div>
  <div><strong>Compose</strong><span>项目级管理</span></div>
</section>

## 控制台能力矩阵

<div class="feature-grid">
  <div class="feature-card"><h3>服务导航</h3><p>从容器、标签和端口推断服务入口，统一维护内网地址、外网地址、分组、图标和隐藏状态。</p></div>
  <div class="feature-card"><h3>容器生命周期</h3><p>集中执行启动、停止、重启、删除、镜像拉取和容器升级，并通过任务记录跟踪过程。</p></div>
  <div class="feature-card"><h3>Compose 项目</h3><p>按项目查看服务状态，支持读取 Compose 文件；可写挂载时可保存 YAML 并重建项目。</p></div>
  <div class="feature-card"><h3>自动地址</h3><p>基于映射端口、Host 网络和主机地址生成服务 URL，减少重复维护成本。</p></div>
  <div class="feature-card"><h3>计划任务</h3><p>为指定容器配置定时重启策略，适合需要周期性释放资源或恢复状态的服务。</p></div>
  <div class="feature-card"><h3>安全部署</h3><p>明确 Docker Socket、会话密钥、反向代理和访问边界，避免把高权限入口暴露到公网。</p></div>
</div>

## 推荐阅读路径

1. 阅读 [安装指南](Installation.md)，准备持久化目录、会话密钥和 Docker Socket 挂载。
2. 针对群晖或其他 NAS，参考 [NAS 部署](NAS-Installation.md) 调整路径、项目目录和权限。
3. 完成首次管理员创建后，进入 [导航页使用](Navigation.md) 与 [容器管理](Container-Management.md) 配置核心工作流。
4. 需要批量补全服务入口时，继续配置 [自动地址](Automatic-Address.md)。
5. 上线前阅读 [配置说明](Configuration.md)、[备份与升级](Backup-and-Upgrade.md) 和 [故障排查](Troubleshooting.md)。

> 截图：控制台首页 / 服务导航总览

!!! danger "安全边界"
    Docker-Panel 挂载 `/var/run/docker.sock` 后拥有较高 Docker 控制权限。建议仅部署在可信局域网、VPN 或受访问控制保护的反向代理后，并为 `SESSION_SECRET` 和管理员密码使用高强度随机值。
