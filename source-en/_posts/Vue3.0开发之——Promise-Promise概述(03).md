---
title: Vue3.0开发之——Promise-Promise概述(03)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: 474a90f9
date: 2023-04-05 20:05:16
---
## 一 概述

* 回调地狱
* Promise 的基本概念
* 基于then-fs异步的读取文件内容
* 基于Promise按顺序读取文件的内容

<!--more-->

## 二 回调地狱

### 2.1 回调地狱演示

<font color=red>多层回调函数的相互嵌套</font>，就形成了<font color=red>回调地狱</font>。示例代码如下

```
setTimeout(() => { //第1层回调函数
    console.log('延时1秒后输出') 

    setTimeout(() => { //第2层回调函数
        console.log('再延时2秒后输出')   

        setTimeout(() => { //第3层回调函数
             console.log('再延时3秒后输出')
        }, 3000);
    }, 2000);
}, 1000);
```

回调地狱的缺点：

*  代码耦合性太强，牵一发而动全身，<font color=red>难以维护</font>
* 大量冗余的代码相互嵌套，代码的<font color=red>可读性变差</font>

### 2.2 如何解决回调地狱的问题

为了解决回调地狱的问题，<font color=red>ES6</font>（ECMAScript 2015）中新增了 <font color=red>Promise</font> 的概念

## 三 Promise 的基本概念

### 3.1 Promise 是一个构造函数

* 我们可以创建 Promise 的实例 <font color=#3469ff>const p = new Promise()</font>
* new 出来的 Promise 实例对象，<font color=#3469ff>代表一个异步操作</font>

### 3.2 Promise.prototype 上包含一个 .then() 方法

* 每一次 new Promise() 构造函数得到的实例对象
* 都可以<font color=#3469ff>通过原型链的方式</font>访问到 .then() 方法，例如 <font color=#3469ff>p.then()</font>

### 3.3  .then() 方法用来预先指定成功和失败的回调函数

* p.then(<font color=#3469ff>成功的回调函数，失败的回调函数</font>)
* p.then(<font color=#3469ff>result</font> => { }, <font color=#3469ff>error</font> => { })
* 调用 .then() 方法时，成功的回调函数是必选的、失败的回调函数是可选的

## 四 基于then-fs异步的读取文件内容

### 4.1 基于 then-fs 读取文件内容

由于 node.js 官方提供的 fs 模块<font color=red>仅支持</font>以<font color=red>回调函数的方式</font>读取文件，<font color=red>不支持Promise 的调用方式</font>。因此，需
要先运行如下的命令，安装 <font color=red>then-fs</font> 这个第三方包，从而支持我们基于 Promise 的方式读取文件的内容

```
npm install then-fs
```

### 4.2 then-fs 的基本使用

调用 then-fs 提供的 <font color=red>readFile()</font> 方法，可以异步地读取文件的内容，<font color=red>它的返回值是 Promise 的实例对象</font>。因
此可以<font color=red>调用 .then() 方法</font>为每个 Promise 异步操作指定<font color=red>成功</font>和<font color=red>失败</font>之后的回调函数。

```
import thenFs from "then-fs"

thenFs.readFile('./files/1.txt','utf-8').then((r1)=>{console.log(r1)})
thenFs.readFile('./files/2.txt','utf-8').then((r2)=>{console.log(r2)})
thenFs.readFile('./files/3.txt','utf-8').then((r3)=>{console.log(r3)})
```

### 4.3 打印结果

![][1]

注意：上述的代码无法保证文件的读取顺序，需要做进一步的改进！

## 五 基于Promise按顺序读取文件的内容

### 5.1 .then() 方法的特性

如果上一个 .then() 方法中<font color=red>返回了一个新的Promise 实例对象</font>，则可以通过下一个 .then() 继续进行处理。通
过 .then() 方法的<font color=red>链式调用</font>，就解决了回调地狱的问题

### 5.2 基于 Promise 按顺序读取文件的内容

<font color=red>Promise 支持链式调用</font>，从而来解决回调地狱的问题。示例代码如下

```
import thenFs from 'then-fs'

thenFs
  .readFile('./files/1.txt', 'utf8')
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
  })

```

### 5.3 过程说明

* 第1个readFile— 返回值是Promise的实例对象
* 第1个then—通过.then为第一个Promise实例指定成功之后的回调函数
* 第2个readFile—在第一个.then中返回一个新的Promise实例对象
* 第2个then—继续调用.then，为上一个.then的返回值(新的Promise实例)指定成功之后的回调函数
* 第3个readFile—在第二个.then中再返回一个新的Promise实例对象
* 第3个then—继续调用.then，为上一个.then的返回值(新的Promise实例)指定成功之后的回调函数

## 六 参考

* [npmjs-then-fs](https://www.npmjs.com/package/then-fs)
* [CSDN—完美解决报错Please verify that the package.json has a valid](https://blog.csdn.net/m0_67265654/article/details/123395025)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-03-thenfs-print.png