---
title: 深色模式设计实践
date: 2025-01-08
categories:
  - 设计
tags:
  - CSS
  - 深色模式
  - UI设计
excerpt: 深色模式不仅仅是反色，它需要一套独立的设计决策。本文探讨深色模式的设计原则与 CSS 实现方案。
---

## 深色模式不是简单的反色

许多开发者误以为深色模式就是将白色背景换成黑色、黑色文字换成白色。事实上，纯黑背景上的纯白文字会产生过强的对比度，导致视觉疲劳。优秀的深色模式需要一套独立的设计决策。

## 设计原则

### 层级而非反色

深色模式下的视觉层级应该通过**明度差异**来建立，而非简单的颜色反转：

- **最底层（背景）**：接近但不等于纯黑，如 `#0a0a0a`
- **中层（卡片/容器）**：略亮的深灰，如 `#1a1a1a`
- **上层（悬浮层/弹窗）**：更亮的灰色，如 `#2a2a2a`

这种层级系统模拟了真实世界中光源从上到下的照射效果。

### 降低饱和度

深色模式下，高饱和度的颜色在深色背景上会显得过于刺眼。应该适当降低色彩饱和度，同时保持色相不变：

```css
/* 浅色模式 */
--accent: #3B82F6;

/* 深色模式 — 降低饱和度 */
--accent: #60A5FA;
```

### 强调色保留

强调色是深色模式的灵魂。在以灰黑为主的界面中，一抹亮色可以瞬间抓住用户的注意力。Endspace 主题使用的电光黄 `#FBFB45` 就是绝佳的例子——它在深色背景上既醒目又不刺眼。

## CSS 实现

### CSS 自定义属性

使用 CSS 自定义属性可以优雅地管理浅色与深色两套色彩体系：

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f4f4f5;
  --text-primary: #18181b;
  --text-secondary: #71717a;
  --accent: #FBFB45;
}

.dark {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
  --accent: #FBFB45;
}
```

### 偏好检测

尊重用户的系统偏好是深色模式实现的第一步：

```js
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
```

### 手动切换

除了跟随系统，还应该提供手动切换的入口。将用户的偏好保存到 `localStorage` 中，下次访问时优先使用保存的偏好：

```js
const saved = localStorage.getItem('theme');
if (saved === 'dark' || saved === 'light') {
  document.documentElement.classList.toggle('dark', saved === 'dark');
} else {
  // 回退到系统偏好
  document.documentElement.classList.toggle(
    'dark',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}
```

## 代码块样式

代码块在深色模式下需要特别处理。浅色模式下常用的浅灰背景（如 `#f6f8fa`）在深色背景下会显得突兀。推荐使用与深色层级系统协调的暗色背景：

```css
/* 浅色模式代码块 */
pre { background: #f6f8fa; }

/* 深色模式代码块 */
.dark pre { background: #161b22; }
```

## 图片与阴影

深色模式下的两个常见陷阱：

1. **图片过亮**：可以为图片添加轻微的暗色叠加或降低亮度 `filter: brightness(0.9)`
2. **阴影失效**：深色背景下黑色阴影不可见，需要改用更亮的阴影色 `box-shadow: 0 4px 6px rgba(255, 255, 255, 0.05)`

## 总结

深色模式设计的关键在于：**建立层级、控制对比、保留强调**。它不是浅色模式的附属品，而是需要同等重视的独立设计体系。
