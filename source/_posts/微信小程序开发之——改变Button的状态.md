---
title: 微信小程序开发之——改变Button的状态
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 7a1ce62a
date: 2021-11-29 16:18:02
---
## 一 状态对比

| Normal状态 | Warn状态 |
| :--------: | :------: |
|   ![][1]   |  ![][2]  |

<!--more-->
## 二 示例

### 2.1 布局文件(button.wxml)

```
<button type="{{isactive?'primary':'warn'}}" bindtap="buttonClick">{{isactive?'确认':'取消'}}</button>
```

### 2.2 逻辑文件

```
Page({
  data: {
    isactive: true
  },
  buttonClick() {
    this.setData({isactive: !this.data.isactive})
  },
})
```

### 2.3 效果图
![][3]

## 三 参考
* [CSDN下载-示例代码](https://download.csdn.net/download/Calvin_zhou/51969907)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-button-state-primary.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-button-state-warning.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-button-state-change.gif

