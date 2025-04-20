---
title: Python开发之——开发中遇到的问题及解决办法
categories:
  - 开发
  - G-后端开发
  - Python
tags:
  - Python
abbrlink: 7d3c56a9
date: 2025-04-20 16:57:46
---
## 一 概述

```
1.ModuleNotFoundError:No module named pip
2.ERROR: No matching distribution found for pymobiledevice3==2.30.0
```

<!--more-->

## 二 问题

### 2.1 ModuleNotFoundError:No module named pip

一、错误现象

```
ModuleNotFoundError:No module named pip
```

二、解决方案

1-安装pip模块

```
python3 -m ensurepip
```

2-升级pip版本

```
python -m pip install --upgrade pip
```

### 2.2 ERROR: No matching distribution found for pymobiledevice3==2.30.0

一、现象

```
ERROR: Could not find a version that satisfies the requirement pymobiledevice3==2.30.0 (from versions: none)
ERROR: No matching distribution found for pymobiledevice3==2.30.0
```

二、原因

```
默认pip是使用Python官方的源，但是由于国外官方源经常被墙，导致不可用，
我们可以使用国内的Python镜像源，从而解决Python安装不上库的烦恼
```

三 、解决办法

安装指令

```
pip install xxx -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
```

说明：

```
1.pip install 表示通过pip安装某种包
2.xxx 表示你要安装的包名，比如pipenv,jupyter等等
3.-i http://pypi.douban.com/simple 表示将镜像地址切换为国内，这里切换到豆瓣
4.--trusted-host pypi.douban.com 表示将指定网站设置为信任服务器
```

常用的镜像地址

```
http://mirrors.aliyun.com/pypi/simple/ 阿里云
https://pypi.mirrors.ustc.edu.cn/simple/ 中国科技大学
http://pypi.douban.com/simple/ 豆瓣
https://pypi.tuna.tsinghua.edu.cn/simple/ 清华大学
http://pypi.mirrors.ustc.edu.cn/simple/ 中国科学技术大学
```

## 三 参考

* [CSDN—ModuleNotFoundError:No module named pip](https://blog.csdn.net/QHwanzhi/article/details/144137431)
* [Stack Overflow](https://stackoverflow.com/questions/18363022/error-running-pip-install-importerror-no-module-named-pip)
* [CSDN—pip install第三方包](https://blog.csdn.net/qq_37344125/article/details/102649897)