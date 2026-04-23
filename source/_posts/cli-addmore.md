---
title: 命令行工具推荐 — 提升终端工作效率
date: 2024-11-20
categories:
  - 技术
tags:
  - 命令行
  - 工具
  - 效率
cover: https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=630&fit=crop
excerpt: 分享几款我日常使用的命令行工具，它们让终端工作变得更加高效和愉悦。
---

## 终端是开发者的主场

好的工具不会替你思考，但会减少你在重复操作上浪费的时间。以下是我在终端中每天都在用的工具。

## 必装工具

### zsh + Oh My Zsh

zsh 配合 Oh My Zsh 是终端体验的基础升级：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

推荐插件组合：

- `git` — Git 快捷别名
- `z` — 目录跳转
- `zsh-autosuggestions` — 命令自动补全
- `zsh-syntax-highlighting` — 语法高亮

### fzf

模糊查找器，几乎可以搜索一切：

```bash
# 模糊搜索文件
vim $(fzf)

# 搜索历史命令
Ctrl+R

# 搜索进程并 kill
kill -9 $(ps -ef | fzf | awk '{print $2}')
```

### ripgrep

比 `grep` 快得多的代码搜索工具：

```bash
# 在项目中搜索关键词
rg "TODO" --type md

# 只显示匹配的文件名
rg -l "import.*React" --type ts
```

### fd

`find` 的现代替代品，语法更简洁：

```bash
# 查找所有 markdown 文件
fd -e md

# 查找并删除空目录
fd --type d --empty -x rm -r
```

### bat

`cat` 的增强版，自带语法高亮和行号：

```bash
bat README.md
```

### delta

为 `git diff` 提供语法高亮和并排对比：

```gitconfig
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only
```

## 工作流示例

组合使用这些工具，日常开发效率会有明显提升：

1. `z blog` — 一秒跳转到项目目录
2. `vim $(fzf)` — 模糊搜索并打开文件
3. `rg "function" | fzf` — 搜索代码并定位
4. `git diff` — delta 高亮查看变更

## 小结

工具链的搭建是渐进的，不需要一次配齐。从最痛的环节开始，每次优化一点点，终有一天你会发现终端已经变成了你最顺手的工作环境。
