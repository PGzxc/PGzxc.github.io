---
title: JavaWeb开发思维导图之——Maven高级之分模块开发与设计(125)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 60ea681e
date: 2025-05-09 09:02:07
---
## 一 概述

* 说明
* 项目拆分

<!--more-->

## 二 说明

```
1-拆分前controller、dao、domain、service位于同一项目下
2-拆分后controller、dao、domain、service分属于不同项目
3-通过pom管理上述项目
```

## 三 项目拆分

### 3.1 ssm_pojo拆分

1-说明

```
domain模块
```

2-步骤

```
1-新建模块
2-内容移植
 1-说明: 拷贝原始项目中对应相关内容到ssm_pojo模块
 2-内容：1-实体类(User)、2-配置文件(无)
```

### 3.2 dao模块拆分

1-说明

```
数据操作相关模块
```

2-步骤

```
1-新建模块
2-步骤
 1-新建模块
 2-内容移植
```

### 3.3 service模块拆分

1-说明

```
调用Dao实现业务相关模块
```

2-步骤

```
1-新建模块
2-内容移植
```

### 3.4 controller模块拆分

1-说明

```
页面相关模块
```

2-步骤

```
1-新建模块(使用webapp模板)
2-内容移植
```


## 三 思维导图

![javaweb-xmind-maven2-module-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven2-module-1.png