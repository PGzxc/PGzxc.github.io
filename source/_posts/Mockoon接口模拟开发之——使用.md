---
title: Mockoon接口模拟开发之——使用
categories:
  - 开发
  - G-后端开发
  - 接口
  - Mockoon
tags:
  - Mockoon
abbrlink: be3c48ab
date: 2021-06-16 15:01:59
---
## 一 概述

* 接口模拟请求
* 请求头
* 请求路由
*  路由响应

<!--more-->

## 二 接口模拟请求

### 2.1 请求设置

![][1]

### 2.2 运行并请求

* 点击左上角的Start按钮，启动项目
* 点击users右侧的右上箭头，在浏览器中打开访问或通过postman访问

### 2.3 访问及返回

访问地址：https://localhost:3000/users

返回结果：

```
{
  code:200,
  message:"成功",
  user:{id:1, sex:"男",age:18}
}
```
## 三 请求头

### 3.1 默认请求头

点击Setting，Environment headers是API统一的请求头

![][2]

### 3.2 添加统一请求头(如Connection)

点击Add header后，在name输入框中输入`Connection`，在value输入框中输入`keep-alive`

![][3]

### 3.3 给某个接口添加单独Head属性(token)

点击Add header后，在name输入框中输入`X-Csrf-Token`，在value输入框中输入`29e908dbbb2949138dd48a47e586f355`

![][4]

### 3.4 请求效果
![][5]

## 四 请求路由

### 4.1 路由前缀 

* 修改请求路由后，访问地址会发生变化

* 请先停止服务，修改完成后再重新启动

  ```
  * 修改前：https://localhost:3000/users
  * 修改后：https://localhost:3000/myprefix/users
  ```

![][6]

### 4.2 路由参数

#### 4.2.1 请求参数设置

```
https://localhost:3000/:paramName1/:paramName2/users
```

#### 4.2.2 路由请求示例

```
https://localhost:3000/1/2/users
```

即

```
paramName1: 1
paramName2: 2
```

### 4.3 请求效果

![][7]

## 五 路由响应

### 5.1 路由响应

通过actions添加一个route后，默认只有200响应

![][8]

点击add Response，依次添加404和500响应，并将code分别设置为404和500

```
{
  code:404
}
```

设置响应为随机响应或序列响应

![][9]

### 5.2 路由规则

点击Rules，添加userName和passWord，选择AND选项
![][10]

请求示例
![][11]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-api-request-user-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-head-setting-default.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-head-common-add-connection.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-head-api-add-token.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-head-request-response.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-route-add-request.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-route-params-sample.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-route-add-one-200.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-route-response-random-sequen.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-route-rules-setting.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mockoon-route-rules-sample.png