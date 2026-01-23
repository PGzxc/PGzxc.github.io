---
title: Jenkins开发之——基于SVN构建项目
categories:
  - 开发
  - L-自动化
  - Jenkins
tags:
  - Jenkins
abbrlink: cb488712
date: 2020-12-16 17:41:52
---
## 一 概述

* 项目准备阶段
* 创建项目
* 项目配置(SVN代码管理)
* 编译项目

<!--more-->

## 二 项目准备阶段

### 2.1 说明

* SVN项目(要导入的项目)
* SVN登录凭证(账户和密码登录)
* Jenkins安装SVN插件

### 2.2 示例

* 项目地址：https://192.168.200.142/svn/SoftManager

* 登录凭证

  ```
  用户名：zxc
  密码：123456
  ```
  
* Jenkins安装SVN插件

  ![][1]
## 三 创建项目

* 登录Jenkins后，界面如图所示

  ![][2]
  
* 点击窗口左端的`新建Item`，进入任务创建选择界面

  ```
  项目名称：根据要导入的项目，输入项目名称
  项目样式：本次选择Freestyle project
  ```
  
  ![][3]

## 四 项目配置

### 4.1 General(通用)

勾选：Use Svn-Partial Release Manager(使用SVN部分发布管理)

![][4]

### 4.2 源码管理

#### Repository URL(项目SVN地址)

```
https://192.168.200.142/svn/SoftManager
```

#### Credentials(添加信用凭证)

* 点击Credentials的添加选项

  ![][5]
  
* 在弹出的添加窗口中，选择`类型`，并填入`用户名`和`密码`

  ![][6]
  
* 完整的svn配置如下(为保证及时获取更新Repository URL@HEAD)

  ![][7]
### 4.3 构建触发器

#### [SCM][21]

* Software configuration management 
* 软件配置管理(SCM)是指通过执行版本控制、变更控制的规程，以及使用合适的配置管理软件，来保证所有配置项的完整性和可跟踪性。

#### 日程表配置

##### MINUTE HOUR DOM MONTH DOW

* `MINUTE`：分钟，取值0~59
* `HOUR`：小时，取值0~23
* `DOM`：一月中的哪一天，取值1~31
* `MONTH`：哪个月，取值1~12
* `DOW`：一周中的哪一天，取值0~7

##### 多值设定

* `*`：任意值
* `M-N`：最小值M，最大值N，M到N之间的值
* `M-N/X`：M到N之间，每间隔X周期取值
* `*/X`：每间隔X周期取值
* `A,B,...,Z`：枚举值

##### 示例

* `H H(0-7) * * *`：从12:00AM到7:59之间的时间点执行操作
* 常量值：@yearly`, `@annually`, `@monthly`, `@weekly`, `@daily`, `@midnight`, and `@hourly
* `H/15 * * * *`：一小时内没间隔15分钟执行一次操作，如第7分钟、22分钟、37分钟、52分钟，没有指定开始时间为随机时间
* `H(0-29)/10 * * * *`：半小时内，没间隔10分钟执行一次操作，如第4分钟、14分钟、24分钟，没有指定开始时间为随机时间
* `45 9-16/2 * * 1-5`：从9:00AM到16:59PM之间，开始时间为9:00+45即(9:45)开始，每次间隔2小时，从周1到周5
* `H H(8-15)/2 * * 1-5`：从8:00AM到下午15:59之间，每次间隔2小时，开始时间为正小时，周1到周5
* `H H 1,15 1-11 *`：从1月到11月，每个月的1到15日执行

##### 时区相关
###### 时区设置

* 通过TZ指定时区，如`TZ=Asia/Shanghai`
* 国内时区：`Asia/Chongqing`、`Asia/Hong_Kong`、`Asia/Shanghai`

###### 示例(上海时间8点执行)

```
 TZ=Asia/Shanghai`
 H 8 * * *
```

### 4.4 构建

* 选择`Use Gradle Wrapper`选项卡

* `Root Build script`设置为：`${workspace}/app`

* ` Build File`设置为`${workspace}/app/build.gradle`

* Tasks(打包输出)

  ```
  clean
  assembleRelease
  ```

## 五 编译项目

* 进入到项目，选择左侧的`Build Now`进行编译

  ![][8]
  
* 从下面的构建历史中选择刚才的项目标签进入构建状态查询

  ![][9]
  
* 工作空间查看输出的apk

  ![][10]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-svn-plugin-svn-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-svn-login-main-board.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-svn-create-freestyle-project.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-svn-general-select.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-svn-credentials-add.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-svn-credentials-username-password.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-svn-source-subversion-config.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-project-build-now.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-build-tag-view.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-build-output-apk.png




[21]:https://baike.baidu.com/item/scm/2039966?fr=aladdin