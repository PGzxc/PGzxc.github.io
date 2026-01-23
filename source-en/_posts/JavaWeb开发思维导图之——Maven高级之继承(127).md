---
title: JavaWeb开发思维导图之——Maven高级之继承(127)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: cba8de93
date: 2025-05-11 09:22:10
---
## 一 概述

* 作用
* 制作方式
* 继承的资源
* 继承与聚合

<!--more-->

## 二 作用

```
1-通过继承可以实现在子工程中沿用父工程中的配置
2-maven中的继承与java中的继承相似，在子工程中配置继承关系
```

## 三 制作方式

### 3.1 在子工程中声明其父工程坐标与对应的位置

1-\<parent>声明标签

2-包含内容

```
1-<groupId>com.example</groupId>//父工程id
2-<artifactId>ssm</artifactId>//父工程名称
3-<version>1.0-SNAPSHOT</version> //父工程版本
4-<relativePath>../ssm/pom.xml</relativePath>//父工程pom文件路径
```

### 3.2 继承依赖定义

1-说明

```
在父工程中定义依赖管理
```

2-依赖管理

```
1-<dependencies>//包含具体依赖

1-<dependency>具体依赖

1-<groupId>org.springframework</groupId>//依赖id
2-<artifactId>spring-context</artifactId>//依赖名称
3-<version>5.1.9.RELEASE</version>//依赖版本
```

### 3.3 继承依赖使用

1-说明

```
在子工程中定义依赖关系, 无需声明依赖版本，版本参考父工程中依赖的版本
```

2-依赖管理

```
1-<dependencies>//包含具体依赖

1-<dependency>具体依赖

1-<groupId>org.springframework</groupId>//依赖id
2-<artifactId>spring-context</artifactId>//依赖名称
```

## 四 继承的资源

### 4.1 第一组

```
1-groupId: 项目组ID，项目坐标的核心元素
2-version: 项目版本, 项目坐标的核心元素
3-description: 项目的描述信息
4-organization: 项目的组织信息
5-inceptionYear: 项目的创始年份
6-url: 项目的url地址
7-developers: 项目的开发者信息
8-contributors: 项目的贡献者信息
9-distributionManagement: 项目的部署配置
10-issueManagement: 项目的缺陷跟踪系统信息
```

### 4.2 第2组

```
1-ciManagement: 项目的持续集成系统信息
2-scm: 项目的版本控制系统信息
3-malilingLists: 项目的右键列表信息
4-properties: 自定义的Maven属性
5-dependencies: 项目的依赖配置
6-dependencyManagement: 项目的依赖管理配置
7-repositories: 项目的仓库配置
8-build: 包括项目的源码目录配置、输出目录配置、插件配置、插件管理配置等
9-reporting: 包括项目的報告输出目录配置、报告插件配置等
```

## 五 继承与聚合

### 5.1 作用

```
1-聚合用于快速构建项目
2-继承用于快速配置
```

### 5.2 相同点

```
1-聚合与继承的pom.xml文件打包方式均为pom，可以将两种关系制作到同一个pom文件中
2-聚合与继承均属于设计型模块，并无实际的模块内容
```

### 5.3 不同点

```
1-聚合是在当前模块中配置关系，聚合可以感知到参与聚合的模块有哪些
2-继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己
```


## 六 思维导图

![javaweb-xmind-maven2-implement-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven2-implement-3.png