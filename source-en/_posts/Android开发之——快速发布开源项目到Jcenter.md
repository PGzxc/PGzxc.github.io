---
title: Android开发之——快速发布开源项目到Jcenter
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Jcenter
abbrlink: 3a83dc3
date: 2017-12-31 09:05:54
---
# 前言
在Android开发中我们经常使用第三方的开源项目，在app/build.gradle中compile类库，不用去下载文件以lib或modulelib的方式引入，是不是很方便呢？   

如使用Butterknife时，我们会这样引入：    

	compile 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'  

就可以使用Butterknife了，为什么呢？下面将详细介绍     
<!--more-->

# 上传项目到Jcenter 
要上传项目，首先要有项目  
## 制作项目
上传到Jcenter是供别人使用的，它一般是工具或者简便我们开发的作用类库。这里我们模拟制作一个Android工具类库。     
![][1]    
如上图，我们新建一个项目Jcenter，并在项目中新建一个module类库androidtools，并在类库中提供了两个工具类StringUtils和ToastUtils和一个图片资源    
## 几点注意 
在给moudle的类库起名字时，我们要注意几点：    
以compile 'com.jakewharton:butterknife:8.8.1'为例：   

- 项目名：比如"butterknife"，后面上传和使用时会用到   
- 包名：比如"com.jakewharton"  
- 版本号：比如"8.8.1"

## 注册/登录Bintray  
为啥要注册Bintray？因为以compile引入的类库是放在Bintray上的，我们把项目上传到Bintray后才可以以compile的方式引入到项目中来    
### 注册Bintray  
- Bintray官网：[https://bintray.com/][2]   
![][3]      
强调一下：这里我们选择For an Open Source Account     
- 创建用户     
注意：注册时，最好不要使用QQ邮箱，因为通过不了，可以使用网易的邮箱(我用的126邮箱是可以的，163没试)或者第三方登录(Github，Google，Twitter)，并进入邮箱激活       
![][4]  
### 登录Bintray  
登录Bintray后，如图所示：  
![][5] 
## 创建maven仓库并加入新包
### 创建仓库
- 点击Add New Repository创建maven仓库   
	![][6]
- 填写maven仓库信息   
这里有几点需要注意：  
   Name:填写maven仓库的名字；Type：选择仓库类型(这里选择Maven)，Licence：这里选择Apache2.0，其他可以不填或者选择默认值
	![][7]
### 往maven仓库中添加新包
- maven创建成功以后，点击Add New Package   
![][8]
- 编辑Package信息
![][9]
这里注意几点：    
参考： compile 'com.jakewharton:butterknife:8.8.1'  
Name:这里就类似于butterknife，后面上传和引用时会用到  
License：这里选择Apache-2.0  
WebSite:把项目上传到Github后的地址(也可以不填写)   
Issues Tracker：把项目上传到Github后的issue(也可以不填写)  
Version Control:类似于"8.8.1"，版本号     

## Android中配置  
###  在Project中的:build.gradle加入以下代码:  
 
	classpath 'com.novoda:bintray-release:0.5.0'
![][10]
### 在Library中的:build.gradle加入以下代码:

	publish
	{
    	userOrg = 'plzxc'//bintray.com用户名
    	groupId = 'com.example'//jcenter上的路径
    	artifactId = 'androidtools'//项目名称
    	publishVersion = '1.0.0'//版本号
    	desc = 'Oh hi, this is a nice description for a project, right?'//描述，不重要
    	website = 'https://github.com/PGzxc/Jcenter'//网站，不重要；尽量模拟github上的地址，例如我这样的；当然你有地址最好了
	}
![][11]
注意对应关系：  
![][12]  
## 上传Jcenter  
### 获取Bintray API key
- 回到JFrog Bintray个人主页点击 Edit  
![][13]
- 选择 API Key 然后复制那一长串的key值(我们后面执行指令时会用到)    
![][14]
### 上传  
- 回到AS打开Terminal控制台输入以下代码     

		gradlew clean build bintrayUpload -PbintrayUser=xxx -PbintrayKey=xxx -PdryRun=false 
其中的PbintrayUser和PbintrayKey换成自己对应的信息  
- 当控制台显示BUILD SUCCESSFUL时，说明上传成功   
![][15]
## 审核   
### 打开maven下我们创建的类库，点击右下角的 Add to JCenter 按钮
![][16]
### 填写审核描述  
![][17]
### 填写完成直接Send,等待审核通过,通过后项目的右下角的Add to JCenter 按钮就会消失，显示关联到Jcenter   
![][18]

# 使用  
## 在maven build settings中点击Gradle选项，查看如何引用
![][19]
如图所示：compile 'com.example:androidtools:1.0.0'  
## 在项目中添加依赖  
![][20]
## 在项目中使用引入的代码和资源
![][21]
![][22]
# 升级 
类库如何升级呢？我们加入一张图片类示例  
## 加入图片资源 
![][23]
## Add New Version  
![][24]
## 填写新版本名  
![][25]
## 配置升级gradle信息
![][26]
##  回到AS打开Terminal控制台输入以下代码 
  
	gradlew clean build bintrayUpload -PbintrayUser=xxx -PbintrayKey=xxx -PdryRun=false 
## 查看升级是否成功   
![][27]
## 修改导入compile信息，并查看  
![][28]   
可以看到，刚才提交的resource图片资源可以引用，说明版本升级成功

参考：   
[Android 快速发布开源项目到jcenter][29]   
[AndroidStudio上传自己的项目到Bintray jCenter远程仓库!][30]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-library.png  
[2]: https://bintray.com/ 
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-regist.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-create.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-login.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/maven-add.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/maven-create.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/maven-complete.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/maven-package-detail.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/project-build-gradle.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/app-build-gradle.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-bintray-compile.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/bintray-edit.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/bintray-api-key.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-update.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/add-to-jcenter.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/compose-message.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/link-jcenter.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-gradle-use.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-compile-use.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/code-use.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/resource-use.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/add-resource.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/maven-center-new-version.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/create-new-version.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-version-add.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/maven-update-success.png
[28]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jcenter-update-resource.png
[29]: http://blog.csdn.net/lmj623565791/article/details/51148825
[30]: http://blog.csdn.net/qq_23179075/article/details/71123452


