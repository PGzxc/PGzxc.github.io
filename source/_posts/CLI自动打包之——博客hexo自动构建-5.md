---
title: CLI自动打包之——博客hexo自动构建(5)
categories:
  - 开发
  - L-自动化
  - CLI
  - Github
tags:
  - Github
abbrlink: 8af1efb5
date: 2025-08-27 09:13:57
---
## 一 概述

```
本文介绍Hexo博客：
 - 本地：执行hexo generate生成的文件在public目录下
 - 使用cli：将推送到master下的源文件编译放到分支下
 - 使用Actions专门deploy工具：peaceiris/actions-gh-pages能简化过程
```

<!--more-->

## 二 执行前确认

### 2.1 确认Deploy分支

```
1、通过Github端新建
项目——>Switch branches/tags——>View all branches——>New branch——>确认分支

2、通过用户端提交

1、创建分支
git branch hexo

2、切换回主分支
git checkout main

3、提交远程仓库
git remote add origin https://github.com/user/repo.git
git push -u origin main
git pull origin main
```

### 2.2 项目下添加wokflow

```
.github/workflows/action.yml
```

## 三 action.yml内容

### 3.1 不使用deploy工具(分支hexo)

```
name: Hexo Auto-Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    name: Hexo Auto-Deploy by GitHub Actions
    runs-on: ubuntu-latest

    steps:
    # 1. Checkout the code
    - name: Checkout code
      uses: actions/checkout@v4

    # 2. Set up Node.js environment
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'

    # 3. Cache node modules (using npm cache)
    - name: Cache node modules
      uses: actions/cache@v4
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

    # 4. Install Hexo dependencies
    - name: Install Hexo dependencies
      run: |
        npm install

    # 5. Generate public files (build Hexo)
    - name: Generate public files
      run: |
        npx hexo clean
        npx hexo generate

    # 6. Set global git config (only once)
    - name: Set up Git config
      run: |
        git config --global user.name "PGzxc"
        git config --global user.email "827489398@qq.com"

    # 7. Deploy to GitHub Pages
    - name: Deploy to GitHub Pages
      env:
        GITHUB_REPO: github.com/PGzxc/PGzxc.github.io.git
      run: |
        cd ./public
        git init
        git add .
        git diff-index --quiet HEAD || git commit -m "GitHub Actions Auto Builder at $(date +'%Y-%m-%d %H:%M:%S')"
        git push --force --quiet "https://${{ secrets.ACCESS_TOKEN }}@$GITHUB_REPO" master:hexo
```

### 3.2 使用deploy工具(分支gh-pages)

```
name: Hexo Auto-Deploy

on:
  push:
    branches:
      - master   # 当 master 分支有 push 时触发

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
      # 1. 拉取仓库源码
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. 安装 Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'   # 可改成你本地用的版本

      # 3. 安装 Hexo 依赖
      - name: Install dependencies
        run: |
          npm install -g hexo-cli
          npm install

      # 4. 构建静态文件
      - name: Build Hexo
        run: hexo generate

      # 5. 部署到 gh-pages 分支
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
```

## 四 访问及设置

### 4.1 设置 GitHub Pages

```
打开你的仓库 → Settings → Pages。
在 Source 选择 gh-pages 分支，并保存。
```

### 4.2 使用说明

```
以后你只要 push 到 master，GitHub Actions 就会自动执行构建，并把生成的静态文件推送到 gh-pages 分支。

gh-pages 分支就是 GitHub Pages 的发布分支。

页面地址一般是：
https://<你的GitHub用户名>.github.io/<仓库名>/
```

## 五 参考

* [Actions 专门的 deploy 工具—peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)