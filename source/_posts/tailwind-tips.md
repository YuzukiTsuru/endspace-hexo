---
title: Tailwind CSS 实战技巧
date: 2025-03-28
categories:
  - 技术
tags:
  - CSS
  - Tailwind
  - 前端
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=630&fit=crop
excerpt: Tailwind CSS 的一些实战技巧和常见问题解决方案，帮助你在项目中更高效地使用原子化 CSS。
---

## 为什么选择 Tailwind

Tailwind CSS 的原子化方案让样式开发变得直观——你不需要在 HTML 和 CSS 文件之间反复跳转，所有样式都直接写在元素上。但这种便利也有代价：类名会变得很长，复用需要额外处理。

以下是我在 Endspace 主题开发中总结的一些实用技巧。

## @apply 与组件提取

当一个元素的类名组合在多个地方重复出现时，使用 `@apply` 提取为组件类：

```css
/* tailwind-input.css */
@layer components {
  .endspace-btn {
    @apply border border-current px-6 py-2 font-mono text-sm uppercase
           tracking-widest transition-all duration-300;
  }
  .endspace-btn:hover {
    @apply bg-yellow-300 text-black;
  }
}
```

## 暗色模式

Tailwind 的 `darkMode: 'class'` 配置让深色模式的开发非常自然：

```html
<div class="bg-white dark:bg-zinc-900">
  <p class="text-zinc-800 dark:text-zinc-100">内容</p>
</div>
```

配合 JavaScript 切换 `.dark` 类即可实现主题切换。

## 自定义设计令牌

在 `tailwind.config.js` 中扩展默认主题，将设计变量集中管理：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: '#FBFB45',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

## 响应式设计

Tailwind 采用移动优先的断点系统，从小屏向大屏递进：

```html
<!-- 移动端单列，桌面端双列 -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- ... -->
</div>
```

## 常见陷阱

### 类名排序

长类名难以阅读，建议按功能分组并保持固定顺序：布局 → 间距 → 排版 → 颜色 → 交互。

### PurgeCSS 配置

确保 `content` 路径覆盖所有使用 Tailwind 类名的文件：

```js
content: [
  './themes/endspace/layout/**/*.ejs',
  './themes/endspace/source/js/**/*.js',
],
```

遗漏路径会导致生产环境中类名被错误移除。
