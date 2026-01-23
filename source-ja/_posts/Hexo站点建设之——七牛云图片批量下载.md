---
title: Hexo站点建设之——七牛云图片批量下载
categories:
  - 站点
  - Hexo博客
tags:
  - 七牛云
  - 图片批量下载
abbrlink: baf4be14
date: 2019-06-05 14:06:53
---

## 一 前言
基于hexo+Github搭建的静态博客，图片等资源的存储是一个问题，之前考虑过图片保存本地文件夹、图床(qiniu、微博)等，但是七牛存储的图片会有一些问题，使得我不得不考虑领寻图片等资源的存储问题。  

### 1.1 七牛图片存储的问题
* 默认生成的图片链接为Http开头，导致Github网站不是https的(不安全)
* 生成https可访问的图片链接，需要SSL证书

![][1]

我决定把七牛上的图片下载下来转移到Github上。   

<!--more-->

##  二 存在的问题

### 2.1 图片资源存储不规范
* 每篇文章存放在一个单独文件夹
* 同一个存储区域(华东、华北、华南、北美、东南亚)有多个文件夹
* 文件的命名不规则(图片命名不规范，与博客的标题关联不明显)

### 2.2 存储在同一个文件夹下的图片无法全部下载
* 将文件夹下的全部图片选中后，没有下载选项
![][2]



## 三 七牛图片资源的下载 
### 3.1 图片打包下载工具 

[七牛下载工具][3] [提取码：wbpp]

### 3.2 打包工具参数介绍

#### 3.2.1 qshell.conf

	{
    	"dest_dir"  :   "files",
    	"bucket"    :   "blog-files",
    	"domain"    :   "http://blog-files.pgzxc.com",
    	"access_key"    :"3o5FJkgG7griNlEqB2Sxxxx",
    	"secret_key"    :"N0BwmmUczC7xcWsepJ8Hxxxx",
    	"is_private"    :false,
    	"prefix"    :   "",
    	"suffix"    :   ""
	}

 
- dest_dir： 下载后图片的文件夹名称
- bucket: 七牛对应的文件夹名称
- domain：七牛文件夹的域名
- access_key：七牛Access Key 
- secret_key：七牛secret_key
- is_private：是否是私有库(默认false)
- prefix：前缀(默认false)
- suffix：后缀(默认false)


#### 3.2.2 qshell.conf详细介绍及示例
* dest_dir：填写为files后，下载的文件存放到以files为名字的文件中
	![][4]   

*  bucket和domain的查看如下图
	![][5]

* 七牛access_key和secret_key，可以通过[个人中心——密匙管理][6]查看 
	![][7]

#### 3.2.3 qshell.exe 

* 直接运行qshell.exe并不能把七牛上的图片资源下载下来
* 通过cmd窗口，指定参数，下载七牛上存储的图片资源 

### 3.3 图片打包下载工具 

* 下载指令
		
		qshell qdownload 10 qshell.config

	![][8]

* 下载完成后，效果

	![][4] 




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-ssl-certificate.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-images-no-all-download.png
[3]: https://pan.baidu.com/s/1W8lycyhT9ulYp9qZXJYYmg
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-local-file.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-images-show.png
[6]: https://portal.qiniu.com/user/key
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-person-central-key-management.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-qshell-download.png