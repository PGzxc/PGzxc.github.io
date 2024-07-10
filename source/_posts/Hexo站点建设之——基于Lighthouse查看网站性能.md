---
title: Hexo站点建设之——基于Lighthouse查看网站性能
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo
abbrlink: 21ea8c82
date: 2021-01-29 16:15:45
---
## 一 概述

查看网站相关信息常用的网站有：

[站长之家-ping][1]：ping检测，国内测速，国际测速，网站速度对比等
[PageSpeed Insights][12]：网站在移动设备和桌面设备的网页响应速度(墙)
[爱测速][13]:PageSpeed Insights国内版

本文介绍的是：基于Chrome浏览器查看网站性能(Lighthouse)

<!--more-->

## 二 Lighthouse

### 2.1 Chrome自带Lighthouse

* 打开要测试的网站

  ![][1]

* 按下`F12`键，打开开发者工具(或者右上角—>更多工具—>开发者工具)

  ```
  Performance：性能
  Progressive Web App:Web App中的表现
  Best practices:最佳性能
  Accessibility:可访问性能
  SEO:搜索引擎优化
  ```

  ![][2]

* 点击`Generate report`，等待报告生成

  ![][3]
  
### 2.2 Chrome插件Lighthouse

* 安装chrome插件Lighthouse

  ![][4]

* 打开网站，点击lighthouse插件进行分析，结果如下

  ![][5]

## 三 Lighthouse报告分析及网站优化

### 3.1 实验报告

* 实验的结果为绿色—>橙色—>红色，颜色越浅
* 性能表现越良好，颜色越深，表现越差

### 3.2 网站优化

* Performance、Accessbility、Best Practices、SEO每项都有对应的报告和优化建议
* 根据建议进行相应的优化(资源压缩，移除未使用资源，移除阻塞渲染的资源)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/website-lighthouse-test-site.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/website-lighthouse-website-chrome-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/website-lighthouse-website-result.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/website-lighthouse-chrome-plugin.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/website-lighthouse-plugin-result.png

[11]:https://ping.chinaz.com
[12]:https://developers.google.com/speed/pagespeed/insights/
[13]:https://www.aicesu.cn