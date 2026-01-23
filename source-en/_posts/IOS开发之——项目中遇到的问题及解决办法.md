---
title: IOS开发之——项目中遇到的问题及解决办法
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 4011052a
date: 2018-07-08 22:50:41
---
## 一 概述

本文介绍IOS开发中遇到的问题及解决办法，并长期更新

<!--more-->

## 二 问题及解决办法

### 2.1 Ignoring ffi-1.14.2 because its extensions are not built

#### 错误现象

```
Ignoring ffi-1.14.2 because its extensions are not built. Try: gem pristine ffi --version 1.14.2
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/user_interface/error_report.rb:34:in `force_encoding': can't modify frozen String (FrozenError)
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/user_interface/error_report.rb:34:in `report'
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/command.rb:66:in `report_error'
	from /Library/Ruby/Gems/2.6.0/gems/claide-1.0.3/lib/claide/command.rb:396:in `handle_exception'
	from /Library/Ruby/Gems/2.6.0/gems/claide-1.0.3/lib/claide/command.rb:337:in `rescue in run'
	from /Library/Ruby/Gems/2.6.0/gems/claide-1.0.3/lib/claide/command.rb:324:in `run'
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/command.rb:52:in `run'
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/bin/pod:55:in `<top (required)>'
	from /usr/local/bin/pod:23:in `load'
	from /usr/local/bin/pod:23:in `<main>'
```

#### 解决办法

根据提示安装对应版本的ffi

```
sudo gem pristine ffi --version 1.14.2
```

### 2.2 Library/Ruby/Gems/2.6.0/gems/cocoapods...

#### 现象

```
macbook-pro-zxc:AFDemo zxc$ pod init
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/user_interface/error_report.rb:34:in `force_encoding': can't modify frozen String (FrozenError)
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/user_interface/error_report.rb:34:in `report'
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/command.rb:66:in `report_error'
	from /Library/Ruby/Gems/2.6.0/gems/claide-1.0.3/lib/claide/command.rb:396:in `handle_exception'
	from /Library/Ruby/Gems/2.6.0/gems/claide-1.0.3/lib/claide/command.rb:337:in `rescue in run'
	from /Library/Ruby/Gems/2.6.0/gems/claide-1.0.3/lib/claide/command.rb:324:in `run'
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/command.rb:52:in `run'
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/bin/pod:55:in `<top (required)>'
	from /usr/local/bin/pod:23:in `load'
	from /usr/local/bin/pod:23:in `<main>'
```

#### 解决办法

将Project Format从`Xcoce 14.0-compatible`设置为`Xcode 13.0-compatible`

![][1]

### 2.3 Framework not found xxx

#### 错误现象

```
Framework not found AFNetworking
```

#### 解决办法

使用Xcode打开`xxx.xcworkspace`而不是`xxx.xcodeproj`

### 2.4 File not found: .../usr/lib/arc/libarclite_iphonesimulator.a

#### 错误现象

```
File not found: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/arc/libarclite_iphonesimulator.a
```

#### 解决办法

[下载arc文件夹](https://pan.baidu.com/s/1_x_o5IEWoXM9yd-gHYLHUA?pwd=vufm) 解压缩或者从旧版本 **Xcode** 复制并将 **arc文件夹** 拷贝到

```
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/
```

## 三 参考

* [Xcode14.3 File not found libarclite_iphonesimulator.a and libarclite_iphoneos.a](https://www.wangquanwei.com/1199.html)
* [Ignoring ffi-1.14.2 because its extensions](https://www.jianshu.com/p/f91e0b388e6b)

  



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-error-project-format.png
