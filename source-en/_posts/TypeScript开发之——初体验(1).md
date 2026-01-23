---
title: TypeScript开发之——初体验(1)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: d0b2fe1c
date: 2023-04-25 23:37:40
---
## 一 概述

* TypeScript 介绍
* TypeScript 初体验

<!--more-->

## 二 TypeScript 介绍

### 2.1 TypeScript 是什么

* <font color=red>TypeScript</font>(简称：TS)是 JavaScript 的<font color=red>超集</font>(JS 有的 TS 都有)
* TypeScript = <font color=red>Type</font> + JavaScript（在 JS 基础之上，为 JS 添加了<font color=red>类型支持</font>）
* TypeScript 是微软开发的开源编程语言，可以在任何运行 JavaScript 的地方运行

### 2.2 TypeScript 为什么要为 JS 添加类型支持？

#### 背景问题

* 背景：JS 的类型系统存在“先天缺陷”，JS 代码中绝大部分错误都是类型错误（Uncaught TypeError）
* 问题：增加了找 Bug、改 Bug 的时间，严重影响开发效率

#### 编程语言类型

从编程语言的动静来区分，TypeScript 属于静态类型的编程语言，JS 属于动态类型的编程语言

* 静态类型：编译期做类型检查
* 动态类型：执行期做类型检查
* 代码编译和代码执行的顺序：1 编译 2 执行

#### 发现错误时机

* 对于 JS 来说：需要等到代码真正去<font color=red>执行</font>的时候才能<font color=red>发现错误</font>(晚)
* 对于 TS 来说：在代码<font color=red>编译</font>的时候（代码执行前）就可以发现<font color=red>错误</font>(早)
* 并且，配合 VSCode 等开发工具，TS 可以<font color=red>提前到在编写代码的同时</font>就发现代码中的错误，<font color=red>减少找 Bug、改 Bug 时间</font>

### 2.3 TypeScript 相比 JS 的优势

* 更早（写代码的同时）发现错误，<font color=red>减少找 Bug、改 Bug 时间</font>，提升开发效率
* 程序中任何位置的代码都有<font color=red>代码提示</font>，随时随地的安全感，增强了开发体验
* 强大的<font color=red>类型系统</font>提升了代码的可维护性，使得<font color=red>重构代码更加容易</font>
* 支持最新的 ECMAScript 语法，优先体验最新的语法，让你走在前端技术的最前沿
* TS <font color=red>类型推断</font>机制，<font color=red>不需要</font>在代码中的<font color=red>每个地方都显示标注类型</font>，让你在享受优势的同时，尽量降低了成本

除此之外，Vue 3 源码使用 TS 重写、Angular 默认支持 TS、React 与 TS 完美配合，TypeScript 已成为大中型前端项目的首先编程语言

## 三 TypeScript 初体验

### 3.1 TS工具安装

#### 安装TS工具包

打开终端，执行如下指令

```
npm install -g typescript  //最新稳定版本
npm install -g typescript@next //
```

####  查看TS版本

执行如下指令，查看typescript

```
tsc -v
```

#### 为什么要安装TS的工具包

原因：Node.js/浏览器，只认识 JS 代码，不认识 TS 代码。需要先将 TS 代码转化为 JS 代码，然后才能运行

typescript 包：用来编译 TS 代码的包，提供了 tsc 命令，实现了 TS -> JS 的转化

![][1]

### 3.2 编译并运行 TS 代码

1-创建 hello.ts 文件（注意：TS 文件的后缀名为 .ts）

```
console.log('Hello ts')
```

2-将 TS 编译为 JS：在终端中输入命令，tsc hello.ts（此时，在同级目录中会出现一个同名的 JS 文件）

![][2]

3-执行 JS 代码：在终端中输入命令，node hello.js

```
->node hello.js
Hello ts
```

1到3过程如下

![][3]

说明：
* 所有合法的 JS 代码都是 TS 代码，有 JS 基础只需要学习 TS 的类型即可
* 由 TS 编译生成的 JS 文件，代码中就没有类型信息了

### 3.3 简化运行 TS 

#### 原因

* 每次修改代码后，都要重复执行两个命令，才能运行 TS 代码，太繁琐
* 使用 ts-node 包，直接在 Node.js 中执行 TS 代码

#### 安装

```
npm i -g ts-node（ts-node 包提供了 ts-node 命令）
```

#### 使用

```
ts-node hello.ts
```

说明：ts-node 命令在内部偷偷的将 TS -> JS，然后，再运行 JS 代码

## 四 参考

* [nmpjs—TypeScript](https://www.npmjs.com/package/typescript)
* [npmjs—ts-node](https://www.npmjs.com/package/ts-node)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day1-img1-tools-build.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day1-img1-tsc-build.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day1-img1-ts-build-process.png