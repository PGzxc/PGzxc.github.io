---
title: JavaWeb开发思维导图之——SpringMVC之多拦截器配置(117)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 770df28b
date: 2025-04-27 09:50:58
---
## 一 概述

* 多拦截器配置
* 责任链模式

<!--more-->

## 二 内容详情

### 2.1 多拦截器配置

```
1-当配置多个拦截器时，形成拦截器链
2-拦截器链的运行顺序参考配置的先后顺序
3-当拦截器中出现对原始处理器的拦截，后面的拦截器均终止运行
4-当拦截器运行中断，仅运行配置在前面的拦截器的afterCompletion操作
```

### 2.2 责任链模式

```
1-责任链模式是一种行为模式
2-特征: 沿着一条预先设定的任务链顺序执行，每个节点具有独立的工作任务
3-优势
 -独立性: 只关注当前节点的任务，对其他任务直接放行到行到下一节点
 -隔离性: 具备链式传递特征，无需知晓整体链路结构只需等待请求到达后进行处理即可
 -灵活性: 可以任意修改链路结构动态新增或删减整体链路责任
 -解耦: 将动态任务与原始任务解耦
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-interceptor-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-interceptor-4.png