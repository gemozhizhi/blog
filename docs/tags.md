---
layout: page
title: 标签
---

## 全部标签

<div class="tag-cloud">
  <a href="/tags/#教程" class="tag">教程</a>
  <a href="/tags/#工具链" class="tag">工具链</a>
  <a href="/tags/#踩坑" class="tag">踩坑</a>
  <a href="/tags/#源码" class="tag">源码</a>
  <a href="/tags/#性能" class="tag">性能</a>
</div>

<div class="tag-tip">
  <p>写新文章时，在 frontmatter 里加一行 <code>tags: ['标签名']</code> 即可。</p>
</div>

<style>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}
.tag {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.tag:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.tag-tip {
  margin-top: 24px;
  padding: 12px 16px;
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}
.tag-tip p {
  margin: 0;
}
.tag-tip code {
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
