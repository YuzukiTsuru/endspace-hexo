---
title: 开发日志 #002 — SCSS 模块化实践
date: 2025-04-18
categories:
  - 开发日志
tags:
  - SCSS
  - CSS
  - 架构
excerpt: 在 Endspace 主题开发中，如何将 SCSS 拆分为合理的模块结构，兼顾可维护性与构建效率。
---

## 起点

最初 Endspace 主题只有一个巨大的 `style.scss` 文件，所有样式堆在一起，很快就开始互相干扰。是时候重构了。

## 模块拆分

参考 SMACSS 的思路，将样式按职责拆分为以下模块：

```
scss/
├── main.scss            # 入口，统一导入
├── _variables.scss      # 设计变量：颜色、字体、间距
├── _base.scss           # 重置与基础排版
├── _layout.scss         # 布局框架：侧边栏、主内容区
├── _loading.scss        # 加载封面动画
├── _navigation.scss     # 导航栏（桌面 + 移动端）
├── _post-card.scss      # 文章卡片
├── _article.scss        # 文章正文排版
├── _archive.scss        # 归档页时间线
├── _footer.scss         # 页脚
└── _utilities.scss      # 工具类与动画
```

## 变量先行

`_variables.scss` 是整个样式体系的基础，所有可配置的设计令牌都集中在这里：

```scss
// 颜色体系
$accent: #FBFB45;
$accent-dim: rgba(#FBFB45, 0.15);
$bg-primary: #ffffff;
$bg-primary-dark: #0a0a0a;

// 字体
$font-body: 'Inter', sans-serif;
$font-mono: 'JetBrains Mono', monospace;

// 间距
$sidebar-collapsed: 5rem;
$sidebar-expanded: 16rem;
```

## 关注点分离的好处

拆分后，修改任何一部分都不用担心影响其他模块。比如调整加载动画只需要改 `_loading.scss`，而不必在千行代码中搜索相关选择器。

同时，编译时只需关注 `main.scss` 的导入顺序，依赖关系一目了然：

```scss
@import 'variables';
@import 'base';
@import 'layout';
@import 'loading';
@import 'navigation';
@import 'post-card';
@import 'article';
@import 'archive';
@import 'footer';
@import 'utilities';
```

## 与 Tailwind 共存

Endspace 同时使用 SCSS 和 Tailwind，分工明确：

- **SCSS**：自定义组件、动画、设计变量
- **Tailwind**：工具类（间距、响应式、排版）

两者通过 `@layer` 避免优先级冲突，SCSS 的组件样式放在 Tailwind 的 `components` 层之前，确保工具类可以覆盖组件默认样式。

## 遗留问题

目前的架构还不完美。最大的痛点是**深色模式变量分散**——每个模块都有各自的 `.dark` 覆写，没有统一管理。后续计划将深色模式变量集中到 `_variables.scss` 中，通过 CSS 自定义属性实现主题切换。

```scss
// 未来方向
:root {
  --bg-primary: #{$bg-primary};
  --accent: #{$accent};
}
.dark {
  --bg-primary: #{$bg-primary-dark};
}
```

这会让深色模式从"逐模块覆写"变为"变量级切换"，代码量更少，也更不容易遗漏。
