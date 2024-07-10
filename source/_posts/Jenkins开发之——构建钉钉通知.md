---
title: Jenkins开发之——构建钉钉通知
categories:
  - 开发
  - L-自动化
  - Jenkins
tags:
  - Jenkins
abbrlink: 4e0acf4c
date: 2020-12-17 16:02:25
---
## 一 概述

* Jenkins插件文档
* Jenkins钉钉插件
* 钉钉配置机器人
* Jenkins钉钉配置
* 测试

<!--more-->

## 二 Jenkins插件文档

* [钉钉插件Github][21]
* [钉钉机器人插件文档][22]

## 三 Jenkins钉钉插件

### 3.1 插件

* [dingding-json-pusher][23]
* [dingding-notifications][24]

### 3.2 插件安装

* Jenkins主页——>Manage Jenkins——>Manage Plugins，进入插件管理页面，`高级`选项卡

  ![][1]
  
* 上传插件选项下，分别选择下载的钉钉插件进行上传

  ![][2]
  
* 已安装选项卡，输入`dingding`，可以看到已安装的钉钉插件

  ![][3]

## 四 钉钉配置机器人

* 打开要发送钉钉通知的群，依次找到：群助手—>添加机器人—>自定义机器人

  ![][4]

* 安全设置，选择`自定义关键词`，关键词输入`Jenkins`(可在Jenkins 钉钉插件中配置)，也可设置其他

  ![][5]

* 修改自定义机器人头像和webhook地址(配置Jenkins插件时用)

  ![][6]

## 五 Jenkins钉钉配置

### 5.1 钉钉webhook配置

Jenkins主页，依次点击：Manage Jenkins—>Configure System—>钉钉，打开钉钉配置选项

#### 通知时机

* 构建启动时
* 构建中断时
* 构建失败时
* 构建成功时
* 构建不稳定时
* 未构建时

#### 自定义机器人设置

* id：可以不设置，增加时自动设置
* 名称：机器人别名
* webook：钉钉中添加自定义机器人时的webhook
* 关键字：钉钉机器人中填写的`自定义关键字`
* 加密：钉钉机器人中勾选`加签`后的内容(也可不设置)

![][6]

### 5.2 项目配置

#### 项目开启钉钉构建通知

进入到项目：配置—>General(通用)—>勾选`钉钉机器人`
![][7]

#### 通知人

* 所有勾选@atAll：通知群内所有人
* 指定人：输入框中输入要通知人的手机号(通知人手机号之间用逗号或换行分隔)

![][8]

## 六 测试

### 6.1 系统配置测试

Manage Jenkins—>Configure System—>钉钉—>测试
![][9]

### 6.2 某个项目构建测试

某个项目：执行Build Now和取消编译后收到的通知
![][10]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-manage-plugin-height.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-manage-plugin-upload.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-manage-plugin-installed.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-dingding-robot-jenkins.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-dingding-key-word.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-congif-dingding-robot.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-project-general-dingding-check.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-project-notify-define.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-test-configure-result.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-project-notify-test.png

[21]:https://github.com/jenkinsci/dingtalk-plugin
[22]:https://jenkinsci.github.io/dingtalk-plugin/
[23]:http://updates.jenkins-ci.org/download/plugins/dingding-json-pusher/
[24]:http://updates.jenkins-ci.org/download/plugins/dingding-notifications/