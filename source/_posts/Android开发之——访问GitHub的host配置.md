---
title: Android开发之——访问GitHub的host配置
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Github加速
abbrlink: af17ad02
date: 2024-07-23 11:25:15
---
## 一 概述

* host位置
* github配置host

<!--more-->

## 二 host位置

hosts 文件在每个系统的位置不一，详情如下：

```
Windows 系统：C:\Windows\System32\drivers\etc\hosts
Linux 系统：/etc/hosts
Mac（苹果电脑）系统：/etc/hosts或/usr/local
Android（安卓）系统：/system/etc/hosts
iPhone（iOS）系统：/etc/hosts
```

## 三 github配置host

```
# Github Hosts
# domain: github.com
20.205.243.166 github.com
20.205.243.165 nodeload.github.com
20.205.243.168 api.github.com
20.205.243.165 codeload.github.com
185.199.111.133 raw.github.com
185.199.111.153 training.github.com
185.199.111.153 assets-cdn.github.com
185.199.110.153 documentcloud.github.com
140.82.114.17 help.github.com
 
# domain: githubstatus.com
185.199.111.153 githubstatus.com
 
# domain: githubusercontent.com
185.199.110.133 raw.githubusercontent.com
185.199.111.154 pkg-containers.githubusercontent.com
185.199.110.133 cloud.githubusercontent.com
185.199.110.133 gist.githubusercontent.com
185.199.110.133 marketplace-screenshots.githubusercontent.com
185.199.110.133 repository-images.githubusercontent.com
185.199.110.133 user-images.githubusercontent.com
185.199.110.133 desktop.githubusercontent.com
185.199.110.133 avatars.githubusercontent.com
185.199.110.133 avatars0.githubusercontent.com
185.199.110.133 avatars1.githubusercontent.com
185.199.110.133 avatars2.githubusercontent.com
185.199.110.133 avatars3.githubusercontent.com
185.199.110.133 avatars4.githubusercontent.com
185.199.110.133 avatars5.githubusercontent.com
185.199.110.133 avatars6.githubusercontent.com
185.199.110.133 avatars7.githubusercontent.com
185.199.110.133 avatars8.githubusercontent.com
199.59.148.202 github.global.ssl.fastly.net
# End of the section
```

## 四 刷新激活生效

```
Windows：在 CMD 窗口输入：ipconfig /flushdns

Linux 命令：sudo nscd restart，如报错则须安装：sudo apt install nscd 或 sudo /etc/init.d/nscd restart

Mac 命令：sudo killall -HUP mDNSResponder
```

## 五 参考

* [博客园—获取IP地址](https://www.cnblogs.com/jiayouba/p/15602175.html)
* [GitHub520](https://github.com/521xueweihan/GitHub520)
* [CSDN-访问GitHub的host配置](https://blog.csdn.net/lfl_web_foreEnd/article/details/128312680)