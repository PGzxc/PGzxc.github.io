---
title: React Native开发之——Webstorm开发RN配置
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - Webstorm开发RN配置
abbrlink: 3a8bdbec
date: 2018-03-02 22:35:26
---
# 前言 
前文[React Native开发之——Webstorm快捷开发][1]介绍了使用Webstorm快捷开发React Native，
本文介绍Webstorm开发RN配置。
<!--more-->  

# Webstorm开发RN配置  

## 配置文件编码格式
注：为避免莫名其妙的问题，本文所使用的编码格式统一设置为"UTF-8"，如图所示Setting->Editor->File Encodings有三处修改，统一改为"UTF-8"。
![][2]  
## 设置.js文件默认以jsx的语法打开  
设置方法，File->Default Settings->Languages&Frameworks->JavaScript->Flow
![][3]  
## 设置.js文件中支持react-native语法高亮
设置方法，File->Settings->Languages&Frameworks->JavaScript->Libraries->Download 
在列表中找到react和react-native，Download and Install, 如红框选中,点击OK。  
![][4]  
![][5]  
设置后，如下图：  
![][6]  
## 设置React Native智能提示
github有一个开源的插件：[ReactNative-LiveTemplate][7]，当输入时有提示效果。  
ReactNative的代码模板，包括：

- 组件名称
- Api 名称
- 所有StyleSheets属性
- 组件属性新增

### 安装 
方法一 由于ReactNative.jar更新不方便而且过于陈旧，强烈建议使用方法二进行安装，ReactNative.jar 也会删除   

	file -> import settings -> ReactNative.jar  
### 点击OK后，重启Webstorm生效。 
![][8]  
### 验证是否成功
如下图，当输入style时会有联想提示信息
![][9]
至此，Webstorm的配置已基本完成。




[1]: https://pgzxc.github.io/2018/03/02/React-Native%E5%BC%80%E5%8F%91%E4%B9%8B%E2%80%94%E2%80%94Webstorm%E5%BF%AB%E6%8D%B7%E5%BC%80%E5%8F%91/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/webstorm-file-encodings.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/webstorm-jsx-languages.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/webstorm-library-react.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/webstorm-library-react-native.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/webstorm-library-global.png
[7]: https://github.com/virtoolswebplayer/ReactNative-LiveTemplate
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/webstorm-live-templates.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/webstorm-live-effect.png