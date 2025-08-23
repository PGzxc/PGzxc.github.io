---
title: Jmeter工具之——关联(5)
categories:
  - 开发
  - L-自动化
  - Jmeter
tags:
  - Jmeter
abbrlink: abd25e3
date: 2024-12-03 09:07:51
---
## 一 概述

关联：当请求之间有依赖关系，比如一个请求的入参是另一个请求返回的数据，这时候就需要用到关联处理。Jmeter中常用的关联方法。

* JSON提取器
* 正则表达式提取器

<!--more-->

![][1]

## 二 JSON提取器

### 2.1 概念

* 作用：针对JSON格式的响应结果数据进行提取
* 位置：添加方式：测试计划—>线程组—>HTTP请求—>后置处理器(添加)—>JSON提取器
* 参数：
  - Name of created variables: 存放提取出的值的参数名称
  - JSON Path Expressions: JSON路径表达式
  - Match No: 如果JSON路径匹配出许多结果，则可以选择提取哪个。0表示随机；-1表示提取所有结果；1表示第一个值
  - Default Values: 参数的默认值

图示

![][2]

### 2.2  JSON提取器示例

```
1. 请求获取天气的接口: http://www.weather.com.cn/data/sk/101010100.html, 获取返回结果中的城市名称“北京”
2.请求: https://www.baidu.com/?wd=北京, 把获取到的城市名称作为请求参数
```

#### 操作步骤

* 添加线程组
* 添加HTTP提取器
* 添加JSON提取器
* 添加HTTP请求-百度
* 添加查看结果树

#### 示例

1-测试计划添加线程组(执行者)

![][3]

2-添加两个HTTP网络请求

| 查询天气HTTP | 百度搜索HTTP |
| :----------: | :----------: |
|    ![][4]    |    ![][5]    |

3-添加`查看结果树`

![][6]

4-在`查询天气`上右键，添加后置JSON提取器

![][7]

5-JSON提取器配置(查询天气的结果中，提取city名字命名为city)

![][8]

6-另一个接口`百度搜索`使用JSON提取器中的变量

![][9]

7-执行后，`查看结果树`中`百度搜索`使用了`查询天气`接口中的city名字

![][10]




[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-interface-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-param-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-thread-add-3.png
[4]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-http-weather-4.png
[5]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-http-baidu-5.png
[6]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-result-add-6.png
[7]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-weather-after-add-7.png
[8]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-weather-after-config-8.png
[9]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-weather-after-use-9.png
[10]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-5-relate-result-10.png