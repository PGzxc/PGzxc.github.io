---
title: React Native开发之——React Native将license修改为MIT意欲何为(15)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native将license修改为MIT
abbrlink: aeb1a1de
date: 2018-03-07 11:09:04
---
注：本文为转载文章，原文请参考：[React Native将license修改为MIT意欲何为][1]
## 一 概述
```
前几天，Facebook 在 GitHub 上修改了 React Native 的开源协议（由Facebook BSD+Patents 修改为MIT），
这意味着 React Native 将同 React 一样不再使用 Facebook BSD+Patents 协议，而是使用 MIT 协议。
```

<!--more-->

## 二 背景知识
```
BSD、MIT 和 Apache v2 是常用的三个开源软件协议，
但 Facebook 使用的却是 BSD+Patents 协议，Patents 协议是 Facebook 的“特产”，称为专利附属条款，
被视为 Facebook 用于解决开源代码中可能出现的专利纠纷的防御措施。

Patents 协议是 2015 年 Facebook 添加的，大致内容是使用基于 Facebook BSD+Patents 协议的开源项目的开发者，
未来要是因为专利问题与 Facebook 产生纠纷，那么 Facebook 将有权停止你使用该开源项目，也
就是说如果你起诉 Facebook，那么你所使用他们的开源技术开发的产品要么得停用，
要么得用别的技术迁移重构，这对企业来说是一个重大的灾难。

虽然这个附属协议引起了社区开发者们强烈地不满，上书诉求不断，但是都没能改变 Facebook 的决定，
因为 Facebook 认为这样的协议虽然会让他们失去一些用户，但从长远来看，可以让他们在诉讼上减少金钱和时间的浪费。

但是到了 2017 年 7 月，开源组织 Apache 软件基金会将基于 Facebook BSD+Patents 协议的开源软件列入黑名单让事情出现了转机，
同年 9 月，WordPress、百度等大型公司宣布停用 React（Native) 开源项目以规避风险，
此后，Facebook 才公开发表声明，表示从 v16 开始，React 将不再使用 BSD+Patents 协议，而是采用 MIT 协议。

由于去年 9 月 Facebook 只是宣布将 React、Jest、Flow 和 Immutable.js 执行 MIT 协议，
但同作为 Facebook 黄金级别的开源项目 React Native 却维持 BSD+Patents 协议，这自然引发开发者的热议与不满。
在经过开发者几个月的努力之下，Facebook 终于为之所动，让 React Native 采用 MIT 标准。

Facebook 在社区的压力下进行退让，让开发者对 Facebook 的开源项目重拾信心，
这种抛弃单惠协议，重持开源精神的做法也让 React Native 开发者狂欢！
```

## 三 参考 
大家可以到以下地址进行投诉和查看RN的最新情况：   
[https://github.com/facebook/react-native/issues/16069 ][2]  
[https://github.com/facebook/react-native/issues/16079][3]



[1]: http://blog.csdn.net/xiangzhihong8/article/details/79384236
[2]: https://github.com/facebook/react-native/issues/16069
[3]: https://github.com/facebook/react-native/issues/16079