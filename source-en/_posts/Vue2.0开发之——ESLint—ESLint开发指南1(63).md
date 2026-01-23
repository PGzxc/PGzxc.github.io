---
title: Vue2.0开发之——ESLint—ESLint开发指南1(63)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: e9d718a9
date: 2023-03-28 12:38:47
---
## 一 概述

* 了解ESlint的作用
* eslintrc.js配置文件中的rules规则

<!--more-->

## 二 了解ESlint的作用

### 2.1 ESlint官网地址

* 中文官网地址：https://eslint.bootcss.com/
* 英文官网地址：https://eslint.org/
* 项目地址：https://github.com/eslint/eslint

### 2.2 ESlint介绍

* ESLint最初是由Nicholas C. Zakas 于2013年6月创建的开源项目
* 它的目标是提供一个插件化的javascript代码检测工具

### 2.3 VSCode常用设置

#### tabsize 设置

如下图所示：将`Editor:Tab Size`和`Vetur：Tab Size`设置为2

![][1]

#### format on save—勾选

![][2]

## 三 eslintrc.js配置文件中的rules规则

### 3.1 创建ESlint类型的项目

执行如下指令，创建项目

```
vue create vue-eslint-demo
```

![][3]
选择安装插件
![][4]
选择Vue版本
![][5]
选择less预处理器
![][6]
选择eslint语法规范( ESLint + Standard config)
![][7]
合适执行
![][8]
保存在独立的文件中
![][9]
创建完成后，如下图
![][10]
打开后看到项目目录下有一个`.eslintrc.js`文件
![][11]

### 3.2 如何查询rules规则说明

官方文档，依次点击：用户指南——>下拉列表(规则)，打开规则说明页面

![][12]

### 3.3 eslintrc.js中rules规则说明

eslintrc.js中rules

```
rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
```

#### no-console

在网页中按`Ctr+F`，调出搜索框，输入`no-console`，出现以下界面

![][13]

在`no-console`上点击，进入`no-console`详情界面
![][14]

'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'语法说明

当前模式为`production`时，显示警告，否则禁用规则




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-vs-tabsize.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-vs-editor-on-save.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-pick-preset.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-select-features.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-vue-version.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-less-choice.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-standard-choice.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-link-on-save.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-dedicated-config.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-finish.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-create-eslintrc-file.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-rules-doc-open.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-rules-console-explain.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-63-eslint-rules-console-detail.png