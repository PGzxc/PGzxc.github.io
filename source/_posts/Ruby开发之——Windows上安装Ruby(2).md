---
title: Ruby开发之——Windows上安装Ruby(2)
categories:
  - 开发
  - B-高级语言
  - Ruby
tags:
  - Ruby
abbrlink: f0d15c37
date: 2024-12-18 11:09:14
---
## 一 概述

本文介绍在Windows上安装Ruby，[RubyInstaller](http://rubyinstaller.org/)

<!--more-->

## 二  RubyInstaller开发环境

### 2.1 RubyInstaller下载

下载地址: https://rubyinstaller.org/

![][1]

### 2.2 RubyInstaller安装(可能需要科学上网)

1-下载完成后，选择目录

![][2]

2-选择安装组件

![][3]

3-Next后开始安装

![][4]

4-安装MSYS2和开发工具链

![][5]

### 2.3 MSYS2和工具链安装

1-确定后，打开CMD终端，按回车确认

![][6]

2-回车后安装过程

![][7]

3-安装完成后，输入如下指令查看是否成功

```
ruby -v
```

图示

![][8]

## 三 参考

* [益佰教程—Ruby](https://www.yiibai.com/ruby/ruby-vs-python.html)
* [菜鸟教程—Ruby](https://www.runoob.com/ruby/ruby-intro.html)


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-download-page-1.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-install-path-2.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-install-select-3.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-install-installing-4.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-install-completing-5.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-install-cmd-choice-6.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-install-cmd-install-7.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ruby/ruby-2-install-ruby-v-8.png