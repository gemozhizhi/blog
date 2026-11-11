---
layout: home
title: 首页
titleTemplate: false

hero:
  name: 格模致知
  text: 在代码与模型之间，格物致知
  tagline: 技术笔记 · 源码解析 · 踩坑记录
  image:
    src: /avatar.svg
    alt: 博主头像
  actions:
    - theme: brand
      text: 开始阅读
      link: /posts/first-post
    - theme: alt
      text: 关于我
      link: /about

features:
  - title: 写得清楚
    details: 每篇文章都假设读者刚接触这个主题，但不把简单问题讲复杂。
  - title: 踩过的坑
    details: 记录真实踩坑过程和排查思路，而不只是最终那段能跑的代码。
  - title: 可复现
    details: 附完整代码和环境版本，复制粘贴就能跑起来，不缺依赖不跳步。
---

<div class="home-hint">
  <p><strong>👋 欢迎来到格模致知</strong></p>
  <p>在代码与模型之间，格物致知。这是站点的首页模板。改 <code>docs/.vitepress/site.config.js</code> 里的站点信息后，这里会自动跟着变。</p>
</div>

## 最近更新

<div class="recent-posts">
  <ul>
    <li>
      <span class="date">2026-11-11</span>
      <a href="/posts/first-post">第一篇文章：从零搭建一个技术博客</a>
    </li>
    <li>
      <span class="date">2026-11-11</span>
      <a href="/guide/writing">写作指南：怎么开始写第一篇</a>
    </li>
  </ul>
</div>

<style>
.home-hint {
  margin: 32px 0 8px;
  padding: 16px 20px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-size: 14px;
  line-height: 1.7;
}
.home-hint p {
  margin: 0 0 6px;
}
.home-hint p:last-child {
  margin-bottom: 0;
}
.home-hint code {
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}
.recent-posts ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}
.recent-posts li {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.recent-posts li:last-child {
  border-bottom: none;
}
.recent-posts .date {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
@media (min-width: 640px) {
  .recent-posts li {
    gap: 20px;
  }
  .recent-posts .date {
    min-width: 88px;
  }
}
</style>
