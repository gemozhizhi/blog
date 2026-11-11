---
title: 部署流程
---

## 一次性配置（做一次就行）

### 1. 建 GitHub 仓库

- 仓库名建议 `blog`，设为 **Public**（Cloudflare Pages 需要读权限）
- **不要**初始化 README、.gitignore，让本地推上去覆盖

### 2. 推代码上去

```bash
cd blog
git remote add origin https://github.com/gemozhizhi/blog.git
git branch -M main
git push -u origin main
```

### 3. 连到 Cloudflare（Workers Static Assets 流程）

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com) —— 注意是 **dash.cloudflare.com**，不是 github.com/cloudflare（那是 GitHub 上的开源组织主页，不是控制台）
2. 左侧 **Workers 和 Pages** → **创建** → **连接 Git**
3. 选 GitHub，授权，选择 `blog` 仓库
4. 在 **Create and deploy** 表单里填：

| 字段 | 值 |
|---|---|
| Project name | `blog` ← **必须与 wrangler.jsonc 里的 `name` 一致** |
| Build command | `npm run docs:build` |
| Deploy command | `npx wrangler deploy` ← 保持默认即可 |
| Preview command | `npx wrangler preview` ← 保持默认 |
| Enable Preview builds | 保持开启 |
| Protect with Cloudflare Access | 保持关闭 |

5. 点 **Advanced settings**，确认 **Build output directory** 为 `docs/.vitepress/dist`，Root directory 留空
6. 点 **Deploy**

> ⚠️ **Project name 必须和 `wrangler.jsonc` 里的 `name` 字段完全一致**，否则构建会失败（报 name mismatch）。当前配置是 `blog`。

> ⚠️ **别点「Need to use the legacy Pages workflow? Continue to Pages」**
> 那是旧的 Pages 流程入口，新流程就停在当前表单页。

构建 1-3 分钟，成功后得到 `https://blog.gemozhizhi.workers.dev`。

#### 配置文件说明

项目根目录有两个配置文件支撑这个流程：

**`wrangler.jsonc`** —— 告诉 Wrangler 静态资源在哪、404 怎么处理：
```jsonc
{
  "name": "blog",
  "compatibility_date": "2026-11-05",
  "assets": {
    "directory": "./docs/.vitepress/dist",
    "not_found_handling": "404-page"
  }
}
```

> `not_found_handling: "404-page"` 让 Workers 用 VitePress 生成的 `404.html` 处理未匹配路径。这行容易漏，漏了访问不存在的地址会返回 Cloudflare 默认错误页。

**`.node-version`** —— 锁定 Node 版本为 22，避免 Cloudflare 默认版本过低导致构建失败。


> ⚠️ **授权时选「Only select repositories」，只勾 `blog`**
>
> 别选「All repositories」—— 那等于把整个 GitHub 账号（包括所有私有仓库）的访问权交给 Cloudflare。只需要这一个公开博客仓库的读权限就够。

### 4. 绑定自己的域名（阿里云）

**第一步 · 在 Cloudflare 取目标地址**

Pages 项目 → **Custom domains** → **Add a domain** → 填入 `gemozhizhi.com`。

Cloudflare 会校验域名归属，给出两种验证方式：
- **TXT 记录验证**（推荐）：在阿里云加一条 `_cf-custom-hostname` 的 TXT 记录
- CNAME 记录：把 `gemozhizhi.com` CNAME 到 `blog.xxx.pages.dev`

按提示操作即可。

**第二步 · 在阿里云加解析**

阿里云控制台 → **域名** → 找到 `gemozhizhi.com` → **解析设置** → **添加记录**：

| 类型 | 主机记录 | 记录值 | TTL |
|---|---|---|---|
| CNAME | `@`（或 `blog`） | `blog.xxx.pages.dev` | 10 分钟 |

> 💡 **用子域名还是根域名？**
> - 想要 `gemozhizhi.com`（根域名）：主机记录填 `@`
> - 想要 `blog.gemozhizhi.com`（子域名）：主机记录填 `blog`，**推荐这个**，不影响以后邮箱等其他用途

**第三步 · 等待生效**

一般 10 分钟内生效，最长不超过 24 小时。证书自动签发，一起完成。

验证：
```bash
curl -I https://gemozhizhi.com
```

看到 `200` 或 `301` 就通了。

### 5. ⚠️ 别忘了最后一步：改配置里的 url

拿到真实域名后，编辑 `docs/.vitepress/site.config.js`：

```js
url: 'https://gemozhizhi.com',   // 末尾不要加斜杠
```

然后：

```bash
npm run docs:build
git add . && git commit -m "配置真实域名" && git push
```

**为什么必须做**：sitemap.xml 和 feed.rss 里的地址是从这里生成的。不改的话，搜索引擎收录到的还是 `example.pages.dev`，社交平台的分享卡片也会指向错误地址。

### 6. （可选）把 DNS 托管迁到 Cloudflare

站点跑通后再做，10 分钟搞定。

**好处**：以后换托管商（EdgeOne、Vercel）只改一条记录，域名解析始终在自己手里，还能用上 Cloudflare 的免费 CDN 代理和防护。

**步骤**：
1. Cloudflare 添加站点，选 Free 套餐
2. Cloudflare 会给你两个 NS 地址
3. 阿里云域名 → **域名管理** → 修改 DNS 服务器，把 NS 改成 Cloudflare 给的
4. 等待全球 NS 生效（几小时）
5. 回到 Cloudflare，在 DNS 里补上之前那条 CNAME 记录

> 注意：迁移期间解析会有短暂中断，属正常。建议挑读者少的时间做。

## 日常发布

```bash
git add .
git commit -m "新增文章：xxx"
git push
```

Cloudflare Pages 检测到 push 会自动构建，1-2 分钟生效。

## 关于备案

**当前方案不需要备案**，因为用的是 Cloudflare 的境外节点。

如果将来国内访问确实慢（读者抱怨首屏超过 3 秒），可以考虑：
1. 做 ICP 备案（5-20 个工作日，需身份证 + 域名证书 + 手机号核验）
2. 备案通过后把 DNS 切到腾讯云 EdgeOne 大陆区

切托管只需改 DNS，域名和仓库都不用动。

## 常见问题

**构建失败？**
看 Cloudflare Pages 的构建日志。常见原因：Node 版本不对（设 `NODE_VERSION=22`）、依赖没锁版本。

**改完没生效？**
Cloudflare 构建缓存有延迟。可在 Pages 项目设置里手动触发重新部署。

**想看本地效果？**
```bash
npm run docs:dev
```

**怎么加评论？**
VitePress 原生不带评论系统。常见做法是接入 Giscus（基于 GitHub Discussions），配置在 `config.js` 的 `themeConfig` 里。

**301 跳转怎么做？**
在 Cloudflare Pages 项目设置 → **Redirects** 里加规则，或用 `docs/public/_redirects` 文件。
