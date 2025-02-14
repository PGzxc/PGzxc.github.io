---
title: 通义千问开发之——IDEA集成并使用(1)
categories:
  - 开发
  - Q-AI
  - 通义千问
tags:
  - 通义千问
abbrlink: fd163fb6
date: 2025-02-14 17:30:41
---
## 一 开发准备

* 通义千问账号(已注册)
* IDEA软件
* IDEA插件(通义千问)

<!--more-->

## 二 IDEA插件(通义千问)安装

1-依次点击：File—>Settings—>Plugins打开插件市场

![][1]

2-插件市场输入`tongyi`，并安装

![][2]

## 三 配置通义千问账号

1-插件安装完成后，点击右侧的通义千问图标进行登录

![][3]

2-跳转网页进行登录

![][4]

3-登录成功后，IDEA可以正常输入访问

![][5]

## 四 使用通义千问进行开发

### 4.1 新建Java项目

![][6]

### 4.2 使用通义千问对Java项目修改

1-将Main文件拖入通义千问窗口，并提出修改需求

```
#Main.java 这是Java Main文件，帮我修改成冒泡排序
```

图示

![][7]

2-确认无误后，点击插入按钮替换代码

![][8]

### 4.3 运行效果图

![][9]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-plugin-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-plugin-install-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-right-plugin-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-login-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-login-view-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-java-project-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-java-promit-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-java-modify-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tongyi-1-idea-java-run-9.png

