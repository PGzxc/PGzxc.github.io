---
title: 微信小程序开发之——WeUI快速上手
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 66aabbca
date: 2021-10-19 17:24:07
---
## 一 概念

* 这是一套基于样式库[weui-wxss](https://github.com/Tencent/weui-wxss/)开发的小程序扩展组件库，同微信原生视觉体验一致的UI组件库
* 由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一
* 支持扩展库导入，不占用小程序体积

<!--more-->

## 二 WeUI介绍

### 2.1 WeUI下载

[Github-Tencent/weui-wxss](https://github.com/Tencent/weui-wxss/)

### 2.2 项目导入小程序

解压后，用微信开发者工具打开`dist`目录

![][1]

### 2.3 WeUI组件介绍

| 编号 |  大分类  |                             组件                             |
| :--: | :------: | :----------------------------------------------------------: |
|  1   |   表单   |    button、input、form、list、Slideview、slider、uploader    |
|  2   | 基础组件 | article、badge、flex、footer、gallery、grid、icons、loading、loadmore、panel、preview、progress |
|  3   | 操作反馈 | actionsheet、dialog、half-screen-dialog、msg、picker、toast、top-tips |
|  4   | 导航相关 |                    navigation-bar、tabbar                    |
|  5   | 搜索相关 |                          searchbar                           |

## 三 如何使用

### 3.1 方式一(useExtendedLib+style文件夹)

#### 3.1.1 配置

* app.json下添加`useExtendedLib`扩展

  ```
  "useExtendedLib": {
      "weui": true
    }
  ```

* 将[Github-Tencent/weui-wxss](https://github.com/Tencent/weui-wxss/)解压后的style文件夹整体复制到项目目录下

  ![][2]
  
* app.wxss 里面引入 weui.wxss 

  ```
  @import "./style/weui.wxss";
  ```

#### 3.1.2 使用(pages/index页面)

* 页面的 json 文件加入 usingComponents 配置字段(index.json)

  ```
  {
    "usingComponents": {
      "mp-dialog": "weui-miniprogram/dialog/dialog"
    }
  }
  ```

* 页面的布局页面wxml中直接使用该组件

  ```
  <mp-dialog title="test" show="{{true}}" bindbuttontap="tapDialogButton" buttons="{{buttons}}">
      <view>test content</view>
  </mp-dialog>
  ```

* 根据需要添加页面的逻辑文件数据

  ```
  Page({
      data: {
          buttons: [
          	{ text: '取消' },
          	{ text: '确认' }
          ]
      }
  })
  ```

#### 3.1.3 效果图
![][3]

###  3.2 方式二(useExtendedLib+npm)

#### 3.2.1 配置
* app.json下添加`useExtendedLib`扩展

  ```
  "useExtendedLib": {
      "weui": true
    }
  ```
  
* 打开`调试器——>终端`，输入如下指令初始化

  ```
  npm init
  ```

* 通过npm方式安装weui

  ```
  npm install weui-miniprogram
  ```

* <font color=red>注：此时app.wxss 里面不需要引入 weui.wxss </font>

#### 3.2.2 使用(同3.1.2)

#### 3.2.3 效果图
![][4]

### 3.3 方式三(npm+工具栏->构建npm)

#### 3.3.1 配置
* 打开`调试器——>终端`，输入如下指令初始化

  ```
  npm init
  ```

* 通过npm方式安装weui

  ```
  npm install weui-miniprogram
  ```
  
* 点击`工具——>构建npm`，并点击确定，生成`miniprogram_npm`文件夹

  ![][5]

* app.wxss 里面引入 weui.wxss  

  ```
  @import 'miniprogram_npm/weui-miniprogram/weui-wxss/dist/style/weui.wxss';
  ```

#### 3.3.2 使用(同3.1.2)

#### 3.3.3 效果图
![][6]

## 四 参考

* [官方技术文档——快速上手](https://wechat-miniprogram.github.io/weui/docs/quickstart.html)
* [官方文档——WeUI组件库简介](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/weui/)
* [官方文档——快速上手](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/weui/quickstart.html)
* [CSDN——参考代码](https://download.csdn.net/download/Calvin_zhou/33426379)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-open-develop-tools.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-style-copy-project.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-uselib-style-preview.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-uselib-npm-preview.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-npm-tool-ok.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-tool-npm-preview.png