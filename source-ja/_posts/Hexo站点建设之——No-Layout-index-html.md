---
title: Hexo站点建设之——No-Layout-index-html
categories:
  - 站点
  - Hexo博客
tags:
  - No Layout
abbrlink: 50e9f5d
date: 2019-06-13 21:29:59
---

## 一 Hexo 编译时遇到的问题

博客的数量多了起来，编译的速度越来越慢，最新在进行hexo和hexo-theme升级，但是在执行hexo g编译时出现了`No layout:index.html`的问题，参考了别问总结的思路，做下总结。  


![No layout：index][1]

<!--more-->

## 二 解决思路
	查看执行`hexo g`时，编译过程中出现的警告、错误信息

### 2.1 缺少hexo插件
  
#### 2.1.1 查看hexo插件安装情况
	npm ls --depth 0 
![][2]

#### 2.1.2 hexo 的一些插件未安装插件
	npm ERR! peer dep missing: acorn@^6.0.0, required by acorn-dynamic-import@4.0.0
	npm ERR! peer dep missing: eslint@>= 4.12.1, required by babel-eslint@10.0.1

## 三 解决办法
### 3.1 逐一安装缺失的包

	npm install acorn --save
	npm install eslint --save
### 3.2 执行npm install后安装提示信息，执行`npm audit fix`


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-no-layout-index-html.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-npm-ls-depth.png