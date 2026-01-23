---
title: Hexo站点建设之——留言钉钉提醒
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 7de23271
date: 2020-11-09 16:35:58
---
## 一 添加后效果

当文章或留言板有人留言时，立即收到钉钉消息提醒(谁，说了什么内容)，这样你就可以收到消息进行相应的处理了

![][1]

<!--more-->
## 二 前提条件

* 钉钉账户
* GitHub项目

## 三 钉钉添加GitHub机器人

* 打开钉钉客户端，点击用户头像，在弹出的菜单中选择机器人管理
  ![][2]
  
* 在机器人管理，下拉列表中选择Github机器人

  ![][3]
  
* 设置GitHub机器人相关信息(名字和群组)

  ![][4]
  
* 添加Github后，生成Webhook(用于给GitHub项目设置)

  - Webhook：webhook允许在某些事件发生时通知外部服务
  - 设置说明：跳转到钉钉说明文档，如何在GitHub项目中设置Webhook

  ![][5]
## 四 GitHub博客项目添加Webhook

* 进入 GitHub 代码库，依次点击「Settings」、「Webhooks & Services」、「Add Webhook」

  ![][6]
  
* 根据个人需要，完成Add Webhook配置

  ```
  Payload URL：钉钉添加的GitHub机器人Webhook地址
  Content type:application/json
  Which events would you like to trigger this webhook?
  - 仅仅接收推送事件
  - 给我发送一切事件
  - 让我选择个别事件(如Issue comments评论等)
  ```

  ![][7]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-message-pre-result.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-message-dingding-robot-manage.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-message-robot-mange-list-github.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-message-github-robot-info.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-message-github-webhook-make.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-message-github-project-add-webhook.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-message-add-webhook-set.png