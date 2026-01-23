---
title: Hexo站点建设之——The Unicorns have taken over
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: e6b3f9ad
date: 2021-09-23 09:26:24
---
## 一 现象

输入网址后，显示如下

```
We're having a really bad day.
The Unicorns have taken over. We're doing our best to get them under control and get GitHub back up and running.
```

![][1]
<!--more-->

## 二 可能发生问题

* GitHub Pages设置
* 域名解析

## 三 解决方案

### 3.1 Github Pages

* Github仓库——>Settings——>Github Pages选项

  ```
  Pages settings now has its own dedicated tab! Check it out here!
  ```

  ![][2]

* 检查Github pages页面是否正确

  ![][3]

### 3.2 输入github Pages页面访问，查看显示及域名解析是否正常

输入自己的github pages 如`用户名.github.io`，查看页面能否正确显示，并跳转到域名页面(访问后`用户名.github.io`正确显示，并能跳转到域名页面，再次访问域名页面也能正确显示)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-error-unicorns.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-error-unicorns-github-pages-dedicated.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-error-unicorns-pages-settings.png