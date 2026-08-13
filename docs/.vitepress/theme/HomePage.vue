<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  CircleGauge,
  Cpu,
  Database,
  ExternalLink,
  Globe2,
  HardDrive,
  Image,
  Layers3,
  Menu,
  Network,
  Pencil,
  Radar,
  RefreshCw,
  ServerCog,
  Sparkles,
  Terminal,
  X
} from '@lucide/vue'

type ConsoleMode = 'automation' | 'monitoring' | 'agent'

const consoleMode = ref<ConsoleMode>('automation')
const mobileMenuOpen = ref(false)
const activeStep = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const base = (path: string) => withBase(path)
const consoleTitle = computed(() => {
  if (consoleMode.value === 'automation') return '自动化流程'
  if (consoleMode.value === 'monitoring') return '实时容器卡片监控'
  return 'Agent 多节点管理'
})

const navItems = [
  { label: '安装教程', href: '/Installation' },
  { label: '使用教程', href: '/Usage' },
  { label: '故障自检', href: '/Troubleshooting' },
  { label: '版本日志', href: '/Changelog' }
]

const flowSteps = [
  { id: '01', title: '发现容器', detail: '同步本机与 Agent 节点的名称、镜像、网络、状态和映射端口。', icon: Radar },
  { id: '02', title: '自动创建容器卡片', detail: '新容器建立，自动检测后按容器名称命名，进入预设分组。', icon: Layers3 },
  { id: '03', title: '自动编写内外网访问地址', detail: '按预设内外网地址拼接端口，自动写入内外网访问地址。', icon: Network },
  { id: '04', title: '匹配图标', detail: '结合服务名、镜像与地址自动获取对应图标。', icon: Image },
  { id: '05', title: '直接使用', detail: '容器上线即可点击访问，后续仍可在后台可视化编辑。', icon: Check }
]

const capabilities = [
  { title: 'Docker 服务导航', text: '以服务卡片统一承载访问入口、运行状态、资源信息和内外网访问策略。', icon: Globe2, tone: 'cyan' },
  { title: '自动新增容器卡片', text: '发现新容器后自动创建卡片，减少重复录入、分类和维护工作。', icon: Sparkles, tone: 'green' },
  { title: '内外网地址自动编写', text: '读取宿主机映射端口，自动生成带端口的内网地址与外网地址。', icon: Network, tone: 'blue' },
  { title: '后端可视化管理', text: '集中管理容器、Compose 项目、镜像、更新任务和定时重启。', icon: ServerCog, tone: 'amber' },
  { title: '实时资源监控', text: '实时刷新容器状态、CPU、内存、端口和运行时间，快速判断服务健康度。', icon: Activity, tone: 'cyan' },
  { title: '内外网智能切换', text: '支持自动、内网、外网三种访问模式；自动模式会根据当前网络环境选择对应访问地址。', icon: Network, tone: 'green' },
  { title: 'Agent 多节点管理', text: '接入远程 VPS 与 Docker 服务器，在同一面板统一查看节点、容器状态和资源。', icon: Database, tone: 'blue' },
  { title: '图标自动匹配', text: '根据容器名称、镜像名称与访问地址自动获取服务图标；未匹配时也可在后台手动替换。', icon: Image, tone: 'cyan' },
  { title: 'SSH 终端管理', text: '集中保存主机 SSH 连接，直接建立终端会话执行命令、浏览远程文件，并同步查看主机资源状态。', icon: Terminal, tone: 'amber' }
]

onMounted(() => {
  timer = setInterval(() => {
    activeStep.value = (activeStep.value + 1) % flowSteps.length
  }, 2200)
})

onBeforeUnmount(() => timer && clearInterval(timer))
</script>

<template>
  <div class="dp-site">
    <header class="dp-site-nav">
      <a class="dp-brand" :href="base('/')" aria-label="Docker-Panel 首页">
        <img :src="base('/assets/brand-logo.png')" alt="Docker-Panel" />
        <span>Docker-Panel</span>
        <small>WIKI</small>
      </a>

      <nav class="dp-desktop-nav" aria-label="主导航">
        <a v-for="item in navItems" :key="item.href" :href="base(item.href)">{{ item.label }}</a>
      </nav>

      <div class="dp-nav-actions">
        <a class="dp-icon-link" href="https://github.com/980513Myb/docker-panel-wiki" target="_blank" rel="noreferrer" aria-label="GitHub">
          <ExternalLink :size="18" />
        </a>
        <a class="dp-nav-cta" :href="base('/Installation')">开始部署 <ArrowRight :size="16" /></a>
        <button class="dp-menu-button" type="button" aria-label="打开菜单" @click="mobileMenuOpen = !mobileMenuOpen">
          <X v-if="mobileMenuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </header>

    <nav v-if="mobileMenuOpen" class="dp-mobile-nav" aria-label="移动端导航">
      <a v-for="item in navItems" :key="item.href" :href="base(item.href)">{{ item.label }} <ChevronRight :size="16" /></a>
    </nav>

    <main>
      <section class="dp-stage">
        <div class="dp-stage-grid" aria-hidden="true"></div>
        <div class="dp-stage-copy">
          <div class="dp-status-chip"><span></span> Docker Navigation & Management Console</div>
          <h1>让 Docker 服务<br /><em>上线即可访问</em></h1>
          <p class="dp-stage-lead">Docker-Panel 是以服务导航为核心，集成 Docker 面板与 Agent 多节点管理的一体化工具。本机 NAS、远程 VPS 与多台 Docker 服务器都能在同一工作台统一管理。</p>
          <p class="dp-stage-sub">新容器上线后，自动生成导航卡片、识别端口、编写内外网地址并获取图标；节点容器可按预设地址与分组自动加入导航页，最大化减少手动编辑操作。</p>
          <div class="dp-stage-actions">
            <a class="dp-primary-action" :href="base('/Installation')">开始安装 <ArrowRight :size="18" /></a>
            <a class="dp-text-action" :href="base('/Usage')">查看完整功能 <ChevronRight :size="17" /></a>
          </div>
        </div>

        <div :key="consoleMode" class="dp-live-console">
          <div class="dp-console-head">
            <div class="dp-window-mark"><i></i><i></i><i></i></div>
            <div class="dp-console-title"><span>DP / CONTROL</span><strong>{{ consoleTitle }}</strong></div>
            <div class="dp-live-indicator"><span></span> LIVE</div>
          </div>

          <div class="dp-console-tabs" role="tablist" aria-label="控制台视图">
            <button type="button" :class="{ active: consoleMode === 'automation' }" @click="consoleMode = 'automation'">自动接管</button>
            <button type="button" :class="{ active: consoleMode === 'monitoring' }" @click="consoleMode = 'monitoring'">实时监控</button>
            <button type="button" :class="{ active: consoleMode === 'agent' }" @click="consoleMode = 'agent'">Agent 节点</button>
          </div>

          <div v-if="consoleMode === 'automation'" class="dp-provision-view">
            <div class="dp-event-stream">
              <div class="dp-event-stream__head"><span>自动化事件流</span><small>刚刚</small></div>
              <div v-for="(step, index) in flowSteps.slice(0, 4)" :key="step.id" class="dp-event" :class="{ active: activeStep % 4 === index }">
                <component :is="step.icon" :size="17" />
                <div><strong>{{ step.title }}</strong><small>{{ index === 0 ? '自动检测新建立容器' : step.detail }}</small></div>
                <Check v-if="activeStep % 4 > index" :size="15" />
                <span v-else-if="activeStep % 4 === index" class="dp-event-pulse"></span>
              </div>
            </div>
            <div class="dp-generated-card">
              <div class="dp-generated-card__top"><img :src="base('/assets/brand-logo.png')" alt="Docker-Panel" /><span>NEW</span></div>
              <strong>docker panel</strong>
              <p>your nas ip:9527</p>
              <div class="dp-address-lines"><span></span><span></span></div>
              <small><Check :size="13" /> 卡片已就绪</small>
            </div>
          </div>

          <div v-else-if="consoleMode === 'monitoring'" class="dp-monitor-view">
            <div class="dp-monitor-metrics">
              <div><Cpu :size="18" /><span>CPU</span><strong>12.4%</strong><i style="--value: 42%"></i></div>
              <div><Database :size="18" /><span>MEMORY</span><strong>1.82 GB</strong><i style="--value: 58%"></i></div>
              <div><HardDrive :size="18" /><span>STORAGE</span><strong>38.6 GB</strong><i style="--value: 31%"></i></div>
            </div>
            <div class="dp-service-table">
              <div class="dp-service-table__head"><span>容器</span><span>状态</span><span>CPU</span><span>内存</span></div>
              <div><span><i class="is-green"></i> docker-panel</span><span>运行中</span><span>2.8%</span><span>286 MB</span></div>
              <div><span><i class="is-amber"></i> jellyfin</span><span>错误</span><span>0%</span><span>0 MB</span></div>
              <div><span><i class="is-red"></i> uptime-kuma</span><span>已停止</span><span>0%</span><span>0 MB</span></div>
            </div>
          </div>

          <div v-else class="dp-agent-view">
            <div class="dp-agent-metrics">
              <div><Database :size="18" /><span>NODES</span><strong>3</strong><small>已接入</small></div>
              <div><Activity :size="18" /><span>ONLINE</span><strong>2</strong><small>实时连接</small></div>
              <div><Network :size="18" /><span>CONTAINERS</span><strong>28</strong><small>跨节点同步</small></div>
            </div>
            <div class="dp-agent-list">
              <div class="dp-agent-list__head"><span>Agent 节点</span><span>状态</span><span>CPU</span><span>内存</span><span>上传</span><span>下载</span></div>
              <div><span><i class="is-green"></i><b>阿里云 VPS</b><small>远程 Docker 节点</small></span><em data-label="状态">在线</em><code data-label="CPU">2.8%</code><code data-label="内存">684 MB</code><code data-label="上传">598 B/s</code><code data-label="下载">348 B/s</code></div>
              <div><span><i class="is-green"></i><b>家庭 NAS</b><small>本地容器面板</small></span><em data-label="状态">在线</em><code data-label="CPU">6.1%</code><code data-label="内存">1.42 GB</code><code data-label="上传">1.2 KB/s</code><code data-label="下载">5.6 KB/s</code></div>
              <div><span><i class="is-amber"></i><b>备用节点</b><small>等待连接</small></span><em class="is-waiting" data-label="状态">离线</em><code data-label="CPU">0%</code><code data-label="内存">0 MB</code><code data-label="上传">0 B/s</code><code data-label="下载">0 B/s</code></div>
            </div>
          </div>

          <div class="dp-console-foot">
            <span><CircleGauge :size="14" /> Docker connected</span>
            <span>Last sync 00:03</span>
          </div>
        </div>

        <div class="dp-stage-proof">
          <span>自动发现</span><i></i><span>自动建卡</span><i></i><span>地址编写</span><i></i><span>图标匹配</span><i></i><span>可视化管理</span>
        </div>
      </section>

      <section class="dp-flow-section">
        <header class="dp-section-intro">
          <span>01 / AUTOMATION</span>
          <h2>预设一次，后续自动接管</h2>
          <p>Docker-Panel 读取容器运行信息，把“新服务上线”自动整理为“可直接点击的导航入口”。</p>
        </header>

        <div class="dp-flow-track">
          <article v-for="(step, index) in flowSteps" :key="step.id" :class="{ active: activeStep === index }" @mouseenter="activeStep = index">
            <div class="dp-flow-number">{{ step.id }}</div>
            <component :is="step.icon" :size="22" />
            <h3>{{ step.title }}</h3>
            <p>{{ step.detail }}</p>
            <span class="dp-flow-signal"></span>
          </article>
        </div>

        <div class="dp-automation-note">
          <div><RefreshCw :size="20" /><strong>自动地址是关键环节</strong></div>
          <p>可根据预设的内网地址与外网地址，自动读取新容器的宿主机映射端口，生成带端口的访问链接并写入对应卡片，自动获取图标。<br />新容器加入后无需手动复制端口、拼接地址或逐个修改卡片。</p>
        </div>
      </section>

      <section class="dp-capabilities-section">
        <header class="dp-section-intro dp-section-intro--light">
          <span>02 / CAPABILITIES</span>
          <h2>导航与管理，在同一个工作台完成</h2>
          <p>前端负责快捷导航，容器面板实时查看。<br />后端负责 Docker 管理编辑。<br />一个容器，双项使用。</p>
        </header>

        <div class="dp-capability-grid">
          <article v-for="(item, index) in capabilities" :key="item.title" :class="`tone-${item.tone}`">
            <div class="dp-capability-icon"><component :is="item.icon" :size="23" /></div>
            <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </article>
        </div>
      </section>

      <section class="dp-screenshot-section">
        <div class="dp-screenshot-copy">
          <span>03 / PRODUCT VIEW</span>
          <h2>导航页与容器卡片总览</h2>
          <p>前端导航页集中展示服务入口、分组、运行状态与资源信息，让常用 Docker 服务一眼可见。</p>
          <div><Check :size="15" /> 服务卡片按分组统一整理</div>
          <div><Check :size="15" /> 容器状态与资源信息实时呈现</div>
        </div>
        <div class="dp-screenshot-frame">
          <div class="dp-screenshot-frame__bar"><i></i><i></i><i></i><span>DOCKER-PANEL / NAVIGATION</span></div>
          <img class="dp-screenshot-image" :src="base('/assets/wiki/navigation-overview.png')" alt="Docker-Panel 导航页与容器卡片总览" />
        </div>
      </section>

      <section class="dp-screenshot-section dp-screenshot-section--backend">
        <div class="dp-screenshot-frame">
          <div class="dp-screenshot-frame__bar"><i></i><i></i><i></i><span>DOCKER-PANEL / WORKBENCH</span></div>
          <img class="dp-screenshot-image" :src="base('/assets/wiki/container-workbench-v2.png')" alt="Docker-Panel 后端容器管理工作台" />
        </div>
        <div class="dp-screenshot-copy">
          <span>04 / CONTAINER WORKBENCH</span>
          <h2>后端容器编辑与管理</h2>
          <p>在 Docker 工作台集中查看容器状态、镜像、端口与资源占用，并完成日常容器维护与编辑。</p>
          <div><Check :size="15" /> 启动、停止、重启与删除容器</div>
          <div><Check :size="15" /> 管理 Compose、镜像、更新与定时重启</div>
        </div>
      </section>

      <section class="dp-screenshot-section dp-screenshot-section--agent">
        <div class="dp-screenshot-copy">
          <span>05 / AGENT NODES</span>
          <h2>Agent 多节点管理</h2>
          <p>将远程 VPS、NAS 或其他 Docker 服务器作为 Agent 节点接入，在同一面板实时查看节点 CPU、内存、磁盘占用、上传下载流量与节点容器。</p>
          <div><Check :size="15" /> 多台服务器统一接入，不暴露远程 Docker Socket</div>
          <div><Check :size="15" /> 节点容器同步导航页，并按节点预设地址与分组自动整理</div>
        </div>
        <div class="dp-screenshot-frame">
          <div class="dp-screenshot-frame__bar"><i></i><i></i><i></i><span>DOCKER-PANEL / AGENT NODES</span></div>
          <img class="dp-screenshot-image" :src="base('/assets/wiki/agent-nodes-v3.png')" alt="Docker-Panel Agent 多节点管理" />
        </div>
      </section>

      <section class="dp-screenshot-section dp-screenshot-section--backend">
        <div class="dp-screenshot-frame">
          <div class="dp-screenshot-frame__bar"><i></i><i></i><i></i><span>DOCKER-PANEL / SSH TERMINAL</span></div>
          <img class="dp-screenshot-image" :src="base('/assets/wiki/ssh-terminal-home-v1.png')" alt="Docker-Panel SSH 终端管理" />
        </div>
        <div class="dp-screenshot-copy">
          <span>06 / SSH TERMINAL</span>
          <h2>SSH 终端管理</h2>
          <p>在 Docker-Panel 内集中保存和管理主机 SSH 连接，直接建立终端会话执行命令、浏览远程文件，并查看连接主机的资源状态。</p>
          <div><Check :size="15" /> 保存常用主机，测试连接后可快速打开多个终端会话</div>
          <div><Check :size="15" /> 终端、命令与文件管理集中在同一工作区，减少工具切换</div>
        </div>
      </section>

      <section class="dp-docs-route">
        <header class="dp-section-intro dp-section-intro--light">
          <span>07 / DOCUMENTATION</span>
        </header>
        <div class="dp-doc-links">
          <a :href="base('/Installation')"><span>01</span><div><strong>安装教程</strong><small>Compose 部署、默认账户、目录挂载与安装验证</small></div><ArrowRight :size="20" /></a>
          <a :href="base('/Usage')"><span>02</span><div><strong>使用教程</strong><small>导航页、自动地址、容器管理与全部系统功能</small></div><ArrowRight :size="20" /></a>
          <a :href="base('/Troubleshooting')"><span>03</span><div><strong>故障自检</strong><small>按现象定位访问、识别、地址与更新问题</small></div><ArrowRight :size="20" /></a>
        </div>
      </section>

      <section class="dp-special-thanks" aria-label="特别鸣谢">
        <div class="dp-special-thanks__intro">
          <span>08 / SPECIAL THANKS</span>
          <h2>特别鸣谢</h2>
        </div>
        <div class="dp-special-thanks__person">
          <img :src="base('/assets/wiki/special-thanks-avatar-v2.jpg')" alt="野菊花爆炒火腿肠头像" />
          <strong>野菊花爆炒火腿肠</strong>
        </div>
      </section>
    </main>

    <footer class="dp-site-footer">
      <a class="dp-brand" :href="base('/')"><img :src="base('/assets/brand-logo.png')" alt="" /><span>Docker-Panel</span></a>
      <p>Docker navigation, automated.</p>
      <a :href="base('/Usage')">进入完整文档 <ArrowRight :size="16" /></a>
    </footer>
  </div>
</template>
