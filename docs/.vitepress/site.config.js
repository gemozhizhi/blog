/**
 * 站点信息集中配置 —— 需要改名 / 换域名时，只改这一个文件即可
 *
 * ⚠️ 改完必须重新构建，否则 sitemap / RSS / 分享卡片里的地址不会更新：
 *    npm run docs:build && git add . && git commit -m "update site config" && git push
 */
export const siteConfig = {
  // ===== 基本信息 =====
  title: '格模致知',
  titleTemplate: ':title | 格模致知',
  description: '在代码与模型之间，格物致知',
  author: '博主占位名',

  // ===== 域名 =====
  // 真实域名，末尾不要加斜杠
  // 改完记得重新构建：npm run docs:build && git add . && git commit -m "update url" && git push
  url: 'https://gemozhizhi.com',

  // ===== 社交链接（填了才会显示在首页和侧边栏）=====
  // GitHub 已确定；知乎和掘金等注册好后再补
  socialLinks: [
    { icon: 'github', link: 'https://github.com/gemozhizhi' },
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
