/**
 * 站点信息集中配置 —— 需要改名 / 换域名时，只改这一个文件即可
 *
 * 改动后记得：
 *   1. 重新构建（npm run docs:build）
 *   2. 全局搜索旧名字确认没有遗漏（尤其是 pages/index.md 的 frontmatter）
 */
export const siteConfig = {
  // ===== 基本信息 =====
  title: '格模致知',
  titleTemplate: ':title | 格模致知',
  description: '在代码与模型之间，格物致知',
  author: '博主占位名',

  // ===== 域名 =====
  // 上线后拿到二级域名就把这行改成真实地址，RSS、canonical、sitemap 都会自动跟着变
  url: 'https://example.pages.dev',

  // ===== 社交链接（填了才会显示在首页和侧边栏）=====
  // 换成你老公的真实地址
  socialLinks: [
    { icon: 'github', link: 'https://github.com/yourname' },
    { icon: 'zhihu', link: 'https://www.zhihu.com/people/yourname' },
    { icon: 'juejin', link: 'https://juejin.cn/user/yourid' },
  ],

  // ===== 分发平台 =====
  // 这些链接会出现在「关于」页和文章末尾，读者知道去哪找你
  distribution: {
    zhihu: 'https://www.zhihu.com/people/yourname',
    juejin: 'https://juejin.cn/user/yourid',
    csdn: 'https://blog.csdn.net/yourname',
  },
}
