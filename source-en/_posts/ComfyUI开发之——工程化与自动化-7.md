---
title: ComfyUI开发之——工程化与自动化(7)
categories:
  - 开发
  - Q-AI
  - ComfyUI
tags:
  - ComfyUI
abbrlink: e4c8c157
date: 2026-02-08 09:37:24
---
## 一 概述

```
本文介绍一下内容：
 1.Workflow 设计方法论
 2.Workflow JSON 深度解析
 3.自定义节点(Custom Nodes)
 4.ComfyUI API 使用
 5.ComfyUI + Agent 架构(终极形态)
```

<!--more-->

## 二 Workflow 设计方法论

### 2.1 为什么要“设计”Workflow？

```
1.新手常见 Workflow 特点：
-节点一大坨
-只适合当前任务
-改一个参数要全图找
-不能复用、不能扩展

2.工程化 Workflow 的目标是：
像写代码一样搭流程
```

### 2.2 拆分 / 复用 / 模块化

1-拆分(Separation)

```
1.把一个大 Workflow 拆成：
输入模块（Input）
生成模块（Generate）
控制模块（Control）
后处理模块（Post）

2.示意结构：

Input
 ├─ Prompt
 ├─ Image
 └─ Params
      ↓
Generate
      ↓
Post Process
      ↓
Output
```

2-复用(Reuse)

```
1.常见可复用模块：
-LoRA 组合模块
-ControlNet 模块
-Upscale 模块
-Hires 修复模块

2.思想：
一个模块 = 一个职责
```

3-模块化(Modular)

```
1.工程级 Workflow 特点：
-模块之间 弱耦合
-可插拔
-可替换

2.例如：

Upscale Module
  ├─ ESRGAN
  └─ Real-ESRGAN
```

### 2.3 参数抽象

```
1.不要把参数“写死”在节点里。

2.做法：
-使用统一参数节点
-通过 reroute / primitive 控制
-暴露关键参数

3.典型抽象参数：
-Steps
-CFG
-Denoise
-Seed
-分辨率

4.好处：
-调参效率极高
-方便 API 调用
-方便 LLM 控制
```

## 三 Workflow JSON 深度解析

### 3.1 Workflow 本质就是 JSON

```
1.ComfyUI 的 Workflow：100% 可序列化 JSON

2.JSON 中包含：
-节点定义
-节点参数
-节点连接关系
-UI 位置信息
```

### 3.2 JSON 核心结构(简化)

```
1.配置
{
  "nodes": {
    "1": {
      "class_type": "KSampler",
      "inputs": {...}
    }
  },
  "links": [...]
}


2.关键概念：
-class_type：节点类型
-inputs：参数或输入连接
-links：节点之间的数据流
```

### 3.3 手写 vs 自动生成

```
1.自动生成（UI）
-直观
-易出错但好理解
-适合学习

2.手写 / 程序生成（高阶）
-批量生成 Workflow
-动态拼装流程
-与后端系统结合

3.实际工程中：
UI 用于设计，JSON 用于生产
```

### 3.4 Workflow 的版本管理

```
1.强烈建议：
-Workflow JSON 纳入 Git
-每次修改即提交
-模型版本写清楚

2.最佳实践：

workflow/
 ├─ image_v1.json
 ├─ image_v2_controlnet.json
 └─ video_v1.json
```

## 四 自定义节点(Custom Nodes)

### 4.1  为什么要自定义节点？

```
当你遇到：
-逻辑重复
-参数组合复杂
-需要调用外部服务
-官方节点不够用

就该写 Custom Node 了。
```

### 4.2 ComfyUI 节点机制简介

```
1.一个节点本质是：
-Python 类
-输入定义
-输出定义
-执行函数

2.核心文件结构：

custom_nodes/
 └─ my_node/
     ├─ __init__.py
     └─ node.py
```

### 4.3 Python 自定义节点核心要点

```
1.核心元素：
-INPUT_TYPES
-RETURN_TYPES
-FUNCTION
-CATEGORY

2.节点思维：
输入 → 处理 → 输出

3.重要原则：
-节点要“纯”
-不要有副作用
-输入输出清晰
```

### 4.4 调试与发布

```
1.调试技巧
-控制台日志
-打印输入输出
-小数据先测

2.发布方式
-GitHub 仓库
-pip 安装
-子模块引用
```

## 五 ComfyUI API 使用

### 5.1 为什么用 API？

```
1.API 让 ComfyUI 从：手工工具 升级为：AI 服务
```

### 5.2 HTTP API 基本能力

```
1.常见能力：
-提交 Workflow
-传入参数
-获取结果
-批量任务

2.基本流程：

Client
 → POST Workflow JSON
 → ComfyUI 执行
 → 返回结果
```

### 5.3 批量生成(生产级)

```
1.批量生成常用策略：
-固定 Workflow
-动态参数
-队列执行

2.应用场景：
-电商商品图
-短视频封面
-素材库生成
```

### 5.4 与后端服务集成

```
1.常见架构：
前端
 → 后端 API
 → ComfyUI
 → 存储 / CDN

2.优势：
-前端不接触模型
-权限可控
-易扩展
```

## 六 ComfyUI + Agent 架构

### 6.1 为什么要 Agent？

```
1.传统流程：人 → 调参数 → 出图

2.Agent 流程：

人 → 需求
   → LLM 规划
   → 自动执行 Workflow
   → 输出结果
```

### 6.2 LLM 控制 Workflow 的方式

```
1.LLM 可以：
-生成 Prompt
-决定参数
-选择 Workflow
-控制执行顺序

2.示例逻辑：

用户需求
 → LLM 解析
 → Workflow JSON 拼装
 → ComfyUI 执行
```

### 6.3 自动化内容生产线

```
1.完整生产线示例：

需求输入
 → LLM 生成方案
 → Image / Video
 → Upscale
 → Audio
 → 文案生成
 → 发布


2.说明：这已经是 AI 工厂级架构
```

