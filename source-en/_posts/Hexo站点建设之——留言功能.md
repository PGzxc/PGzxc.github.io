---
title: Hexo站点建设之——留言功能
categories:
  - 站点
  - Hexo博客
tags:
  - 留言
abbrlink: f712492d
date: 2017-12-16 15:48:15
---
# 前言 
个人博客加入评论功能，方便交流与沟通，通常我们借助第三方评论系统，如：
   
- 畅言
- 网易云跟帖
- 多说
- 友言
- 来必力
- Gitment
<!--more-->
以上是评论系统，由于各种原因，如备案、收费、翻墙等原因，最终选择了来必力作为个人网站评论插件！之前使用过Gitment，由于评论者需要使用Github账号登录评论，只能发送文字等，后来放弃了！  
![][1]

# 集成评论
## 注册账号
登录[来必力官网][2]，注册账号  

![][3]
## 选择安装版本
来必力提供了三个版本： 
 
- LiveRe收费版
- City免费版
- Premium收费版

![][4]
根据跟人情况选择，这里使用免费版，之后会在右上角：头像-》管理页面-》 代码管理-》一般网站上查看生产的代码，这里会用到date-uid
 ![][5]
## 配置livere统计
修改：项目下-》themes->next(请查看自己主题)->_config.yml，打开livere_uid,并填写来必力生成的uid
![][6]
## 查看评论功能
如下：使用QQ登录，评论并添加Gif图
![][7]
## 其他设置

### 数据分析   
统计评论数，评论账号，分享数等
![][8]

### 评论管理
查询评论内容，删除评论，对用户禁言等操作
![][9]
### 设置
设置关联网站，添加评论登录账号
![][10]
### 评论提醒
设置评论时是否开启邮箱提醒及提醒周期间隔
![][11]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-gitment.png	
[2]: https://livere.com/
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-relive-site.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-relive-option.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-relive-uid.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-livere-config.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-coment-result.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-data-release.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-manger-comment.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-seting-comment.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-comment-intent.png
