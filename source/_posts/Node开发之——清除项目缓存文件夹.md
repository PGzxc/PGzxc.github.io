---
title: Node开发之——清除项目缓存文件夹
categories:
  - 开发
  - G-后端开发
  - Node
tags:
  - Node
abbrlink: e824cee
date: 2019-04-01 20:58:03
---

## 前言
Node项目在执行npm install时，会安装项目所需依赖，依赖文件存在于node_modules文件夹内，依赖库过多时，node_modules可能会很大，进行项目迁移时，删除不必要的文件，在新电脑上重新执行npm install ，node_modules依赖文件会重新生成。     


本文主要讲述，如何删除node_modules及其他不必要的文件夹及文件。   

<!--more-->

## 操作过程 

### node项目目录结构   
如图所示是项目目录结构：   

	dist：是执行npm run build时生成  
	node_moduels是npm install时生成 

![node-porject-view][1]

### 删除不必要的文件及文件夹  

主要使用rm指令来进行操作     

在cmder中输入：rm --help 查看rm的相关说明  
![][2]   

### 执行删除操作  

	rm -rf node_modules（删除node_modules文件夹）  
	npm cache clean --force(清除缓存)   

![][3]  
### 备份文件，重新安装依赖时，执行npm install  

	npm install       




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/node-project_view.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/node-rm-help.png  
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/npm-rm-clean.png