---
title: React Native开发之——Webstorm快捷开发
date: 2018-03-02 17:49:59
categories: [开发,移动开发,React Native]
tags: [Webstorm快捷开发]
---
# 前言  
开发RN的工具有很多，选择性也比较多，常见的有：  

- WebStorm
- Sublime Text 3
- VS Code
- Nuclide
- 其他 


<!--more-->
本文以Webstorm为例讲解
# 使用Webstorm开发React Native
注：本文默认已配置好React Native开发环境，如：安装JDK,Android SDK,Python,Node,React- Native-cli等，若不熟悉，请先看前文的React Native环境配置。  

Webstorm的安装破解请自行百度。  
## 新建React Native项目
如下图，左侧选中React Native，右侧的New Project中有三个选项：  

- Location: 项目的存放位置
- Node interpreter: node位置(安装后会默认选中)
- React Native: react-native-cli位置(安装后会默认选中)

![][1]
## React Native构建过程 
React Native构建时，下方会出现构建过程，如没有出错，出现Done，说明项目构建完成
![][2]
## 构建完成后，项目下会出现文件
- Android文件夹：开发Android对应项目目录
- IOS文件夹：开发IOS对应项目目录
- node-modules: 项目依赖类库
其他的如：App.js,app.json,package.json等将在后文讲解

![][3]
## 进行RN配置
点击如图所示位置，在弹出的对话框中，修改Name(如本图名字为RN)

- Name:修改后要展示的名字
- Target platforms:要运行的平台：Android或IOS

![][4]
## RN修改后如下图，出现可运行按钮
![][5]
## 点击如图按钮，运行项目
注：请事先运行模拟器或手机
![][6]
## 运行效果
![][7]


[1]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/webstorm-react-new.png
[2]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/webstorm-react-create.png
[3]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/webstorm-react-file.png
[4]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/webstorm-react-modify.png
[5]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/webstorm-react-modify-down.png
[6]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/webstorm-react-run.png
[7]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/webstorm-react-run-effect.png

