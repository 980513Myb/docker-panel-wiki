import { defineConfig } from 'vitepress'

const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS)

export default defineConfig({
  lang: 'zh-CN',
  title: 'Docker-Panel Wiki',
  description: '以 Docker 服务导航为核心的一体化导航与容器管理平台',
  base: isGitHubPages ? '/docker-panel-wiki/' : '/',
  cleanUrls: true,
  outDir: '../site',
  head: [
    ['link', { rel: 'icon', href: isGitHubPages ? '/docker-panel-wiki/assets/favicon.png' : '/assets/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#080b10' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }]
  ],
  themeConfig: {
    logo: '/assets/brand-logo.png',
    siteTitle: 'Docker-Panel',
    nav: [
      { text: '首页', link: '/' },
      { text: '安装教程', link: '/Installation' },
      { text: '使用教程', link: '/Usage' },
      { text: '故障自检', link: '/Troubleshooting' },
      { text: '版本日志', link: '/Changelog' }
    ],
    sidebar: {
      '/Installation': [
        {
          text: '安装教程',
          items: [
            { text: '部署 Docker-Panel', link: '/Installation' },
            { text: 'Telegram 频道', link: '/Installation#telegram-频道' }
          ]
        }
      ],
      '/Usage': [
        {
          text: '使用教程',
          items: [
            { text: '总体工作方式', link: '/Usage#总体工作方式' },
            { text: '前端导航页', link: '/Usage#前端导航页' },
            { text: '自动地址', link: '/Usage#自动地址' },
            { text: '容器卡片管理', link: '/Usage#容器卡片管理' },
            { text: '后端容器面板', link: '/Usage#后端容器面板' },
            { text: '容器管理', link: '/Usage#容器管理' },
            { text: 'Compose 项目', link: '/Usage#compose-项目' },
            { text: '定时重启', link: '/Usage#定时重启' },
            { text: 'Agent 节点管理', link: '/Usage#agent-节点管理' },
            { text: '镜像管理', link: '/Usage#镜像管理' },
            { text: '图标库', link: '/Usage#图标库' },
            { text: '代理设置', link: '/Usage#代理设置' },
            { text: 'Docker 设置', link: '/Usage#docker-设置' },
            { text: '系统操作', link: '/Usage#底部与系统操作' }
          ]
        }
      ],
      '/Troubleshooting': [
        { text: '故障自检', items: [{ text: '按现象定位问题', link: '/Troubleshooting' }] }
      ],
      '/Changelog': [
        { text: '版本日志', items: [{ text: '版本记录', link: '/Changelog' }] }
      ]
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '未找到相关内容',
                resetButtonTitle: '清除查询',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },
    outline: { level: [2, 3], label: '本页内容' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    externalLinkIcon: true,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/980513Myb/docker-panel-wiki' }
    ],
    footer: {
      message: 'Docker navigation, automated.',
      copyright: 'Docker-Panel Wiki'
    }
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: true
  },
  sitemap: { hostname: 'https://980513myb.github.io/docker-panel-wiki/' }
})
