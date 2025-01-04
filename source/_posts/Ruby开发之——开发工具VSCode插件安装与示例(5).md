---
title: Ruby开发之——开发工具VSCode插件安装与示例(5)
categories:
  - 开发
  - B-高级语言
  - Ruby
tags:
  - Ruby
abbrlink: 8602eb10
date: 2025-01-04 09:21:06
---
## 一 概述

* Ruby开发环境
* Plugins插件安装
* Ruby的第一个示例

<!--more-->

## 二 Ruby开发环境

### 2.1 运行系统

* 推荐使用MacOS、Linux开发环境；
* 不推荐Windows

### 2.2 开发环境

* Ruby : ruby -v查看

## 三 Plugins插件安装

1-打开VSCode，点击左侧的Extensions, 搜索Ruby(Ruby上标记叉号已过时)

![][1]

2-安装完成后

![][2]

## 四 Ruby的第一个示例

### 4.1 创建新项目

1-在本地创建一个空白文件夹目录，使用VSCode打开

![][3]

### 4.2 创建ruby文件

1-点击文件创建图标，输入完整文件名(hello.rb)

![][4]

### 4.3 运行项目

1-在文件中输入如下代码

```
puts "Hello Ruby !"
```

2-在代码中右键，`RunSelected Text In Active Terminal`，查看结果

![][5]

## 五 参考

* [菜鸟教程—Ruby](https://www.runoob.com/ruby/ruby-tutorial.html)
* [易百教程—第一个HelloWorld](https://www.yiibai.com/ruby/helloworld.html)
* [Intellij IDEA-Ruby](https://www.jetbrains.com/help/idea/2024.1/ruby-plugin.html)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-5-vs-ext-search-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-5-vs-ext-install-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-5-vs-open-view-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-5-vs-create-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-5-vs-run-5.png
