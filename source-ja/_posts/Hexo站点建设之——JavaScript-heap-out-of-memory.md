---
title: Hexo站点建设之——JavaScript heap out of memory
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 3df1bea
date: 2020-08-06 21:34:42
---
## 一 概述
最近在写博客时，编译时经常出现错误，出现的错误提示信息为`JavaScript head out of memory`，刚开始认为是缓存过大引起的(博客占用空间已超过4G)，使用`hexo clean`指令和清除git缓存文件，问题依然存在

<!--more-->

## 二 现象


```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 000000013FE1F04A v8::internal::GCIdleTimeHandler::GCIdleTimeHandler+5114
 2: 000000013FDFA0C6 node::MakeCallback+4518
 3: 000000013FDFAA30 node_module_register+2032
 4: 00000001400820EE v8::internal::FatalProcessOutOfMemory+846
 5: 000000014008201F v8::internal::FatalProcessOutOfMemory+639
 6: 00000001405A2BC4 v8::internal::Heap::MaxHeapGrowingFactor+9556
 7: 0000000140599C46 v8::internal::ScavengeJob::operator=+24310
 8: 000000014059829C v8::internal::ScavengeJob::operator=+17740
 9: 00000001405A0F87 v8::internal::Heap::MaxHeapGrowingFactor+2327
10: 00000001405A1006 v8::internal::Heap::MaxHeapGrowingFactor+2454
11: 000000014015CDB7 v8::internal::Factory::NewFillerObject+55
12: 00000001401F2CC6 v8::internal::WasmJs::Install+29414
13: 000001BEAF5DC5C1
```
![][1]

## 三 解决办法

 在package.json文件的scripts中添加 

```
 "scripts": {
    "dev": "node --max_old_space_size=4096 build/dev-server.js",
    "build": "node --max_old_space_size=4096 build/build.js"
  }
```

![][2]

## 四 结果

执行`hexo g`编译项目，没有出现上述错误，执行`hexo s`运行项目，查看项目运行结果

![][3]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-heap-outof-memory.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-script-space-size.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-hexo-s.png