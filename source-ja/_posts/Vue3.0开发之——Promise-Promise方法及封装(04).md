---
title: Vue3.0开发之——Promise-Promise方法及封装(04)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: 7162939d
date: 2023-04-05 20:06:08
---
## 一 概述

* 通过.catch方法捕获错误
* Promise.all和Promise.race方法的使用
* 基于Promise封装异步读文件的方法

<!--more-->

## 二 通过.catch方法捕获错误

### 2.1 当文件名错误时，没有任何的错误及结果(不存在文件名`111.txt`)

```
import thenFs from 'then-fs'

thenFs
  .readFile('./files/111.txt', 'utf8')
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

### 2.2 通过 .catch 捕获错误

在 Promise 的链式操作中如果发生了错误，可以使用 Promise.prototype.<font color=red>catch</font> 方法进行捕获和处理

```
import thenFs from 'then-fs'

thenFs
  .readFile('./files/111.txt', 'utf8')
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
  .catch((error) => {
    console.log(error)
  })

```

执行node运行后，错误信息如下：

```
[Error: ENOENT: no such file or directory, open 'D:\Code\Vue3\day1\es601\files\111.txt'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'D:\\Code\\Vue3\\day1\\es601\\files\\111.txt'
}
```

### 2.3 catch提前捕获错误

如果不希望前面的错误导致后续的 .then 无法正常执行，则<font color=red>可以将.catch 的调用提前</font>，示例代码如下

```
import thenFs from 'then-fs'

thenFs
  .readFile('./files/111.txt', 'utf8')
  .catch((error) => {
    console.log(error)
  })
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

说明：

* 捕获readFile发生的错误，并输出错误的消息
* 由于错误已被及时处理，不影响后续.then的正常执行

## 三 Promise.all和Promise.race方法的使用

### 3.1 Promise.all() 方法

Promise.all() 方法会发起并行的 Promise 异步操作，等<font color=red>所有的异步操作全部结束后</font>才会执行下一步的 .then
操作（等待机制）。示例代码如下

```
import thenFs from 'then-fs'

const promiseArr = [
    thenFs.readFile('./files/1.txt', 'utf8'),
    thenFs.readFile('./files/2.txt', 'utf8'),
    thenFs.readFile('./files/3.txt', 'utf8'),
]

Promise.all(promiseArr).then(result=>{
    console.log(result)
})
```

打印结果：

```
[ '111', '222', '333' ]
```

### 3.2 Promise.race() 方法

Promise.race() 方法会发起并行的 Promise 异步操作，<font color=red>只要任何一个异步操作完成，就立即执行下一步的
.then 操作</font>（赛跑机制）。示例代码如下

```
import thenFs from 'then-fs'

const promiseArr = [
    thenFs.readFile('./files/1.txt', 'utf8'),
    thenFs.readFile('./files/2.txt', 'utf8'),
    thenFs.readFile('./files/3.txt', 'utf8'),
]

Promise.race(promiseArr).then(result=>{
    console.log(result)
})
```

打印结果：

```
111
```

## 四 基于Promise封装异步读文件的方法

### 4.1 封装getFile方法

* 方法的名称要定义为 <font color=red>getFile</font>
* 方法接收一个<font color=red>形参 fpath</font>，表示要读取的文件的路径
* 方法的<font color=red>返回值</font>为 Promise 实例对象

### 4.2 getFile 方法的基本定义

```
function getFile(fpath) {
  return new Promise()
}
```

说明： new Promise() 只是创建了一个形式上的异步操作

### 4.3 创建具体的异步操作

如果想要创建<font color=red>具体的异步操作</font>，则需要在new Promise() 构造函数期间，<font color=red>传递一个function 函数，将具体的
异步操作定义到 function 函数内部</font>。示例代码如下

```
function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (error, data) => {
     
    })
  })
}
```

### 4.4 获取 .then 的两个实参

通过 .then() 指定的<font color=red>成功</font>和<font color=red>失败</font>的回调函数，可以在 function 的<font color=red>形参中</font>进行接收，示例代码如下

![][1]

### 4.5 调用 resolve 和 reject 回调函数

Promise <font color=red>异步操作的结果</font>，可以调用 <font color=red>resolve</font> 或<font color=red> reject</font> 回调函数进行处理。示例代码如下

![][2]
完整代码如下

```
import { error } from 'console'
import fs from 'fs'

function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (error, data) => {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

getFile('./files/1.txt').then(
  (r1) => {
    console.log(r1)
  },
  (error) => {
    console.log(error)
  }
)
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-04-promise-resolve-reject.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-04-promise-resolve-reject-deal.png