---
title: Taro开发之——组件库之表单组件(14)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 408f79ac
date: 2025-07-05 08:31:24
---
## 一 概述

* 官方表单组件
* 类组件和功能组件
* 表单组件Button示例

<!--more-->

## 二 官方表单组件

```
Taro官方组件库——表单组件提供了一下几种组件

-Button:按钮
—Checkbox：多选项目
-CheckboxGroup：多项选择器
—Editor：富文本编辑器，可以对图片、文字进行编辑
—Form:表单
-Input：输入框
-KeyboardAccessory：聚焦时键盘上方工具栏视图
-Label:用来改进表单组件的可用性
-Picker:从底部弹起的滚动选择器
-PickerView:嵌入页面的滚动选择器 
-PickerViewColumn:滚动选择器子项
-Radio:单选项目
-RadioGroup:单项选择器，内部由多个 Radio 组成
-Slider:滑动选择器
-Switch:开关选择器
-Textarea：多行输入框
```

## 三 类组件和功能组件

```
类组件：使用class声明，并继承Component，状态管理使用this.state和setState
功能组件：使用function的函数，状态管理使用Hooks
```

## 四 表单组件Button示例

### 4.1 功能组件示例(function声明)

```
import { View, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Component } from 'react'
import './index.scss'

export default function Index() {
  const btn = [
    {
      text: '页面主操作 Normal',
      size: 'default',
      type: 'primary'
    },
    {
      text: '页面主操作 Loading',
      size: 'default',
      type: 'primary',
      loading: true,
    },
    {
      text: '页面主操作 Disabled',
      size: 'default',
      type: 'primary',
      disabled: true,
    },
    {
      text: '页面次要操作 Normal',
      size: 'default',
      type: 'default'
    },
    {
      text: '页面次要操作 Disabled',
      size: 'default',
      type: 'default',
      disabled: true,
    },
    {
      text: '警告类操作 Normal',
      size: 'default',
      type: 'warn'
    },
    {
      text: '警告类操作 Disabled',
      size: 'default',
      type: 'warn',
      disabled: true,
    }
  ]
  useLoad(() => {
    console.log('Page loaded.')

  })
  return (
    <View className='container'>
      {btn.map(item => {
        return (
          <Button
            size={item.size ? item.size : ''}
            type={item.type ? item.type : ''}
            loading={item.loading ? item.loading : false}
            disabled={item.disabled ? item.disabled : false}
          >
            {item.text}
          </Button>
        )
      })}
      <Button className='btn-max-w' plain type='primary'>按钮</Button>
      <Button className='btn-max-w' plain type='primary' disabled>不可点击的按钮</Button>
      <Button className='btn-max-w' plain >按钮</Button>
      <Button className='btn-max-w' plain disabled >按钮</Button>
      <Button size='mini' type='primary'>按钮</Button>
      <Button size='mini' >按钮</Button>
      <Button size='mini' type='warn'>按钮</Button>
      <Button openType='getPhoneNumber' onGetPhoneNumber="callback">按钮</Button>
    </View>
  )
}
```

### 4.2 类组件示例(class关键字)

```
import { View, Button } from '@tarojs/components'
import { Component } from 'react'
import './index.scss'

export default class Index extends Component {

  state = {
    btn: [
      {
        text: '页面主操作 Normal',
        size: 'default',
        type: 'primary'
      },
      {
        text: '页面主操作 Loading',
        size: 'default',
        type: 'primary',
        loading: true,
      },
      {
        text: '页面主操作 Disabled',
        size: 'default',
        type: 'primary',
        disabled: true,
      },
      {
        text: '页面次要操作 Normal',
        size: 'default',
        type: 'default'
      },
      {
        text: '页面次要操作 Disabled',
        size: 'default',
        type: 'default',
        disabled: true,
      },
      {
        text: '警告类操作 Normal',
        size: 'default',
        type: 'warn'
      },
      {
        text: '警告类操作 Disabled',
        size: 'default',
        type: 'warn',
        disabled: true,
      }
    ]
  }
  render () {
    return (
      <View className='container'>
        {this.state.btn.map(item => {
          return (
            <Button
              size={item.size ? item.size : ''}
              type={item.type ? item.type : ''}
              loading={item.loading ? item.loading : false}
              disabled={item.disabled ? item.disabled : false}
            >
              {item.text}
            </Button>
          )
        })}
        <Button className='btn-max-w' plain type='primary'>按钮</Button>
        <Button className='btn-max-w' plain type='primary' disabled>不可点击的按钮</Button>
        <Button className='btn-max-w' plain >按钮</Button>
        <Button className='btn-max-w' plain disabled >按钮</Button>
        <Button size='mini' type='primary'>按钮</Button>
        <Button size='mini' >按钮</Button>
        <Button size='mini' type='warn'>按钮</Button>
        <Button openType='getPhoneNumber' onGetPhoneNumber="callback">按钮</Button>
      </View>
    )
  }
}
```

### 4.3 效果图(H5)

![][1]

## 五 参考

* [Taro官网](https://docs.taro.zone/docs/)
* [Taro组件库—Button](https://docs.taro.zone/docs/components/forms/button)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-14-component-button-1.png