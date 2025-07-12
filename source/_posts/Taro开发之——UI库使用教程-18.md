---
title: Taro开发之——UI库使用教程(18)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: f6673637
date: 2025-07-12 14:41:28
---
## 一 概述

* 为何使用UI库
* 常用UI库
* UI库之—TaroUI使用示例

<!--more-->

## 二 为何使用UI库

### 2.1 效率提升：从重复造轮子到快速拼装

```
-现成组件开箱即用：UI 库提供了按钮、表单、导航栏、模态框等高频组件
-减少样式开发量：内置 CSS/LESS/SCSS 样式体系
```

### 2.2 设计一致性：团队协作与品牌标准化

```
-统一视觉语言
-跨平台适配
```

## 三 常用UI库

|      名称      |                             介绍                             | 支持的框架 | 支持的 Taro 版本 |
| :------------: | :----------------------------------------------------------: | :--------: | :--------------: |
|     TaroUI     |            一套基于 Taro 框架开发的多端 UI 组件库            |   React    |    Taro 1/2/3    |
|     nutui      |              京东风格的轻量级移动端 Vue 组件库               |    Vue3    |      Taro 3      |
|    taroify     |    轻量、可靠的小程序端 Taro 组件库（Vant 的 Taro 版本）     |   React    |      Taro 3      |
| @antmjs/vantui |   基于有赞 VantWeapp 开发的同时支持 Taro 和 React 的 UI 库   |   React    |      Taro 3      |
|      Tard      |         一套基于 Taro 框架开发的多端 React UI 组件库         |   React    |      Taro 3      |
|     duxui      | 一套能同时兼容小程序、React Native、鸿蒙、H5的移动端ui组件库 |   React    |      Taro 4      |

## 四 UI库之—TaroUI使用示例

### 4.1 安装 Taro 脚手架工具

```
npm install -g @tarojs/cli
或
yarn global add @tarojs/cli
```

### 4.2 初始化项目

```
taro init TaroUIDemo
```

![][1]

### 4.3 安装 Taro UI

```
cd TaroUIDemo
yarn add taro-ui
```

![][2]

### 4.4 使用 Taro UI

1、全局引入(CSS中)： 在 `app.scss` 样式文件中 `import` 组件样式

```
@import "~taro-ui/dist/style/index.scss"; // 引入组件样式 - 方式二
```

![][3]

2、使用示例：src/pages/index/index.tsx

```
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { AtButton } from 'taro-ui'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })
  return (
    <View className='index'>
      <AtButton type='primary'>按钮文案</AtButton>
    </View>
  )
}
```

3、编译执行

```
npm run dev:weapp
```

4、微信小程序打开查看效果

![][4]

### 4.5 修改演示

1、修改src/pages/index/index.tsx修改如下

```
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'
import { AtTabBar } from 'taro-ui'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const [current, setCurrent] = useState(0)
  const handleClick = (value) => {
    setCurrent(value)
  }
  return (
    <AtTabBar
      tabList={[
        { title: '待办事项', text: 8 },
        { title: '拍照' },
        { title: '通讯录', dot: true }
      ]}
      fixed
      onClick={handleClick.bind(this)}
      current={current}
    />
  )
}
```

2、编译运行到微信小程序如下

![][5]



## 五 参考

* [Taro官网](https://docs.taro.zone/docs/)
* [Taro UI](https://taro-ui.jd.com/#/docs/tabbar)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-18-ui-taroui-create-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-18-ui-taroui-add-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-18-ui-taroui-import-css-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-18-ui-taroui-wechat-default-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-18-ui-taroui-modify-5.png
