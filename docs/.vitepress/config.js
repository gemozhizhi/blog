import { defineConfig } from 'vitepress'
import { siteConfig } from './site.config.js'
import { RssPlugin } from 'vitepress-plugin-rss'

export default defineConfig({
  title: siteConfig.title,
  titleTemplate: siteConfig.titleTemplate,
  description: siteConfig.description,
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: siteConfig.author }],
    ['meta', { name: 'keywords', content: '技术博客,前端,后端,编程,源码解析' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    // Open Graph，知乎/掘金/CSDN 分享时的卡片预览
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: siteConfig.title }],
    ['meta', { property: 'og:description', content: siteConfig.description }],
    ['meta', { property: 'og:image', content: `${siteConfig.url}/og-cover.png` }],
    ['meta', { property: 'og:url', content: siteConfig.url }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: siteConfig.title }],
    ['meta', { name: 'twitter:description', content: siteConfig.description }],
  ],

  sitemap: {
    hostname: siteConfig.url,
  },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: siteConfig.title,

    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archive' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '写作指南', link: '/guide/writing' },
            { text: '发布流程', link: '/guide/deploy' },
          ],
        },
      ],
    },

    socialLinks: siteConfig.socialLinks,

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: '退出键',
            },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },

    docFooter: { prev: '上一篇', next: '下一篇' },

    lastUpdated: { text: '最后更新于' },

    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',

    footer: {
      message: '基于 VitePress 构建',
      copyright: `© ${new Date().getFullYear()} ${siteConfig.author}`,
    },

    editLink: {
      pattern: 'https://github.com/yourname/blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    externalLinkIcon: true,
  },

  vite: {
    build: {
      // 图片等静态资源压缩
      minify: 'esbuild',
    },
    plugins: [
      RssPlugin({
        title: siteConfig.title,
        description: siteConfig.description,
        baseUrl: siteConfig.url,
        copyright: `Copyright © ${new Date().getFullYear()} ${siteConfig.author}`,
        output: 'feed.rss',
        items: [
          {
            title: '第一篇文章：从零搭建一个技术博客',
            date: new Date('2026-11-11'),
            link: '/posts/first-post',
            description: '记录这个博客的技术选型、部署流程，以及踩过的坑。',
          },
        ],
      }),
    ],
  },
})
