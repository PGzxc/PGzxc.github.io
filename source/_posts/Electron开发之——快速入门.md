---
title: Electron开发之——快速入门
categories:
  - 开发
  - E-桌面开发
  - Electron
tags:
  - Electron
abbrlink: 75e682e7
date: 2021-12-13 11:18:11
---
## 一 概述

Electron是一个可以使用Web技术如：JavaScript、HTML和CSS来创建跨平台原生桌面应用的框架。借助Electron，我们可以使用纯JavaScript来调用丰富的原生APIs

Electron用Web页面作为它的GUI，而不是绑定了GUI库的JavaScript。它结合了Chromium、Node.js和用于调用操作系统本地功能的APIs(如打开文件窗口、通知、图标等)

![][1]

<!--more-->
## 二 准备材料

* 开发电脑：Windows10
* Node：16.13.1
* Npm：8.1.2

## 三 electron-quick-start

### 3.1 示例项目

项目地址：[Github-electron-quick-start][00]
![][2]

### 3.2 项目操作

将项目代码Clone到本地（D:\Code\Electron\Electron-Sample——>cmd终端）

```
git clone https://github.com/electron/electron-quick-start
```

解压后，进入electron-quick-start

```
cd electron-quick-start
```

安装依赖文件

```
npm install
```

运行项目

```
npm start
```

![][3]

### 3.3 打包并发布应用

#### [Electron Forge](https://www.electronforge.io/)打包

1. 将 Electron Forge 添加到您应用的开发依赖中，并使用其"import"命令设置 Forge 的脚手架

   ```
   npm install --save-dev @electron-forge/cli
   npx electron-forge import
   ```

2. 使用 Forge 的 `make` 命令来创建可分发的应用程序

   ```
   npm run make
   ```

   Electron-forge 会创建 `out` 文件夹，您的软件包将在那里找到

   ```
   // 以 Windows 为例
   out/
   ├── out\electron-quick-start-win32-x64\electron-quick-start.exe
   ├── ...
   └── ...
   ```

#### electron-packager打包

1. 安装依赖

   ```
   npm install electron-packager -g
   npm install electron --save-dev
   ```

2. 打包

   ```
   electron-packager . electron-demo
   ```

## 四 Electron Fiddle软件

### 4.1 [下载Electron Fiddle软件][01]

![][4]

### 4.2 创建应用

依次点击：File——>New Electron，创建一个临时Electron项目，项目的位置

```
C:\Users\Admin\AppData\Local\Temp\tmp-20584-ywmo7dOFTDP8
```

![][5]

### 4.3 运行项目

点击Run运行项目，Console显示运行过程，完成后，弹出窗口

![][6]

### 4.4 编译、打包
![][7]

## 五 Electron 开发应用

现在已经有很多由 Electron 开发应用，比如 [Atom](https://atom.io/)、[Insomnia]https://insomnia.rest/)、[Visual Studio Code](https://code.visualstudio.com/) 等。查看更多使用 Electron 构建的项目可以访问 [Apps Built on Electron](https://electron.atom.io/apps/)

## 六 参考

* [知乎—Electron 快速入门](https://zhuanlan.zhihu.com/p/27740025)
* [Electron文档—快速入门](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)




[00]:https://github.com/electron/electron-quick-start
[01]:https://www.electronjs.org/fiddle
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-electron/electron-application-construct-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-electron/electron-github-project-preview.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-electron/electron-github-project-npm-start.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-electron/electron-fiddle-software-download.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-electron/electron-fiddle-project-create-temp.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-electron/electron-fiddle-project-run.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-electron/electron-fiddle-tasks-package.png