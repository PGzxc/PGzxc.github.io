---
title: CLI自动打包之——博客Jekyll自动构建CLI(4)
categories:
  - 开发
  - L-自动化
  - CLI
  - Github
tags:
  - Github
abbrlink: 9fe7cb4
date: 2025-08-04 09:24:39
---
## 一 概述

```
1、项目结构与分支规划
2、创建工作流配置文件
3、使用GitHub Desktop推送源码
4、配置GitHub Pages发布源
5、验证自动构建
```

<!--more-->

## 二 项目结构与分支规划

```
1、源码分支（main）：
存放 Jekyll 源码（包括 _config.yml、_posts、Gemfile 等）。


2、发布分支（gh-pages）：
存放自动生成的静态文件（由 GitHub Actions 构建后推送到此分支）。
```

## 三 创建工作流配置文件

在项目根目录创建 `.github/workflows/jekyll.yml`，内容如下：

```
name: Build and Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # 监听 main 分支的推送事件

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # 1. 拉取源码
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true  # 如需使用主题子模块，设为 true
          fetch-depth: 0    # 获取完整提交历史，避免依赖问题

      # 2. 设置 Ruby 环境
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.2  # 指定 Ruby 版本
          bundler-cache: true  # 缓存依赖

      # 3. 安装依赖并构建 Jekyll 网站
      - name: Build Jekyll site
        run: |
          bundle install
          bundle exec jekyll build --baseurl ""
        env:
          JEKYLL_ENV: production

      # 4. 将构建结果推送到 gh-pages 分支
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site  # Jekyll 构建输出目录
          publish_branch: gh-pages  # 发布分支名
          force_orphan: true  # 保持发布分支干净
```

## 四 使用GitHub Desktop推送源码

### 4.1 创建本地仓库

1、在本地初始化 Jekyll 项目（若尚未创建）：

```
jekyll new my-site
cd my-site
```

2、用 GitHub Desktop 克隆远程仓库（或添加现有本地仓库）

### 4.2 提交源码到 main 分支

```
在 GitHub Desktop 中添加所有文件，填写提交说明，推送到 main 分支
```

### 4.3 创建空的 gh-pages 分支

```
# 切换到新分支（不继承任何提交）
git checkout --orphan gh-pages

# 删除所有文件（保持分支为空）
git rm -rf .

# 添加空提交并推送
git commit --allow-empty -m "Initial gh-pages commit"
git push origin gh-pages

# 切回 main 分支继续开发
git checkout main
```

## 五 配置GitHub Pages发布源

```
1、打开GitHub仓库 → Settings → Pages。
2、在Source中选择 gh-pages 分支，路径设为/(root)，点击 Save。
```

## 六 验证自动构建

### 6.1 推送代码触发构建

```
本地修改源码后，通过 GitHub Desktop 推送到 main 分支。
查看仓库的 Actions 标签，应看到工作流正在运行。
```

### 6.2 检查构建结果

```
工作流成功后，gh-pages 分支将自动更新。
访问 https://<username>.github.io/<repo-name> 查看网站（可能需要几分钟生效）
```

