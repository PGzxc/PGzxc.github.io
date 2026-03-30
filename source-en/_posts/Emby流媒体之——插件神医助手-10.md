---
title: Emby流媒体之——插件神医助手(10)
categories:
  - NAS
  - D-媒体服务器
  - Emby
tags:
  - Emby
abbrlink: 6f8aeda9
date: 2026-03-30 17:27:49
---
## 一 概述

```
本文介绍：
- 神医助手是什么
- 下载安装及卸载
- 注意事项
```

<!--more-->

## 二 神医助手是什么

### 2.1 原版神医助手(StrmAssistant)

```
1.项目地址
https://github.com/sjtuross/StrmAssistant/wiki

2.说明
-Emby中文支持弱，尤其是带.strm文件的媒体库，搜索、刮削、元数据啥的经常翻车。
-原版神医助手（StrmAssistant）是社区大佬“神医”开发的插件
-功能超级全：媒体信息提取、片头片尾自动探测、豆瓣辅助刮削、TMDB剧集组、拼音排序……
```

### 2.2 神医助手简化版(StrmAssistant_less)

```
1.项目地址
https://github.com/xinjiawei/StrmAssistant_less

2.说明
-jiawei老哥fork了个StrmAssistant直接精简成轻量版
-只留最核心的中文搜索增强和代理配置，还保留了起播速度优化、缩略图增强、片头探测这些日常刚需
-名字里的“less”就是“少而精”的意思，完美契合我这种不爱折腾的日常用户。
```

### 2.3 实际用起来啥感觉

```
1.搜索：
-最大的变化就是搜索飞起！
-以前搜《庆余年》这种带中文的，半天出不来结果，现在模糊搜索+演员名直接秒出，爽到飞起。

2.代理：
代理配置也超实用，我家网络偶尔抽风，开了代理后外部资源抓取稳稳的。
```

## 三 下载安装及卸载

### 3.1 下载安装

```
1. 去下载地址拉最新DLL。
(https://cf.mb6.top/tmp/?dir=emby/plugins/StrmAssistant_less)

2. 扔进Emby的plugins文件夹，重启Emby。
3. 插件设置里把“中文搜索增强”打开，再重启一次就完事。
```

### 3.2 升级

```
1.步骤：
一定要先关功能
如：关Emby → 删旧版 → 升级Emby → 装新版 → 开功能 → 重启。

2.注意事项：
顺序乱了数据库索引会坏，修起来哭都来不及（修复指南在原wiki里有）。
我上次就差点踩坑，还好按博客一步步来，平安无事。
```

### 3.3 卸载

```
先关功能再删，不然Emby直接报“no such tokenizer: simple”错误！！
```

## 四 注意事项

```
1.互斥插件：
别和原版神医助手、Pro版、StrmExtract这些一起装，会打架。

2.支持正版：
我自己用的是less版，但真心建议有需求的朋友去支持Pro版，神医大佬维护不容易。

3.开源精神：
less版也是CC BY-NC-SA 4.0协议，欢迎有.NET大佬继续fork维护。
```

## 五 参考

* [StrmAssistant](https://github.com/sjtuross/StrmAssistant/wiki)
* [StrmAssistant_less](https://github.com/xinjiawei/StrmAssistant_less)