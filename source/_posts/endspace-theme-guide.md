---
title: Endspace 主题使用指南
date: 2025-03-15
categories:
  - 教程
tags:
  - Hexo
  - Endspace
  - 主题
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop
excerpt: 一份关于 Endspace Hexo 主题的完整使用指南，涵盖安装、配置与自定义。
---

## 简介

Endspace 是一款受《明日方舟：终末地》官网视觉风格启发而制作的 Hexo 主题。它采用工业美学设计语言，以电光黄（`#FBFB45`）为强调色，搭配等宽字体的科技标签，营造出独特的赛博朋克氛围。

## 安装

将主题克隆到你的 Hexo 站点的 `themes` 目录下：

```bash
cd your-hexo-site
git clone https://github.com/YuzukiTsuru/endspace-hexo.git themes/endspace
npm install
```

然后在站点配置文件 `_config.yml` 中启用主题：

```yaml
theme: endspace
```

## 主题配置

主题的所有可配置项都在 `themes/endspace/_config.yml` 中。以下是一些关键配置：

### 站点身份

```yaml
avatar: /images/avatar.svg
author: 你的名字
bio: 一段简短的自我介绍
```

### 导航菜单

```yaml
menu:
  Home: /
  Category: /categories/
  Tag: /tags/
  Archive: /archives/
  Search: /search/
```

### 加载封面

主题内置了一个仿系统启动序列的加载动画，你可以在配置中自定义各阶段的文字：

```yaml
endspace:
  loading_cover: true
  loading_site_name: YOUR_SPACE
  loading_text_init: INITIALIZING
  loading_text_loading: LOADING
  loading_text_complete: READY
  loading_text_sweeping: LAUNCHING
  loading_text_fadeout: WELCOME
```

## 文章 Front Matter

主题支持以下 Front Matter 字段：

| 字段 | 说明 |
|---|---|
| `title` | 文章标题 |
| `date` | 发布日期 |
| `categories` | 分类（支持层级） |
| `tags` | 标签 |
| `cover` | 封面图片 URL |
| `excerpt` | 文章摘要，用于卡片预览 |
| `description` | 备用摘要 |

## 特色功能

- **深色模式**：自动检测系统偏好，也可手动切换
- **加载动画**：模拟系统启动的进度条和阶段提示
- **文章目录**：自动生成并跟随滚动高亮
- **页面过渡**：基于 Swup 的 PJAX 无刷新跳转
- **全文搜索**：客户端搜索，支持关键词高亮
