---
title: ComfyUI开发之——Templates模板体系(2)
categories:
  - 开发
  - Q-AI
  - ComfyUI
tags:
  - ComfyUI
  - Templates
abbrlink: 6e9bbc5f
date: 2026-02-03 08:49:23
---
## 一 概述

```
本文介绍一下内容：
 1.Templates 是什么
 2.Templates 的入口与使用方式
 3.Image Templates 全解析
 4.Video Templates
 5.Audio Templates
 6.3D Model Templates
 7.LLM Templates
 8.Utility Templates
 9.Partner Nodes Templates
```

<!--more-->

## 二 Templates 是什么？为什么一定要先学模板

### 2.1 Templates 的本质

```
1.在 ComfyUI 中：
Template = 官方预设的 Workflow（工作流）

2.它并不是“示例截图”，而是：
-真正可运行的流程
-已连接好的节点
-已验证可用的结构

你打开模板，本质是在加载一个 .json 工作流。
```

### 2.2 为什么不建议新手一开始自己搭？

1、原因很简单

```
-节点多
-依赖复杂
-参数组合容易错
-新手不知道「正确结构是什么样」
```

2、Templates解决

|       问题       | Templates 的作用 |
| :--------------: | :--------------: |
| 不知道要哪些节点 |      已搭好      |
|  不知道连接顺序  |      已连接      |
|  不知道参数范围  |   给了合理默认   |
|     模型缺失     |   自动提示下载   |

说明：模板 = 最佳学习样本

### 2.3 Templates 与普通 Workflow 的区别

|   项目   | Templates | 普通 Workflow |
| :------: | :-------: | :-----------: |
|   来源   | 官方维护  |   用户自建    |
|  完整性  |    高     |    不一定     |
| 依赖检测 |    有     |     没有      |
| 学习价值 |    5星    |      3星      |

## 三 Templates 的入口与使用方式

### 3.1 如何打开 Templates

```
1.两种方式(以新版 UI 为准)：
-左侧栏 → Templates
-顶部菜单：Workflow → Browse Workflow Templates

2.打开后你会看到一个模板浏览器面板。
```

### 3.2 Templates 面板结构说明

```
一般包含：
-分类（Category）
-模板卡片（Card）
-简要说明
-依赖提示
```

### 3.3 All Templates 分类一览

```
常见分类包括：
-Image
-Video
-Audio
-3D Model
-LLM
-Utility
-Partner Nodes

这些分类不是随便分的，而是按「生成对象类型」来分
```

## 四 Image Templates 全解析(入门首选)

### 4.1 Image Templates 是什么

```
Image Templates 是使用频率最高、最成熟的一类模板，覆盖：
-文生图（Text to Image）
-图生图（Image to Image）
-高清修复
-Inpainting / Outpainting

建议所有新手从这里开始。
```

### 4.2 Image 模板的典型结构

```
几乎所有 Image 模板都会包含：
-Load Checkpoint（加载模型）
-CLIP Text Encode（正/反提示词）
-Latent Image
-KSampler
-VAE Decode
-Save Image

这是 Stable Diffusion 的标准流程。
```

### 4.3 使用 Image 模板的标准步骤

```
1.打开 Image 分类
2.选择一个模板（如 Text to Image）
3.等待依赖检查
4.填写 Prompt
5.点击 Queue / Run
6.查看生成结果
```

### 4.4 新手建议的第一个模板

```
推荐顺序：
1.Text to Image（基础）
2.Image to Image
3.Inpainting
```

## 五 Video Templates(谨慎但值得)

### 5.1 Video Templates 是什么

```
1.Video Templates 用于：
-文生视频
-图生视频
-视频风格迁移

2.它们的特点是：
-节点多
-模型大
-显存占用高
```

### 5.2 使用前必须知道的事

|  项目  |    说明     |
| :----: | :---------: |
|  显存  | 建议 12GB+  |
|  速度  |   非常慢    |
|  模型  | 动辄几个 GB |
| 稳定性 |  依赖模型   |

说明：不建议新手一开始就碰

### 5.3 正确学习方式

```
先跑通 Image
再用 Video 模板
不要一上来就改结构
```

## 六 Audio Templates(了解即可)

### 6.1 Audio 模板定位

```
1.用于：
-音频生成
-语音处理
-音乐相关实验

2.说明：目前生态仍在发展中。
```

### 6.2 使用注意

```
多数依赖自定义节点
模型来源复杂
更偏实验性质
```

## 七 3D Model Templates(前沿方向)

### 7.1 能做什么

```
文生 3D 模型
输出 Mesh / 点云
```

### 7.2 当前阶段认知

```
能用
但不稳定
更多是“技术展示”
```

## 八 LLM Templates(非常重要)

### 8.1 LLM Templates 是什么

```
这类模板用于：
-文本生成
-Prompt 自动生成
-AI 作为“流程大脑”
```

### 8.2 一个常见用法

```
LLM 生成 Prompt → Image 模板生图
这是未来 ComfyUI 的核心方向之一。
```

## 九 Utility Templates(工具流)

```
1.用于：
-Prompt 清洗
-参数转换
-图像分析

2.说明：不是主角，但很重要。
```

## 十 Partner Nodes Templates(云端能力)

### 10.1 什么是 Partner Nodes

```
官方合作的云端模型
不完全依赖本地显卡
```

### 10.2 使用注意

```
通常需要 API Key
有调用成本
注意隐私和安全
```

