# 格模致知

> 在代码与模型之间，格物致知

个人技术博客。VitePress + Cloudflare Pages，纯静态，零服务器成本，无需备案。

---

## 快速开始

```bash
npm install          # 安装依赖
npm run docs:dev     # 本地预览 → http://localhost:5173
npm run docs:build   # 构建到 docs/.vitepress/dist
```

## 目录结构

```
blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.js        # 站点主配置（导航、侧边栏、SEO、主题）
│   │   └── site.config.js   # ★ 站点信息 —— 改名字、改域名只改这里
│   ├── public/              # 静态资源（favicon、头像）
│   ├── posts/               # 文章放这里
│   ├── guide/               # 使用指南类页面
│   ├── index.md             # 首页
│   ├── archive.md           # 归档页
│   ├── tags.md              # 标签页
│   └── about.md             # 关于页
├── .env.example             # Cloudflare Pages 环境变量模板
└── package.json
```

## 需要改的三处

全部集中在 `docs/.vitepress/site.config.js`：

| 配置项 | 说明 |
|---|---|
| `title` / `titleTemplate` | 站点标题，出现在浏览器标签、搜索结果 |
| `author` | 作者名，显示在页脚和文章署名 |
| `url` | 站点地址，**上线后必改**。sitemap、RSS、OG 卡片都依赖它 |
| `socialLinks` | 侧边栏和首页的社交图标，填了才显示 |
| `distribution` | 各分发平台的链接 |

改完执行 `npm run docs:build` 生效。

## 写文章

在 `docs/posts/` 下新建 `.md` 文件：

```markdown
---
title: 文章标题
tags: ['标签']
date: 2026-11-11
---

正文内容
```

详见 `docs/guide/writing.md`。

## 部署到 Cloudflare Pages

### 1. 建 GitHub 仓库

仓库名建议 `blog`，设为 Public，**不要**初始化 README。

### 2. 连接 Cloudflare Pages

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 左侧 **Workers 和 Pages** → **创建** → **Pages** → **连接 Git**
3. 选择仓库，填写构建设置：

| 配置项 | 值 |
|---|---|
| 框架预设 | None |
| 构建命令 | `npm run docs:build` |
| 构建输出目录 | `docs/.vitepress/dist` |
| 环境变量 | `NODE_VERSION` = `22` |

4. 部署完成后会拿到 `https://blog.xxx.pages.dev`

### 3. 绑定域名

**Pages 项目 → Custom domains → Add a domain**，填入域名。

然后在 **Cloudflare DNS** 添加记录：

| 类型 | 名称 | 内容 | 代理 |
|---|---|---|---|
| CNAME | `blog` | `blog.xxx.pages.dev` | DNS only（灰色云朵）|

> 域名 DNS 若不在 Cloudflare，把这条 CNAME 加到原注册商面板即可。

HTTPS 证书自动签发，约几分钟生效。

### 4. 同步修改 site.config.js

把 `url` 改成真实域名，重新构建推送。否则 sitemap 和 RSS 里的地址还是旧的。

## 日常发布

```bash
git add .
git commit -m "新增文章：xxx"
git push
```

Cloudflare Pages 自动构建，1-2 分钟生效。

## 备案说明

**当前方案不需要备案**（Cloudflare 境外节点）。

若日后国内访问偏慢，可做 ICP 备案（5-20 工作日）后把 DNS 切到腾讯云 EdgeOne 大陆区。切托管只需改 DNS，域名和仓库都不用动。

## 各平台分发

内容写完后同步到知乎 / 掘金 / CSDN。

⚠️ **不要在知乎回答正文塞裸链接** —— 2026 年实测带外链的回答折叠率超 70%，申诉通过率不到 10%。安全做法：链接放个人简介栏，知乎专栏用官方链接位。详见 `docs/guide/writing.md`。

## 环境说明

本机 Node 环境注入了 `NODE_OPTIONS`，会与 VitePress 的清理逻辑冲突，因此 `package.json` 的 scripts 里统一加了 `NODE_OPTIONS=` 前缀。在没有此环境变量的机器上直接用 `vitepress build docs` 即可。
