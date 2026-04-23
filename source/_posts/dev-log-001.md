---
title: 开发日志 #001 — 主题移植手记
date: 2024-12-05
categories:
  - 开发日志
tags:
  - NotionNext
  - Hexo
  - 移植
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop
excerpt: 将 NotionNext 版 Endspace 主题移植到 Hexo 的过程中遇到的技术挑战与解决方案。
---

## 背景

[cloud-oc/endspace](https://github.com/cloud-oc/endspace) 是一款基于 NotionNext 框架的博客主题，以其独特的工业美学设计吸引了我的注意。然而，我的博客基于 Hexo，于是萌生了将 Endspace 移植到 Hexo 的想法。

## 技术栈对比

两端框架的差异决定了移植工作的核心挑战：

| 特性 | NotionNext | Hexo |
|---|---|---|
| 运行时 | Node.js 服务端 / Next.js | 静态生成 |
| 模板引擎 | React JSX | EJS |
| 样式方案 | Tailwind CSS | SCSS + Tailwind |
| 数据来源 | Notion API | Markdown 文件 |
| 路由 | Next.js 路由 | Hexo 生成器 |
| 状态管理 | React State | 无（纯服务端渲染） |

## 主要挑战

### 1. React → EJS

这是最大的挑战。NotionNext 版的每个组件都是 React 组件，包含状态管理和生命周期逻辑。移植时需要将交互逻辑拆分出来，放到客户端 JavaScript 中，而模板部分则用 EJS 重新实现。

```js
// NotionNext: React 组件
export default function LoadingCover() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { /* ... */ }, []);
  return <div>{progress}%</div>;
}

// Hexo: EJS 模板 + 客户端 JS
// template.ejs
<div id="loading-progress">0%</div>
// theme.js
const el = document.getElementById('loading-progress');
```

### 2. 样式系统

原始主题大量使用 Tailwind 的动态类名和 React 组件内的条件样式。移植时选择了 SCSS + Tailwind 的混合方案：

- **SCSS**：处理主题级的设计变量、动画和复杂布局
- **Tailwind**：处理工具类样式，如间距、排版和响应式

### 3. 页面过渡

NotionNext 依托 Next.js 的路由系统天然支持页面过渡。Hexo 作为纯静态站点生成器，页面切换就是传统的整页刷新。通过引入 Swup 库实现了 PJAX 效果：

```js
const swup = new Swup({
  containers: ['#swup-main'],
});
```

### 4. 搜索功能

NotionNext 的搜索直接查询 Notion API，而 Hexo 需要在客户端完成。通过 `hexo-generator-search` 插件生成 XML 索引，再在客户端解析实现全文搜索。

## 收获

这次移植让我深入理解了两个框架的设计哲学差异。NotionNext 的优势在于动态数据和交互能力，而 Hexo 的优势在于简洁和纯静态的性能。Endspace 主题证明了工业美学设计可以跨越框架的边界——关键在于抓住设计语言的本质，而非逐行翻译代码。
