---
title: ComfyUI开发之——ComfyUI局部重绘(3.2)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 93768c72
date: 2026-11-04 19:33:22
---
## 一、概述

```
ComfyUI 局部重绘：修改图片指定区域与 Inpainting 实战
```

<!--more-->

## 二、局部重绘

### 2.1、什么是局部重绘？

前面我们学习了 ComfyUI 图生图，可以根据原图重新生成图片，但它通常会对整张图片进行处理。

如果只想修改图片中的某个部分，例如：

- 将人物的红色衣服换成白色衣服。
- 将照片中的天空替换成蓝天。
- 删除背景中的路人或杂物。
- 修复老照片中的划痕和破损。
- 修改人物周围的某个物体。

这时就可以使用局部重绘（Inpainting）。

局部重绘的核心是使用**遮罩（Mask）**告诉模型：哪些区域需要重新生成，哪些区域尽量保持不变。

可以简单理解为：

- 白色区域：需要修改的区域。
- 黑色区域：尽量保留的区域。
- 灰色区域：部分遮罩，在支持软遮罩的工作流中可以实现渐变过渡。

不同节点或工作流可能对遮罩颜色的显示方式有所不同，实际使用时要以节点说明为准。

### 2.2、局部重绘的基本原理

局部重绘与图生图有相似之处，都需要将图片转换成模型能够处理的数据。

但局部重绘还需要额外提供遮罩信息。

基本流程：

```text
Load Image ───────────────┐
                          │
Load Mask / 绘制遮罩 ─────┤
                          ↓
                    Inpainting流程
                          ↑
Load Checkpoint ──────────┤
                          │
正向提示词 / 负向提示词 ──┘
                          ↓
                       KSampler
                          ↓
                      VAE Decode
                          ↓
                      Save Image
```

实际工作流可能使用 VAE Encode (for Inpainting)、InpaintModelConditioning 或专用的 Inpaint 模型节点。不同模型架构和工作流的连接方式并不完全相同。

本篇先使用 ComfyUI 传统 SD 1.5 Inpainting 工作流理解基本原理。

## 三、准备图片与遮罩

### 3.1. 准备原始图片

选择一张需要修改的图片。

例如，一张人物照片，希望将人物身上的红色衣服换成蓝色衣服。

建议选择：

- 图片主体清晰。
- 需要修改的区域比较明显。
- 图片分辨率适中。
- 需要修改的区域不要过大。

### 3.2. 什么是遮罩？

遮罩（Mask）是一张用于指定修改区域的灰度图。

在 ComfyUI 中，遮罩通常以 MASK 数据类型传递。

可以通过以下方式获得遮罩：

1. 在 Load Image 节点中使用内置遮罩编辑功能（如果当前版本支持）。
2. 使用独立的 Mask Editor 或绘制遮罩节点。
3. 在外部图片编辑软件中制作遮罩，再通过节点加载。

如果使用 Load Image 自带的遮罩编辑功能，可以在节点中打开图片编辑界面，绘制需要修改的区域。具体操作入口可能因 ComfyUI 版本而异。

### 3.3 遮罩绘制原则

假设需要更换人物衣服：

- 尽量完整覆盖衣服区域。
- 不要大面积覆盖脸部和头发。
- 注意肩膀、袖口、衣领等边缘。
- 避免遗漏衣服边缘，否则可能出现新旧颜色交界。

如果遮罩范围过小，模型可能无法自然处理边缘；如果范围过大，又可能改变原本不需要修改的内容。

建议在需要修改的区域边缘适当留出空间，让模型有足够的区域生成过渡细节。

## 四、搭建第一个局部重绘工作流

这里以传统 SD 1.5 Inpainting 工作流为例。

需要注意：普通 Checkpoint 和专用 Inpainting Checkpoint 并不是完全相同的使用方式。下面先介绍普通 SD 1.5 Checkpoint 配合遮罩编码的基础流程，后面再介绍专用 Inpainting 模型。

### 4.1. 添加节点

在 ComfyUI 画布中添加以下节点：

| 节点 | 作用 |
|---|---|
| Load Checkpoint | 加载模型 |
| Load Image | 加载原图 |
| CLIP Text Encode（Prompt） | 正向提示词 |
| CLIP Text Encode（Prompt） | 负向提示词 |
| InpaintModelConditioning | 将图片、遮罩和提示词整理为局部重绘条件 |
| KSampler | 执行采样 |
| VAE Decode | 解码生成图片 |
| Save Image | 保存结果 |

这里使用 InpaintModelConditioning，可以将原图和遮罩信息一起处理，生成供 KSampler 使用的条件数据。

### 4.2. 连接节点

按照以下关系连接：

**模型与提示词：**

- Load Checkpoint 的 MODEL → InpaintModelConditioning 的 model。
- Load Checkpoint 的 CLIP → 正向、负向 CLIP Text Encode 的 clip。
- 正向 CLIP Text Encode 的 CONDITIONING → InpaintModelConditioning 的 positive。
- 负向 CLIP Text Encode 的 CONDITIONING → InpaintModelConditioning 的 negative。

**原图与遮罩：**

- Load Image 的 IMAGE → InpaintModelConditioning 的 pixels。
- Load Image 的 MASK → InpaintModelConditioning 的 mask。
- Load Checkpoint 的 VAE → InpaintModelConditioning 的 vae。

**采样与输出：**

- InpaintModelConditioning 的 positive → KSampler 的 positive。
- InpaintModelConditioning 的 negative → KSampler 的 negative。
- InpaintModelConditioning 的 latent → KSampler 的 latent_image。
- Load Checkpoint 的 MODEL → KSampler 的 model。
- KSampler 的 LATENT → VAE Decode 的 samples。
- Load Checkpoint 的 VAE → VAE Decode 的 vae。
- VAE Decode 的 IMAGE → Save Image 的 images。

如果 Load Image 没有有效遮罩，需要先在图片编辑器中绘制遮罩，或使用其他遮罩加载节点。

### 4.3. 设置提示词

假设需要将人物的红色衣服改成蓝色衬衫。

正向提示词：

```text
blue shirt, realistic fabric,
natural clothing folds,
detailed texture, realistic photography
```

负向提示词：

```text
blurry, low quality, distorted clothing,
extra limbs, bad anatomy
```

提示词应尽量描述修改后希望得到的内容，而不是只描述原图。

### 4.4 设置 KSampler 参数

可以先参考下面的 SD 1.5 入门参数：

| 参数 | 示例值 |
|---|---|
| Steps | 20 |
| CFG | 7 |
| Sampler | Euler |
| Scheduler | normal |
| Denoise | 1.0 |

这里的 Denoise 与普通图生图有所不同。

局部重绘通常希望遮罩区域充分重新生成，因此可以先从 1.0 开始测试。如果希望保留更多原始细节，也可以尝试降低 Denoise。

需要注意，遮罩范围、模型类型和工作流都会影响最终效果。

完成连接后，点击 Queue Prompt 运行。

## 五、局部重绘的重要参数

### 5.1. Denoise：控制修改程度

Denoise 决定遮罩区域内原有图像信息受到多大程度的重新生成。

| Denoise | 大致效果 |
|---|---|
| 0.2～0.3 | 修改较轻，原有细节保留较多 |
| 0.4～0.6 | 中等修改，适合调整颜色和部分细节 |
| 0.7～0.9 | 修改较大，允许重新生成更多内容 |
| 1.0 | 遮罩区域充分重新生成 |

这些范围只是经验参考，不代表固定效果。

例如，更换衣服时，如果 Denoise 太低，可能无法彻底改变原来的衣服；如果太高，可能生成与原图结构差异较大的服装。

### 5.2. 遮罩范围

遮罩范围直接影响模型可以修改的位置。

例如更换衣服时：

- 遮罩太小：容易残留原来的衣服颜色。
- 遮罩太大：可能影响脖子、头发、手臂甚至背景。
- 遮罩适当：更容易在保留人物整体结构的同时完成修改。

因此，遮罩绘制往往比反复修改提示词更重要。

### 5.3. 遮罩羽化与边缘处理

有些工作流提供 Mask Blur、Grow Mask、Feather Mask 等节点。

它们通常用于改善遮罩边缘：

| 操作 | 作用 |
|---|---|
| Grow Mask | 扩大遮罩范围 |
| Blur Mask | 模糊遮罩边缘 |
| Feather Mask | 让遮罩边缘逐渐过渡 |
| Mask Composite | 合并或组合多个遮罩 |

这些节点的具体名称和功能可能随自定义节点包或版本变化。

如果生成结果出现明显的边界、颜色断层，可以尝试适当扩大遮罩，或对边缘进行羽化处理。

## 六、实战：更换人物衣服颜色

下面以人物照片为例，完成一次简单的局部重绘。

### 6.1. 选择人物照片

准备一张人物上半身照片，尽量让衣服区域清晰可见。

### 6.2. 绘制遮罩

打开图片遮罩编辑界面，将需要更换的衣服区域涂成白色。

注意：

- 不要覆盖脸部。
- 不要大面积覆盖头发。
- 尽量覆盖完整衣服。
- 适当包含衣服边缘。

### 6.3. 编写提示词

例如希望将红色外套改为黑色西装：

```text
black formal suit,
realistic fabric texture,
natural folds,
professional clothing,
realistic photography
```

### 6.4. 设置参数并生成

第一次可以设置：

```text
Steps = 20
CFG = 7
Denoise = 1.0
```

生成后观察衣服形状、颜色和边缘是否自然。

如果效果不理想，可以按以下方向调整：

- 颜色不准确：修改正向提示词。
- 原来的衣服仍然存在：检查遮罩是否完整，适当提高 Denoise。
- 衣服边缘不自然：调整遮罩范围和羽化。
- 人物其他部分发生变化：缩小遮罩范围，检查是否使用了正确的局部重绘流程。

### 6.5. 保存并对比

将生成结果保存到 output 目录。

建议同时保存原图、遮罩和生成图片，方便后续比较和调整。

## 七、普通图生图与 Inpainting 模型有什么区别？

ComfyUI 中既可以使用普通模型配合遮罩完成局部重绘，也可以使用专门训练的 Inpainting 模型。

| 类型 | 特点 |
|---|---|
| 普通 Checkpoint + 遮罩条件 | 使用通用模型，通过工作流提供遮罩信息 |
| 专用 Inpainting Checkpoint | 针对局部重绘任务训练，通常需要对应的专用工作流 |

例如，SD 1.5 有专用的 Inpainting 模型。

使用专用模型时，需要确认模型本身、节点和工作流相互兼容。不能简单地将任意 Inpainting 模型当成普通 Checkpoint 使用。

对于 SDXL、FLUX 等其他架构，也存在不同的局部编辑方案，不能直接照搬 SD 1.5 的节点连接方式。

## 八、局部重绘常见问题

### 8.1. 遮罩区域没有发生变化

检查：

- 遮罩是否正确传入工作流。
- 遮罩白色和黑色区域是否理解正确。
- Denoise 是否设置过低。
- 是否使用了真正支持遮罩的局部重绘工作流。

### 8.2. 修改区域与周围画面衔接不自然

可能是遮罩边缘过于生硬，或者遮罩范围太小。

可以尝试扩大遮罩范围，并适当进行边缘羽化。

### 8.3. 人物脸部也发生了变化

检查遮罩是否误覆盖脸部。

尽量缩小修改范围，避免让模型重新生成不需要修改的区域。

如果人物身份和面部一致性要求很高，还需要结合更合适的人物参考图控制方案。

### 8.4. 生成结果不符合提示词

可以尝试：

- 更明确地描述需要生成的内容。
- 减少互相矛盾的提示词。
- 调整 Denoise。
- 更换适合当前任务的模型。
- 检查模型是否支持对应的 Inpainting 工作流。

### 8.5. 遮罩边缘出现明显色块

可以尝试使用 Blur Mask 或 Feather Mask 等节点处理边缘，同时检查遮罩是否覆盖了完整的过渡区域。

## 九、本篇总结

这一篇学习了 ComfyUI 局部重绘的基本原理和实践方法。

需要掌握的知识点：

1. Inpainting 是通过遮罩指定图片中需要修改的区域。
2. Load Image 用于加载原图。
3. Mask 用于指定修改范围。
4. InpaintModelConditioning 可以将原图、遮罩和提示词组织成局部重绘条件。
5. Denoise 控制遮罩区域的重新生成程度。
6. 遮罩范围和边缘处理会直接影响最终效果。

建议先使用人物衣服、天空或背景中的简单区域进行练习，熟悉遮罩绘制和参数调整。


