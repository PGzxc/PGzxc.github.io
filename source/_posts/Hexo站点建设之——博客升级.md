---
title: Hexo站点建设之——博客升级
categories:
  - 站点
  - Hexo博客
tags:
  - 博客升级
abbrlink: 541e1fc7
date: 2019-06-13 23:19:16
---

## 前言
一直使用hexo写博客，随着博客的增多，编译时的时间越来越长，最近考虑使用给hexo和next主题升级。   
<!--more-->

## 博客升级

### 一 将备份源码使用vscode打开  
![][1] 
### 二 安装hexo  

	npm install hexo-cli -g
![][2]  

### 三 安装项目依赖

	npm install 
![][3]  

#### 3.1 npm install 出错解决 
##### 3.1.1 错误现象
依赖库过期
![][4]
##### 3.1.2 错误原因
使用的依赖库版本过低
![][5]
#### 3.2 hexo 依赖库升级
#### 3.2.1 工具
[npm-check-updates][6]

#### 3.2.2 操作流程 

	npm install -g npm-check-updates
	ncu  
	ncu -u

#### 3.2.3 hexo package升级
![][7]

#### 3.2.4 修正其他错误
* 修改前  
![][8]  
* 修改后
![][9]


#### 3.3 警告信息 
#### 3.2.1 执行npm audit fix后出现警告信息 
![][10]
#### 3.2.1 修复警告信息
根据提示信息安装缺失依赖文件,如警告中的[eslint][11]

	npm install eslint --save-dev    

注：  
* 系统不是Windows系统，fsevents是苹果系统的可选依赖。至于为什么仍然会安装
![][12]
### 三 编译项目
	hexo g
![][20]

### 四 运行项目

	hexo s
![][21]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-open-vscode.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-install-hexo-cli.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-npm-install-depend.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/npm-install-error.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-package-json.png
[6]: https://www.npmjs.com/package/npm-check-updates
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/npm-check-update.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/npm-audit-fix.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-npm-audit-fix.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-npm-audit-after-warn.png
[11]: https://www.npmjs.com/package/eslint
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-install-eslint.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-g-old-version.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-s-old-version.png