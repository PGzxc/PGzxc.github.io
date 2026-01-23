---
title: Android开发之——修改debug.keystore
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 修改debug.keystore
abbrlink: 49f3ab4a
date: 2018-03-29 13:25:25
---
# 前言 
app在运行安装到手机上时，都是要签名的(没有签名无法安装)，你可以设置签名，然后安装时使用设置的签名；没有设置签名，就用系统默认的签名信息，那么，这个签名信息，你知道么？     

<!--more-->  
  
# 签名debug.keystore
## 如果查看debug.keystore  
本文分为Eclipse版本和android studio来说明 

### Eclipse查看debug.keystore  
![][1]  
### Android Studio查看debug.keystore
![][2] 

## 制作debug.keystore
使用java jdk 中的keytool，使用前请先配置JAVA_HOME，并添加到path中 
### 选择debug.keystore的文件夹
输入	  
 
	keytool -genkey -alias androiddebugkey -keyalg RSA -validity 20000 -keystore debug.keystore -storepass android -keypass android  

并根据中文提升输入基本信息（测速key可以随便填）。最后输入y确认
![][3] 
### 查看debug.keystore文件 
![][4]  
### 将默认的debug.keystore替换为制作的debug.keystore文件 
![][1]  


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eclipse-debug-keystore.png  
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/as-debug-keystore.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/keystore-make.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/deubg-keystore-exist.png
