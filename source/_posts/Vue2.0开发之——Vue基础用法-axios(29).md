---
title: Vue2.0开发之——Vue基础用法-axios(29)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: b02a2890
date: 2022-12-01 09:25:03
---
## 一 概述

* axios-使用axios发起基本的Get请求
* axios-结合async和await调用axios
* axios-使用解构赋值
* axios-基于axios.get和axios.post发起请求

<!--more-->

## 二 axios-使用axios发起基本的Get请求

### 2.1 axios介绍

axios(发音：艾克C奥斯)是前端圈最火的、<font color=red>专注于数据库请求</font>的库

![][1]

在后面的Vue、React种都使用axios来请求数据

中文官网地址：http://www.axios-js.com

英文官网地址：https://www.npmjs.com/package/axios

### 2.2 axios的基本语法

```
axios({
      method: 'GET',// 请求方式
      url: 'http://www.liulongbin.top:3006/api/getbooks',   // 请求的地址
      // URL 中的查询参数
      params: {
        id: 1
      },
      // 请求体参数
      data: {}
    }).then(function (result) {
      console.log(result)
    })
```

### 2.3 axios发起Get请求

vue请求代码

```
axios({
      method: 'GET',// 请求方式
      url: 'http://www.liulongbin.top:3006/api/getbooks',   // 请求的地址
      // URL 中的查询参数
      params: {
        id: 1
      },
      // 请求体参数
      data: {}
    }).then(function (result) {
      console.log(result)
    })
```

请求结果(打印)
![][2]

## 三 axios-结合async和await调用axios

### 3.1 说明

* 如果调用某个方法的返回值是 Promise 实例，则前面可以添加 await！
* await 只能用在被 async “修饰”的方法中

### 3.2 示例

布局文件代码

```
<button id="btnPost">发起POST请求</button>
```

vue代码

```
document.querySelector('#btnPost').addEventListener('click', async function () {
      const result = await axios({
        method: 'POST',
        url: 'http://www.liulongbin.top:3006/api/post',
        data: {
          name: 'zs',
          age: 20
        }
      })
      console.log(result)
    })
```

打印结果

![][3]

## 四 axios-使用解构赋值

### 4.1 解构赋值过程(解构赋值的时候，使用 : 进行重命名)

1. 调用 axios 之后，使用 async/await 进行简化
2. 使用解构赋值，从 axios 封装的大对象中，把 data 属性解构出来
3. 把解构出来的 data 属性，使用 冒号 进行重命名，一般都重命名为 { data: res }

### 4.2 解构示例

布局文件代码

```
 <button id="btnPost">发起POST请求</button>
 <button id="btnGet">发起GET请求</button>
```

vue代码

```
document.querySelector('#btnPost').addEventListener('click', async function () {
      const { data } = await axios({
        method: 'POST',
        url: 'http://www.liulongbin.top:3006/api/post',
        data: {
          name: 'zs',
          age: 20
        }
      })
      console.log(data)
    })

document.querySelector('#btnGet').addEventListener('click', async function () {
      const { data: res } = await axios({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/getbooks'
      })
      console.log(res.data)
    })
```

## 五 axios-基于axios.get和axios.post发起请求

### 5.1 代码

```
<body>
  <button id="btnGET">GET</button>
  <button id="btnPOST">POST</button>

  <script src="./lib/axios.js"></script>
  <script>
    document.querySelector('#btnGET').addEventListener('click', async function () {
      /* axios.get('url地址', {
        // GET 参数
        params: {}
      }) */

      const { data: res } = await axios.get('http://www.liulongbin.top:3006/api/getbooks', {
        params: { id: 1 }
      })
      console.log(res)
    })

    document.querySelector('#btnPOST').addEventListener('click', async function () {
      // axios.post('url', { /* POST 请求体数据 */ })
      const { data: res } = await axios.post('http://www.liulongbin.top:3006/api/post', { name: 'zs', gender: '女' })
      console.log(res)
    })
  </script>
</body>
```

### 5.2 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-29-axios-package.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-29-axios-get-result.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-29-axios-post-sample.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-29-axios-get-post-sample.gif