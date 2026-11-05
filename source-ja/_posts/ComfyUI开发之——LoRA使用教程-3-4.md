---
title: ComfyUI开发之——LoRA使用教程(3.4)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 2579ff86
date: 2026-11-04 19:35:17
---
## 一、概述

```
ComfyUI LoRA 使用教程：模型兼容性、权重设置与风格控制
```

<!--more-->

## 二、LoRA概念

### 2.1、什么是 LoRA？

前面我们学习了 Checkpoint、VAE、CLIP 等模型基础知识。

Checkpoint 可以理解为基础模型，决定模型整体的生成能力和风格。但如果希望模型生成某种特定人物、服装、画风或物体，仅依靠基础模型和提示词，有时很难得到稳定的结果。

这时就可以使用 LoRA。

LoRA（Low-Rank Adaptation，低秩适配）是一种轻量化模型微调技术。它不需要完整复制和训练一个新的大模型，而是通过额外的参数，让基础模型获得新的生成特征。

简单理解：

- **Checkpoint：** 基础模型，决定整体生成能力。
- **LoRA：** 在基础模型上增加特定风格、人物或元素的生成能力。
- **Prompt：** 告诉模型本次希望生成什么内容。

例如：

使用一个写实风格的 Checkpoint，再加载动漫风格 LoRA，就可以尝试生成动漫风格图片。

LoRA 常见用途：

- 人物 LoRA：生成特定人物或角色特征。
- 风格 LoRA：油画、动漫、摄影等风格。
- 服装 LoRA：特定服装或穿搭风格。
- 物体 LoRA：特定物品、道具或场景元素。
- 概念 LoRA：学习某种特定视觉概念。

需要注意，LoRA 并不是独立的完整生成模型，通常需要搭配兼容的基础模型使用。

### 2.2、LoRA 与 Checkpoint 有什么区别？

两者都是模型文件，但作用和使用方式不同。

| 对比         | Checkpoint         | LoRA                 |
| ------------ | ------------------ | -------------------- |
| 作用         | 提供基础生成能力   | 增加特定生成特征     |
| 文件体积     | 通常较大           | 通常较小             |
| 是否独立使用 | 通常可以           | 通常需要基础模型     |
| 主要用途     | 决定整体模型能力   | 控制人物、风格和元素 |
| 兼容性       | 需要匹配对应工作流 | 需要匹配基础模型架构 |

例如：

```
基础模型：realistic_checkpoint.safetensors

LoRA：anime_style.safetensors

提示词：a beautiful girl, standing in a garden
```

将 LoRA 加载到基础模型后，可以让生成结果受到动漫风格的影响。

实际效果还取决于 LoRA 的训练数据、触发词、权重和基础模型。

### 2.3、LoRA 模型从哪里下载？

常见的 LoRA 模型资源网站包括：

- Civitai：https://civitai.com/
- Hugging Face：https://huggingface.co/models

其中 Civitai 有大量社区分享的 Checkpoint、LoRA、VAE 等模型。

下载时需要重点关注以下信息：

| 信息          | 说明                      |
| ------------- | ------------------------- |
| Base Model    | LoRA 训练所使用的基础模型 |
| Trigger Words | 触发 LoRA 特征的提示词    |
| Strength      | 推荐使用权重              |
| Version       | 模型版本                  |
| File Format   | 模型文件格式              |

#### 1. 重点检查 Base Model

这是下载 LoRA 时最容易忽略的地方。

例如：

- SD 1.5 LoRA：通常搭配 SD 1.5 模型。
- SDXL LoRA：通常搭配 SDXL 模型。
- FLUX LoRA：需要匹配对应的 FLUX 架构。
- 其他新架构 LoRA：需要确认对应的模型类型和加载方式。

不同架构之间通常不能直接混用。

即使文件扩展名都是 `.safetensors`，也不代表它们可以相互兼容。

#### 2. 查看 Trigger Words

部分 LoRA 在训练时使用了特定触发词。

例如：

```
trigger_word
```

如果模型说明中要求在提示词里加入该词，就应该按照说明使用。

有些 LoRA 不需要特殊触发词，也有些 LoRA 需要多个词共同触发。

因此，下载模型时建议查看作者提供的说明和示例图片。

## 三、安装加载及使用

### 3.1、安装 LoRA 模型

ComfyUI 的 LoRA 模型通常放在：

```
ComfyUI/
└── models/
    └── loras/
        ├── style_lora.safetensors
        ├── character_lora.safetensors
        └── clothing_lora.safetensors
```

下载完成后，将模型文件放入 `loras` 目录。

如果 ComfyUI 没有识别到新模型，可以尝试刷新模型列表或重新启动。

建议按照用途分类管理：

```
loras/
├── character/
├── style/
├── clothing/
├── object/
└── other/
```

以上是便于自己管理的目录示例，并不是必须采用的固定结构。

如果希望方便查找，最好给模型保留原始文件名，并记录它对应的基础模型架构。

### 3.2、在 ComfyUI 中加载 LoRA

这里以传统 SD 1.5 文生图工作流为例。

#### 1. 添加 LoRA Loader 节点

在 ComfyUI 画布中添加：

```
Load LoRA
```

这个节点通常包含以下输入：

- model
- clip
- lora_name
- strength_model
- strength_clip

以及输出：

- MODEL
- CLIP

其中，`strength_model` 和 `strength_clip` 分别控制 LoRA 对模型和文本编码部分的影响。

不同 LoRA 和模型架构可能有不同的实际表现。

#### 2. 连接节点

原来的文生图工作流：

```
Load Checkpoint
    ├── MODEL ─────────→ KSampler
    └── CLIP ──────────→ CLIP Text Encode
```

加载 LoRA 后：

```
Load Checkpoint
    ├── MODEL ──→ Load LoRA ── MODEL ──→ KSampler
    │
    └── CLIP ───→ Load LoRA ── CLIP ───→ CLIP Text Encode
```

具体连接关系：

1. Load Checkpoint 的 MODEL → Load LoRA 的 model。
2. Load Checkpoint 的 CLIP → Load LoRA 的 clip。
3. Load LoRA 的 MODEL → KSampler 的 model。
4. Load LoRA 的 CLIP → 正向和负向 CLIP Text Encode 的 clip。

其他节点连接方式与原来的文生图工作流基本一致。

注意：LoRA 通常不需要替换 VAE，VAE 仍然按照基础模型和工作流的要求使用。

#### 3. 选择 LoRA 模型

在 Load LoRA 节点的 `lora_name` 中选择已经安装的模型。

例如：

```
anime_style.safetensors
```

选择后即可使用该 LoRA。

### 3.3、LoRA 权重如何设置？

LoRA Loader 中最重要的两个参数是：

- `strength_model`
- `strength_clip`

它们分别控制 LoRA 对 MODEL 和 CLIP 的影响程度。

对于传统 SD 1.5 LoRA，可以先使用以下参数进行测试：

| 权重     | 大致效果                     |
| -------- | ---------------------------- |
| 0        | 不产生 LoRA 增量影响         |
| 0.3      | 较弱影响                     |
| 0.5      | 中等影响                     |
| 0.7      | 较明显影响                   |
| 1.0      | 按训练权重正常应用           |
| 大于 1.0 | 增强影响，但可能出现过度效果 |

这些数值只是测试起点，不是所有 LoRA 都适用的标准。

#### 1. strength_model

主要控制 LoRA 对模型生成部分的影响。

例如：

```
strength_model = 0.8
```

如果希望增强某种画风、人物特征或物体特征，可以适当调整该参数。

#### 2. strength_clip

主要控制 LoRA 对文本编码部分的影响。

例如：

```
strength_clip = 0.8
```

它会影响提示词与 LoRA 学习特征之间的关联。

部分 LoRA 对 CLIP 权重比较敏感，也有些模型的推荐设置会将两个权重设为不同数值。

#### 3. 如何找到合适的权重？

建议固定模型、提示词、Seed 和其他采样参数，只改变 LoRA 权重。

例如：

```
第一次：
strength_model = 0.5
strength_clip = 0.5

第二次：
strength_model = 0.7
strength_clip = 0.7

第三次：
strength_model = 1.0
strength_clip = 1.0
```

对比三次生成结果，观察人物特征、画面风格和细节变化。

如果出现画面过度风格化、颜色异常或人物特征失真，可以适当降低权重。

## 四、实战：使用 LoRA 生成指定风格图片

下面通过一个简单案例，使用基础模型搭配动漫风格 LoRA。

### 4.1. 准备模型

准备：

```
Checkpoint：
SD 1.5 兼容模型

LoRA：
SD 1.5 Anime Style LoRA
```

确保两者架构兼容。

### 4.2. 加载模型

在 Load Checkpoint 中选择基础模型。

添加 Load LoRA 节点，选择动漫风格 LoRA。

设置：

```
strength_model = 0.8
strength_clip = 0.8
```

### 4.3. 编写提示词

正向提示词：

```
1girl, beautiful anime girl,
long hair, blue eyes,
standing in a garden,
detailed anime illustration,
beautiful lighting, high quality
```

负向提示词：

```
low quality, blurry, bad anatomy,
bad hands, extra fingers,
distorted face
```

如果 LoRA 作者提供了专用触发词，应根据模型说明添加。

### 4.4 设置采样参数

可以先参考：

```
width = 512
height = 512

steps = 20
CFG = 7

sampler = Euler
scheduler = normal
denoise = 1.0
```

这些是 SD 1.5 的入门参考参数，实际效果需要结合模型推荐配置调整。

### 4.5. 生成并对比

点击 Queue Prompt，生成图片。

建议分别测试：

- 不加载 LoRA。
- 加载 LoRA，权重 0.5。
- 加载 LoRA，权重 0.8。
- 加载 LoRA，权重 1.0。

观察画风、人物外观和细节变化。

通过对比，可以更直观地理解 LoRA 的作用。

## 五、多个 LoRA 可以同时使用吗？

可以。

例如，希望同时使用人物 LoRA 和画风 LoRA：

```
Load Checkpoint
      ↓
Load LoRA 1（人物特征）
      ↓
Load LoRA 2（动漫风格）
      ↓
KSampler
```

两个 LoRA 可以串联加载。

例如：

```
LoRA 1：
strength_model = 0.7
strength_clip = 0.7

LoRA 2：
strength_model = 0.6
strength_clip = 0.6
```

需要注意：

1. 多个 LoRA 应当与基础模型兼容。
2. 不同 LoRA 可能产生相互影响。
3. 权重过高可能导致画面失真。
4. 加载顺序和模型实现可能影响最终结果。
5. 多个 LoRA 并不意味着效果一定更好。

建议先单独测试每个 LoRA，再逐个组合。

## 六、LoRA 常见问题

### 6.1. 找不到 LoRA 模型

检查模型是否放在：

```
ComfyUI/models/loras/
```

如果目录正确但列表中没有显示，可以刷新模型列表或重启 ComfyUI。

### 6.2. 加载 LoRA 后没有明显变化

可能原因：

- 没有使用模型要求的触发词。
- LoRA 权重过低。
- LoRA 与基础模型不兼容。
- 提示词没有体现 LoRA 所学习的特征。

可以先查看作者提供的示例图片和推荐提示词。

### 6.3. 加载 LoRA 后图片出现异常

可能原因：

- 使用了不兼容的基础模型。
- LoRA 权重过高。
- 多个 LoRA 之间产生冲突。
- 模型文件不完整或加载方式不正确。

建议先只加载一个 LoRA，使用推荐权重测试。

### 6.4. 为什么有些 LoRA 不能用于 FLUX？

因为 LoRA 通常针对特定模型架构训练。

SD 1.5、SDXL 和 FLUX 在模型结构、文本编码和参数组织上存在差异。

所以：

```
SD 1.5 LoRA ≠ SDXL LoRA ≠ FLUX LoRA
```

不能仅凭文件扩展名判断是否兼容。

使用 FLUX LoRA 时，需要选择支持对应 FLUX 架构的加载节点和工作流。

### 6.5. LoRA 文件为什么有时很大？

LoRA 文件大小与训练参数、模型架构、秩（Rank）以及训练范围等因素有关。

不同 LoRA 的体积可能相差较大，文件大并不代表生成效果一定更好。

## 七、如何整理自己的 LoRA 模型库？

随着使用时间增加，LoRA 数量可能越来越多。

建议建立一个简单的模型管理表：

| 模型名称        | 类型 | 基础架构 | 推荐权重       | 触发词     |
| --------------- | ---- | -------- | -------------- | ---------- |
| Anime Style     | 风格 | SD 1.5   | 0.8            | 按作者说明 |
| Character A     | 人物 | SD 1.5   | 0.7            | 按作者说明 |
| Realistic Style | 风格 | SDXL     | 0.6            | 按作者说明 |
| Flux Style      | 风格 | FLUX     | 以作者说明为准 | 按作者说明 |

以上仅为管理示例，不代表具体模型的实际推荐参数。

建议每下载一个 LoRA，就记录：

- 模型来源。
- 基础模型架构。
- 推荐权重。
- 触发词。
- 示例图片。
- 是否适合当前工作流。

这样以后更换模型或整理工作流时，就不容易出现兼容性问题。

## 八、本篇总结

这一篇学习了 ComfyUI LoRA 的基本概念、安装方法和使用流程。

需要掌握的知识点：

1. LoRA 是用于扩展基础模型生成能力的轻量化适配模型。
2. LoRA 通常需要搭配兼容的 Checkpoint 或对应模型架构使用。
3. LoRA 一般放在 `models/loras/` 目录。
4. Load LoRA 节点用于加载 LoRA。
5. `strength_model` 和 `strength_clip` 用于控制不同部分的影响程度。
6. 可以同时加载多个 LoRA，但需要注意兼容性和权重冲突。

建议下载一个适合自己基础模型的 LoRA，分别测试 0.5、0.8 和 1.0 的权重，观察生成效果。

