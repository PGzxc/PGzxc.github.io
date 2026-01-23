---
title: HarmonyOS第一课——从网络获取数据(7)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 79049dff
date: 2023-11-26 09:09:39
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-在http模块中，多个请求可以使用同一个httpRequest对象，httpRequest对象可以复用 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

注解：[http.createHttp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-http-V5)

```
每一个HttpRequest对象对应一个HTTP请求。
如需发起多个HTTP请求，须为每个HTTP请求创建对应HttpRequest对象
```

2-使用http模块发起网络请求后，可以使用destroy()方法中断网络请求 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

3-Web组件onConfirm(callback:(event?{url:string; message: string; result: JsResult })=> boolean)事件，返回false时触发网页默认弹窗 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

注解：[onConfirm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-basic-components-web-V5#onconfirm)

```
当回调返回false时，函数中绘制的自定义弹窗无效
```

### 2.2 单选题

1-使用http发起网络请求，需要以下哪种权限? <font color=red>(B)</font>

```
A-ohos.permission.USE_BLUETOOTH
B-ohos.permission.INTERNET
C-ohos.permission.REQUIRE_FORM
D-ohos.permission.LOCATION
```

2-问服务器提交表单数据，以下哪种请求方式比较合适? <font color=red>(B)</font>

```
A-RequestMethod.GET
B-RequestMethod.POST
C-RequestMethod.PUT
D--RequestMethod.DELETE
```

3-下列关于Web组件的属性，描述错误的是？<font color=red>(C)</font>

```
A-设置是否开启应用中文件系统的访问，默认启用。$rawfile(filepath/filename)中rawfile路径的文件不受该属性影响而限制访问
B-imageAccess设置是否允许自动加载图片资源，默认允许
C-javaScriptAccess设置是否允许执行JavaScript脚本，默认不允许执行
D-zoomAccess设置是否支持手势缩放，默认允许执行缩放
```

注解：

```
javaScriptAccess，设置是否允许执行JavaScript脚本，默认允许执行
```

4-关于请求返回的响应码ResponseCode，下列描述错误的是？<font color=red>(D)</font>

```
A-ResponseCode.OK的值为200，表示请求成功。一般永固GET和POST请求
B-ResponseCode.NOT_FOUND的值为404，表示服务器无法根据客户端的请求找到资源(网页)
C-ResponseCode.INTERNAL_ERROR的值为500，表示服务器内部错误，无法完成请求
D-ResponseCode.GONE的值为404，表示客户端请求的资源已经不存在
```

注解：[ResponseCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-http-V5#responsecode)

```
与B冲突，404表示资源不存在
```

### 2.3 多选题

1-web组件支持下列哪些属性或事件？<font color=red>(ABD)</font>

```
A-fileAccess(fileAccess:boolean)
B-javaScriptAccess(javaScriptAccess;boolean)
C-on(type:'headerReceive',callback:AsyncCallback<Object>:void)
D-onConfirm(callback:(event?:{url:string; message:string; result:JsResult})=>boolean)
E-destory():void
```

注解：

```
1-on(type:'headerReceive'--网络请求，订阅HTTP Response Header 事件
2-destory：生命周期，应用销毁
```

2-关于http模块描述正确的是？<font color=red>(ABCD)</font>

```
A-http请求支持get、post、put等常用的请求方式
B-可以使用on('headersReceiver')订阅请求响应头
C-post请求的参数可以在extraData中指定
D-执行createHttp成功后，返回一个httpRequest对象，里面包括request、destory、on和off方法
```

3-关于Web组件描述正确的是？<font color=red>(ABCD)</font>

```
A-Web组件是提供具有网页显示能力的一种组件
B-Web组件传入的地址可以是本地资源也可以是网络资源
C-WebControler可以控制Web组件的各种行为，例如网页的前进、后退等功能
D-当访问在线网页时，需添加网络权限
```

## 三 随堂测试截图

1-判断题

![][1]

2-单选题

![][2]

3-多选题

![][3]

4-随堂测试截图

![][4]

## 四 随堂测试证书

![][5]

## 五 思维导图

![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson7-choice-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson7-single-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson7-multiple-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson7-result-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson7-centify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson7-xmind.png