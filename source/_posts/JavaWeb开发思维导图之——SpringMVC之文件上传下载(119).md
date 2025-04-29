---
title: JavaWeb开发思维导图之——SpringMVC之文件上传下载(119)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 439fd747
date: 2025-04-29 09:22:29
---
## 一 概述

* MultipartResolver接口
* 文件上传下载实现
* 注意事项

<!--more-->

## 二 内容详情

### 2.1 MultipartResolver接口

```
1-说明: 该接口定义了文件上传过程中相关操作，并对通用性操作封装
2-底层实现
 -该接口底层实现类CommonsMultipartResovler
 -最终调用了apache的文件上传下载组件
```

### 2.2 文件上传下载实现

```
1-表单页面
 -form中enctype="multipart/form-data"
 -input中的name="file"
2-SpringMVC配置: <bean class="CommonsMultipartResolver"/>
3-控制器
 -public void fileupload(MultipartFile file) //file与input中name相同
 -file.tansferTo(new File("file.png")) //调用transferTo方法
```

### 2.3 注意事项

```
1-文件命名问题，获取上传文件名并解析文件名与扩展名 file.getOriginalFilename()
2-文件名过长问题
3-文件保存路径
4-重命名问题: uuid
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-upload-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-upload-6.png