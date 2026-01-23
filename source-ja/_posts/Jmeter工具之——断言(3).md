---
title: Jmeter工具之——断言(3)
categories:
  - 开发
  - L-自动化
  - Jmeter
tags:
  - Jmeter
abbrlink: b315e246
date: 2024-12-01 10:01:54
---
## 一 概述

断言：让程序自动判断预期结果和实际结果是否一致 

Jmeter中常用断言：

* 响应断言
* JSON断言

<!--more-->

## 二 响应断言

### 2.1 概念

* 作用：对HTTP请求的任意格式的响应结果进行断言
* 位置: 测试计划—>线程组—>HTTP请求—>断言(右键添加)—>响应断言
* 参数：响应代码、响应文本

### 2.2 响应断言示例

```
请求：https://www.baidu.com

检查：让程序检查响应数据中是否包含"百度一下，你就知道"
```

1-在http请求上右键添加响应断言

![][1]

2-响应码配置

选择响应代码和填写代码200(断言结果码)

![][2]

同理，如果结果码为200，填写201后，查看结果树(成功绿色，失败红色)

![][3]

3-响应文本配置

测试字段改为`响应文本`，并将测试模式内容填入`百度一下`(断言内容)

![][4]

正确请求和失败请求后，查看结果树

![][5]

## 三 JSON断言

### 3.1 概念

* 作用：对HTTP请求的JSON格式的响应结果进行断言
* 位置：测试计划—>线程组—>HTTP请求—>断言(右键添加)—>JSON断言

### 3.2 JSON断言示例

```
请求：http://www.weather.com.cn/data/sk/101010100.html
检查：让程序检查响应的JSON数据中，city对应的内容是否为“北京”
```

1-HTTP请求修改

![][6]

执行HTTP请求后，查看结果树用`JSON Path Tester`格式查看, 输入`$.weatherinfo.city`测试

![][7]

2-在http请求上右键添加JSON断言

![][8]

3-Json断言设置

![][9]

4-JSON断言测试(分别填入正确和错误内容)

![][10]



[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-resp-assert-add-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-resp-assert-code-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-resp-assert-result-3.png
[4]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-resp-assert-text-4.png
[5]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-resp-assert-text-result-5.png
[6]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-json-assert-http-6.png
[7]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-json-assert-http-view-7.png
[8]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-json-assert-add-8.png
[9]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-json-assert-set-9.png
[10]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-3-json-assert-result-10.png

