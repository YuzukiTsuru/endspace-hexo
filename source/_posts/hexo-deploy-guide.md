---
title: 使用 GitHub Actions 自动部署 Hexo 博客
date: 2025-04-10
categories:
  - 教程
tags:
  - Hexo
  - GitHub Actions
  - CI/CD
  - 部署
cover: https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=630&fit=crop
excerpt: 一步步配置 GitHub Actions 工作流，实现 Hexo 博客的自动构建与部署。
---

## 为什么需要自动部署

每次手动执行 `hexo generate` 和 `hexo deploy` 既繁琐又容易出错。通过 GitHub Actions，你可以实现推送代码后自动构建和部署，让写作和发布完全分离。

## 准备工作

在开始之前，确保你已具备：

- 一个 Hexo 博客项目，代码托管在 GitHub
- 一个 GitHub Personal Access Token（需要 `repo` 权限）
- 基本的 YAML 语法知识

## 创建工作流

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Hexo

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### 工作流说明

#### 触发条件

`on.push.branches` 指定仅在 `main` 分支收到推送时触发工作流。你也可以根据需要添加其他触发方式：

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:  # 允许手动触发
```

#### 构建步骤

每个 `step` 按顺序执行：

1. **Checkout**：拉取代码，`submodules: true` 确保子模块（如主题）也被拉取
2. **Setup Node.js**：配置 Node.js 环境，`cache: 'npm'` 启用依赖缓存加速构建
3. **Install Dependencies**：`npm ci` 比 `npm install` 更适合 CI 环境，严格按照 lock 文件安装
4. **Build**：执行构建命令生成静态文件
5. **Deploy**：将 `public` 目录推送到 `gh-pages` 分支

## 配置 GitHub Pages

1. 进入仓库的 **Settings → Pages**
2. **Source** 选择 `gh-pages` 分支
3. 等待部署完成，访问 `https://yourname.github.io/repo/`

## 自定义域名

如果你使用自定义域名，需要在 `source/` 目录下创建 `CNAME` 文件：

```
blog.yourdomain.com
```

同时在 DNS 服务商处添加 CNAME 记录指向 `yourname.github.io`。

## 常见问题

### 构建失败

检查以下几点：

- `package-lock.json` 是否已提交到仓库
- Node.js 版本是否与本地一致
- 主题是否作为子模块正确引用

### 部署后样式缺失

确保 `_config.yml` 中的 `url` 和 `root` 配置正确：

```yaml
url: https://yourname.github.io/repo/
root: /repo/
```

### 构建速度优化

- 使用 `npm ci` 替代 `npm install`
- 启用 npm 缓存（已在工作流中配置）
- 减少不必要的依赖
