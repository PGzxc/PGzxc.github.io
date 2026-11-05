---
title: ComfyUI开发之——ComfyUI 参考图与人物一致性(3.6)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: e99e97a9
date: 2026-11-04 19:36:52
---
## 一、概述

```
ComfyUI 参考图与人物一致性：IP-Adapter、InstantID 原理与实践
```

<!--more-->

## 二、图与人物一致性

### 2.1、为什么需要人物一致性？

使用 ComfyUI 生成图片时，经常会遇到一个问题：第一次生成的人物效果不错，但再次生成时，人物的脸型、五官、发型甚至整体外观都发生了变化。

例如：

- 想让同一个人物出现在不同场景中。
- 想让人物穿不同衣服，但保持面部特征。
- 想生成一组人物写真，尽量保持外观一致。
- 想根据一张参考照片生成不同风格的图片。

仅靠提示词和 Seed，通常很难稳定保持人物身份特征。

这时可以使用参考图相关技术。

常见方案包括：

- **IP-Adapter：** 利用参考图片提取视觉特征，引导模型生成相似内容。
- **InstantID：** 利用人脸身份特征和关键点信息，帮助保持人物面部身份一致性。
- **LoRA：** 通过训练或使用已有适配模型，学习特定人物或风格特征。
- **ControlNet：** 控制人物姿势、轮廓和场景结构。

它们可以单独使用，也可以根据任务组合使用。

### 2.2、IP-Adapter 是什么？

IP-Adapter（Image Prompt Adapter）是一种图像提示适配技术。

前面我们使用 Prompt，通过文字告诉模型希望生成什么内容。

IP-Adapter 则可以额外输入一张参考图片，让模型根据图片中的视觉特征进行生成。

例如：

上传一张人物照片，再通过 IP-Adapter 将其作为参考图，生成不同服装、不同背景或不同画风的人物图片。

它可以帮助模型参考：

- 人物整体外观。
- 面部视觉特征。
- 服装和配色。
- 图片风格。
- 画面中的视觉元素。

需要注意，IP-Adapter 不是专门的人脸身份识别工具。它提取的是图像视觉特征，具体保留哪些特征取决于模型类型和工作流。

#### 1. IP-Adapter 的基本原理

IP-Adapter 会通过图像编码器提取参考图片的特征，再将这些特征作为额外条件提供给图像生成模型。

基本流程：

```
参考图片
    ↓
CLIP Vision 图像编码器
    ↓
提取图像特征
    ↓
IP-Adapter
    ↓
结合文本提示词
    ↓
KSampler
    ↓
生成图片
```

可以理解为：

- Prompt 负责描述生成内容。
- 参考图负责提供视觉信息。
- IP-Adapter 负责将参考图的信息引入生成过程。

例如：

参考图片：一个穿着白色衬衫的女性。

提示词：

```
a woman wearing a black dress,
standing in a beautiful garden,
realistic photography
```

通过 IP-Adapter，可以让模型在生成不同服装和背景时，尽量参考原图中的人物视觉特征。

#### 2. IP-Adapter 常见类型

IP-Adapter 有不同版本，适用于不同模型架构和任务。

| 类型                 | 主要用途                 |
| -------------------- | ------------------------ |
| IP-Adapter           | 通用图片参考             |
| IP-Adapter Plus      | 更丰富的图像特征参考     |
| IP-Adapter Face      | 更侧重面部视觉特征       |
| IP-Adapter Plus Face | 结合面部和整体视觉特征   |
| FaceID 系列          | 利用人脸身份特征进行参考 |

不同版本所需的模型文件、图像编码器和加载节点可能不同。

下载时一定要确认基础模型架构，例如 SD 1.5 或 SDXL，不能只看模型名称。

### 2.3、InstantID 是什么？

如果 IP-Adapter 更侧重整体图像视觉参考，那么 InstantID 则更加关注人物面部身份特征。

InstantID 是一种面向身份保持的图像生成方案，可以利用参考人脸的身份特征和面部关键点信息，引导生成结果尽量保持人物身份。

例如：

- 根据一张人物照片生成不同服装的照片。
- 更换人物背景。
- 调整人物姿势和构图。
- 尝试生成不同风格的人物图片。

#### 1. InstantID 的基本原理

InstantID 通常会使用人脸分析模型提取身份特征，同时通过人脸关键点信息提供姿势和面部结构方面的控制。

基本流程：

```
参考人脸照片
      ↓
人脸检测与特征提取
      ↓
身份特征（Face Embedding）
      ↓
InstantID
      +
人脸关键点信息
      ↓
ControlNet 等结构控制
      ↓
图像生成模型
      ↓
生成图片
```

其中：

- 人脸身份特征用于提供人物身份参考。
- 人脸关键点用于提供面部结构和位置方面的控制。
- 提示词用于描述服装、背景、风格等内容。

InstantID 并不是简单地把原图的人脸复制到新图片上，而是利用身份特征引导模型重新生成。

#### 2. InstantID 与 IP-Adapter 的区别

| 对比         | IP-Adapter               | InstantID              |
| ------------ | ------------------------ | ---------------------- |
| 主要目标     | 参考图片视觉特征         | 保持人物面部身份       |
| 参考信息     | 图像特征                 | 人脸身份特征及关键点   |
| 常见用途     | 风格、人物外观、视觉参考 | 人物写真、面部身份保持 |
| 人脸专注程度 | 取决于具体版本           | 更侧重人脸             |
| 模型要求     | 依版本而定               | 经典方案主要面向 SDXL  |

需要注意，InstantID 经典实现主要针对 SDXL。使用时应选择与其兼容的模型、节点和依赖，不能直接将 SD 1.5 的工作流照搬过来。

## 三、准备模型与运行环境

IP-Adapter 和 InstantID 通常需要额外下载模型文件，并安装对应的自定义节点或依赖。

常见资源：

- ComfyUI IPAdapter Plus：https://github.com/cubiq/ComfyUI_IPAdapter_plus
- InstantID 官方项目：https://github.com/InstantID/InstantID
- Hugging Face：https://huggingface.co/
- Civitai：https://civitai.com/

### 3.1. IP-Adapter 模型

使用 IP-Adapter Plus 扩展时，常见目录结构如下：

```
ComfyUI/
└── models/
    ├── ipadapter/
    │   └── IP-Adapter 模型文件
    │
    └── clip_vision/
        └── CLIP Vision 模型文件
```

注意：不同版本和模型架构所需的文件不同，具体目录以当前扩展的 README 为准。

### 3.2. InstantID 模型

经典 InstantID 工作流通常需要准备：

- InstantID 身份适配模型。
- 对应的 ControlNet 模型。
- 人脸分析模型及相关依赖。
- 兼容的 SDXL 基础模型。

常见目录示意：

```
ComfyUI/
└── models/
    ├── instantid/
    │   └── InstantID 模型文件
    │
    └── controlnet/
        └── InstantID ControlNet 模型
```

人脸分析模型的文件位置可能由具体自定义节点决定，不能仅凭上述目录示意判断是否安装完整。

### 3.3. 安装自定义节点

IP-Adapter Plus 的传统手动安装方式：

```
cd ComfyUI/custom_nodes

git clone https://github.com/cubiq/ComfyUI_IPAdapter_plus.git
```

InstantID 相关节点也需要按照对应项目的 README 安装。

安装依赖时，必须使用当前 ComfyUI 所使用的 Python 环境。

例如，Windows 便携版通常需要使用其自带的 Python，而不是直接使用系统 Python。

安装完成后重新启动 ComfyUI，检查启动日志是否存在依赖或节点加载错误。

注意：自定义节点项目可能更新、迁移或调整安装方式，实际操作应以项目当前官方说明为准。

## 四、实战

### 4.1、实战一：使用 IP-Adapter 进行人物参考生成

下面以 SDXL + IP-Adapter Plus 为例，理解基本工作流程。

#### 1. 准备参考图片

选择一张人物照片。

建议：

- 人脸清晰。
- 光线正常。
- 人物没有严重遮挡。
- 图片分辨率适中。
- 背景不要过于复杂。

如果希望参考人物整体外观，可以使用包含上半身的照片；如果重点是面部特征，可以选择面部清晰的照片。

#### 2. 添加节点

不同版本的 IP-Adapter Plus 节点名称可能略有差异，常见节点包括：

| 节点                     | 作用                 |
| ------------------------ | -------------------- |
| Load Image               | 加载参考图片         |
| IPAdapter Unified Loader | 加载适配器及相关模型 |
| IPAdapter                | 应用参考图条件       |
| Load Checkpoint          | 加载基础模型         |
| CLIP Text Encode         | 编写提示词           |
| KSampler                 | 生成图片             |
| VAE Decode               | 解码图片             |
| Save Image               | 保存图片             |

#### 3. 连接基本流程

```
Load Checkpoint
      ↓ MODEL
IPAdapter Unified Loader
      ↓ MODEL
IPAdapter
      ↓ MODEL
KSampler

Load Image
      ↓ IMAGE
IPAdapter

CLIP Text Encode（正向）
      ↓ CONDITIONING
KSampler

CLIP Text Encode（负向）
      ↓ CONDITIONING
KSampler

Empty Latent Image
      ↓ LATENT
KSampler
      ↓ LATENT
VAE Decode
      ↓ IMAGE
Save Image
```

实际使用时，部分版本的 IPAdapter 节点还需要连接 IP-Adapter 模型、CLIP Vision 等输入，具体以节点接口为准。

#### 4. 设置提示词

例如，参考图中的人物穿着普通衣服，希望生成一张户外写真。

正向提示词：

```
portrait photography,
wearing an elegant white dress,
standing in a beautiful garden,
natural sunlight,
realistic skin texture,
high quality
```

负向提示词：

```
blurry, low quality,
distorted face, bad anatomy,
extra fingers, deformed hands
```

#### 5. 调整 IP-Adapter 权重

IP-Adapter 通常提供类似 `weight` 的控制参数。

它决定参考图对生成结果的影响程度。

可以从以下数值开始测试：

| 权重 | 大致效果     |
| ---- | ------------ |
| 0.3  | 参考影响较弱 |
| 0.5  | 中等参考     |
| 0.7  | 较强参考     |
| 1.0  | 强参考       |

这些数值只是实验起点，不同 IP-Adapter 版本、模型和工作流的实际效果可能不同。

如果生成结果与参考人物差异较大，可以适当提高权重；如果服装、背景和画风难以按照提示词改变，可以尝试降低权重。

#### 6. 观察生成结果

重点观察：

- 面部外观是否接近参考图。
- 人物整体外观是否保持相似。
- 服装是否按照提示词改变。
- 背景是否成功替换。
- 是否出现面部失真。

IP-Adapter 可以帮助参考人物外观，但不能保证每次生成都保持完全相同的身份特征。

### 4.2、实战二：使用 InstantID 保持人物面部特征

接下来使用 InstantID 进行人物身份参考。

这里以经典 SDXL InstantID 工作流为例。

#### 1. 准备人物照片

选择一张正面或接近正面的清晰人脸照片。

建议：

- 面部完整可见。
- 五官清楚。
- 光线均匀。
- 尽量避免严重遮挡。
- 不使用模糊或过度美颜的图片。

#### 2. 添加相关节点

经典 InstantID 工作流通常涉及：

| 节点或组件                  | 作用                |
| --------------------------- | ------------------- |
| Load Image                  | 加载参考人脸        |
| InstantID Face Analysis     | 提取人脸身份特征    |
| InstantID Model Loader      | 加载 InstantID 模型 |
| InstantID ControlNet Loader | 加载对应控制模型    |
| Apply InstantID             | 应用身份和结构控制  |
| Load Checkpoint             | 加载 SDXL 基础模型  |
| KSampler                    | 生成图片            |

实际节点名称会因自定义节点版本而不同。

#### 3. 理解工作流连接

整体关系可以理解为：

```
参考人脸图片
      ↓
人脸检测与身份特征提取
      ↓
Apply InstantID
      ↑
InstantID 模型
      ↑
InstantID ControlNet

SDXL 基础模型
      ↓
Apply InstantID
      ↓
KSampler
      ↓
VAE Decode
      ↓
Save Image
```

Apply InstantID 通常会将身份特征、面部关键点控制和其他生成条件整合到工作流中。

它不是一个只连接图片就能完成全部工作的普通图片节点，实际连接方式应按照当前节点版本的接口进行。

#### 4. 设置生成提示词

例如，希望生成一张人物户外写真：

```
realistic portrait photography,
wearing a light blue dress,
standing in a green garden,
soft natural lighting,
detailed face,
high quality
```

负向提示词：

```
blurry, low quality,
deformed face, distorted eyes,
bad anatomy, unnatural skin
```

#### 5. 调整控制参数

InstantID 相关工作流通常会提供身份参考强度、ControlNet 强度以及开始和结束控制时间等参数。

建议先使用作者提供的默认配置运行，再逐项调整。

重点观察：

- 面部身份特征是否保持。
- 人脸关键点是否与目标构图匹配。
- 服装和背景能否按提示词改变。
- 是否出现面部比例异常。

不要直接套用其他 IP-Adapter 工作流中的权重数值，因为两者的参数定义和作用并不完全相同。

## 五、技术选型

### 5.1、IP-Adapter、InstantID、LoRA、ControlNet 如何选择？

这几种技术都可以影响生成结果，但它们解决的问题并不完全相同。

| 技术       | 主要控制目标         | 适用场景                     |
| ---------- | -------------------- | ---------------------------- |
| IP-Adapter | 参考图片视觉特征     | 参考人物外观、画风、图片内容 |
| InstantID  | 人物面部身份特征     | 人物写真、面部身份保持       |
| LoRA       | 特定人物、风格或概念 | 固定角色、画风、服装         |
| ControlNet | 姿势、轮廓、空间结构 | 人物动作、建筑结构、场景布局 |

例如，想生成同一个人物的不同写真，可以考虑：

- InstantID：提供人物面部身份参考。
- ControlNet：控制人物姿势。
- LoRA：提供特定画风。
- Prompt：描述服装、背景和拍摄环境。

但并不是所有任务都需要同时加载这些模型。模型越多，工作流越复杂，显存和兼容性要求也可能越高。

建议先单独掌握每一种技术，再根据实际需求组合。

### 5.2、人物一致性为什么仍然不稳定？

即使使用 IP-Adapter 或 InstantID，也不能保证每次生成的人物完全相同。

常见原因包括：

#### 1. 参考照片质量不够

如果人脸模糊、遮挡严重或光线不足，模型可能无法准确提取特征。

建议更换清晰的参考照片。

#### 2. 提示词与参考图冲突

例如，参考图是短发人物，但提示词明确要求长发，生成结果就可能发生明显变化。

需要合理区分希望保留的特征和希望修改的特征。

#### 3. 控制权重不合适

权重过低，参考图影响不足；权重过高，可能限制服装、姿势和背景变化，甚至造成生成异常。

建议固定其他参数，逐步调整权重。

#### 4. 模型架构不匹配

不同架构的 IP-Adapter、InstantID 和 ControlNet 不能随意混用。

尤其需要注意：

- SD 1.5 工作流。
- SDXL 工作流。
- FLUX 工作流。

下载模型时应确认对应架构，并按照官方工作流安装。

#### 5. 人物姿势和角度变化太大

如果参考照片是正面照，而目标图片要求大幅侧身或仰视，面部特征可能难以保持。

可以尝试提供角度更接近的参考图片，或配合合适的姿势控制方法。

### 5.3、结合实际项目：证件照与老人照片处理

前面规划过 ComfyUI 的 AI 图片处理实战，包括证件照制作和老人照片修复。

这里可以提前理解一下这些技术的用途。

#### 1. 证件照制作

证件照通常需要：

- 保持人物身份和面部特征。
- 更换背景颜色。
- 更换符合要求的服装。
- 调整图片尺寸和比例。
- 输出符合具体用途要求的照片。

对于证件照，应该优先采用背景分割、图像合成和尺寸处理等可控方法。

如果需要更换服装，可以使用局部重绘，但必须检查是否改变了人物面部和身份特征。

不建议完全依赖生成式 AI 重新生成整张证件照，因为它可能改变五官、面部细节或真实外观。

#### 2. 老人照片处理

老人照片修复可能涉及：

- 划痕和破损修复。
- 清晰度增强。
- 背景替换。
- 服装调整。
- 旧照片上色。

如果希望尽量保留原始人物面貌，可以结合参考图、局部重绘和图像修复技术。

需要特别注意：AI 可能会补充原图中不存在的面部细节。对于纪念照或有真实身份意义的照片，应保留原图，并仔细检查修复结果，不要将 AI 推测生成的细节当成真实记录。

使用他人照片进行身份参考、生成或分享时，也应获得适当授权，并注意照片隐私。

## 六、本篇总结

这一篇学习了 ComfyUI 人物参考和一致性控制的两种常见技术。

需要掌握的知识点：

1. IP-Adapter 可以利用参考图片的视觉特征引导生成。
2. InstantID 更侧重利用人脸身份特征保持人物面部身份。
3. IP-Adapter 不等于专门的人脸身份识别工具。
4. InstantID 经典方案主要面向 SDXL，需要对应的模型和节点。
5. LoRA 可以学习人物或风格特征，ControlNet 可以控制姿势和结构。
6. 多种技术可以组合，但需要注意模型兼容性、显存和参数设置。

建议先完成一次 IP-Adapter 人物参考生成，再尝试 InstantID，分别观察两者在面部、服装和背景方面的表现。

至此，ComfyUI 第三阶段「图像生成与控制」已经完成。

