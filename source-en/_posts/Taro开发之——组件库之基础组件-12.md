---
title: Taro开发之——组件库之基础组件(12)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 1b5196ad
date: 2025-07-03 09:09:58
---
## 一 概述

* 官方基础组件
* 类组件和功能组件
* 基础组件Text示例

<!--more-->

## 二 官方基础组件

```
Taro官方组件库——基础组件提供了一下几种组件

—Icon：图标
-Text：文本
—Progress：进度条
—RichText:富文本

```

## 三 类组件和功能组件

```
类组件：使用class声明，并继承Component，状态管理使用this.state和setState
功能组件：使用function的函数，状态管理使用Hooks
```

## 四 基础组件Text示例

### 4.1 功能组件示例(function声明)

```
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  return (
    <View className='index'>
      <Text>Hello world!!!</Text>
    </View>
  )
}
```

### 4.2 类组件示例(class关键字)

```
import { View, Text } from '@tarojs/components'
import { Component, ReactNode } from 'react'
import './index.scss'

export default class Index  extends Component {
  render(){
    return (
      <View className='index'>
        <Text>Hello world!!!</Text>
      </View>
    )
  }
}
```

### 4.3 效果图(H5)

![][1]

## 七 参考

* [Taro官网](https://docs.taro.zone/docs/)
* [Taro组件库—Text](https://docs.taro.zone/docs/components/base/text)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-12-component-text-1.png