---
title: Taro开发之——组件库之地图组件(16)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 5829e87f
date: 2025-07-08 08:05:05
---
## 一 概述

* 地图组件
* 类组件和功能组件
* 地图组件Map示例

<!--more-->

## 二 地图组件

```
Taro官方组件库——地图组件提供了一种组件

-Map:地图
```

## 三 类组件和功能组件

```
类组件：使用class声明，并继承Component，状态管理使用this.state和setState
功能组件：使用function的函数，状态管理使用Hooks
```

## 四 地图组件Map示例(无H5示例)

### 4.1 功能组件示例(function声明)

```
import { View, Image,Map} from '@tarojs/components'
import { useLoad} from '@tarojs/taro'
import { Component, ReactNode } from 'react'
import './index.scss'

export default function Index(){
    return (
      <Map  longitude="116.3975" latitude="39.9067"/>
    )
}
```

### 4.2 类组件示例(class关键字)

```
import { View, Image,Map} from '@tarojs/components'
import { useLoad} from '@tarojs/taro'
import { Component, ReactNode } from 'react'
import './index.scss'

export default class Index extends Component {

  render() {
    return (
      <Map  longitude="116.3975" latitude="39.9067"/>
    )
  }
}
```

### 4.3 效果图(H5)

![][1]

说明：

```
本地图片放在 `src/assets/images`目录下
通过`import logoTaro from '../../assets/images/logo-taro-1.png'`;导入
通过` <Image src={logo} mode="aspectFit" />`方式显示
```


## 五 参考

* [Taro官网](https://docs.taro.zone/docs/)
* [Taro组件库—Map](https://docs.taro.zone/docs/components/maps/map)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-16-component-map-1.png