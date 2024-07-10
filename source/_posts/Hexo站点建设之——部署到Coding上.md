---
title: Hexo站点建设之——部署到Coding上
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 7871b3a7
date: 2020-08-15 18:34:59
---

## 一 概述

之前将博客部署到了Github上，但是由于网络的原因导致网站有时候无法访问，这时候的解决办法是将博客部署到两个服务器上，国外访问时使用Github上的项目，国内访问时使用本文介绍的Coding上

<!--more-->

## 二 列表

* hexo博客代码
* [coding][21]

## 三 配置SSH

* 查看`C:\Users\用户名\`下有没有.ssh文件夹(如果有，id_rsa.pub是要设置的)

* 如果没有，执行下面的指令生成SSH

  ```
  ssh-keygen -t rsa -C "你的邮箱" 
  ```

*  接下来几步中系统会要你输入密码 ( **注：不设置密码的可以直接按三次回车** )

  ```
  Enter passphrase (empty for no passphrase):<输入密码>
  Enter same passphrase again:<再次输入密码>
  ```

![][1]
## 四 配置Coding

### 4.1 实名认证(没有实名认证，无法设置静态博客)

* [Cdoing官网][21]登录后，点击右上角下拉列表中的团队管理 

  ![][2]

* 绑定了手机号后，可以进行实名认证了

  ![][3]

* 点击进行实名认证，输入姓名和身份证号

  ![][4]



### 4.2 配置SSH

* 点击右上角下拉列表中的`个人账户设置`，在左侧找到SSH公钥

  ![][5]
  
* 点击右上角的`新增公钥`，将id_rsa.pub中的内容全部copy到`公钥内容`中，公钥名称自定义，并设置期限为`永久有效`
  ![][6]

### 4.3 新建项目

* 点击`创建项目`时，弹出项目模板选择页面(选择DevOps项目)

  ![][7]

* 填写项目创建信息

  ![][8]

* 进入刚刚创建的项目，找到仓库设置，copy SSH下路径(hexo博客设置会用到)

  ![][9]

## 五 配置hexo博客( _config.yml )

### 5.1 配置_config.yml

```
deploy:                                         #部署部分的设置
  type: git
  repository: 
     github: git@github.com:PGzxc/PGzxc.github.io.git(换成你自己的)
     coding: git@e.coding.net:pgzxc/pgzxc/pgzxc.git(换成你自己的)
```

### 5.2 执行hexo 指令

```
hexo clean
hexo g
hexo d
```

![][10]

## 六 Coding部署

* 步骤五执行后，项目下会有部署的代码文件

  ![][11]

* 点击下方的`持续部署`，从列表中找到静态网站(此时的访问地址是无法访问的)

  ![][12]
  
* 点击`立即部署`按钮，再次点击访问地址就可以正常访问了

  ![][13]

## 七 自定义域名（有域名者—阿里云域名解析） 

* 将在coding上的网站添加到域名解析列表中(最好先将github解析暂停，否则会出现解析失败的情况)

  ![][14]

* 在Coding静态网站—>自定义域名，输入要绑定的域名，添加绑定，并强制开启https访问

  ![][15]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-ras-setting.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-auth-disable.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-auth-set-phone-after.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-auth-success.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-ssh-list.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-ssh-setting.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-create-project-devops.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-devops-info.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-ssh-gitcopy.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-deploy-coding.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-code-property-view.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-static-webview-list.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-static-webview-deply-quick.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-aliyun-jiexi.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-yuming-bang-success.png


[21]:https://coding.net/
