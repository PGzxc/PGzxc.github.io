---
title: Ruby开发之——Mac上安装Ruby(3)
categories:
  - 开发
  - B-高级语言
  - Ruby
tags:
  - Ruby
abbrlink: 9746b272
date: 2024-12-19 09:15:24
---
## 一 概述

* 查看是否安装的Ruby
* 更新Ruby
* 安装Ruby

<!--more-->

## 二 查看是否安装的Ruby

###  2.1 输入以下指令查看是否安装Ruby

```
ruby -v
```

图示

![][1]

## 三 更新Ruby

### 3.1 更新Homebrew

```
brew update
```

图示

![][2]

### 3.2 更新所有软件包

```
brew upgrade
brew upgrade ruby
```

## 四 安装Ruby

### 4.1 执行安装指令

```
brew install ruby
```

图示

![][3]

### 4.2 添加环境变量

```
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> /Users/zxc/.bash_profile

export LDFLAGS="-L/usr/local/opt/ruby/lib"
export CPPFLAGS="-I/usr/local/opt/ruby/include"

export PKG_CONFIG_PATH="/usr/local/opt/ruby/lib/pkgconfig"

brew cleanup ruby
```

### 4.3 查看ruby版本

```
ruby -v
```

图示

![][4]

## 五 参考

* [Homebrew](https://brew.sh)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-3-mac-ver-view-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-3-mac-homeb-update-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-3-mac-homeb-install-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-3-mac-homeb-newv-4.png