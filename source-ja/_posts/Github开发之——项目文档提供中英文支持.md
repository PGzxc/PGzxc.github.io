---
title: Github开发之——项目文档提供中英文支持
categories:
  - 开发
  - I-版本控制
  - Github
tags:
  - Github
abbrlink: 1ae29930
date: 2025-09-16 09:54:10
---
## 一 概述

```
本文介绍:
 -GitHub 项目仓库里有项目说明或文档(比如 README.md)
 -说明或文档提供:中文和英文 支持
 -介绍:三方提供实现
```

<!--more-->

## 二 方法1：单文件双语(中英文在同一个README.md中)

### 2.1 创建README.md

```
位置:项目根目录下
```

### 2.2 中英文在同一个README.md中(示例)

```
# 项目名称 Project Name

## 简介 Introduction
**中文：**  
这是一个基于 React Native 的示例项目，用于演示跨平台开发。  

**English:**  
This is a sample project based on React Native to demonstrate cross-platform development.  

---

## 功能 Features
- 📱 跨平台支持（iOS/Android）  
- 🔌 模块化架构  
- 🌐 国际化支持  

- 📱 Cross-platform support (iOS/Android)  
- 🔌 Modular architecture  
- 🌐 Internationalization support  

---

## 使用方式 Usage
**中文：**  
​```bash
git clone https://github.com/username/repo.git
cd repo
npm install
npm start

​```

**English:**  

​```
git clone https://github.com/username/repo.git
cd repo
npm install
npm start
​```

## 说明

​```
特点：一个文件就能展示所有内容，读者无需切换页面。  
缺点：内容较多时，中英文会显得冗余。
​```
```

### 2.3 特点

```
特点：一个文件就能展示所有内容，读者无需切换页面。  
缺点：内容较多时，中英文会显得冗余。  
```

## 三 方法2：分文件(README_zh.md + README_en.md)

### 3.1 根目录结构

```
README.md # 默认简介（可以写中英文简短说明）
README_zh.md # 中文说明
README_en.md # English guide
```

### 3.2 文件内容

1、README.md

```
# 项目名称 Project Name

🌐 [中文说明](./README_zh.md) | [English Documentation](./README_en.md)

这是一个开源示例项目，支持中英文文档。  
This is an open-source sample project with both Chinese and English documentation.
```

2、README_zh.md 示例：

```
# 项目名称

## 简介
这是一个示例项目，主要用于演示 GitHub 仓库如何支持中文文档。
```

2、README_en.md 示例

```
# Project Name

## Introduction
This is a sample project, mainly used to demonstrate how a GitHub repository can support English documentation.
```

### 3.3 特点

```
特点：内容清晰，适合大型项目，读者可以选择语言。
缺点：需要维护两份文件
```

## 四 方法3：多语言文件夹

### 4.1 目录结构

```
README.md
docs/
 ├─ zh/
 │   └─ README.md
 └─ en/
     └─ README.md
```

### 4.2 文件内容

1、根目录 README.md(提供入口链接)

```
# 项目文档 Project Documentation

📖 [中文文档](./docs/zh/README.md) | [English Docs](./docs/en/README.md)
```

2、docs/zh/README.md

```
中文文档
```

3、docs/en/README.md

```
英文文档
```

### 4.3 特点

```
适合文档很多的项目，尤其是开源框架、工具类库
```

## 五 建议

```
-小项目：用 方法1(双语单文件)就够。
-中型项目：推荐 方法2(README_zh.md + README_en.md)。
-大型项目：用 方法3(docs/zh + docs/en)
```

