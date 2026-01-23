---
title: Jmeter工具之——入门案例(2)
categories:
  - 开发
  - L-自动化
  - Jmeter
tags:
  - Jmeter
abbrlink: ca829da9
date: 2024-11-30 08:57:22
---
## 一 案例说明

使用Jmeter访问百度首页，并查看请求和相应信息 

<!--more-->

## 二 步骤

1. 启动Jmeter
2. 在`测试计划`下添加`线程组`(类似于测试用户)
3. 在`线程组`下添加`HTTP请求`取样器(类似于用户操作)
4. 填写`HTTP请求`的相关请求数据
5. 在`线程组`下添加`查看结果树`监听器(类似于操作结果)
6. 点击`启动`按钮，并查看结果(开始测试)

## 三 操作演示

### 3.1 启动Jmeter，界面如下图

![][1]

### 3.2 在测试计划下添加线程组

1-右键`测试计划`，依次点击：添加—>线程(用户)—>线程组

![][2]

2-点击后，`测试计划`下多出个`线程组`，内容设置如下

![][3]

### 3.3 在线程组下添加HTTP请求取样器(类似于用户操作)

1-在`线程组`上右键，依次点击：添加—>取样器—>HTTP请求

![][4]

2-操作后，线程组下多出HTTP请求(操作)

![][5]

### 3.4 填写HTTP请求的相关请求数据(端口号没有可以不填)

![][6]

### 3.5 在线程组下添加查看结果树监听器(类似于操作结果)

1-在`线程组`上右键，依次点击：线程组—>添加—>监听器—>查看结果树

![][7]

2-结果树添加后如下图(等执行完HTTP请求来查看结果)

![][8]

## 四 点击启动按钮，并查看结果(开始测试)

### 4.1 切换到HTTP请求，点击上方的执行按钮

![][9]

### 4.2 查看测试结果

1-切换到`查看结果树`，找到最近的一个HTTP请求

![][10]

2-结果树，切换到`请求`，查看请求发送

![][11]

2-结果树，切换到`响应数据`，查看响应结果

![][12]

## 五 清除结果树请求数据(点击图示图标)

![][13]



[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-start-view-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-add-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-set-3.png
[4]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-http-add-4.png
[5]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-http-show-5.png
[6]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-http-set-6.png
[7]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-result-add-7.png
[8]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-result-show-8.png
[9]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-http-run-9.png
[10]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-result-tree-10.png
[11]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-result-request-11.png
[12]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-result-response-12.png
[13]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-2-thread-clear-data-13.png