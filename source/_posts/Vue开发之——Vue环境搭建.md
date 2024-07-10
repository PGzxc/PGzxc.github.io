---
title: Vue开发之——Vue环境搭建
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - 环境搭建
abbrlink: aa2507cb
date: 2018-03-07 15:14:31
---
# 前言 
Vue自从发布以来就一直受到前端开发人员的热爱，而除了一些本身优秀的特征之外，还有就是丰富的插件和工具的支持和更新。本文主要讲述Vue环境搭建。  内容包含：  

- node.js环境（npm包管理器）
- vue-cli 脚手架构建工具
- cnpm npm的淘宝镜像

<!--more-->

# Vue搭建 

## 第一步 node环境安装
下载地址：[https://nodejs.org/en/][1] 或者 [http://nodejs.cn/][2]

- 如果本机没有安装node运行环境，请下载node 安装包进行安装
- 如果本机已经安装node的运行换，请更新至最新的node 版本  

	
## 第二步 node环境检测
为了快乐的使用命令行，我们推荐使用 git bash
### 下载git 并安装
下载地址:[https://gitforwindows.org/][3]  
安装成功后 右键菜单  
![][4]  
### 检测node 是否安装成功
右键空白，选择 Gti Bash Here 弹出  
![][5]    
### 在终端输入 node -v和npm -v 
![][6]  

如果输出版本号，说明我们安装node 环境成功，同时我们可以查看npm的版本号
## 第三步 vue-cli脚手架安装
### 如果访问外网比较慢，可以使用淘宝的镜像 https://npm.taobao.org/
打开命令终端 npm install -g cnpm --registry=https://registry.npm.taobao.org
回车之后，我就可以可以快乐的用 cnpm 替代 npm     
![][7]  
### 接下来就是重点了 安装vue-cli  
使用指令：npm install vue-cli -g  

![][8]  

### 进入我们的项目目录，右键 Gti Bash Here
### 初始化项目 vue init webpack vue-demo
![][9]  
### 一直回车直到
### 是否要安装 vue-router 项目中肯定要使用到 所以 y 回车
![][10] 
### 是否需要 js 语法检测 目前我们不需要 所以 n 回车
![][11]  
### 是否安装 单元测试工具 目前我们不需要 所以 n 回车
![][12]  
### 是否需要 端到端测试工具 目前我们不需要 所以 n 回车
![][13]  
### 接下来 ctr+c 结束
### 进入 cd vue-demo,执行 npm install
![][14]  
### 接下来执行 npm run dev
![][15]  
### http://localhost:8080/#/进行访问
![][16]  
# 其他 
参考：[手把手教你搭建 vue 环境][17]


[1]: https://nodejs.org/en/
[2]: http://nodejs.cn/
[3]: https://gitforwindows.org/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-git-bash.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-git-bash-here.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-npm-cmd.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-taobao.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-cli.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-go-demo.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-router.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-esl.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-test.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-nightwatch.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-npm-install.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-run.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue-effect.png
[17]: https://segmentfault.com/a/1190000008922234
