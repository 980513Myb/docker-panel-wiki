<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import {
  Activity,
  ArrowRight,
  Boxes,
  Check,
  ChevronRight,
  CircleGauge,
  Container,
  Cpu,
  Database,
  ExternalLink,
  Globe2,
  HardDrive,
  Image,
  Layers3,
  Menu,
  Network,
  Radar,
  RefreshCw,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  X
} from '@lucide/vue'

type ConsoleMode = 'automation' | 'monitoring'

const consoleMode = ref<ConsoleMode>('automation')
const mobileMenuOpen = ref(false)
const activeStep = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const base = (path: string) => withBase(path)
const consoleTitle = computed(() => consoleMode.value === 'automation' ? '自动接管中心' : '实时容器监控')

const navItems = [
  { label: '安装教程', href: '/Installation' },
  { label: '使用教程', href: '/Usage' },
  { label: '故障自检', href: '/Troubleshooting' },
  { label: '版本日志', href: '/Changelog' }
]

const flowSteps = [
  { id: '01', title: '发现容器', detail: '读取名称、镜像、网络、状态与宿主机映射端口。', icon: Radar },
  { id: '02', title: '生成卡片', detail: '自动创建导航入口，补全服务名称、分组与状态。', icon: Layers3 },
  { id: '03', title: '编写地址', detail: '按预设内外网地址拼接端口，写入可访问链接。', icon: Network },
  { id: '04', title: '匹配图标', detail: '结合服务名、镜像与地址自动获取对应图标。', icon: Image },
  { id: '05', title: '直接使用', detail: '容器上线即可点击访问，后续仍可在后台可视化编辑。', icon: Check }
]

const capabilities = [
  { title: 'Docker 服务导航', text: '以服务卡片统一承载访问入口、运行状态、资源信息和内外网访问策略。', icon: Globe2, tone: 'cyan' },
  { title: '自动新增容器卡片', text: '发现新容器后自动创建卡片，减少重复录入、分类和维护工作。', icon: Sparkles, tone: 'green' },
  { title: '内外网地址自动编写', text: '读取宿主机映射端口，自动生成带端口的内网地址与外网地址。', icon: Network, tone: 'blue' },
  { title: '后端可视化管理', text: '集中管理容器、Compose 项目、镜像、更新任务和定时重启。', icon: ServerCog, tone: 'amber' },
  { title: '实时资源监控', text: '实时刷新容器状态、CPU、内存、端口和运行时间，快速判断服务健康度。', icon: Activity, tone: 'cyan' },
  { title: '持久化与安全部署', text: '明确数据目录、Docker Socket、会话密钥和最小暴露面配置。', icon: ShieldCheck, tone: 'green' }
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
          <p class="dp-stage-lead">Docker-Panel 是以服务导航为核心、集成 Docker 面板管理的一体化工具。新容器出现后，自动生成导航卡片、识别端口、编写内外网地址并获取图标。</p>
          <p class="dp-stage-sub">从容器部署、入口生成到日常管理形成一条龙自动化流程，减少重复配置，后台仍保留完整的可视化编辑能力。</p>
          <div class="dp-stage-actions">
            <a class="dp-primary-action" :href="base('/Installation')">开始安装 <ArrowRight :size="18" /></a>
            <a class="dp-text-action" :href="base('/Usage')">查看完整功能 <ChevronRight :size="17" /></a>
          </div>
        </div>

        <div class="dp-live-console">
          <div class="dp-console-head">
            <div class="dp-window-mark"><i></i><i></i><i></i></div>
            <div class="dp-console-title"><span>DP / CONTROL</span><strong>{{ consoleTitle }}</strong></div>
            <div class="dp-live-indicator"><span></span> LIVE</div>
          </div>

          <div class="dp-console-tabs" role="tablist" aria-label="控制台视图">
            <button type="button" :class="{ active: consoleMode === 'automation' }" @click="consoleMode = 'automation'">自动接管</button>
            <button type="button" :class="{ active: consoleMode === 'monitoring' }" @click="consoleMode = 'monitoring'">实时监控</button>
          </div>

          <div v-if="consoleMode === 'automation'" class="dp-provision-view">
            <div class="dp-event-stream">
              <div class="dp-event-stream__head"><span>自动化事件流</span><small>刚刚</small></div>
              <div v-for="(step, index) in flowSteps.slice(0, 4)" :key="step.id" class="dp-event" :class="{ active: activeStep % 4 === index }">
                <component :is="step.icon" :size="17" />
                <div><strong>{{ step.title }}</strong><small>{{ index === 0 ? 'new-service · 9527/tcp' : step.detail }}</small></div>
                <Check v-if="activeStep % 4 > index" :size="15" />
                <span v-else-if="activeStep % 4 === index" class="dp-event-pulse"></span>
              </div>
            </div>
            <div class="dp-generated-card">
              <div class="dp-generated-card__top"><Container :size="22" /><span>NEW</span></div>
              <strong>Docker Service</strong>
              <p>192.168.1.10:9527</p>
              <div class="dp-address-lines"><span></span><span></span></div>
              <small><Check :size="13" /> 卡片已就绪</small>
            </div>
          </div>

          <div v-else class="dp-monitor-view">
            <div class="dp-monitor-metrics">
              <div><Cpu :size="18" /><span>CPU</span><strong>12.4%</strong><i style="--value: 42%"></i></div>
              <div><Database :size="18" /><span>MEMORY</span><strong>1.82 GB</strong><i style="--value: 58%"></i></div>
              <div><HardDrive :size="18" /><span>STORAGE</span><strong>38.6 GB</strong><i style="--value: 31%"></i></div>
            </div>
            <div class="dp-service-table">
              <div class="dp-service-table__head"><span>容器</span><span>状态</span><span>CPU</span><span>内存</span></div>
              <div><span><i class="is-green"></i> docker-panel</span><span>运行中</span><span>2.8%</span><span>286 MB</span></div>
              <div><span><i class="is-cyan"></i> jellyfin</span><span>运行中</span><span>7.1%</span><span>1.24 GB</span></div>
              <div><span><i class="is-blue"></i> uptime-kuma</span><span>运行中</span><span>2.5%</span><span>294 MB</span></div>
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
          <p>可根据预设的内网地址与外网地址，自动读取新容器的宿主机映射端口，生成带端口的访问链接并写入对应卡片。新服务上线后无需手动复制端口、拼接地址或逐个修改卡片。</p>
        </div>
      </section>

      <section class="dp-capabilities-section">
        <header class="dp-section-intro dp-section-intro--light">
          <span>02 / CAPABILITIES</span>
          <h2>导航与管理，在同一个工作台完成</h2>
          <p>前台负责访问效率，后台负责 Docker 运维。两套能力共享同一份容器数据。</p>
        </header>

        <div class="dp-capability-grid">
          <article v-for="(item, index) in capabilities" :key="item.title" :class="[`tone-${item.tone}`, { 'is-wide': index === 0 || index === 3 }]">
            <div class="dp-capability-icon"><component :is="item.icon" :size="23" /></div>
            <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </article>
        </div>
      </section>

      <section class="dp-screenshot-section">
        <div class="dp-screenshot-copy">
          <span>03 / PRODUCT VIEW</span>
          <h2>真实界面，将在这里展开</h2>
          <p>截图区域已按产品展示比例预留。后续替换为导航页自动生成卡片总览时，不需要重新调整页面结构。</p>
          <div><Check :size="15" /> 推荐尺寸 16:9 或 16:10</div>
          <div><Check :size="15" /> 发布前隐藏域名、IP、Token 与个人信息</div>
        </div>
        <div class="dp-screenshot-frame">
          <div class="dp-screenshot-frame__bar"><i></i><i></i><i></i><span>DOCKER-PANEL / NAVIGATION</span></div>
          <div class="dp-screenshot-empty">
            <Boxes :size="34" />
            <strong>导航页 / 自动生成容器卡片总览</strong>
            <small>SCREENSHOT PLACEHOLDER</small>
          </div>
        </div>
      </section>

      <section class="dp-docs-route">
        <header class="dp-section-intro dp-section-intro--light">
          <span>04 / DOCUMENTATION</span>
          <h2>从部署到日常维护</h2>
        </header>
        <div class="dp-doc-links">
          <a :href="base('/Installation')"><span>01</span><div><strong>安装教程</strong><small>Compose 部署、默认账户、目录挂载与安装验证</small></div><ArrowRight :size="20" /></a>
          <a :href="base('/Usage')"><span>02</span><div><strong>使用教程</strong><small>导航页、自动地址、容器管理与全部系统功能</small></div><ArrowRight :size="20" /></a>
          <a :href="base('/Troubleshooting')"><span>03</span><div><strong>故障自检</strong><small>按现象定位访问、识别、地址与更新问题</small></div><ArrowRight :size="20" /></a>
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
