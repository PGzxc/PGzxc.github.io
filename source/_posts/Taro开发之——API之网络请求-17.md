---
title: Taro开发之——API之网络请求(17)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 2e44eab1
date: 2025-07-10 08:47:54
---
## 一 概述

* Taro.request(option)说明
* 网络请求效果
* 网络请求示例

<!--more-->

## 二 Taro.request(option)说明

### 2.1 示例代码

```
Taro.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: function (res) {
    console.log(res.data)
  }
})
```

### 2.2 注意事项—直接请求会出现出错，需要配置配置跨域

```
1、位置：config/dev.ts
2、配置项
  h5: {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://www.wanandroid.com', // 后端API域名
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  }
```

## 三 网络请求效果

### 3.1 成功示例

![][1]

### 3.2 失败示例

![][2]

## 四 网络请求示例

```
import { View, Image, Canvas, Button, Progress, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Component, useEffect, useState } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'


export default function Index() {
  const [resp, setResp] = useState([]);
  const [loading, setLoading] = useState(false);
  var [error, setError] = useState(null);

  const  onClick = () => {
    fetchResp()
  }

  const fetchResp = async () => {
    setLoading(true)
    try {
      const res = await Taro.request({
        url: '/api/article/list/0/json', //仅为示例，并非真实的接口地址
      })
      console.log("res=="+res.data)
      if (res.statusCode === 200) {
        setResp(res.data.data.datas); // 处理响应数据
      } else {
        throw new Error(`请求失败: ${res.errMsg}`);
      }

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }
  return (
    <View>
      <Button onClick={onClick}>请求结果</Button>
      {loading && <Text>加载中...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {resp.map((item, index) => (
        <View key={index}>
          <Text>{index}--{item.title}</Text>
        </View>
      ))}
    </View>
  )
}
```

## 五 参考

* [Taro官网](https://docs.taro.zone/docs/)
* [API—网络request](https://docs.taro.zone/docs/apis/network/request/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-17-api-http-suc-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-17-api-http-fail-2.png