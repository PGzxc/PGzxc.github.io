---
title: 微信小程序开发之——用WeUI快速开发电影应用
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: bb8cbaf7
date: 2021-10-26 14:52:31
---
## 一 概述

本文利用WeUI，仿制一款电影应用，下面是效果图对比

| 别人应用 | 仿制应用 |
| :------: | :------: |
|  ![][1]  |  ![][2]  |

<!--more-->

## 二 应用分析

### 2.1 [官方UI组件-WeUi-wxss][00]

| 编号 |   内容   |  说明  |
| :--: | :------: | :----: |
|  1   |   组件   |  使用  |
|  2   | 扩展能力 |  使用  |
|  3   |   接口   | 未使用 |
|  4   |  云开发  | 未使用 |

![][3]

### 2.2 应用与WeUI-wxss的对应关系

| 编号 |       内容        |            组件             |
| :--: | :---------------: | :-------------------------: |
|  1   |     table菜单     |   扩展能力/扩展组件/Tabs    |
|  2   | 正在热映/电影列表 |   扩展能力/基础组件/Panel   |
|  3   |  内容搜索/搜索框  | 扩展能力/搜索相关/Searchbar |
|  4   | 内容搜索/搜索结果 |   扩展能力/基础组件/Flex    |
|  5   |     电影分类      |   扩展能力/基础组件/Grid    |

## 三 开发过程

### 3.1 项目初始化

#### 通过微信小程序开发工具创建项目，并修改标题信息(app.json)

```
{
  "pages":[
    "pages/index/index"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "电影信息展示",
    "navigationBarTextStyle":"black"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```

####  执行`npm`，生成`package.json`（调试器—>终端）

```
npm init
```

#### 安装依赖库

```
npm install weui-miniprogram
npm install @miniprogram-component-plus/tabs
```

#### 构建npm

依次点击：工具——>构建npm，构建完成后，生成`miniprogram_npm`文件夹

### 3.2 开发—table导航菜单

#### 查找WeUI-tabs对应的文件
![][4]

#### 根据tabs进行组件迁移

**配置文件**：由tabs.json迁移到index.json中

```
 "mp-tabs": "@miniprogram-component-plus/tabs"
```

**布局文件**：由tabs.wxml迁移到index.wxml中

```
<view class="page" data-weui-theme="{{theme}}">
<mp-tabs 
  tabs="{{tabs}}" 
  activeTab="{{activeTab}}" 
  swiperClass="weui-tabs-swiper"
  bindtabclick="onTabClick"
  bindchange="onChange"
  activeClass="tab-bar-title__selected">
  <block wx:for="{{tabs}}" wx:key="title">
    <view class="tab-content" data-set="{{item}}" slot="tab-content-{{index}}" bind:tap="handleClick" >
    	<!--此处填写要切换的三个table的内容，根据table的index决定是否显示与隐藏-->
    </view>
  </block>
</mp-tabs>
</view>
```

**样式文件**：tabs.wxss迁移到index.wxss(因为使用import导入了comon.wxss，注意将此内容添加)

```
@import '../common.wxss';
.page{
    background-color: var(--weui-BG-2);
    height: 100%;
}
.weui-tabs-bar__wrp {
    border-bottom: 1px solid var(--weui-BG-2);
    margin-top: 10px;
}
.weui-tabs-swiper {
    width: 100%;
    height: 100%;
    background-color: var(--weui-BG-2);
}
.tab-content {
    /* height: 100px; */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
}

.weui-tabs-bar__title {
    margin: 0px 10px;
}

.tab-bar-title__selected {
    font-size: 20px;
    font-weight: bold;
}
.item-title {
    margin: 10px 10px 5px;
    font-size: 18px;
    width: 100%;
}
.item-desc {
    margin: 5px 10px 0;
    width: 100%;
    color: var(--weui-FG-1)
}
.weui-tabs-bar__item {
    background-color: var(--weui-BG-2) !important;
    color: var(--weui-FG-0) !important;
}
```

说明：关于tabs的更多配置见：[tabs-属性列表][01]
![][5]

### 3.3 开发—其他类似

* 配置文件
* 布局文件
* 样式文件

## 四 参考

[CSDN下载——电影应用代码](https://download.csdn.net/download/Calvin_zhou/34644785)



[00]:https://github.com/Tencent/weui-wxss/
[01]:https://github.com/wechat-miniprogram/miniprogram-component-plus/blob/master/docs/tabs.md
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-movie-other-view.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-movie-my-view.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-movie-meui-component.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-movie-tabs-weui.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-weui-movie-tabs-values.png
