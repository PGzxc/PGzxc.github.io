---
title: Gradle开发之——大纲
categories:
  - 开发
  - T-构建
  - Gradle
tags:
  - Gradle
abbrlink: ca22ef37
date: 2018-06-20 00:23:17
---
# 前言
## 概念
1. Gradle是基于Apache Ant和Apache Maven概念的项目自动化构建开源工具
2. 基于Groovy的特定领域语言(DSL)来声明项目设置，抛弃了基于XML的各种繁琐配置
3. 面向Java应用为主
<!--more-->


## 支持的语言
1. Java
2. Groovy
3. Kotlin
4. Scala

## 依赖管理
1. maven仓库
2. Ivy仓库
3. nexus私服
4. 本地文件系统的jars
5. 本地文件系统的dirs

## 特点
1. 功能强大的基于JVM的构建工具
2. 使用程序替代原来的xml配置，项目构建更加灵活
3. 丰富的第三方插件库
4. 完善Java、Android开发技术体系
5. 提升自动化构建技术深度
6. 支持传递性依赖管理
7. build脚本使用Groovy编写

# 基础
## 基础知识
### DSL
#### 概念
1. 领域专用语言（Domain Specified Language）
2. 解决系统构建困难

#### 常见DSL
1. UML
2. HTML
3. 硬件设计师 VHDL

#### 特点
1. 用于专门领域，不能用于其他领域
2. 表现力有限
3. 不描述解答域，仅描述问题域

#### DSL 与通用编程语言的区别
1. DSL 供非程序员使用，供领域专家使用
2. DSL 有更高级的抽象，不涉及类似数据结构的细节
3. DSL 表现力有限，其只能描述该领域的模型，而通用编程语言能够描述任意的模型

### Groovy
#### 概念
是一种基于JVM（Java虚拟机）的敏捷开发语言
##### 特点
1. 结合了Python、Ruby和Smalltalk的许多强大的特性
2. Groovy 代码能够与 Java 代码很好地结合，也能用于扩展现有代码
3. 具有闭包和动态语言中的其他特性
4. 用于面向对象编程又可以用于面向过程编程

##### 优势
1. 是一种更加敏捷的开发语言
2. 入门容易，功能强大
3. 既可以作为编程语言又可以作为脚本语言

#### 语法

##### 变量
###### 类型
####### 基本类型
1. byte
2. char
3. short
4. int
5. long
6. float
7. double

####### 对象类型
######## 字符串
1. String
2. GString

###### 定义
1. 强类型定义
2. 弱类型def定义

#### 句法
##### 逻辑控制语句
###### 顺序逻辑
单步往下执行
###### 条件逻辑
1. if/else
2. switch/case

###### 循环逻辑
1. while循环
2. for循环

#### 词法
1. 闭包
2. 面向对象

# 提升
## 文件操作
### Gson文件
1. 数据转Gson
2. 格式化Gson
3. Gson转实体

### Xml文件
1. Xml解析
2. 遍历
3. Xml生成

### Groovy文件
1. 操作
2. 对象读写
3. 实例

## 生命周期
1. 初始化阶段(Initalization)
2. 配置阶段(Configuration)
3. 执行阶段(Execution)

## Project
1. Project介绍
2. Project核心API
3. Project实战

## Task
1. Task定义及配置
2. Task执行
3. Task依赖和执行
4. Task类型
5. Task实战
6. Task输入与输出

## 插件及类库
1. Setting类
2. SourceSet类
3. Plugin类及自定义Plugin
4. Gradle扩展
5. 项目迁移及修改

# 实战
Jenkins集成
 
# 思维导图
![][1]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/gradle-outline.png