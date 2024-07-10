---
title: Vue3.0开发之——EventLoop(06)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: '5868e53'
date: 2023-04-06 00:44:38
---
## 一 概述

* 同步任务和异步任务
* 同步任务和异步任务的执行过程
* EventLoop 的基本概念
* 结合EventLoop分析输出的顺序

<!--more-->

## 二 同步任务和异步任务

### 2.1 JavaScript 是单线程的语言

JavaScript 是一门<font color=red>单线程执行</font>的编程语言。也就是说，同一时间只能做一件事情。单线程执行任务队列的问题：

如果<font color=red>前一个任务非常耗时</font>，则后续的任务就不得不一直等待，从而导致<font color=red>程序假死</font>的问题

![][1]

### 2.2 同步任务和异步任务

为了防止某个<font color=red>耗时任务</font>导致<font color=red>程序假死</font>的问题，JavaScript 把待执行的任务分为了两类

#### 同步任务（synchronous）

* 又叫做<font color=red>非耗时任务</font>，指的是在主线程上排队执行的那些任务
* 只有前一个任务执行完毕，才能执行后一个任务

#### 异步任务（asynchronous）

* 又叫做<font color=red>耗时任务</font>，异步任务由JavaScript <font color=red>委托给</font>宿主环境进行执行
* 当异步任务执行完成后，会<font color=red>通知 JavaScript 主线程</font>执行异步任务的<font color=red>回调函数</font>

## 三 同步任务和异步任务的执行过程

### 3.1 执行过程

![][2]

### 3.2 执行过程说明

* 同步任务由 JavaScript 主线程次序执行
*  异步任务<font color=red>委托给</font>宿主环境执行
*  已完成的异步任务<font color=red>对应的回调函数</font>，会被加入到任务队列中等待执行
*  JavaScript 主线程的<font color=red>执行栈</font>被清空后，会读取任务队列中的回调函数，次序执行
*  <font color=red>JavaScript 主线程不断重复上面的第 4 步</font>

## 四 EventLoop 的基本概念

### 4.1 EventLoop图示

![][2]

### 4.2 说明

* JavaScript 主线程从“任务队列”中读取异步任务的回调函数，放到执行栈中依次执行
* 这个过程是循环不断的，所以整个的这种运行机制又称为 EventLoop（事件循环）

## 五 结合EventLoop分析输出的顺序

### 5.1 代码及执行结果

```
import thenFs from 'then-fs'

console.log('A')
thenFs.readFile('./files/1.txt', 'utf8').then((dataStr) => {
  console.log('B')
})

setTimeout(() => {
  console.log('C')
}, 0)
console.log('D')
```

node执行上述指令后，输入结果如下：

```
A
D
C
B
```

### 5.2 执行结果说明

*  A 和 D 属于<font color=red>同步任务</font>。会根据代码的先后顺序<font color=red>依次被执行</font>
*  C 和 B 属于<font color=red>异步任务</font>。它们的回调函数会被加入到任务队列中，等待主线程空闲时再执行



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-06-eventloop-javascript-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-06-eventloop-javascript-progress.png