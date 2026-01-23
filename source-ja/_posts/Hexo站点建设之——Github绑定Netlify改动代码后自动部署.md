---
layout: post
title: Hexo站点建设之——Github绑定Netlify改动代码后自动部署
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: e9afa1d2
date: 2020-11-01 23:58:41
---
## 一 Hexo部署的过程

基于Github可以快速搭建hexo静态博客，但是每次都需要在本地执行

* hexo new (post) 文章标题：创建文章标题
* hexo generate：将源代码编译成静态代码
* hexo server：本地预览
* hexo deploy：将本地静态代码推送到github pages

经过上述指令部署到github上之后，才能访问

<!--more-->

## 二  为何使用Netlify

 什么是Netlify？Netlify是一家国外的静态网站的托管平台，提供免费的https，自动化部署和升级，可以监控GitHub、GitLab或者Bitbucket做到自动更新发布，是不是很赞！这也是为什么现在选择Netlify的原因，至于以后Netlify怎么发展只能再议 

Netlify的出现解决了这个问题： 本地运行Hexo程序创建文章、程序修改等，将修改后的代码提交到GitHub，然后通过Netlify自动获取GitHub上的更新、部署、发布，这样就形成了一套自动更新部署发布的静态博客网站 

## 三 如何使用

### 3.1 注册Netlify(需要外网访问)

* 打开Netlify官网[https://www.netlify.com][21]， 然后点击右上角Sign up注册账号 
  ![][1]
* 在第三方登录列表中，选择Github登录方式
  ![][2]
* 登录授权认证确认
  ![][3]
  
### 3.2 创建新站点
* 授权成功后如图所示，点击New site from Git创建新站点
  ![][4]
* 选择要Depolyment的仓库(选择Github)
  ![][5]
* 当Github有多种登录时选择授权登录方式
  ![][6]
* 选择要发布的代码仓库
  ![][7]
* 选择仓库发布时的分支和指令及根目录

  ```
  Branch to deploy:要发布的分支(master源代码)
  Build command：由于关联了Github仓库，netlify自动识别了deploy.sh(hexo deploy)
  Publish directory:编译后的目录
  ```
  ![][8]
* 等待编译结果(显示成功或失败)
  ![][9]

### 3.3 修改域名
* 点击Domains，注册一个域名
  ![][10]
* 添加域名并验证
  ![][11]
* 添加域名解析
  ![][12]
* 添加DNS
  ![][13]
* 验证成功后如下图所示

  ![][14]

### 3.4 添加HTTPS(已申请https证书)
* Netlify 使用的是 Let’s Encrypt Certificate.的免费证书，点击下载证书
  ![][15]
* 绑定证书信息
  ![][16]
* 证书绑定成功后如下
  ![][17]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-webpage-set.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-github-login.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-github-permission.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-create-new-site.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-delplyment-github.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netify-person-select.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-select-repositories.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-deploy-branch-cmd.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-deploy-success.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-domains-register.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-domain-verify.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-ns-setting.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-dns-modify.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netlify-doman-netliry-dns.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netify-ssl_download.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netify-cetificate-install.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-netify-ssl-success.png

[21]:https://www.netlify.com/

