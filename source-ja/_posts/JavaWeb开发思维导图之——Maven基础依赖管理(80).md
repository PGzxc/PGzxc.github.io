---
title: JavaWeb开发思维导图之——Maven基础依赖管理(80)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 9b11d004
date: 2025-03-14 08:55:47
---
## 一 概述

* 依赖配置
* 依赖传递
* 可选依赖
* 排除依赖
* 依赖范围

<!--more-->

## 二 内容详情

### 2.1 依赖配置

1-概念

* 1-依赖指当前项目运行所需的jar
* 2-一个项目可以设置多个依赖

2-配置格式

* 1-作用：设置当前项目所依赖的所有jar
* 2-子标签\<dependency>

3-引用项目依赖

* 1-说明: \<dependency>添加项目配置
* 2-示例: 项目3引用项目2
* 3-可能出现的问题: 依赖传递

### 2.2 依赖传递

1-依赖分类

* 1-直接依赖: 在当前项目中通过依赖配置建立的依赖关系
* 2-间接依赖: 被资源的资源如果依赖其他资源，当前项目间接依赖其他资源

2-依赖冲突

* 1-路径优先: 当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
* 2-声明优先: 当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
* 3-特殊优先: 当同级配置了相同资源的不同版本，后配置的覆盖先配置的

### 2.3 可选依赖

* 1-说明: 可选依赖指对外隐藏当前配置所依赖的资源—不透明
* 2-配置格式: dependency添加optional标签
* 示例:\<optional>true\</optional>

### 2.4 排除依赖

* 1-说明: 1-排除依赖指主动断开依赖的资源;2-被排除的资源无需指定版本
* 2-格式: dependency标签添加exclusions标签
* 3-示例: \<exclusions>\<exclusion>groupId+artifactId\</exclusion>\</exclusions>

### 2.5 依赖范围

1-概念:

* 1-依赖的jar默认情况下可以在任何地方使用
* 2-通过scope标签设定其作用范围

2-作用范围

* 1-主程序范围有效: main文件夹范围内
* 2-测试程序范围有效: test文件夹范围内
* 3-是否参与打包: package指令范围内

4-依赖范围scope

* 1-位置:dependency标签下
* 2-示例:\<scope>compile\</scope>
* 3-取值说明: 1-compile(默认); 2-test; 3-provided;4-runtime

5-依赖范围传递

* 1-带有以依赖范围的资源在进行传递时，作用范围受到影响
* 2-如何传递(了解)compile、test、provided、runtime遇到如何取值

## 三 思维导图

![javaweb-xmind-maven1-provide-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven1-provide-5.png