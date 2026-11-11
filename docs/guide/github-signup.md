# GitHub 账号注册与仓库创建手册

> 这份文档写给「格模致知」博客项目的协作者，照着一步步做即可。

---

## 注册前准备

| 项目 | 内容 |
|---|---|
| 邮箱 | `qqandmx@163.com` （注意是 `.com`，不是 `.con`） |
| 用户名 | 自己定，全局唯一，**注册后很难更改**，见下方建议 |
| 密码 | 自己设，建议用密码管理器生成 |

### 用户名怎么选

用户名会公开出现在 `github.com/gemozhizhi`，并且**永久绑定你的所有开源贡献记录**。

推荐和博客主题相关的：
- `gemozhizhi` —— 与域名一致，最统一
- `gmzhi` —— 短，好记
- 用拼音或英文都行，别用纯数字

> ⚠️ 别用 `gmzhi2026` 这种带年份的，以后显得过时。

---

## 第一步 · 打开注册页

在**你自己的电脑浏览器**里访问：

https://github.com/signup

填入邮箱 `qqandmx@163.com`，点 **Continue**。

---

## 第二步 · 填用户名和密码

GitHub 会实时检查用户名是否可用。

**密码要求**（2026 年标准）：
- 至少 15 个字符
- 至少包含一个数字
- 至少包含一个大写字母

建议直接用 1Password / Bitwarden 这类工具生成 20+ 位随机密码，自己记不住是正常的，工具会帮你存。

---

## 第三步 · 过验证码

这一步是人机验证（通常是一个「我不是机器人」的勾选框或图片题）。

**需要你本人操作** —— 我不应该也不会尝试绕过验证码。

---

## 第四步 · 验证邮箱

去 **163 邮箱**收信，GitHub 会发一封标题类似 `Verify your email address` 的邮件。

点信里的验证按钮，账号就完全可用了。

> ⚠️ **没验证邮箱的话，推不了代码**。这是最常见的卡点之一。

---

## 第五步 · 创建仓库

登录后点右上角 **+** → **New repository**：

| 字段 | 填什么 |
|---|---|
| Repository name | `blog` |
| Description | `格模致知 · 个人技术博客` |
| Public / Private | **Public** ← 必须，Pages 需要读权限 |
| README | **不勾** |
| .gitignore | **不选** |
| License | **不选** |

点 **Create repository**。

---

## 第六步 · 推送本地代码

在终端执行（用户名已确定为 `gemozhizhi`）：

```bash
cd /Users/wangmengxuan/WorkBuddy/2026-11-10-16-42-04/blog

# 设置提交身份（改成你老公的名字和邮箱）
git config --global user.name "作者姓名"
git config --global user.email "qqandmx@163.com"

# 添加远程仓库
git remote add origin https://github.com/gemozhizhi/blog.git

# 推送
git push -u origin main
```

### 推送时要求登录

GitHub 从 2021 年起**不再接受账号密码推送**。有两种方式：

**方式 1 · 浏览器授权（推荐，最简单）**

推送后会弹出浏览器窗口让你登录并授权，之后这台机器就记住了。

**方式 2 · Personal Access Token**

1. GitHub → 右上角头像 → **Settings** → 最下方 **Developer settings**
2. 左侧 **Personal access tokens** → **Tokens (classic)** → **Generate new token**
3. 勾选 `repo` 和 `gist`，有效期设 90 天或更长
4. 生成后**立刻复制**那串 token（只显示一次）
5. 推送时用户名填 GitHub 用户名，密码位置粘贴这串 token

---

## 如果 GitHub 访问慢或连不上

国内网络访问 GitHub 主站有时会不稳定。三个办法：

**办法 1 · 换用 Gitee（最省事）**

Gitee 国内访问无障碍，EdgeOne Pages 也原生支持 Gitee 仓库。

1. 访问 https://gitee.com 注册并实名认证
2. 建同名公开仓库 `blog`
3. 推送：
   ```bash
   git remote add gitee https://gitee.com/gemozhizhi/blog.git
   git push -u gitee main
   ```
4. EdgeOne Pages 连接时选 Gitee

**办法 2 · 配置代理**

⚠️ **关键点：git 不读 macOS 的系统代理设置。** 即使浏览器能打开 GitHub，命令行 git 照样超时，表现就是终端里光标一直闪、没有任何输出。

必须手动告诉 git 代理地址。先查端口：

```bash
scutil --proxy | grep -E "HTTPPort|HTTPSPort"
```

假设是 7897（按实际改）：
```bash
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

验证：
```bash
git ls-remote --heads origin
```
有输出或静默退出码 0，说明通了。

用完记得清掉：
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

**办法 3 · 用 EdgeOne CLI 直接部署**

完全不需要 Git 仓库：
```bash
npm install -g edgeone
edgeone login
cd blog && edgeone pages init && edgeone pages deploy
```

---

## 完成后的检查清单

- [ ] GitHub 账号已注册，用户名已想清楚
- [ ] 邮箱已验证
- [ ] 仓库 `blog` 已创建，设为 Public
- [ ] 代码已推送，仓库页面能看到 38 个文件
- [ ] Cloudflare Pages 已连接，构建成功拿到 `pages.dev` 地址
- [ ] `docs/.vitepress/site.config.js` 的 `url` 已是 `https://gemozhizhi.com`
- [ ] 阿里云 DNS 已加 CNAME 记录
- [ ] 域名能正常访问
- [ ] 百度 + Google 搜索平台已提交 sitemap
