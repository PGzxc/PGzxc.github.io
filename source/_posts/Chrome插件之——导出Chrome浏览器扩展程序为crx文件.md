---
title: Chrome插件之——导出Chrome浏览器扩展程序为crx文件
categories:
  - 工具
  - Chrome插件
tags:
  - Chrome插件
abbrlink: dc427607
date: 2020-12-31 11:07:59
---
## 一 概述

由于网络的限制，Chrome网上应用商店不一定每次都能访问和下载插件，我们可以先把现有的插件进行导出备份，方便插件的快速安装和管理

<!--more-->

## 二 如何查看已安装插件

打开Chrome浏览器，打击右上角`ミ`—>更多工具—>扩展程序(E)，打开扩展程序界面，查看已安装的插件

![][1]

## 三 打包已安装插件

### 3.1 打包扩展程序说明

* 打包扩展程序不能一次打包所有插件，只能一次打包一个插件
* 打包扩展程序时，先根据已安装插件ID找出插件安装位置
* 拓展程序根目录为ID的具体目录，可使用搜索软件查找或通过浏览依次定位选取

### 3.2 打包过程(以Enhanced GitHub为例)

* 确定要打包的插件ID

  ```
  ID：anlikcnbgdeidpacdbdljnabclhahhmd
  ```
	![][2]

* 使用搜索软件(Everything)，根据id快速查询插件位置

	![][3]

* 选择要打包的插件版本(5.0.5_0)，进入后为插件的具体路径

  ```
  C:\Users\Admin\AppData\Local\google\Chrome\User Data\Default\Extensions\anlikcnbgdeidpacdbdljnabclhahhmd\5.0.5_0
  ```

* 点击`打包扩展程序`，在`扩展程序根目录`输入插件的具体路径，点击`打包扩展程序`

	![][4]

* 程序打包成功后的信息，如下
	
    ![][5]

* 插件目录下可以看到打包后的两个文件：一个是*.crx文件（打包好的插件）和 *.pem文件（私有密钥文件，没用直接删掉）即可

	![][6]
    
## 四 打包中可能出现的错误

### 4.1 清单文件缺失或不可读取

原因：路径错误(ID后的版本号文件夹路径)

现象：
![][7]

### 4.2 指定扩展程序的私有密匙已存在。请重复使用该密匙或先删除它

现象：

![][8]

原因：

路径下已有.pem文件

解决办法：

选择该pem文件或者删除该pem文件

## 五 插件打包

https://download.csdn.net/download/Calvin_zhou/13985969



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-software.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-plugin-id.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-plugin-id-search.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-package-path.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-plugin-output-info.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-plugin-id-crx-file.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-lack-list.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-chrome-plugin/chrome-extend-pem-exist-error.png