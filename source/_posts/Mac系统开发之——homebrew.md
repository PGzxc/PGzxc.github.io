---
title: Mac系统开发之——homebrew
categories:
  - 系统
  - Mac
tags:
  - homebrew
abbrlink: b6fbd68c
date: 2020-02-09 11:54:10
---
## 一 概述

brew 是 Mac 下的一个包管理工具，类似于 centos 下的 yum，可以很方便地进行安装/卸载/更新各种软件包，例如：nodejs, elasticsearch, kibana, mysql, mongodb 等等，可以用来快速搭建各种本地环境，程序员必备工具。
<!--more-->

## 二 安装brew
* [homebrew网站地址][1]
	![][11]
	
* 将下面的指令复制到终端，并回车

  ```
  /usr/bin/ruby -e "$(curl -fsSL https://cdn.jsdelivr.net/gh/Homebrew/install/master/install)"
  ```

* 出现如下界面时，按回车键确认安装

  ![][12]
  
* 安装结束后，出现`==> Installation successful!`表示安装成功

  ![][13]

## 三 常见操作(以wget软件为例)

|                 操作                 |             命令             |
| :----------------------------------: | :--------------------------: |
|             更新Homebrew             |         brew update          |
|        更新所有安装过的软件包        |         brew upgrade         |
|           更新指定的软件包           |      brew upgrade wget       |
|              查找软件包              |       brew search wget       |
|              安装软件包              |      brew install wget       |
|              卸载软件包              |       brew remove wget       |
|          列出已安装的软件包          |          brew list           |
|            查看软件包信息            |        brew info wget        |
|         列出软件包的依赖关系         |        brew deps wget        |
|         列出可以更新的软件包         |        brew outdated         |
|         锁定某个包(跳过更新)         |        brew pin wget         |
|               取消锁定               |       brew unpin wget        |
|          清理所有包的旧版本          |         brew cleanup         |
|          清理指定包的旧版本          |      brew cleanup wget       |
| 查看可清理的旧版本包，不执行实际操作 |       brew cleanup -n        |
|     查看已安装包的依赖，树形显示     | brew deps --installed --tree |

## 四 卸载brew

### 4.1 方法一

```
ruby -e "$(curl -fsSL https://cdn.jsdelivr.net/gh/Homebrew/install/master/uninstall)"
```

### 4.2 方法二

下载卸载脚本 [uninstall script](https://cdn.jsdelivr.net/gh/Homebrew/install/master/uninstall) 并执行卸载操作.如要查看更多卸载相关操作查看 `./uninstall --help` 

## 五 卸载旧版本安装包

### 5.1 卸载旧版本

```
brew cleanup
sudo brew cleanup --prune=all  
```

### 5.2 可能出现的问题

```
==> This operation has freed approximately 1.8GB of disk space.
Error: Could not cleanup old kegs! Fix your permissions on:
  /usr/local/Cellar/node@16/16.15.0
  /usr/local/Cellar/ruby/3.2.2_1
```

### 5.3 解决办法

```
sudo chown -R "$USER":admin /usr/local/Cellar/node@16/16.15.0
sudo chown -R "$USER":admin /usr/local/Cellar/ruby/3.2.2_1
```

## 六 参考

* [Homebrew Documentation](https://docs.brew.sh/)
* [Homebrew](https://brew.sh/)
* [Mac必备神器Homebrew][2]


[1]:https://brew.sh/index_zh-cn
[2]:https://zhuanlan.zhihu.com/p/59805070

[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-websit.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-install-progress.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-install-success.png