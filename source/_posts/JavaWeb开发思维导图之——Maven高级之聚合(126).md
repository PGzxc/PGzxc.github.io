---
title: JavaWeb开发思维导图之——Maven高级之聚合(126)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 8452c78b
date: 2025-05-10 08:25:23
---
## 一 概述

* 作用
* 制作方式
* 注意事项

<!--more-->

## 二 作用

```
聚合用于快速构建maven工程,一次性构建多个模块/项目
```

## 三 制作方式

### 3.1 创建一个空模块，打包类型定义为pom

1-类型

```
1-pom(模块管理)
2-war(controller)
3-jar(默认)
```

2-示例：

```
<packaging>pom</packaging>
```

### 3.2 定义当前模块进行构建操作时关联的其他模块名称

```
1-modules标签声明模块
2-<module>导入-<modules><module>../ssm_pojo</module></modules>
```

## 四 注意事项

```
参与聚合操作的模块最终执行顺序与模块间的依赖关系有关，与配置顺序无关
```


## 五 思维导图

![javaweb-xmind-maven2-juhe-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven2-juhe-2.png