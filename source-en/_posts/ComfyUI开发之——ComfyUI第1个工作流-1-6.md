---
title: ComfyUI开发之——ComfyUI第1个工作流(1.6)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 4773952a
date: 2026-11-04 19:27:50
---
## 一、前言

```
前面四篇，我们已经了解了 ComfyUI 的基本概念、安装方式、界面操作和模型知识。
从这一篇开始，正式动手生成图片。

对于初学者来说，最好的入门方式不是一开始就研究复杂工作流，
而是先完成一个最基础的任务：输入一段文字，让 AI 根据文字生成图片。

这个过程就是文生图（Text to Image）。

本文分为两个部分：
1. 先使用现成的基础工作流，了解完整的生成过程。
2. 再从空白画布开始，自己添加节点、连接节点，搭建一个完整的文生图工作流。

最终，我们要实现的效果是：输入提示词 → 设置生成参数 → 执行工作流 → 保存图片。
```

<!--more-->

## 二、准备工作：模型和运行环境

在开始之前，需要准备好 ComfyUI 和图像生成模型。

### 2.1 准备基础模型

```
本篇以经典 Stable Diffusion 工作流为例，建议初学者先使用 SD 1.5 模型。

原因是：
- 模型生态成熟，相关教程比较多。
- 模型文件相对较小。
- 对硬件的要求通常低于 SDXL 和部分新模型。
- 适合学习 Checkpoint、CLIP、VAE、KSampler 等基础节点。

如果已经准备了兼容的 SD 1.5 Checkpoint，可以直接使用。

模型通常放在：
ComfyUI/
└── models/
    └── checkpoints/
        └── your_model.safetensors
        
这里的 `your_model.safetensors` 只是示例文件名，请替换成自己下载的模型。        
```

### 2.2 确认模型是否被识别

```
启动 ComfyUI，在画布中添加 `Load Checkpoint` 节点。
查看节点中的模型选择框，确认刚刚放入的模型是否出现。

如果没有出现，检查：
- 模型是否放在正确目录。
- 文件是否下载完整。
- 当前 ComfyUI 是否使用了额外模型路径。
- 是否需要刷新模型列表或重新启动程序。

注意：如果使用 FLUX、Qwen Image 等新架构模型，不能直接照搬本篇的传统 Checkpoint 工作流，需要使用对应的模型加载方式。
```

## 三、先认识完整的文生图工作流

### 3.1 工作流

```
在 ComfyUI 中，一个经典的 SD 1.5 文生图工作流通常由七个节点组成。

分别是：
1. Load Checkpoint：加载基础模型。
2. CLIP Text Encode：处理正向提示词。
3. CLIP Text Encode：处理负向提示词。
4. Empty Latent Image：设置生成图片的尺寸。
5. KSampler：执行采样生成。
6. VAE Decode：将潜在图像转换成普通图片。
7. Save Image：保存生成结果。
```

### 3.2 整体流程如下：

```
                 Load Checkpoint
                  │      │      │
                MODEL   CLIP   VAE
                  │      │      │
                  │   ┌──┴──┐   │
                  │   │     │   │
                  │ 正向  负向  │
                  │ 提示词 提示词│
                  │   │     │   │
                  └───┴──┬──┘   │
                         │      │
Empty Latent Image ──→ KSampler │
                         │      │
                         └──→ VAE Decode
                                  │
                              Save Image
```

### 3.3 理解

```
可以把它理解成一条图片生产流水线：

- 模型提供生成能力。
- 提示词告诉模型想生成什么。
- 空 Latent 节点决定图片尺寸。
- KSampler 负责生成过程。
- VAE 将生成结果转换为普通图片。
- Save Image 保存最终结果。

理解这条流程后，再添加节点就不会感到陌生。
```

## 四、第一种方式：使用现成工作流生成图片

如果你还不熟悉节点连接，可以先使用 ComfyUI 提供的基础工作流。

官方示例：[ComfyUI 官方示例与工作流](https://comfyanonymous.github.io/ComfyUI_examples/)

官方示例中包含文生图、图生图、局部重绘、LoRA、ControlNet 等多种工作流。

### 4.1 加载工作流

```
打开官方示例页面，找到基础文生图示例。

如果示例提供了包含工作流信息的图片，可以下载图片，然后拖入 ComfyUI 画布。
也可以使用当前版本支持的工作流文件导入功能。

需要注意：普通图片不一定包含工作流信息。只有嵌入了相应元数据的图片，才能通过这种方式恢复工作流。
```

### 4.2 检查模型

```
工作流加载后，找到 `Load Checkpoint` 节点。

在模型选择框中，选择自己已经准备好的模型。

如果工作流原本使用的模型与你本地的模型不同，可以尝试替换，但需要确保模型架构兼容。
如果出现模型缺失提示，先检查工作流要求的模型类型，不要随意用其他架构的模型替代。
```

### 4.3 修改提示词

```
找到两个 `CLIP Text Encode (Prompt)` 节点。
一个负责正向提示词，一个负责负向提示词。

2.例如，正向提示词：
a cute orange cat sitting on a wooden windowsill,
sunlight shining through the window,
warm atmosphere, realistic photography,
high detail

负向提示词：
blurry, low quality, distorted,
bad anatomy, deformed


这里使用的是英文提示词示例。

不同模型对中文、英文和提示词写法的支持程度不同，后续会专门介绍提示词的编写方法。
```

### 4.4 执行生成

```
确认模型和提示词没有问题后，点击界面中的运行按钮，或者使用：Ctrl + Enter

ComfyUI 会将任务加入生成队列。

等待任务执行完成后，可以在 `Save Image` 节点中查看生成结果，也可以到 `output` 目录查看保存的图片。

完成第一次生成
如果已经成功生成图片，说明模型加载、提示词编码、采样和图片保存的基本流程已经跑通。

不过，我们还需要进一步理解每个节点的作用。
```

## 五、第二种方式：从空白画布搭建文生图工作流

接下来开始本篇最重要的内容。

我们不再直接使用别人提供的完整工作流，而是从空白画布开始，逐个添加节点并完成连接。

### 5.1 第一步：添加 Load Checkpoint 节点

在画布空白位置双击鼠标左键，打开节点搜索。

搜索：Load Checkpoint

选择对应节点并添加。

这个节点负责加载基础模型，通常会提供三个输出：

| 输出  |       作用       |
| :---: | :--------------: |
| MODEL | 提供图像生成模型 |
| CLIP  |  提供文本编码器  |
|  VAE  |  提供图像解码器  |

在 `ckpt_name` 中选择之前准备好的 SD 1.5 模型。

如果下拉列表中没有模型，先不要继续操作，检查模型路径是否正确。

### 5.2 第二步：添加两个 CLIP Text Encode 节点

再次双击画布，搜索：

```
CLIP Text Encode
```

添加两个节点。

第一个节点用于输入正向提示词，第二个节点用于输入负向提示词。

正向提示词示例：

```
a beautiful landscape, green mountains,
clear river, blue sky, sunlight,
realistic photography, high detail
```

负向提示词示例：

```
blurry, low quality, noisy,
distorted, bad composition
```

然后连接 CLIP：

```
Load Checkpoint 的 CLIP 输出
          ├──→ 正向 CLIP Text Encode
          └──→ 负向 CLIP Text Encode
```

两个文本编码节点都需要使用同一个基础模型提供的 CLIP。

注意：`CLIP Text Encode` 节点本身并不区分正向和负向提示词。它输出的内容最终连接到 KSampler 的 `positive` 还是 `negative` 输入端口，才决定它在工作流中的用途。

### 5.3 第三步：添加 Empty Latent Image 节点

搜索：

```
Empty Latent Image
```

添加节点。

这个节点用于创建一张空白的潜在图像数据，并设置生成图片的尺寸。

常见参数：

|    参数    |        作用        |
| :--------: | :----------------: |
|   width    |      图片宽度      |
|   height   |      图片高度      |
| batch_size | 一次生成的图片数量 |

本次建议先使用：

```
width: 512
height: 512
batch_size: 1
```

对于 SD 1.5，512×512 是比较常见的入门分辨率。

如果显存充足，也可以尝试其他尺寸，但建议先把基础流程跑通。

### 5.4 第四步：添加 KSampler 节点

搜索：

```
KSampler
```

添加节点。

KSampler 是经典文生图工作流中的核心节点，负责根据模型、提示词和初始潜在图像进行采样生成。

它需要四类主要输入：

|     输入     |         连接来源         |
| :----------: | :----------------------: |
|    model     | Load Checkpoint 的 MODEL |
|   positive   |  正向 CLIP Text Encode   |
|   negative   |  负向 CLIP Text Encode   |
| latent_image |    Empty Latent Image    |

连接关系如下：

```
Load Checkpoint
      │
     MODEL
      │
      ▼
   KSampler

正向 CLIP Text Encode
      │
   CONDITIONING
      │
      ▼
   KSampler

负向 CLIP Text Encode
      │
   CONDITIONING
      │
      ▼
   KSampler

Empty Latent Image
      │
     LATENT
      │
      ▼
   KSampler
```

然后设置 KSampler 的参数。

|     参数     | 入门建议 |       作用       |
| :----------: | :------: | :--------------: |
|     seed     |   随机   | 控制初始随机噪声 |
|    steps     |    20    |     采样步数     |
|     cfg      |    7     |  提示词引导强度  |
| sampler_name |  euler   |     采样算法     |
|  scheduler   |  normal  |   噪声调度方式   |
|   denoise    |   1.0    |     去噪强度     |

这些数值是用于经典 SD 1.5 工作流的入门示例，不是所有模型都适用的固定参数。不同模型可能有自己的推荐采样器、步数和 CFG 设置。

### 5.5 第五步：添加 VAE Decode 节点

搜索：

```
VAE Decode
```

添加节点。

KSampler 输出的还是潜在图像数据，需要经过 VAE 解码才能得到普通图片。

连接方式：

```
KSampler 的 LATENT 输出
          │
          ▼
      VAE Decode
          ▲
          │
Load Checkpoint 的 VAE 输出
```

也就是说：

- KSampler 的输出连接到 VAE Decode 的 `samples` 输入。
- Load Checkpoint 的 VAE 输出连接到 VAE Decode 的 `vae` 输入。

### 5.6 第六步：添加 Save Image 节点

搜索：

```
Save Image
```

添加节点。

连接：

```
VAE Decode 的 IMAGE 输出
          │
          ▼
      Save Image
```

这个节点负责保存最终图片。

可以设置文件名前缀，例如：

```
ComfyUI_Tutorial
```

生成的文件通常会保存到：

```
ComfyUI/output/
```

具体保存路径也可能受当前版本和配置影响。

### 5.7 第七步：检查所有节点连接

到这里，七个节点已经全部添加完成。

最终连接关系如下：

```
Load Checkpoint
    │
    ├── MODEL ──────────────────┐
    │                           │
    ├── CLIP ──→ 正向文本编码 ──┤
    │                           │
    │        └→ 负向文本编码 ───┤
    │                           ▼
    │                        KSampler
    │                           ▲
    │                           │
    │                    Empty Latent Image
    │
    └── VAE ────────────────┐
                            │
KSampler ──────────────────→ VAE Decode
                                  │
                                  ▼
                              Save Image
```

检查以下内容：

- Checkpoint 是否选择了正确的模型。
- CLIP 是否连接到两个文本编码节点。
- 正向提示词是否连接到 KSampler 的 positive。
- 负向提示词是否连接到 KSampler 的 negative。
- MODEL 是否连接到 KSampler。
- Empty Latent Image 是否连接到 KSampler。
- KSampler 是否连接到 VAE Decode。
- VAE 是否连接到 VAE Decode。
- VAE Decode 是否连接到 Save Image。

确认无误后，就可以执行工作流了。

## 六、运行工作流并查看生成结果

```
1.执行工作流：
点击界面中的运行按钮，或者使用快捷键：Ctrl + Enter
ComfyUI 会开始执行工作流。
执行过程中，可以观察节点状态和运行队列。

2.执行结果：
完成后，生成结果通常会显示在 `Save Image` 节点中。
同时，可以打开输出目录：ComfyUI/output/
找到刚刚生成的图片。

如果成功生成，恭喜你，已经完成了第一个从空白画布搭建的 ComfyUI 文生图工作流。
```

## 七、常见问题排查

第一次搭建工作流时，可能遇到一些问题。

|        问题        |         可能原因         |                    处理方法                    |
| :----------------: | :----------------------: | :--------------------------------------------: |
|    模型列表为空    |   模型路径错误或未扫描   |             检查 checkpoints 目录              |
|   CLIP 无法连接    | 数据类型或节点选择不正确 |               检查输出和输入类型               |
| KSampler 无法执行  |       缺少必要输入       | 检查 MODEL、positive、negative 和 latent_image |
|  VAE Decode 报错   |     VAE 缺失或不兼容     |            检查 VAE 来源和模型架构             |
|      显存不足      |  图片尺寸或模型占用过高  |           降低分辨率、使用更轻量模型           |
|  生成图片颜色异常  |   VAE 不匹配或使用错误   |                检查模型配套 VAE                |
| 图片生成效果不理想 | 提示词、模型或参数不合适 |              调整提示词和生成参数              |
|    生成速度很慢    |    硬件性能或模型较大    |         降低工作流复杂度，检查运行设备         |

如果出现错误，建议先查看终端日志，确认具体报错位置，再针对性处理。

不要一遇到问题就重新安装整个 ComfyUI。

## 八、保存自己的第一个工作流

### 8.1 如何保存

```
工作流搭建成功后，记得保存。
可以通过顶部菜单中的保存功能，或者使用：Ctrl + S

建议给工作流起一个容易识别的名字：01-基础文生图-SD15.json
```

### 8.2 后续操作

```
以后可以在此基础上继续修改，例如：

- 增加 LoRA 节点。
- 修改采样参数。
- 增加图片放大节点。
- 增加图像输入和处理节点。

这也是学习 ComfyUI 最重要的习惯之一：
每完成一个能够正常运行的工作流，就保存一份，逐步建立自己的工作流库。
```

## 九、动手练习

为了加深理解，建议完成下面三个小练习。

### 9.1 练习一：修改提示词

将正向提示词从风景改成：

```
a cute orange cat sitting on a wooden chair,
warm sunlight, cozy room,
realistic photography
```

观察生成结果有什么变化。

### 9.2 练习二：修改图片尺寸

```
将图片尺寸从 512×512 改为：
width: 512
height: 768

观察图片构图和生成效果的变化。

注意：图片尺寸越大，通常需要更多显存和计算资源。
```

### 9.3 练习三：固定随机种子

```
将 KSampler 的 seed 设置为固定数值。
在其他条件不变的情况下，重复执行工作流，观察生成结果是否能够复现。
如果希望每次生成不同图片，可以使用随机种子模式。
通过这三个练习，你就已经开始掌握 ComfyUI 的基本生成方法了。
```

## 十、总结

### 10.1 本文内容

```
本篇完成了 ComfyUI 的第一个文生图工作流。

我们从现成工作流开始，逐步认识了各个节点，最后从空白画布搭建了完整的生成流程。
```

### 10.2 需要记住七个核心节点：

|        节点        |          主要作用           |
| :----------------: | :-------------------------: |
|  Load Checkpoint   |        加载基础模型         |
|  CLIP Text Encode  |    编码正向和负向提示词     |
| Empty Latent Image | 设置图片尺寸并创建空 Latent |
|      KSampler      |        执行采样生成         |
|     VAE Decode     |  将潜在图像转换为普通图片   |
|     Save Image     |        保存生成结果         |

说明：

```
其中，CLIP Text Encode 使用两个节点，因此整个基础工作流通常由七个节点组成。

到这里，你已经完成了 ComfyUI 入门阶段最重要的一步：从认识工具，进入实际使用。
```

## 参考资料

- [ComfyUI 官方文生图示例](https://comfyanonymous.github.io/ComfyUI_examples/)
- [ComfyUI 官方文档](https://docs.comfy.org/)
- [ComfyUI 官方 GitHub](https://github.com/Comfy-Org/ComfyUI)
- [ComfyUI 工作流示例](https://comfy.org/hub/workflows/)