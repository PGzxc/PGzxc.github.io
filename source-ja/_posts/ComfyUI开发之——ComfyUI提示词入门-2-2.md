---
title: ComfyUI开发之——ComfyUI提示词入门(2.2)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 99d19391
date: 2026-11-04 19:29:25
---
## 一、概述

```
本文介绍：正向提示词、负向提示词与权重写法

上一篇，我们拆解了 ComfyUI 文生图工作流，
了解了 CLIP Text Encode 节点会将提示词转换为 CONDITIONING，再交给 KSampler 参与图片生成。

那么，提示词应该怎么写？
为什么有时候输入一大段描述，生成结果却和预期不一样？
正向提示词和负向提示词又有什么区别？

这篇文章就从实际操作出发，学习 ComfyUI 提示词的基本写法。

本文主要以 SD 1.5 经典文生图工作流为例。
不同模型使用的文本编码器和提示词理解方式可能不同，具体效果需要结合模型测试。
```

<!--more-->

## 二、什么是提示词？

### 2.1 提示词

```
提示词（Prompt）就是我们告诉 AI 希望生成什么内容的文字描述。

例如，我们想生成一张女孩在公园里看书的图片，可以这样写：

a young girl reading a book in a park,
long hair, white dress, green trees,
soft sunlight, realistic photography

这段文字包含了人物、动作、外观、环境和画面风格。
模型会根据提示词中的信息，尝试生成符合描述的图片。

在 ComfyUI 中，提示词通常填写在 CLIP Text Encode 节点的文本输入框中。
```

### 2.2、正向提示词与负向提示词

经典文生图工作流中，通常有两个 CLIP Text Encode 节点：

- 正向提示词（Positive Prompt）：描述希望图片中出现的内容。
- 负向提示词（Negative Prompt）：描述希望尽量避免的内容。

两者最终分别连接到 KSampler 的 positive 和 negative 输入端口。

#### 2.2.1. 正向提示词

正向提示词主要回答一个问题：

**我希望 AI 生成什么？**

例如：

```
a beautiful young woman,
long black hair, white dress,
standing in a flower garden,
soft sunlight, realistic photography
```

这段提示词描述了：

- 主体：年轻女性。
- 外观：黑色长发、白色连衣裙。
- 动作与场景：站在花园中。
- 光线：柔和的阳光。
- 风格：真实摄影。

如果只写：

```
a woman
```

模型需要自行决定人物外观、服装、环境、姿势和画面风格，生成结果的不确定性会更大。

适当补充描述，可以让生成方向更加明确。

#### 2.2.2. 负向提示词

负向提示词主要回答：

**我不希望图片出现什么？**

例如：

```
blurry, low quality, low resolution,
bad anatomy, extra fingers,
deformed hands, distorted face,
watermark, text, logo
```

这些词分别用于表达希望避免的情况，例如模糊、低质量、手部异常、水印和文字等。

对于 SD 1.5 等传统 Stable Diffusion 模型，负向提示词经常用于减少不理想的生成结果。

但需要注意：

- 负向提示词不能保证完全消除图片瑕疵。
- 不同模型对负向提示词的支持和理解能力不同。
- 并不是写得越多，生成效果就越好。
- 有些模型可能不使用传统的负向提示词输入方式。

入门阶段，可以先使用少量常见负向词，再根据生成结果逐步调整。

## 三、如何组织一段好的提示词？

### 3.1 提示词构成

刚开始学习时，不需要记忆大量复杂词汇，可以按照一个简单结构组织提示词：

**主体 + 外观特征 + 动作或姿势 + 场景 + 光线 + 构图 + 风格**

例如，我们要生成一张人物户外写真：

```
a young woman,
long black hair, wearing a white dress,
standing in a flower garden,
surrounded by colorful flowers,
soft natural sunlight,
medium shot, centered composition,
realistic photography
```

可以按照下面的方式理解：

| 描述部分 | 示例                  | 作用         |
| -------- | --------------------- | ------------ |
| 主体     | a young woman         | 确定画面主体 |
| 外观     | long black hair       | 描述人物特征 |
| 服装     | wearing a white dress | 描述穿着     |
| 动作     | standing              | 描述姿势     |
| 场景     | flower garden         | 确定环境     |
| 光线     | soft natural sunlight | 控制光照氛围 |
| 构图     | medium shot           | 描述取景范围 |
| 风格     | realistic photography | 确定视觉风格 |

这种结构不是固定规则，但非常适合初学者。

### 3.2 常见提示词分类

下面整理了一些常用英文关键词，方便在实际生成时组合使用。

**1. 人物与主体**

```
1girl, 1boy, young woman, old man,
portrait, full body, close-up,
cat, dog, landscape, building
```

**2. 外观与服装**

```
long hair, short hair, black hair,
white dress, casual clothes,
suit, traditional clothing
```

**3. 动作与姿势**

```
standing, sitting, walking,
looking at camera, smiling,
holding a book, running
```

**4. 场景与环境**

```
flower garden, forest, beach,
city street, indoor room,
mountains, sunset
```

**5. 光线与色彩**

```
soft lighting, natural light,
backlighting, warm lighting,
cinematic lighting, vibrant colors,
pastel colors
```

**6. 构图与视角**

```
close-up, medium shot, full body,
wide shot, front view, side view,
eye-level view, centered composition
```

**7. 图片风格**

```
realistic photography,
anime style, watercolor painting,
oil painting, illustration,
3D render
```

这些词只是常见示例，并不是所有模型都能准确理解每个关键词。实际使用时，应根据模型特点选择。

## 四、提示词权重：让某些关键词更重要

### 4.1 提示词权重

有时候，一段提示词中包含很多描述，但模型没有很好地体现其中某个特征。

例如，我们希望人物穿红色连衣裙，但生成结果中红色并不明显。

这时可以尝试调整关键词权重。

在 ComfyUI 经典提示词解析方式中，常见写法如下：

| 写法              | 含义                  |
| ----------------- | --------------------- |
| `(red dress:1.2)` | 提高 red dress 的权重 |
| `(red dress:1.5)` | 更明显地提高权重      |
| `((red dress))`   | 使用多层括号增强权重  |
| `[red dress]`     | 降低该部分的权重      |

例如：

普通写法：

```
a woman wearing a red dress,
standing in a flower garden
```

增加权重：

```
a woman wearing (red dress:1.2),
standing in a flower garden
```

这样可以尝试让模型更加关注红色连衣裙这一特征。

### 4.2 权重应该设置多少？

刚开始可以参考下面的范围：

| 权重       | 使用建议                   |
| ---------- | -------------------------- |
| 1.0        | 默认权重                   |
| 1.1～1.2   | 轻微增强                   |
| 1.2～1.4   | 比较明显地增强             |
| 1.5 及以上 | 谨慎使用，可能造成画面异常 |

权重不是越高越好。

过高的权重可能导致画面不自然、颜色失衡、细节异常，甚至影响其他关键词的表现。

建议每次只调整一个关键词，逐步比较生成效果。

> 注意：上述括号权重语法主要适用于 ComfyUI 经典提示词解析方式及兼容的文本编码器。不同节点、模型和提示词解析器可能存在差异，不要认为所有模型都支持完全相同的语法。

## 五、中文提示词和英文提示词有什么区别？

### 5.1 中文提示词和英文提示词

ComfyUI 本身并不规定必须使用英文。

中文能不能得到好的生成效果，主要取决于模型使用的文本编码器以及训练数据。

例如，同样的描述：

中文：

```
一个年轻女孩，黑色长发，
穿着白色连衣裙，站在花园里，
阳光柔和，真实摄影风格
```

英文：

```
a young girl, long black hair,
wearing a white dress, standing in a garden,
soft sunlight, realistic photography
```

对于 SD 1.5 等传统模型，英文关键词通常更容易找到成熟的提示词案例，但中文并不一定不能使用。

### 5.2 中文提示词如何写

如果使用专门支持中文理解的图像模型，中文提示词也可能获得不错的效果。

建议：

1. 先使用模型推荐的语言。
2. 使用简单、明确的描述。
3. 不要一次堆积太多关键词。
4. 对比中英文生成结果，找到适合当前模型的写法。

## 六、实战：生成一张人物写真

下面使用前面搭建的 SD 1.5 文生图工作流进行练习。

### 6.1. 正向提示词

在正向 CLIP Text Encode 节点中输入：

```
a beautiful young woman,
long black hair, wearing a white dress,
standing in a flower garden,
colorful flowers, green trees,
soft natural sunlight,
medium shot, realistic photography,
high detail
```

### 6.2. 负向提示词

在负向 CLIP Text Encode 节点中输入：

```
blurry, low quality, low resolution,
bad anatomy, deformed hands,
extra fingers, distorted face,
watermark, text, logo
```

### 6.3. 调整采样参数

先保持上一篇使用的基础参数：

| 参数      | 示例值       |
| --------- | ------------ |
| 图片尺寸  | 512 × 512    |
| Steps     | 20           |
| CFG       | 7            |
| Sampler   | Euler        |
| Scheduler | normal       |
| Denoise   | 1.0          |
| Seed      | 固定一个数字 |

这些参数只是 SD 1.5 入门测试值，不代表所有模型都适用。

### 6.4. 执行并观察结果

点击 Queue Prompt，等待图片生成。

生成后重点观察：

- 人物是否符合描述？
- 服装颜色是否正确？
- 场景是否符合预期？
- 人物姿势和构图是否合理？
- 图片是否存在手部、面部等明显瑕疵？

如果结果不理想，不要急着把所有提示词都改掉。

可以按照下面的顺序逐步调整：

1. 主体不准确：修改主体描述。
2. 服装不准确：补充服装和颜色描述。
3. 场景不准确：明确环境和背景。
4. 构图不理想：调整景别和视角关键词。
5. 细节有问题：适当增加负向提示词，或考虑后续使用局部重绘。

## 七、提示词常见问题

### 7.1. 提示词写得越长越好吗？

```
不一定。

过多的关键词可能让描述相互冲突，也可能让模型难以突出重点。

建议先写清楚主体和场景，再逐步补充细节。
```

### 7.2. 为什么写了某个关键词，图片却没有体现？

```
可能的原因包括：

- 模型对该关键词理解有限。
- 关键词之间存在冲突。
- 提示词权重不合适。
- 模型本身不擅长生成对应内容。

可以尝试换一种表达方式，或者更换模型进行对比。
```

### 7.3. 为什么负向提示词没有效果？

```
负向提示词不是图片修复工具，无法保证消除所有问题。

同时，不同模型对负向条件的处理方式也不同。不要将传统 SD 1.5 的经验直接套用到所有新模型上。
```

### 7.4. 为什么同一段提示词，每次生成的图片都不一样？

```
因为采样过程中还会受到 Seed、Steps、CFG、Sampler 等参数影响。

如果想比较提示词效果，可以固定 Seed 和其他采样参数，每次只修改一部分提示词。
```

## 八、总结

这一篇主要学习了 ComfyUI 提示词的基础知识：

- 正向提示词：描述希望生成的内容。
- 负向提示词：描述希望避免的内容。
- 提示词结构：主体、外观、动作、场景、光线、构图和风格。
- 权重写法：通过调整关键词权重突出重点。
- 中英文提示词：根据模型的文本理解能力选择。
- 实际练习：固定采样参数，逐步调整提示词并比较结果。

刚开始不需要追求复杂的提示词技巧。能够清楚描述主体、场景和风格，并通过多次测试逐步调整，就已经掌握了提示词入门的核心方法。

