---
title: JavaWeb开发思维导图之——Maven高级之跳过测试(132)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 6923f912
date: 2025-05-16 08:41:55
---
## 一 概述

* 跳过测试环节的应用场景
* 跳过测试3种方式

<!--more-->

## 二 跳过测试环节的应用场景

```
1-整体模块功能未开发
2-模块中某个供未开发完毕
3-单个功能更新调试导致其他功能失败
4-快速打包
```

## 三 跳过测试3种方式

### 3.1 使用命令跳过测试

```
1-命令: mvn 指令 -D skipTests
2-示例: mvn install -D skipTest
3-注意事项: 执行的指令生命周期必须包含测试环节
```

### 3.2 使用界面操作跳过测试

```
选中test点右上角闪电标记关闭
```

### 3.3 使用配置跳过测试

1-设置位置

```
<plugin>-><configuration>配置标签
```

2-3种配置

```
1-设置跳过测试:<skipTests>true</skipTests>//跳过全部
2-包含指定测试用例：<includes>//设置包含
3-排除指定测试用例：<excludes>//设置排除
```


## 四 思维导图

![javaweb-xmind-maven2-jump-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven2-jump-8.png