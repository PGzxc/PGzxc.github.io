---
title: 群晖入门之——Hosts加速(2)
categories:
  - 开发
  - J-NAS
  - 群晖
tags:
  - 群晖
abbrlink: 6d18f0ee
date: 2024-12-26 09:43:52
---
## 一 概述

* 遇到的问题
* hosts文件位置
* hosts文件修改

<!--more-->

## 二 遇到的问题

终端执行如下指令时会出现错误

```
wget -O - https://get.hacs.xyz | bash -
```

图示

![][1]

## 三 hosts文件位置

### 3.1 群晖连接工具

SSH终端工具：MobaXterm

![][2]

### 3.2 host文件位置

```
/etc/hosts
```

图示

![][3]

## 四 hosts文件修改

### 4.1 修改前

```
# Any manual change will be lost if the host name is changed or system upgrades.
127.0.0.1	localhost
::1		localhost
127.0.0.1	Synology1821
::1		Synology1821
```

### 4.2 修改后(sudo vi /etc/hosts)

```
# Any manual change will be lost if the host name is changed or system upgrades.
127.0.0.1	localhost
::1		localhost
127.0.0.1	Synology1821
::1		Synology1821
# GitHub520 Host Start
140.82.113.26                 alive.github.com
140.82.113.5                  api.github.com
185.199.108.153               assets-cdn.github.com
127.56.25.35                  avatars.githubusercontent.com
185.199.110.133               avatars0.githubusercontent.com
185.199.110.133               avatars1.githubusercontent.com
185.199.108.133               avatars2.githubusercontent.com
185.199.108.133               avatars3.githubusercontent.com
185.199.108.133               avatars4.githubusercontent.com
185.199.108.133               avatars5.githubusercontent.com
185.199.110.133               camo.githubusercontent.com
140.82.112.21                 central.github.com
185.199.108.133               cloud.githubusercontent.com
140.82.113.10                 codeload.github.com
140.82.114.22                 collector.github.com
185.199.108.133               desktop.githubusercontent.com
185.199.108.133               favicons.githubusercontent.com
140.82.112.4                  gist.github.com
3.5.30.52                     github-cloud.s3.amazonaws.com
3.5.22.254                    github-com.s3.amazonaws.com
52.216.29.220                 github-production-release-asset-2e65be.s3.amazonaws.com
54.231.172.217                github-production-repository-file-5c1aeb.s3.amazonaws.com
52.217.136.217                github-production-user-asset-6210df.s3.amazonaws.com
192.0.66.2                    github.blog
140.82.114.3                  github.com
140.82.112.17                 github.community
185.199.110.154               github.githubassets.com
151.101.193.194               github.global.ssl.fastly.net
185.199.108.153               github.io
185.199.110.133               github.map.fastly.net
185.199.108.153               githubstatus.com
140.82.112.25                 live.github.com
185.199.108.133               media.githubusercontent.com
185.199.108.133               objects.githubusercontent.com
13.107.42.16                  pipelines.actions.githubusercontent.com
185.199.108.133               raw.githubusercontent.com
185.199.108.133               user-images.githubusercontent.com
140.82.112.22                 education.github.com
185.199.108.133               private-user-images.githubusercontent.com
```

## 五 hosts修改效果

![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-2-host-error-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-2-mobaxterm-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-2-hosts-position-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/qunhui-2-hosts-effect-4.png