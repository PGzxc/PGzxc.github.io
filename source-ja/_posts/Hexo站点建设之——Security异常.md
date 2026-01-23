---
title: Hexo站点建设之——Security异常
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo
abbrlink: 5cf91bbf
date: 2025-07-24 09:40:37
---
## 一 概述

```
1、Security异常及原因
2、什么是CodeQL
3、解决方式
```

<!--more-->

## 二 Security异常及原因

### 2.1 Security异常

```
Code scanning configuration error: CodeQL is reporting errors.
```

### 2.2 原因

```
GitHub 在2023年起自动对部分公共仓库启用了CodeQL扫描。
即使你没设置，它也可能显示 Code Scanning 报错。
这个报错对功能无影响，但影响观感。
```

## 三 什么是CodeQL

```
CodeQL是GitHub提供的静态代码分析工具，用于查找项目中潜在的漏洞和安全问题。
它适用于 C/C++、JavaScript/TypeScript、Python、Java 等主流语言。

对Hexo博客或纯HTML/CSS静态站点等项目，CodeQL 并不是必须的，甚至可能是误配置导致的问题。
```

## 四 解决方式

### 4.1 方法1：确认 Actions 页面中没有残留的 CodeQL 任务

```
1、打开仓库 → Actions 页签。
2、检查是否有名为 CodeQL 或类似的工作流历史。
3、如果有，可以点击删除旧的 workflow 文件，或手动终止。
```

图示

| 删除保存日志 | ![][1] |
| :----------: | :----: |
|  删除action  | ![][2] |

### 4.2 方法2：直接关闭 CodeQL 扫描(推荐用于 Hexo/GitHub Pages 项目)

```
1、打开你的 GitHub 仓库页面。
2、点击上方导航栏的 Security 标签页。
3、在侧边栏点击 Code scanning alerts。
4、点击右上角的 ⚙ Settings 按钮。
5、在 Code scanning 区块中：
   -找到并关闭或删除分析配置（如果有）。
   -或点击 Disable Code scanning。

这样就不会再出现“CodeQL is reporting errors”的提示了。
```

### 4.3 方法3(可选)：强制关闭 Security 功能的扫描配置

```
如果以上都不生效，还可以通过仓库设置手动关闭所有 Code Scanning 配置：

1、打开仓库 → Settings → Security & analysis
2、将以下选项关闭：
 -Code scanning
 -Secret scanning（可选）
 -Dependabot 相关功能（如果你不使用依赖安全提醒）
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-security-dismiss-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-security-del-2.png

