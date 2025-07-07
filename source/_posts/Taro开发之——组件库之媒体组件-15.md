---
title: Taro开发之——组件库之媒体组件(15)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: d6c117a7
date: 2025-07-07 08:50:09
---
## 一 概述

* 官方媒体组件
* 类组件和功能组件
* 媒体组件Image示例

<!--more-->

## 二 官方媒体组件

```
Taro官方组件库——媒体组件提供了一下几种组件

-Audio:音频
—Camera：系统相机
-Image：图片。支持 JPG、PNG、SVG、WEBP、GIF 等格式以及云文件ID。
—Video：视频
```

## 三 类组件和功能组件

```
类组件：使用class声明，并继承Component，状态管理使用this.state和setState
功能组件：使用function的函数，状态管理使用Hooks
```

## 四 导航组件Tabs示例

### 4.1 功能组件示例(function声明)

```
import { View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Component } from 'react'
import './index.scss'
import logoTaro from '../../assets/images/logo-taro-1.png';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')

  })
  return (
    <View className='components-page'>
    <Image
      style='width: 300px;height: 100px;background: #001111;'
      src={logoTaro}
      mode="scaleToFill"
    />
    <Image
      style='width: 300px;height: 100px;background: #fff;'
      src='https://img1.baidu.com/it/u=4032784836,2034674575&fm=253&fmt=auto&app=138&f=JPEG?w=638&h=500'
      mode="scaleToFill"
    />
  </View>
  )
}
```

### 4.2 类组件示例(class关键字)

```
import { View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Component, ReactNode } from 'react'
import './index.scss'
import logoTaro from '../../assets/images/logo-taro-1.png';

export default class Index extends Component {

  render() {
    return (
      <View className='components-page'>
        <Image
          style='width: 300px;height: 100px;background: #001111;'
          src={logoTaro}
          mode="scaleToFill"
        />
        <Image
          style='width: 300px;height: 100px;background: #fff;'
          src='https://img1.baidu.com/it/u=4032784836,2034674575&fm=253&fmt=auto&app=138&f=JPEG?w=638&h=500'
          mode="scaleToFill"
        />
      </View>
    )
  }
}
```

### 4.3 效果图(H5)

![][1]

说明：

* 本地图片放在 `src/assets/images`目录下
* 通过`import logoTaro from '../../assets/images/logo-taro-1.png'`;导入
* 通过` <Image src={logo} mode="aspectFit" />`方式显示

## 五 参考

* [Taro官网](https://docs.taro.zone/docs/)
* [Taro组件库—Image](https://docs.taro.zone/docs/components/media/image)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-15-component-image-1.png