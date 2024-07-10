---
layout: post
title: Hexo站点建设之——Gitalk
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 7a890ecc
date: 2020-11-02 22:44:38
---
## 一 为何选择gitalk

之前的博客接入过一些评论系统，如：livere，gitment，最近对博客主题进行升级，有更换评论系统的打算：

* livere：过于社交化，不支持markdown
* gitment：项目更新维护已停止，最新的主题中没有提供此服务
* gitalk支持markdown语法，后续可能会结合钉钉，评论推送提醒

<!--more-->

## 二 如何集成

### 2.1 注册gitalk

* 打开gitalk官网地址[https://gitalk.github.io/](https://gitalk.github.io/)
  ![][1]
* 点击开始使用按钮，跳转到Github地址，点击使用说明中的`Click here to register `
  ![][2]
* 填写注册gitalk相关信息(本地测试使用后者，网络测试使用前者)
  ```
  Application name:应用名称
  Homepage URL：主页地址(一般填写域名地址或名称.github.io)
  Application description:项目描述(非必需)
  Authorization callback URL：认证回调地址(一般填写域名地址或名称.github.io)
  
  ```
  ![][3]
* 应用注册成功后的页面如图所示(可以修改并更新信息)
  ![][4]
* 点击Upload new logo上传头像，并设置背景色(设置完成后，点击下方的Update application)
  ![][5]
## 2.2 创建应用gitalk的GitHub代码仓库
![][6]
### 2.3  hexo主题配置文件配置gitalk

```
gitalk:
  enable: true
  github_id: PGzxc # GitHub repo owner
  repo: PGzxc.github.io # Repository name to store issues
  client_id: 4d2d97c55xxxxxx # GitHub Application Client ID
  client_secret: f55fe4xxxxx # GitHub Application Client Secret
  admin_user: PGzxc # GitHub repo owner and collaborators, only these guys can initialize gitHub issues
  distraction_free_mode: true # Facebook-like distraction free mode
  language: zh-CN
```

## 三 使用(本地模式)

* 未登录时，评论页面效果
  ![][7]
  
* 登录GitHub后，输入评论
  ![][8]
* 仓库下面的issue，会显示刚才的那条评论，可进行管理


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-websit.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-github-register.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-register-oauth-info.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-register-success.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-upload-logo.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-github-project.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-not-login-comment.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-gitalk-login-comment.png

[11]:https://gitalk.github.io/