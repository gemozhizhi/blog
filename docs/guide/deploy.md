---
title: 发布流程
---

## 一次性配置（做一次就行）

### 1. 建 GitHub 仓库

- 仓库名建议和域名一致，比如 `blog`
- 设为 Public（Cloudflare Pages 需要读权限）
- **不要**初始化 README，让本地推上去覆盖

### 2. 连到 Cloudflare Pages

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 左侧 **Workers 和 Pages** → **创建** → **Pages** → **连接 Git**
3. 选 GitHub，授权，选择你的仓库
4. 填写构建设置：

| 配置项 | 值 |
|---|---|
| 框架预设 | None |
| 构建命令 | `npm run docs:build` |
| 构建输出目录 | `docs/.vitepress/dist` |
| Node 版本 | `22` （用环境变量 `NODE_VERSION=22`） |

5. 点 **部署**

几分钟后会拿到一个 `https://blog.xxx.pages.dev` 的地址。

### 3. 绑定自己的域名

在 Cloudflare Pages 项目里 → **Custom domains** → **Add a domain**，填你的域名。

然后去 Cloudflare 的 **DNS** 面板加一条记录：

| 类型 | 名称 | 内容 | 代理状态 |
|---|---|---|---|
| CNAME | `blog` | `blog.xxx.pages.dev` | DNS only（灰色云朵） |

> ⚠️ 如果你的域名 DNS 不在 Cloudflare，就把这条 CNAME 加到原注册商的 DNS 面板，指向 Cloudflare 给的目标地址。

证书会自动签发，一般几分钟。

### 4. 裸域名跳转

如果想用 `example.com` 而不是 `blog.example.com`，在 DNS 里加一条 A 记录指向 Cloudflare 的 IP，再在 Pages 项目里添加裸域名。Cloudflare 会自动处理跳转。

## 日常发布

```bash
git add .
git commit -m "新增文章：xxx"
git push
```

Cloudflare Pages 检测到 push 会自动重新构建，1-2 分钟生效。

## 关于备案

**当前方案不需要备案**，因为用的是 Cloudflare 的境外节点。

如果将来国内访问确实慢（读者抱怨首屏超过 3 秒），可以考虑：
1. 做 ICP 备案（5-20 个工作日）
2. 备案通过后把 DNS 切到腾讯云 EdgeOne 大陆区

切托管只需改 DNS，域名和仓库都不用动。

## 常见问题

**构建失败？**
看 Cloudflare Pages 的构建日志。常见原因：Node 版本不对（设置环境变量 `NODE_VERSION=22`）、依赖没锁版本。

**改完没生效？**
Cloudflare 的构建缓存有延迟。在 Pages 项目的 Settings 里可以手动触发重新部署。

**想看本地效果？**
```bash
npm run docs:dev
```

**怎么加评论？**
VitePress 原生不带评论系统。常见做法是接入 Giscus（基于 GitHub Discussions），配置在 `config.js` 的 `themeConfig` 里。
