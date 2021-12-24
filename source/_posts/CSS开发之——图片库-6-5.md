---
title: CSS开发之——图片库(6.5)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 676a7081
date: 2020-09-27 22:07:44
---
## 一 概述

CSS可用来创建图片库

<!--more-->

## 二 实例

```
<!doctype html>
<html>
<head>
<style>
div.img
  {
  margin:3px;
  border:1px solid #bebebe;
  height:auto;
  width:auto;
  float:left;
  text-align:center;
  }
div.img img
  {
  display:inline;
  margin:3px;
  border:1px solid #bebebe;
  }
div.img a:hover img
  {
  border:1px solid #333333;
  }
div.desc
  {
  text-align:center;
  font-weight:normal;
  width:150px;
  font-size:12px;
  margin:10px 5px 10px 5px;
  }
</style>
</head>
<body>

<div class="img">
  <a target="_blank" href="/i/tulip_ballade.jpg">
  <img src="/i/tulip_ballade_s.jpg" alt="Ballade" width="160" height="160">
  </a>
  <div class="desc">在此处添加对图像的描述</div>
</div>

<div class="img">
  <a target="_blank" href="/i/tulip_flaming_club.jpg">
  <img src="/i/tulip_flaming_club_s.jpg" alt="Ballade" width="160" height="160">
  </a>
  <div class="desc">在此处添加对图像的描述</div>
</div>

<div class="img">
  <a target="_blank" href="/i/tulip_fringed_family.jpg">
  <img src="/i/tulip_fringed_family_s.jpg" alt="Ballade" width="160" height="160">
  </a>
  <div class="desc">在此处添加对图像的描述</div>
</div>

<div class="img">
  <a target="_blank" href="/i/tulip_peach_blossom.jpg">
  <img src="/i/tulip_peach_blossom_s.jpg" alt="Ballade" width="160" height="160">
  </a>
  <div class="desc">在此处添加对图像的描述</div>
</div>
</body>
</html>
```

