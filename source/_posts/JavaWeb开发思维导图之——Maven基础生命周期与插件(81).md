---
title: JavaWeb开发思维导图之——Maven基础生命周期与插件(81)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: ae1105ed
date: 2025-03-16 07:37:34
---
## 一 概述

* Maven构建过程可能经历事件
* Maven生命周期
* 插件

<!--more-->

## 二 内容详情

### 2.1 Maven构建过程可能经历事件

* 1-compile
* 2-test-compile
* 3-test
* 4-package
* 5-install

### 2.2 Maven生命周期

#### 2.2.1 clean

1-说明: 清理工作

2-生命周期

* 1-pre-clean: 执行一些需要在clean之前完成的工作
* 2-clean:移除所有上一次构建生成的文件
* 3-post-clean:执行一些需要在clean之后立刻完成的工作

#### 2.2.2 default

1-说明: 核心工作，例如编译，测试、打包、部署等

2-生命周期

* 1-validate(校验): 校验项目是否正确并且所有必要的信息可以完成项目的构建
* 2-Initialize(初始化): 初始化构建状态，比如设置属性值
* 3-generate-sources(生成源代码): 生成包含在编译阶段中的任何源代码
* 4-process-sources(处理源代码): 处理源代码，比如说，过滤任意值
* 5-generate-resources(生成资源文件)
* 6-process-resources(处理资源文件)
* 7-compile(编译)
* 8-process-classes(处理类文件)
* 9-generate-test-sources(生成测试源代码)
* 10-process-test-sources(处理测试源代码)
* 11-process-test-resources(处理测试资源文件)
* 12-test-compile(编译测试源码)
* 13-process-test-classes(处理测试类文件)
* 14-test(测试)
* 15-prepare-package(准备打包)
* 16-package(打包)
* 17-pre-integration-test(集成测试前)
* 18-integration-test(集成测试)
* 19-post-integration-test(集成测试后)
* 20-verify(验证)
* 21-install(安装)
* 22-deploy(部署)

#### 2.2.3 site

1-说明: 产生报告，发布站点等

2-生命周期

* 1-pre-site: 执行一些需要在生成站点文档之前完成工作
* 2-site:生成项目的站点文档
* 3-post-site:执行一些需要在生成站点文档之后完成的工作，为部署做准备
* 4-site-deploy: 将生成的站点文档部署到特点的服务器上

### 2.3 插件

1-概念

* 1-插件与生命周期内的阶段绑定，在执行到对应生命周期时执行对应插件功能
* 2-默认maven在各个生命周期上绑定有预设的功能
* 3-通过插件可以自定义其他功能

2-配置插件

* 1-位置： build标签—>plugins—>plugin
* 2-配置：1-maven-source-plugin(默认)；2-executions->execution(自定义)

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

![javaweb-xmind-maven1-life-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven1-life-6.png