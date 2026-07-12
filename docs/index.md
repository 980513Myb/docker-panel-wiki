<section class="dp-hero">
  <div class="dp-eyebrow">Docker Navigation & Management Console</div>
  <h1>Docker-Panel Wiki</h1>
  <p>Docker-Panel 是一个以 Docker 导航页为核心的可视化管理面板。它不是普通书签页，而是把容器发现、卡片生成、端口识别、内外网地址补全、图标匹配和 Docker 后台管理整合到一起。</p>
  <p>当你部署一个新容器后，面板可以自动发现它，自动新增导航卡片，自动识别映射端口，自动编写内网访问地址，并通过图标库匹配服务图标。你只需要补充少量个性化信息，就能把 Docker 服务从“刚部署”推进到“可访问、可展示、可管理”。</p>
  <div class="dp-actions">
    <a class="md-button md-button--primary" href="Installation/">开始安装</a>
    <a class="md-button" href="Usage/">查看使用教程</a>
  </div>
</section>

## 核心亮点

<div class="feature-grid">
  <div class="feature-card"><h3>自动新增容器卡片</h3><p>读取 Docker 容器、镜像、端口和运行状态，自动把可访问服务整理成导航卡片，省去逐个创建入口的重复操作。</p></div>
  <div class="feature-card"><h3>自动编写内外网地址</h3><p>根据宿主机端口、Host 网络和服务端口生成内网地址；同时支持外网地址维护和内外网访问切换。</p></div>
  <div class="feature-card"><h3>自动获取服务图标</h3><p>根据服务名称、镜像名称和图标库匹配图标，也可以手动上传或从图标库绑定，让导航卡片更直观。</p></div>
  <div class="feature-card"><h3>集成 Docker 面板</h3><p>容器、Compose、镜像、定时重启、更新检测与升级任务集中在同一个后台，不用频繁切换工具。</p></div>
  <div class="feature-card"><h3>后台可视化编辑</h3><p>卡片、背景、页面、标语时间、搜索、分组、代理、Docker 参数都可以在后台调整，适合 NAS 长期维护。</p></div>
  <div class="feature-card"><h3>解放手动维护</h3><p>新容器上线后自动进入整理流程，减少手动记录端口、复制地址、找图标、建卡片和改分组的时间。</p></div>
</div>

## 一条龙流程

<div class="dp-flow">
  <div><strong>发现容器</strong><span>通过 Docker Socket 读取容器列表、镜像、端口、网络、状态和 Compose 项目信息。</span></div>
  <div><strong>生成卡片</strong><span>根据容器与镜像信息生成导航卡片，并补全服务名称、分组、图标和状态。</span></div>
  <div><strong>补全地址</strong><span>自动识别映射端口，生成内网访问地址；需要远程访问时补充外网地址。</span></div>
  <div><strong>持续管理</strong><span>在 Docker 工作台里启动、停止、重启、更新、删除容器，并查看任务记录。</span></div>
</div>

> 截图：导航页 / 自动生成容器卡片总览

## 文档路线

1. [安装教程](Installation.md)：部署 Docker-Panel，完成首次管理员创建。
2. [使用教程](Usage.md)：完整了解导航页、自动化能力、Docker 面板和配置管理。
3. [故障自检](Troubleshooting.md)：遇到无法访问、无法识别、无法更新时按清单排查。
4. [版本日志](Changelog.md)：查看 Wiki 与功能说明的更新记录。
