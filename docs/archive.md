---
layout: page
title: 归档
---

## 按时间

<div class="archive-list">
  <ul>
    <li>
      <span class="date">2026-11-11</span>
      <div>
        <a href="/posts/first-post">第一篇文章：从零搭建一个技术博客</a>
        <p class="desc">记录这个博客的技术选型、部署流程，以及踩过的坑。</p>
      </div>
    </li>
    <li>
      <span class="date">2026-11-11</span>
      <div>
        <a href="/guide/writing">写作指南：怎么开始写第一篇</a>
        <p class="desc">从一个空白目录到发布第一篇文章的完整步骤。</p>
      </div>
    </li>
  </ul>
</div>

<style>
.archive-list ul {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
}
.archive-list li {
  display: flex;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.archive-list li:last-child {
  border-bottom: none;
}
.archive-list .date {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  padding-top: 3px;
}
.archive-list a {
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
}
.archive-list a:hover {
  color: var(--vp-c-brand-1);
}
.archive-list .desc {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
@media (min-width: 640px) {
  .archive-list li {
    gap: 24px;
  }
  .archive-list .date {
    min-width: 92px;
  }
}
</style>
