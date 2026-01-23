---
title: Mac系统开发之——软件打开后显示已损坏
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: 6293bbdf
date: 2025-12-16 10:35:54
---
## 一 概述

```
本文介绍软件打开后显示已损坏的解决办法：
-解除隔离属性(推荐)
-右键打开(对部分App有效)
-系统设置→隐私与安全性-仍要打开(偶尔)
```

<!--more-->

## 二 解决办法

### 2.1 方法一、解除隔离属性(推荐)—最常用，90% 可解

```
1、打开 终端 Terminal
2、输入(注意路径，直接拖 App 到终端会自动补全)：
sudo xattr -rd com.apple.quarantine /Applications/你的软件.app
例如：
sudo xattr -rd com.apple.quarantine /Applications/Typora.app

3、回车 → 输入 Mac 登录密码(输密码时不会显示)
4、再双击打开 App
5、原理：macOS 会给「非App Store/未公证」的软件加隔离标记，删掉就能运行。
```

### 2.2 方法二(临时允许打开)—适合偶尔用一次

```
1、打开 系统设置 → 隐私与安全性
2、滑到最下面
3、你会见到：“已阻止打开 xxx，因为无法验证开发者”
4、点 仍要打开
5、再次确认
6、有时会 完全不显示这个按钮，那就用方法一。
```

### 2.3 方法三(右键打开)—对部分App有效

```
1、右键 App
2、选择 打开
3、弹窗再点 打开
4、如果直接提示“已损坏”，多半 无效，直接跳方法一。
```

### 2.4 不推荐的方法(但可以)

```
1、方法：关闭 Gatekeeper(风险高)
sudo spctl --master-disable

2、原因
会降低系统安全性，不建议长期使用

3、恢复
sudo spctl --master-enable
```

## 三 常见导致原因

```
1、软件: 未签名/未公证
2、老版本 App(尤其 Intel → Apple Silicon)
3、从压缩包直接运行，未拖到/Applications
4、下载过程被浏览器“保护性修改”
```

