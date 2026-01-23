---
title: Hexo站点建设之——图床更换
categories:
  - 站点
  - Hexo博客
tags:
  - 图床
abbrlink: 3a4d8380
date: 2019-06-13 21:46:54
---
## 一 前言
使用hexo写博客最让人困扰的是图片等资源的存储问题，我曾经考虑过使用本地文件(因图片过多时，项目过大放弃)，七牛云存储(临时域名易过期，定制需要绑定个人域名)而放弃，最终选择使用Github上新建一个图片库用于存储Github图片等资源。  

本文主要介绍从七牛云迁移到Github图片资源的存储及使用方式  。  

<!--more-->

## 二 图片的迁移 

### 2.1 七牛上图片资源的存储  
![][1] 

### 2.2 七牛资源下载工具  

	链接：https://pan.baidu.com/s/1pXza-xzhFGYCQBG0c0rtLA 
	提取码：w28t 

### 2.3 配置文件 

#### 2.3.1 插件配置说明 
	{
    	"dest_dir"  :   "files",
    	"bucket"    :   "blog-files",
    	"domain"    :   "http://blog-files.pgzxc.com",
    	"access_key"    :"xxxxxxx",
    	"secret_key"    :"xxxx",
    	"is_private"    :false,
    	"prefix"    :   "",
    	"suffix"    :   ""
	}


说明： 


* dest_dir：下载后存储的文件夹名称(不添加/，默认存储在同级目录下)
* bucket：七牛资源文件夹名字
* domain：文件夹域名
* access_key：私钥
* secret_key：公钥
* is_private：是否私有库
* prefix：前缀
* suffix：后缀

#### 2.3.2 如何查看Access key 和 Secret Key？  
    
可以先登录进入你的帐号，点击“个人面板”，面板中点击[“密锁管理”][2]，之后你会看到你的Access key 和 Secret Key  

![][3] 


### 2.4 如何使用
 
#### 2.4.1 指令说明

	qshell qdownload 10 qshell.conf

说明：     
 
* 在cmd终端中执行上述命令  
* qshell：qshell.exe
* qdownload：qshell中下载方法
* 10：开启10个线程
* qshell.conf：配置文件


#### 2.4.2 指令操作
![][4]
#### 2.4.3 文件显示
![][5]



### 2.5 图片资源上传到Github图床上
#### 2.5.1 使用上传工具(PicGo)
1. [PicGo下载][6]      
	
	![][7]
2. PicGo配置 
	
	![][8]
3. PicGo使用
	
	![][9]

#### 2.5.2 使用Github指令
 

	git push xxx  

### 2.6 上传后的MD文档如何修改

#### 2.6.1 使用VScode打开hexo博客源码
![][10]
#### 2.6.2 修改图片显示方式 
1. 七牛图片显示方式   

		http://[七牛域名][bolo-imgs.pgzxc.com]/acra-app-run.png

2. Github上图片显示方式    

		https://cdn.jsdelivr.net/gh/[Github文件夹存储路径][PGzxc/images/master/blog-images]/acra-app-run.png  


3. 使用vscode搜索七牛域名替换为Github域名访问



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-store.png
[2]: https://portal.qiniu.com/user/key
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-accesskey-secretkey.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-images-download.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-qiniu-images-download-after.png
[6]: https://github.com/Molunerfinn/PicGo
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-picgo-download.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-picgo-github-setting.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-picgo-github-upload.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-vscode-open.png
