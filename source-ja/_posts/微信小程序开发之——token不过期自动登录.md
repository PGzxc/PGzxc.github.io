---
title: 微信小程序开发之——token不过期自动登录
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: fadad644
date: 2021-11-16 11:11:23
---
## 一 概述

* 通过手机号登录后，获取用户token，并将token保存到Storage中
* token的有效期是一天，token失效后，自动跳转到登录接口，并获取最新token
* token没有失效时，从小程序搜索进入，不需要登录了

<!--more-->

## 二 实现原理过程

* 登录成功时，根据登录成功的时间，计算过期时间，并将过期日期保存到Storage中
* 每次进入时，从Storage中获取保存的过期时间和当前时间进行比较
* 当前时间小于Storage中保存的过期时间，不需要登录
* 当前时间大于Storage中保存的过期时间，跳转登录页面，进行登录

## 三 代码

### 3.1 登录成功后，保存过期时间

#### 过期时间工具类(获取到date+1)

```
const expireTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()+1 //过期时间，当前日期-天数+1
  const hour = date.getHours()
  const minute = date.getMinutes() 
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  expireTime
}
```

#### 保存过期时间

```
 var expreTime=util.expireTime(new Date())
 console.log(expreTime);
 wx.setStorageSync('expreTime', expreTime);
```

### 3.2 app.js中获取过期时间和登录时间进行比较

```
 var expreTIme= wx.getStorageSync('expreTime')
 var date1=new Date(expreTIme)
 var long1=date1.getTime();
 var long2=new Date().getTime();
 if(long1<long2){
      wx.showToast({
        title: 'token过期了',
      })
 wx.navigateTo({
         url: '/pages/login/login',
      })
   }else{
    //不过期
  }
```

