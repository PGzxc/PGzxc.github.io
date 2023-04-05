---
title: Vue3.0开发之——async和await(05)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: b402129a
date: 2023-04-05 23:53:32
---
## 一 概述

* 了解async和await的基本使用
* async和await的使用注意事项

<!--more-->

## 二 了解async和await的基本使用

### 2.1 什么是 async/await

* <font color=red>async/await</font> 是 <font color=red>ES8</font>（ECMAScript 2017）引入的新语法，用来<font color=red>简化 Promise 异步操作</font>。
* 在 async/await 出现之前，开发者只能通过<font color=red>链式.then() 的方式</font>处理 Promise 异步操作

### 2.2 .then链式调用

* .then 链式调用的优点：解决了回调地狱的问题
* .then 链式调用的缺点：代码冗余、阅读性差、不易理解

### 2.3 async/await 的基本使用

使用 async/await 简化 Promise 异步操作的示例代码如下

```
import thenFs from 'then-fs'

async function getAllFile() {
  const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
  console.log(r1)

  const r2 = await thenFs.readFile('./files/2.txt', 'utf8')
  console.log(r2)

  const r3 = await thenFs.readFile('./files/3.txt', 'utf8')
  console.log(r3)

}

getAllFile()
```

## 三 async和await的使用注意事项

### 3.1 如果在 function 中使用了 await，则 function 必须被 async 修饰

使用了await，不使用async可能出现如下错误

```
const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
             ^^^^^

SyntaxError: Unexpected reserved word
    at ESMLoader.moduleStrategy (node:internal/modules/esm/translators:119:18)
    at ESMLoader.moduleProvider (node:internal/modules/esm/loader:468:14)
    at async link (node:internal/modules/esm/module_job:67:21)
```

### 3.2 在 async 方法中，第一个 await 之前的代码会同步执行，await 之后的代码会异步执行

代码

```
import thenFs from 'then-fs'

console.log('A')

async function getAllFile() {
  console.log('B')
  const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
  const r2 = await thenFs.readFile('./files/2.txt', 'utf8')
  const r3 = await thenFs.readFile('./files/3.txt', 'utf8')
  console.log(r1)
  console.log(r2)
  console.log(r3)
  console.log('D')
}

getAllFile()
console.log('C')
```

执行结果(顺序)

```
A
B
C
111
222
333
D
```

