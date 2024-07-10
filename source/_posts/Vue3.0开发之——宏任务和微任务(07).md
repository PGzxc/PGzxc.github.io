---
title: Vue3.0开发之——宏任务和微任务(07)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: bd0bfee5
date: 2023-04-06 10:38:38
---
## 一 概述

*  宏任务与微任务的概念
* 举例分析宏任务和微任务的执行过程
*  经典面试题

<!--more-->

## 二  宏任务与微任务的概念

### 2.1 什么是宏任务和微任务

JavaScript 把异步任务又做了进一步的划分，异步任务又分为两类，分别是

![][1]

#### 宏任务（macrotask）

* 异步 Ajax 请求
* setTimeout、setInterval
* 文件操作
* 其它宏任务

#### 微任务（microtask）

* Promise.then、.catch 和 .finally
* process.nextTick
* 其它微任务

### 2.2  宏任务和微任务的执行顺序

每一个宏任务执行完之后，都会检查<font color=red>是否存在待执行的微任务</font>，如果有，则执行完所有微任务之后，再继续执行下一个宏任务

![][2]

## 三  举例分析宏任务和微任务的执行过程

### 3.1  去银行办业务的场景

#### 1-小云和小腾去银行办业务。首先，需要取号之后进行排队

宏任务队列

#### 2 -假设当前银行网点只有一个柜员，小云在办理存款业务时，小腾只能等待

单线程，宏任务按次序执行

#### 3 -小云办完存款业务后，柜员询问他是否还想办理其它业务？

当前宏任务执行完，检查是否有微任务

#### 4 -小云告诉柜员：想要买理财产品、再办个信用卡、最后再兑换点马年纪念币？

执行微任务，后续宏任务被推迟

#### 5 -小云离开柜台后，柜员开始为小腾办理业务

所有微任务执行完毕，开始执行下一个宏任务

### 3.2 分析以下代码输出的顺序

代码

```
setTimeout(() => {
  console.log('1')
})

new Promise(function (resolve) {
  console.log('2')
  resolve()
}).then(function () {
  console.log('3')
})
console.log('4')
```

执行结果：

```
2
4
3
1
```

结果分析：

* 先执行所有的<font color=red>同步任务</font>：执行第 6 行、第 12 行代码
* 再执行<font color=red>微任务</font>：执行第 9 行代码
* 再执行<font color=red>下一个宏任务</font>：执行第 2 行代码

## 四 经典面试题

请分析以下代码输出的顺序

```
console.log('1')
setTimeout(function () {
  console.log('2')
  new Promise(function (resolve) {
    console.log('3')
    resolve()
  }).then(function () {
    console.log('4')
  })
})

new Promise(function (resolve) {
  console.log('5')
  resolve()
}).then(function () {
  console.log('6')
})

setTimeout(function () {
  console.log('7')
  new Promise(function (resolve) {
    console.log('8')
    resolve()
  }).then(function () {
    console.log('9')
  })
})
```

执行结果：

```
156234789
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-07-task-macro-micro.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-07-task-macro-micro-progress.png