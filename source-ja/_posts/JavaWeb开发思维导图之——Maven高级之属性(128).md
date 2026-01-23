---
title: JavaWeb开发思维导图之——Maven高级之属性(128)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: fbf158f8
date: 2025-05-12 09:56:11
---
## 一 概述

* 属性作用
* 属性类别

<!--more-->

## 二 属性作用

```
版本统一
```

## 三 属性类别

### 3.1 自定义属性

1-作用: 

```
等同于定义属性，方便统一维护
```

2-定义格式

```
1-定义标签
 1-<properties>标签定义属性
 2-<类型+版本>版本信息<类型+版本>

2-示例
 1-<spring.version>5.1.9.RELEASE</spring.version>//类型+版本
 2-<junit.version>4.12</junit.version>
```

3-调用格式

```
1-说明: ${定义属性}
2-示例:<version>${spring.version}</version>
```

### 3.2 内置属性

1-作用: 

```
使用maven内置属性，快速配置
```

2-调用格式

```
1-${basedir}
2${version}
```

### 3.3 Setting属性

1-作用: 

```
使用Maven配置文件setting.xml中的标签属性，用于动态配置
```

2-调用格式: 

```
${settings.localRepository}
```

### 3.4 Java系统属性

```
1-作用: 读取java系统属性
2-调用格式: ${user.home}
3-系统属性查询方式: mvn help:system
```

### 3.5 环境变量属性

```
1-作用: 使用maven配置文件setting.xml中的标签属性，用于动态配置
2-调用格式:${env.JAVA_HOME}
3-环境变量属性查询方式: mvn help:system
```

## 四 思维导图

![javaweb-xmind-maven2-property-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven2-property-4.png