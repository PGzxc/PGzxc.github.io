---
title: ComfyUI开发之——ComfyUI模型选择与管理(2.5)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 85865df
date: 2026-11-04 19:30:54
---
## 一、概述

```
前面几篇，我们已经使用 SD 1.5 搭建了第一个文生图工作流，
并学习了提示词、采样参数、图片尺寸和显存优化。

接下来需要解决一个实际问题：
ComfyUI 支持这么多模型，应该选择哪一个？下载模型后放在哪里？
为什么有些模型加载后无法正常生成图片？

这篇文章主要介绍三类常见图像模型：
SD 1.5、SDXL 和 FLUX，并进一步了解模型文件、目录结构、安装方法和兼容性。

注意：ComfyUI 不只是 Stable Diffusion 的运行界面，它还支持多种不同架构的图像生成模型。\不同模型可能需要不同的加载节点和工作流，不能简单地通过更换 Checkpoint 就完成切换。
```

<!--more-->

## 二、图像模型

### 2.1、先认识三类常见图像模型

#### 1. Stable Diffusion 1.5（SD 1.5）

SD 1.5 是比较经典的开源图像生成模型，也是很多 ComfyUI 入门教程使用的模型。

主要特点：

- 模型相对轻量，对硬件要求较低。
- 社区资源丰富，有大量 Checkpoint、LoRA 和 ControlNet 模型。
- 适合学习文生图、图生图、局部重绘等基础功能。
- 512×512 是常见的基础训练和测试尺寸。

SD 1.5 的优势是入门门槛低，适合配置有限的电脑。

如果你刚开始学习 ComfyUI，建议先用它掌握工作流和节点的基本原理。

#### 2. Stable Diffusion XL（SDXL）

SDXL 是 Stable Diffusion 系列中更高规格的一代模型。

与 SD 1.5 相比，SDXL 主要特点包括：

- 常见基础生成尺寸为 1024×1024。
- 对复杂场景和图像细节有更强的表现能力。
- 具有不同于 SD 1.5 的模型结构和文本编码配置。
- 对显存和计算资源的要求通常更高。

SDXL 的基础工作流与 SD 1.5 有相似之处，但不能直接认为二者的模型、LoRA、VAE 可以互换。

SDXL 还包含 Base 和 Refiner 等不同组件。入门时可以先使用 SDXL Base 工作流，熟悉后再了解 Refiner。

#### 3. FLUX

FLUX 是 Black Forest Labs 推出的图像生成模型系列。

它的主要特点包括：

- 对复杂文字描述有较好的理解能力。
- 人物、物体和场景的细节表现较好。
- 支持多种模型版本和精度格式。
- 模型结构与传统 SD 1.5、SDXL 不同。
- 完整模型通常需要较多内存和计算资源。

FLUX 常见版本包括：

| 版本           | 特点                                         |
| -------------- | -------------------------------------------- |
| FLUX.1 Dev     | 偏向高质量生成，常见开源版本                 |
| FLUX.1 Schnell | 面向快速生成，蒸馏版本                       |
| FLUX.1 Kontext | 面向图像编辑和指令式修改                     |
| FLUX.2 系列    | 新一代模型系列，具体能力和资源要求取决于版本 |

其中，FLUX.1 Dev 和 Schnell 是入门时经常遇到的两个版本。

需要注意，FLUX 不只是一个模型文件。完整工作流可能还需要文本编码器、VAE 等配套文件。

### 2.2、SD 1.5、SDXL、FLUX 应该怎么选？

把三类模型放在一起对比：

| 对比项目     | SD 1.5                 | SDXL               | FLUX                 |
| ------------ | ---------------------- | ------------------ | -------------------- |
| 模型定位     | 经典轻量模型           | 更高规格的 SD 模型 | 独立模型架构系列     |
| 常见基础尺寸 | 512×512                | 1024×1024          | 依版本和工作流而定   |
| 硬件要求     | 相对较低               | 较高               | 依版本和精度差异较大 |
| 社区资源     | 非常丰富               | 丰富               | 持续发展             |
| LoRA 资源    | 丰富                   | 丰富               | 有专门的 FLUX LoRA   |
| 工作流       | 经典 Checkpoint 工作流 | SDXL 专用工作流    | 通常需要专用加载节点 |
| 入门难度     | 较低                   | 中等               | 中等偏高             |

我的建议是：

- **刚开始学习：** 使用 SD 1.5，先掌握节点、连线、提示词和采样参数。
- **希望提高生成质量：** 尝试 SDXL，学习不同模型结构下的工作流。
- **希望体验新一代模型：** 再尝试 FLUX，了解独立模型、文本编码器和量化版本。

不要一开始就下载大量模型。先选一个能稳定运行的模型，理解工作流后再扩展。

## 三、ComfyUI 模型

### 3.1、ComfyUI 模型文件有哪些类型？

在下载模型之前，需要先认识常见文件类型。

| 文件类型       | 说明                                         |
| -------------- | -------------------------------------------- |
| `.safetensors` | 常见的模型权重文件格式                       |
| `.ckpt`        | 传统模型权重格式                             |
| `.pt`          | PyTorch 相关模型文件                         |
| `.pth`         | PyTorch 模型权重文件                         |
| `.gguf`        | 一种量化模型文件格式，需使用支持它的加载节点 |

其中，`.safetensors` 是目前常见的模型下载格式之一。

但要注意：

**文件后缀并不能直接决定模型属于哪一种架构，也不能保证它可以被任意节点加载。**

例如，同样是 `.safetensors`，可能是完整 Checkpoint，也可能是单独的 Diffusion Model、VAE、LoRA 或文本编码器。

下载时一定要看清楚模型说明和文件用途。

### 3.2、ComfyUI 模型应该放在哪里？

ComfyUI 通过不同目录管理不同类型的模型文件。

常见目录如下：

```
ComfyUI/
└── models/
    ├── checkpoints/
    ├── diffusion_models/
    ├── unet/
    ├── loras/
    ├── vae/
    ├── text_encoders/
    ├── clip/
    ├── clip_vision/
    ├── controlnet/
    └── upscale_models/
```

各目录的作用：

| 目录             | 存放内容                             |
| ---------------- | ------------------------------------ |
| checkpoints      | 完整 Checkpoint 模型                 |
| diffusion_models | 独立扩散模型                         |
| unet             | 部分旧版或兼容工作流使用的 UNet 模型 |
| loras            | LoRA 模型                            |
| vae              | VAE 编码与解码模型                   |
| text_encoders    | CLIP、T5 等文本编码器                |
| clip             | 部分旧版文本编码器目录               |
| clip_vision      | 图像视觉编码器                       |
| controlnet       | ControlNet 模型                      |
| upscale_models   | 图片放大模型                         |

不同 ComfyUI 版本对部分目录存在兼容或别名关系。以当前安装版本的模型目录和节点加载器为准。

#### 1. SD 1.5 模型存放位置

如果下载的是 SD 1.5 完整 Checkpoint：

```
ComfyUI/models/checkpoints/
```

例如：

```
ComfyUI/models/checkpoints/
└── v1-5-pruned-emaonly.safetensors
```

之后可以通过 Load Checkpoint 节点选择模型。

#### 2. SDXL 模型存放位置

如果下载的是 SDXL 完整 Checkpoint，同样放在：

```
ComfyUI/models/checkpoints/
```

例如：

```
ComfyUI/models/checkpoints/
└── sd_xl_base_1.0.safetensors
```

如果下载的是独立 VAE，则放在：

```
ComfyUI/models/vae/
```

具体是否需要额外 VAE，取决于模型文件是否已经包含相应组件。

#### 3. FLUX 模型存放位置

FLUX 的文件组成可能更加复杂。

以 FLUX.1 Dev 的完整模型工作流为例，常见文件分布如下：

```
ComfyUI/
└── models/
    ├── diffusion_models/
    │   └── flux1-dev.safetensors
    ├── text_encoders/
    │   ├── clip_l.safetensors
    │   └── t5xxl_fp16.safetensors
    └── vae/
        └── ae.safetensors
```

其中：

- `flux1-dev.safetensors`：扩散模型。
- `clip_l.safetensors`：文本编码器之一。
- `t5xxl_fp16.safetensors`：另一套文本编码器。
- `ae.safetensors`：FLUX 使用的 VAE。

实际下载时，应以对应 FLUX 工作流的模型清单为准。

如果使用单文件 Checkpoint 版本，安装方式可能更简单，能够通过 Load Checkpoint 加载，但仍然需要确认精度、兼容性和推荐参数。

官方示例提供了 FLUX 完整模型和单文件版本的不同安装方式，可以参考：

[ComfyUI 官方 FLUX 示例](https://comfyanonymous.github.io/ComfyUI_examples/flux/)

### 3.3、如何下载模型？

常见模型来源主要有以下几个。

#### 1. Hugging Face

是常见的 AI 模型托管平台。

可以搜索：

- Stable Diffusion 1.5
- SDXL
- FLUX.1 Dev
- FLUX.1 Schnell
- 各种 LoRA 和 VAE

网站：https://huggingface.co/

下载时注意：

1. 进入模型仓库。
2. 查看模型介绍和使用许可。
3. 找到 Files and versions。
4. 选择需要的模型文件。
5. 下载后放入对应的 ComfyUI 模型目录。

部分模型需要登录或接受使用协议才能下载。

#### 2. Civitai

是 Stable Diffusion 模型和创作资源社区。

这里可以找到大量：

- SD 1.5 Checkpoint。
- SDXL Checkpoint。
- LoRA。
- 风格模型。
- 人物和场景模型。

网站：https://civitai.com/

Civitai 上的模型数量很多，下载前一定要检查：

- 基础模型类型，例如 SD 1.5、SDXL 或 FLUX。
- 模型文件类型。
- 推荐分辨率和采样参数。
- 是否需要触发词。
- 使用许可和内容限制。

#### 3. 官方项目和模型仓库

对于 FLUX 等模型，建议优先查看模型发布方的官方仓库和 ComfyUI 官方示例。

这样可以减少模型文件不完整、版本不匹配以及工作流错误的问题。

### 3.4、下载模型后，如何让 ComfyUI 识别？

以 SD 1.5 完整 Checkpoint 为例。

**第1步：下载模型文件**

假设下载得到：

```
v1-5-pruned-emaonly.safetensors
```

**第2步：放入模型目录**

将文件复制到：

```
ComfyUI/models/checkpoints/
```

**第3步：刷新模型列表**

返回 ComfyUI 页面，找到 Load Checkpoint 节点。

如果当前版本支持刷新模型列表，可以使用节点的刷新功能；如果没有识别，可以重启 ComfyUI。

**第4步：选择模型**

在 Load Checkpoint 节点的模型下拉列表中选择刚才下载的文件。

**第5步：执行工作流**

确认模型加载正常，再执行文生图。

如果使用的是 SDXL 或 FLUX，则需要导入对应模型的工作流，不能直接套用上一篇的 SD 1.5 工作流。

### 3.5、不同模型之间为什么不能随意混用？

这是模型管理中最重要的知识点之一。

不同架构的模型，可能使用不同的网络结构、文本编码器、潜空间格式和 VAE。

例如：

| 组件     | SD 1.5          | SDXL               | FLUX           |
| -------- | --------------- | ------------------ | -------------- |
| 基础模型 | SD 1.5          | SDXL               | FLUX           |
| 文本编码 | CLIP            | CLIP-L + CLIP-G 等 | CLIP-L + T5 等 |
| VAE      | SD 1.x 对应 VAE | SDXL 对应 VAE      | FLUX 对应 AE   |
| LoRA     | SD 1.5 LoRA     | SDXL LoRA          | FLUX LoRA      |
| 工作流   | SD 1.5 工作流   | SDXL 工作流        | FLUX 工作流    |

这张表是常见配置的概括，具体模型可能存在特殊实现。

#### 1. Checkpoint 不能随意混用

SD 1.5 的 Checkpoint 不能直接当成 SDXL 模型加载使用。

同样，FLUX 的独立扩散模型也不能直接放进传统 SD 1.5 工作流中使用。

#### 2. LoRA 不能随意混用

例如：

- SD 1.5 LoRA 通常配合 SD 1.5 底模。
- SDXL LoRA 通常配合 SDXL 底模。
- FLUX LoRA 通常配合对应 FLUX 版本。

即使文件后缀都是 `.safetensors`，也不代表它们可以互换。

#### 3. VAE 不能随意混用

不同模型架构使用的 VAE 可能不同。

例如 SD 1.5、SDXL 和 FLUX 的 VAE 并不是通用的。

使用错误的 VAE，可能出现颜色异常、黑图、解码失败等问题。

因此，下载模型时应优先使用模型作者推荐的配套组件。

## 四、实战：建立自己的模型库

当模型数量逐渐增加后，如果所有文件都随意放置，后续很容易出现找不到模型、重复下载和版本混乱的问题。

建议按照模型类型和用途管理。

例如：

```
ComfyUI/
└── models/
    ├── checkpoints/
    │   ├── sd15/
    │   └── sdxl/
    ├── diffusion_models/
    │   └── flux/
    ├── loras/
    │   ├── sd15/
    │   ├── sdxl/
    │   └── flux/
    ├── vae/
    ├── text_encoders/
    ├── controlnet/
    └── upscale_models/
```

注意：ComfyUI 的模型扫描目录和子目录识别方式可能因版本和加载器而不同。使用子目录前，先确认当前版本能够正常识别；如果没有识别，可以将模型放到对应目录的顶层。

另外，建议为每个模型记录以下信息：

| 信息     | 示例                            |
| -------- | ------------------------------- |
| 模型名称 | SD 1.5                          |
| 模型版本 | v1.5                            |
| 文件名称 | v1-5-pruned-emaonly.safetensors |
| 模型类型 | Checkpoint                      |
| 存放位置 | models/checkpoints              |
| 推荐尺寸 | 512×512                         |
| 来源     | Hugging Face                    |
| 使用说明 | SD 1.5 基础文生图               |

这样以后下载 LoRA、VAE 或 ControlNet 时，就更容易判断是否兼容。

## 五、模型选择时还要注意硬件配置

模型能否运行，不仅取决于模型文件大小，还与以下因素有关：

- 显卡显存。
- 系统内存。
- 模型精度，例如 FP16、BF16、FP8。
- 量化方式。
- 图片分辨率。
- 工作流复杂程度。
- ComfyUI 的显存管理策略。

例如，FLUX 完整 FP16 模型的资源需求通常比较高，而 FP8 版本可以降低部分内存占用，但具体效果和兼容性需要测试。

如果电脑配置有限，可以优先考虑：

1. 选择较轻量的模型。
2. 使用模型提供的量化版本。
3. 降低图片尺寸。
4. 使用 Batch Size 1。
5. 减少同时加载的模型和扩展节点。

不要仅凭文件大小判断模型能否运行。

## 六、总结

这一篇，我们了解了 ComfyUI 中三类常见图像模型：

- SD 1.5：模型轻量、资源丰富，适合入门学习。
- SDXL：基础生成尺寸较高，适合进一步体验更高规格的图像生成。
- FLUX：采用不同的模型架构，文本理解和图像生成能力具有自身特点，需要使用对应工作流。

同时还学习了模型文件类型、目录结构、下载方式、安装步骤和模型兼容性。

建议先建立一个简单的模型库，不要盲目下载大量模型。先保证一个模型能够正常运行，再逐步扩展到 LoRA、ControlNet 和其他模型组件。

