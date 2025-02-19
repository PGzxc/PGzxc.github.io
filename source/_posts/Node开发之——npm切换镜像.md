---
title: Node开发之——npm切换镜像
categories:
  - 开发
  - G-后端开发
  - Node
tags:
  - Node
abbrlink: e1b0455b
date: 2025-02-19 09:15:53
---
### 一 为何切换镜像

```
在使用npm(Node Package Manager)管理项目依赖时，经常会遇到需要切换到不同的npm镜像(registry)的需求。
特别是在中国大陆地区，由于网络原因直接访问npm官方源(https://registry.npmjs.org/)可能非常慢或者不稳定。
为了解决这个问题，我们可以切换到使用国内的镜像源，
比如淘宝的npm镜(https://registry.npm.taobao.org/)或者官方提供的其他镜像。
```

<!--more-->

![][1]

## 二 切换镜像方式 

### 2.1 通过npm命令行

**1-查看当前配置的 registry**

打开终端或命令提示符，运行以下命令来查看当前 npm 配置的 registry：

```
npm config get registry
```

**2-切换到淘宝镜像**

要切换到淘宝的 npm 镜像，可以使用以下命令

```
npm config set registry https://registry.npm.taobao.org/
```

或者使用一行命令完成查看和设置：

```
npm config set registry https://registry.npm.taobao.org/ --global
```

说明：

* `--global` 参数表示将配置设置为全局，这样所有的 npm 项目都会使用这个镜像。
* 如果你只想为当前项目设置，可以省略这个参数。

**3-验证设置**

再次运行 `npm config get registry` 来确认镜像已经成功切换

### 2.2 编辑 `.npmrc` 文件

另一种方法是直接编辑或创建 `.npmrc` 文件来设置 registry。

这个文件通常位于你的用户目录下（例如，在 Linux 或 macOS 上是 `~/.npmrc`，在 Windows 上可能是 `C:\Users\YourUsername\.npmrc`）

**1-打开或创建 `.npmrc` 文件**

使用文本编辑器打开 `.npmrc` 文件，如果不存在，则创建它。

**2-添加或修改 registry**

在文件中添加或修改以下行：

```
registry=https://registry.npm.taobao.org/
```

**3-保存并关闭文件**

保存 `.npmrc` 文件并关闭编辑器。之后，当你运行 npm 命令时，它将使用你指定的镜像。

### 2.3 使用nrm (NPM Registry Manager）

nrm 是一个 npm 镜像源管理工具，可以让你更方便地切换不同的 npm 镜像。

**1-安装 nrm**

```
npm install -g nrm
```

**2-查看可用的镜像**

```
nrm ls
```

**3-切换到某个镜像**

例如，切换到淘宝镜像：

```
nrm use taobao
```

**4-验证切换**

使用 `nrm current` 查看当前使用的镜像。


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-service/npm-source-error-1.png