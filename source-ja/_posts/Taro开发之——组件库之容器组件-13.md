---
title: Taro开发之——组件库之容器组件(13)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 4551632d
date: 2025-07-04 08:47:14
---
## 一 概述

* 官方容器组件
* 类组件和功能组件
* 容器组件Swiper示例

<!--more-->

## 二 官方容器组件

```
Taro官方组件库——容器组件提供了一下几种组件

-View:视图容器
—CoverImage：覆盖在原生组件之上的图片视图
-CoverView：覆盖在原生组件之上的文本视图
—CustomWrapper：自定义组件包裹器
—MatchMedia:匹配检测节点
-MovableArea：可移动区域
-MovableView：可拖拽滑动的视图容器
-NativeSlot:支持使用 slot 插槽
-PageContainer:复杂的界面设计
-RootPortal:主要用于制作弹窗、弹出层等
-Script:类似微信小程序的 wxs 标签
-ScrollView:可滚动视图区域
-Slot:slot 插槽
-Swiper:滑块视图容器
-SwiperItem:仅可放置在 swiper 组件中
```

## 三 类组件和功能组件

```
类组件：使用class声明，并继承Component，状态管理使用this.state和setState
功能组件：使用function的函数，状态管理使用Hooks
```

## 四 容器组件Swiper示例

### 4.1 功能组件示例(function声明)

```
import { View,  Swiper, SwiperItem} from '@tarojs/components'
import './index.scss'

export default function Index() {
    return (
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical
        circular
        indicatorDots
        autoplay>
        <SwiperItem>
          <View className='demo-text-1'>1</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>
    )
}
```

### 4.2 类组件示例(class关键字)

```
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { ReactNode, Component } from 'react'
import './index.scss'

export default class Index extends Component {

  render() {
    return (
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical
        circular
        indicatorDots
        autoplay>
        <SwiperItem>
          <View className='demo-text-1'>1</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>
    )
  }
}
```

### 4.3 效果图(H5)

![][1]

## 七 参考

* [Taro官网](https://docs.taro.zone/docs/)
* [Taro组件库—Swiper](https://docs.taro.zone/docs/components/viewContainer/swiper)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-13-component-swiper-1.png