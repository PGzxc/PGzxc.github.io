---
title: ComfyUI开发之——ComfyUI常用节点详解(4.2)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 9834c6df
date: 2026-11-04 19:38:10
---
## 一、概述

```
前面我们已经学习了如何下载、导入和修改 ComfyUI 工作流。

在使用别人分享的工作流时，经常会遇到一个问题：
 节点很多，连线也很复杂，不知道每个节点有什么作用，更不知道应该如何修改。

其实，ComfyUI 的核心就是节点和数据流。

每个节点负责完成一项任务，例如加载模型、处理提示词、生成图片、调整尺寸或者保存文件。
节点之间通过连线传递数据，最终形成一个完整的工作流。

这篇文章就从常用节点入手，帮助你理解 ComfyUI 的节点体系。
```

<!--more-->

## 二、ComfyUI知识点

### 2.1、ComfyUI 节点由什么组成？

一个普通节点通常包含三个部分：

- 输入端口：接收其他节点传递的数据。
- 节点参数：设置当前节点的运行配置。
- 输出端口：将处理结果传递给其他节点。

例如，Load Checkpoint 节点负责加载模型，通常会输出 MODEL、CLIP 和 VAE 三种数据。

这些数据可以分别连接到后续节点。

```
Load Checkpoint
│
├── MODEL ──→ KSampler
│
├── CLIP ───→ CLIP Text Encode
│
└── VAE ────→ VAE Decode
```


节点的输入和输出端口通常使用不同颜色区分数据类型。

需要注意，颜色只是辅助识别方式，具体类型和连接关系应以节点端口及 ComfyUI 的实际提示为准。

### 2.2、ComfyUI 常见数据类型

理解数据类型，是学习节点连接最重要的一步。

ComfyUI 中常见的数据类型如下：

| 数据类型 | 主要作用 | 常见节点 |
|---|---|---|
| MODEL | 模型及其采样相关配置 | Load Checkpoint、KSampler |
| CLIP | 文本编码模型 | Load Checkpoint、CLIP Text Encode |
| CONDITIONING | 文本条件信息 | CLIP Text Encode |
| LATENT | 潜空间数据 | Empty Latent Image、KSampler |
| VAE | 图片与潜空间之间的转换 | Load Checkpoint、VAE Decode |
| IMAGE | 图片数据 | Load Image、Save Image |
| MASK | 遮罩数据 | Load Image、Load Mask |
| INT | 整数 | 图片尺寸、Steps 等参数 |
| FLOAT | 浮点数 | CFG、权重等参数 |
| STRING | 字符串 | 文件名、文本等 |

其中，前面学习过的六种数据尤其重要。

#### 1. MODEL

MODEL 表示模型数据，通常由模型加载节点输出。

例如：

- Load Checkpoint
- Load Diffusion Model

MODEL 可以传递给 KSampler 等需要模型的节点。

#### 2. CLIP

CLIP 主要用于文本编码。

例如，使用提示词描述：

`a beautiful landscape, mountain, sunset`

CLIP Text Encode 节点会使用 CLIP 对应的文本编码能力，将提示词转换为后续生成流程使用的 CONDITIONING 数据。

不同模型可能使用不同的文本编码架构，不是所有模型都使用传统 CLIP。

#### 3. CONDITIONING

CONDITIONING 可以理解为生成条件。

它包含文本编码等信息，用来指导模型生成符合要求的图片。

例如：

- 正向提示词：描述希望生成的内容。
- 负向提示词：描述希望避免的内容。

在传统 SD 工作流中，正向和负向 CONDITIONING 通常分别连接到 KSampler。

#### 4. LATENT

LATENT 是潜空间数据。

Stable Diffusion 并不是直接在普通图片像素上完成整个采样过程，而是在潜空间中进行生成和去噪。

常见节点：

- Empty Latent Image
- VAE Encode
- KSampler
- Latent Upscale

需要注意，LATENT 不是普通图片，不能直接连接到要求 IMAGE 的图片保存节点。

#### 5. VAE

VAE 负责图片和潜空间之间的转换。

主要包括：

- VAE Encode：将 IMAGE 编码成 LATENT。
- VAE Decode：将 LATENT 解码成 IMAGE。

图生图和文生图都会用到 VAE，只是潜空间的来源不同。

#### 6. IMAGE 和 MASK

IMAGE 是普通图片数据，可以用于预览、缩放、裁剪和保存。

MASK 是遮罩数据，用于指定需要处理或保留的区域。

例如，局部重绘时，可以通过遮罩告诉模型重点修改人物衣服，而尽量保留其他区域。

### 2.3、模型加载类节点

模型加载节点负责把本地模型文件加载到工作流中。

#### 1. Load Checkpoint

这是传统 Stable Diffusion 工作流中最常见的模型加载节点。

它通常输出：

- MODEL
- CLIP
- VAE

适用于包含完整 Checkpoint 的传统模型。

例如 SD 1.5 和 SDXL 的常见 Checkpoint 工作流。

#### 2. Load Diffusion Model

主要用于加载独立的扩散模型。

在 FLUX 等较新的模型工作流中，经常可以看到这个节点。

与传统完整 Checkpoint 不同，它通常需要另外加载文本编码器和 VAE。

因此，不能认为只要有一个扩散模型文件就能直接完成整个生成流程。

#### 3. Load VAE

用于单独加载 VAE 模型。

当使用的模型没有包含合适的 VAE，或者工作流需要指定独立 VAE 时，就需要使用这个节点。

#### 4. Load LoRA

用于加载 LoRA 模型。

通常会接收 MODEL 和 CLIP，并输出经过 LoRA 调整后的 MODEL 和 CLIP。

常见参数：

- strength_model：模型侧权重。
- strength_clip：文本编码侧权重。

不同模型架构和节点实现可能存在差异，使用时需要确认 LoRA 与基础模型兼容。

#### 5. Load ControlNet Model

用于加载 ControlNet 模型。

例如：

- OpenPose
- Canny
- Depth

加载后通常还需要结合预处理结果和 Apply ControlNet 等节点使用。

## 三、相关处理

### 3.1、文本与条件处理节点

这类节点主要负责处理提示词和生成条件。

#### 1. CLIP Text Encode

这是传统文生图工作流中的核心节点。

输入：

- CLIP
- 文本提示词

输出：

- CONDITIONING

通常会使用两个节点分别处理正向和负向提示词。

```
正向提示词
     │
     ▼
CLIP Text Encode ──→ 正向 CONDITIONING

负向提示词
     │
     ▼
CLIP Text Encode ──→ 负向 CONDITIONING
```

#### 2. Conditioning 合并与处理

ComfyUI 还提供了多种 CONDITIONING 处理节点。

例如：

- Conditioning Combine
- Conditioning Concat
- Conditioning Set Area

它们可以组合多个条件，或者让不同提示词作用于指定区域。

这些节点适合复杂工作流，初学阶段先理解基本的正向、负向条件即可。

#### 3. FLUX 和其他模型的文本编码节点

FLUX、Qwen Image 等模型可能使用不同的文本编码节点和条件处理方式。

例如，部分 FLUX 工作流会使用 DualCLIPLoader 或专门的文本编码节点。

因此，不要认为所有模型都必须使用两个传统的 CLIP Text Encode 节点。

最稳妥的方法是使用对应模型的官方示例工作流。

### 3.2、潜空间与采样节点

这类节点主要负责准备生成数据和执行采样。

#### 1. Empty Latent Image

用于创建空白潜空间。

常见参数：

| 参数 | 作用 |
|---|---|
| width | 图片宽度 |
| height | 图片高度 |
| batch_size | 一次生成的图片数量 |

例如：

- width：512
- height：512
- batch_size：1

这里创建的是潜空间，并不是一张已经生成好的图片。

#### 2. VAE Encode

用于将普通图片编码成 LATENT。

主要用于图生图、局部重绘等工作流。

例如：

```
Load Image
    │
    ▼
VAE Encode
    │
    ▼
LATENT
    │
    ▼
KSampler
```

#### 3. KSampler

KSampler 是传统 Stable Diffusion 工作流中非常重要的采样节点。

主要输入：

- MODEL
- 正向 CONDITIONING
- 负向 CONDITIONING
- LATENT

常见参数：

| 参数 | 作用 |
|---|---|
| seed | 随机种子 |
| steps | 采样步数 |
| cfg | 提示词引导强度 |
| sampler_name | 采样器 |
| scheduler | 调度器 |
| denoise | 去噪强度 |

前面第 08 篇已经详细介绍过这些参数。

这里需要补充一点：并不是所有新模型都采用传统 KSampler 的相同参数组合和采样方式，应该根据模型对应的工作流设置。

#### 4. KSampler Advanced

这是功能更灵活的高级采样节点。

可以控制：

- 起始采样步数
- 结束采样步数
- 是否添加噪声
- 是否保留最终噪声

适合分阶段采样、复杂工作流等场景。

初学阶段先掌握普通 KSampler 即可。

### 3.3、图片处理类节点

图片处理节点主要负责对生成结果或输入图片进行调整。

#### 1. Load Image

加载本地图片。

常用于：

- 图生图
- 局部重绘
- ControlNet
- IP-Adapter
- 图片参考

输出通常包括 IMAGE，部分模式还可以提供 MASK。

#### 2. Preview Image

预览图片。

适合在工作流中间查看处理结果，而不需要每次都保存到输出目录。

例如，可以在图片缩放、抠图、背景替换之后添加预览节点。

#### 3. Save Image

保存最终图片。

常见参数：

- filename_prefix：文件名前缀。

默认输出目录通常是：

`ComfyUI/output/`

例如设置：

`portrait/test`

生成的文件会按照对应前缀保存。

#### 4. Image Scale

用于调整图片尺寸。

常见设置包括：

- width
- height
- upscale_method
- crop

适合普通图片缩放。

需要注意，普通缩放只是调整像素尺寸，并不等于 AI 高清修复。

#### 5. Image Crop

用于裁剪图片。

可以根据指定位置和尺寸截取图片区域，适合制作局部处理工作流。

#### 6. Image Composite

用于合成图片。

例如，将人物抠图结果与新的背景图片进行合成。

常见用途：

- 更换照片背景
- 人物与背景融合
- 多张图片拼接
- 图片局部覆盖

### 3.4、遮罩与局部处理节点

遮罩是局部重绘和图片编辑的重要基础。

常见节点包括：

| 节点 | 作用 |
|---|---|
| Load Mask | 加载遮罩 |
| Mask Editor | 编辑遮罩 |
| Grow Mask | 扩大遮罩区域 |
| Feather Mask | 羽化遮罩边缘 |
| Blur Mask | 模糊遮罩边缘 |
| Invert Mask | 反转遮罩 |

例如，想修改人物衣服，可以先通过遮罩选中衣服区域，再结合 Inpaint 工作流进行生成。

需要注意，不同节点和工作流对遮罩白色、黑色区域的处理约定可能有所不同，使用前应确认节点说明和实际效果。

### 3.5、节点之间应该如何连接？

掌握了常见节点之后，最重要的是理解连接规则。

ComfyUI 的连接并不是随意的，主要遵循数据类型和节点接口要求。

例如：

- MODEL 通常连接到需要模型的输入端口。
- CLIP 通常连接到文本编码节点。
- CONDITIONING 通常连接到采样或条件处理节点。
- LATENT 通常连接到采样、潜空间处理或 VAE 解码节点。
- VAE 通常连接到编码或解码节点。
- IMAGE 通常连接到图片处理、预览或保存节点。
- MASK 通常连接到需要遮罩的处理节点。

#### 一个简单的文生图流程

下面以传统 SD 1.5 文生图为例：

```
                 Load Checkpoint
                 /      |       \
              MODEL   CLIP      VAE
                |       |         |
                |       ├── 正向提示词编码
                |       └── 负向提示词编码
                |                 |
                |           CONDITIONING
                |                 |
Empty Latent ───┴──────────────→ KSampler
                                    |
                                  LATENT
                                    |
                                VAE Decode
                                    |
                                  IMAGE
                                    |
                                Save Image
```

这个流程包含了模型加载、文本编码、潜空间准备、采样、解码和保存。

不同模型可能采用不同的节点组合，但整体思路仍然是组织数据、处理条件、执行生成、输出结果。

### 3.6、如何判断节点执行顺序？

初学者容易认为 ComfyUI 是按照画布从左到右执行节点。

实际上并不是这样。

ComfyUI 会根据节点之间的数据依赖关系，确定执行顺序。

例如：

```
Load Checkpoint
       │
       ▼
   KSampler
       │
       ▼
  VAE Decode
       │
       ▼
   Save Image
```

当你执行工作流时，ComfyUI 会从最终需要执行的输出节点开始，向前检查它依赖的数据，并执行所需节点。

这意味着：

- 没有被最终输出依赖的节点，可能不会执行。
- 某个节点的数据发生变化时，相关计算可能需要重新执行。
- 可以通过增加预览或保存节点，检查中间处理结果。

理解这一点后，就能更容易分析复杂工作流为什么没有按照画布位置执行。

## 四、动手练习：自己搭建一个节点工作流

建议使用前面第 05 篇的 SD 1.5 文生图工作流进行练习。

这次重点不是生成图片，而是理解每个节点的输入和输出。

练习步骤：

1. 添加 Load Checkpoint，选择一个 SD 1.5 模型。
2. 添加两个 CLIP Text Encode，分别输入正向和负向提示词。
3. 添加 Empty Latent Image，设置图片尺寸。
4. 添加 KSampler，连接模型、条件和潜空间。
5. 添加 VAE Decode，将 LATENT 转换为 IMAGE。
6. 添加 Save Image，保存生成结果。
7. 运行工作流，观察各个节点之间的数据传递。

完成后，再尝试添加 Preview Image，查看中间图片处理结果。

如果已经熟悉基础工作流，可以尝试增加 Load Image 和 VAE Encode，改造成简单的图生图流程。

## 五、总结

ComfyUI 的节点虽然很多，但可以按照功能进行分类：

- 模型加载：负责加载 Checkpoint、LoRA、VAE 等模型。
- 文本处理：负责提示词编码和条件处理。
- 潜空间与采样：负责准备生成数据和执行采样。
- 图片处理：负责加载、缩放、裁剪、合成和保存图片。
- 遮罩处理：负责控制图片需要修改的区域。

学习节点时，不需要一次记住所有名称。

更重要的是理解三个问题：

1. 这个节点负责什么功能？
2. 它需要接收什么数据？
3. 它会输出什么数据？

只要理解这三个问题，就能逐步看懂别人分享的复杂工作流，并且根据自己的需求进行修改。

