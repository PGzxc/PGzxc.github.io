---
title: GitBook之——搭建文档站点(2)
categories:
  - 站点
  - GitBook
tags:
  - GitBook
abbrlink: 1628126a
date: 2025-08-07 09:15:29
---
## 一 概述

```
本文介绍搭建站点的两种方式(不推荐，旧版不再支持，新版收费)
 - 本地
 - 云端
```

<!--more-->

## 二 本地 vs 云端 GitBook

|     项目     |  GitBook 本地(开源 CLI)   |   GitBook 云端(gitbook.com)    |
| :----------: | :-----------------------: | :----------------------------: |
|   是否开源   |           ✅ 是            |              ❌ 否              |
|   是否免费   |        ✅ 完全免费         |     ✅ 基础免费，企业版收费     |
|   使用方式   |     本地编译(Node.js)     |        在线 Web 编辑器         |
|  是否需联网  |         ❌ 可离线          |            ✅ 需联网            |
|   文档格式   |    Markdown + 目录结构    |    Markdown(WYSIWYG 编辑器)    |
|   适合人群   |    程序员、技术写作者     | 团队协作、产品文档、知识库管理 |
| 适合部署方式 | GitHub Pages / 本地浏览器 |       官方托管(无需部署)       |

## 三 使用 GitBook CLI(本地搭建文档站点)——不再维护不可用

说明：当前Node环境无法使用，本文仅演示

### 3.1 步骤 1：安装 GitBook CLI

```
npm install -g gitbook-cli
```

### 3.2 步骤 2：初始化项目

```
1、初始化指令
mkdir my-docs && cd my-docs
gitbook init

2、这会创建以下文件
.
├── README.md       # 首页内容
└── SUMMARY.md      # 目录结构（类似章节）
```

### 3.3 步骤 3：本地预览

```
1、指令
gitbook serve

2、访问
访问：http://localhost:4000 查看文档
```

### 3.4 步骤 4：生成静态网站

```
1、指令
gitbook build

2、输出
输出到 _book/ 目录
```

### 3.5 步骤 5：部署到 GitHub Pages

```
git init
git remote add origin https://github.com/yourname/yourrepo.git
git add .
git commit -m "init book"
git push -u origin master

# 如果使用 gh-pages 分支部署：
cd _book
git init
git add .
git commit -m "deploy"
git push --force git@github.com:yourname/yourrepo.git master:gh-pages
```

## 四 使用 GitBook.com 云端平台

### 4.1 步骤 1：注册并创建文档空间

```
打开：https://www.gitbook.com/
注册账号（支持 GitHub 登录）
创建一个新的 space（空间）
```

### 4.2 步骤 2：编辑文档

```
在线使用 Markdown + 编辑器协作撰写
支持图片粘贴、拖拽章节、评论讨论等功能
```

### 4.3 步骤 3：文档管理与发布

```
可设置 私有/公开访问
支持团队协作（邀请成员）
每个空间都提供一个专属子域名，如：
https://yourteam.gitbook.io/project-name/
```

### 4.4 步骤 4：同步 GitHub 仓库(可选)

```
设置自动拉取仓库更新到空间（适合技术文档）
```

## 五 创建演示

|    1-创建space    | ![][1] |
| :---------------: | :----: |
|    2-创建Site     | ![][2] |
|  3-填写Site-Name  | ![][3] |
| 4-关联Space和Site | ![][4] |
|    5-发布Site     | ![][5] |
|   6-发布后访问    | ![][6] |
|    7-访问效果     | ![][7] |


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/gitbook-2-spaces-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/gitbook-2-sites-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/gitbook-2-site-name-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/gitbook-2-content-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/gitbook-2-public-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/gitbook-2-visit-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/gitbook-2-effect-7.png