---
title: ComfyUI开发之——ComfyUI ControlNet 入门(3.5)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: b5a0a316
date: 2026-11-04 19:36:08
---
## 一、概述

```
ComfyUI ControlNet 入门：姿势、边缘与深度控制实战
```

<!--more-->

## 二 相关概念

### 2.1、什么是 ControlNet？

前面我们学习了 LoRA，可以通过加载额外模型，让基础模型获得特定人物、画风或物体的生成能力。

但如果希望 AI 按照指定的姿势、轮廓或场景结构生成图片，仅靠提示词和 LoRA 往往不够稳定。

例如：

- 希望生成的人物摆出指定姿势。
- 希望新图片保留参考图中的建筑轮廓。
- 希望按照一张线稿生成完整图片。
- 希望保持原图中前景、背景和物体的空间关系。

这时就可以使用 ControlNet。

ControlNet 是一种为图像生成模型增加结构控制能力的技术。它可以接收姿势骨架、边缘图、深度图等条件信息，引导模型按照参考结构生成图片。

简单理解：

- **Checkpoint：** 决定基础生成能力。
- **LoRA：** 增加人物、风格或特定元素特征。
- **ControlNet：** 控制生成图片的结构和布局。
- **Prompt：** 描述希望生成的内容。

例如，提供一张人物姿势参考图，再使用提示词描述人物服装和画风，就可以尝试生成一个保持相似姿势、但外观不同的人物。

### 2.2、ControlNet 的工作原理

ControlNet 并不是简单地把参考图片作为普通提示词输入，而是先将参考图片转换成特定的控制信息，再将控制信息提供给生成模型。

常见流程：

```
参考图片
   ↓
预处理（Preprocessor）
   ↓
姿势图 / 边缘图 / 深度图
   ↓
ControlNet
   ↓
结合正向、负向提示词
   ↓
KSampler
   ↓
VAE Decode
   ↓
生成图片
```

例如，使用 OpenPose 控制人物姿势时：

1. 加载一张人物参考照片。
2. 使用 OpenPose 预处理器提取人体骨架。
3. 将骨架图作为 ControlNet 条件。
4. 编写提示词，描述人物服装、外貌和场景。
5. 通过 KSampler 生成图片。

这样就可以在一定程度上控制人物的动作和姿势。

需要注意：ControlNet 不是保证像素级复制参考图的工具，最终结果仍然受到模型、提示词、控制强度和采样参数影响。

### 2.3、常见 ControlNet 类型

ControlNet 有多种控制方式，不同类型适合不同任务。

#### 1. OpenPose：人物姿势控制

OpenPose 主要提取人物身体关键点和骨架信息。

常见控制内容：

- 头部位置。
- 肩膀和手臂位置。
- 腰部和腿部姿势。
- 人体整体动作。

适用场景：

- 让人物摆出指定姿势。
- 参考照片生成不同服装的人物。
- 角色动作设计。
- 漫画和插画人物构图。

例如，上传一张人物站立照片，提取 OpenPose 骨架，再通过提示词生成穿着不同服装的人物。

#### 2. Canny：边缘轮廓控制

Canny 通过边缘检测提取图片中的轮廓信息。

它可以保留：

- 建筑物轮廓。
- 人物外形。
- 物体边界。
- 画面主要结构。

适用场景：

- 根据线稿生成图片。
- 建筑外观设计。
- 产品外观变化。
- 保留原图物体轮廓并改变风格。

例如，提供一张建筑照片，提取边缘图后，可以尝试将建筑转换成水彩画风格，同时保留主要轮廓。

#### 3. Depth：深度控制

Depth 主要提取图片中不同物体的远近关系。

通常会生成一张深度图，用不同灰度表示空间距离。

它可以帮助模型理解：

- 前景和背景。
- 物体的远近关系。
- 场景空间结构。
- 物体之间的大致位置。

适用场景：

- 改变场景风格。
- 保留原图空间布局。
- 室内设计。
- 建筑和环境创作。

#### 4. 其他常见控制方式

| 类型         | 主要作用           | 常见用途   |
| ------------ | ------------------ | ---------- |
| Lineart      | 提取线稿           | 插画、漫画 |
| SoftEdge     | 提取柔和轮廓       | 风格转换   |
| Scribble     | 手绘草图控制       | 草图生成   |
| Normal Map   | 控制表面法线方向   | 立体结构   |
| Tile         | 分块控制与细节增强 | 高清修复   |
| Segmentation | 根据区域类别控制   | 场景布局   |

不同 ControlNet 模型支持的控制类型不同，下载前需要确认模型对应的架构和用途。

## 三 模型存放及安装

### 3.1、准备 ControlNet 模型

使用 ControlNet，除了基础 Checkpoint，还需要下载与模型架构匹配的 ControlNet 模型。

常见模型资源：

- Hugging Face：https://huggingface.co/
- Civitai：https://civitai.com/

搜索时可以使用：

```
SD 1.5 ControlNet OpenPose
SD 1.5 ControlNet Canny
SD 1.5 ControlNet Depth
```

如果使用 SDXL，则需要选择对应的 SDXL ControlNet 模型。

注意：

**SD 1.5、SDXL 和 FLUX 的 ControlNet 模型通常不能直接混用。**

即使模型名称相似，也需要确认它支持的基础架构和加载方式。

#### 1. 模型存放位置

传统 ControlNet 模型通常放在：

```
ComfyUI/
└── models/
    └── controlnet/
        ├── openpose.safetensors
        ├── canny.safetensors
        └── depth.safetensors
```

实际文件名以下载的模型为准。

部分新架构或特殊工作流可能使用不同的模型目录和加载节点，应按照模型说明操作。

#### 2. 预处理器与 ControlNet 模型有什么区别？

这是初学者容易混淆的地方。

**预处理器（Preprocessor）** 负责将原始图片转换成控制图。

例如：

```
人物照片
   ↓
OpenPose 预处理器
   ↓
人体骨架图
```

**ControlNet 模型** 则负责利用控制图引导图像生成。

例如：

```
人体骨架图
   ↓
OpenPose ControlNet
   ↓
KSampler
```

两者不是同一个东西。

如果使用已经制作好的骨架图、边缘图或深度图，可以直接加载控制图，不一定需要预处理器。

如果希望从普通照片自动提取控制信息，就需要相应的预处理器。

### 3.2、安装预处理器节点

ComfyUI 原生提供部分 ControlNet 相关节点，但 OpenPose、Canny、Depth 等预处理器通常需要额外安装对应的预处理器节点或扩展。

常见方案是使用 ComfyUI 自定义节点，例如：

- ComfyUI ControlNet Auxiliary Preprocessors。

项目地址：

https://github.com/Fannovel16/comfyui_controlnet_aux

安装方式需要以项目当前 README 为准。

传统手动安装方式示例：

```
cd ComfyUI/custom_nodes

git clone https://github.com/Fannovel16/comfyui_controlnet_aux.git
```

然后使用 ComfyUI 对应的 Python 环境安装依赖。

例如，如果使用 Windows 便携版，应使用该便携版自带的 Python，而不是随意调用系统 Python。

安装完成后重新启动 ComfyUI，在节点搜索框中搜索：

```
OpenPose
Canny
Depth
```

如果没有显示对应节点，检查依赖安装是否成功，以及自定义节点是否加载失败。

## 四 实战


### 4.1、实战一：使用 OpenPose 控制人物姿势

下面使用 SD 1.5 + OpenPose ControlNet，搭建一个基础人物姿势控制工作流。

#### 1. 准备参考图片

选择一张人物照片，最好满足：

- 人物身体姿势清晰。
- 手臂和腿部没有被严重遮挡。
- 人物主体完整。
- 图片背景不要过于复杂。

#### 2. 提取人体骨架

添加以下节点：

| 节点                  | 作用             |
| --------------------- | ---------------- |
| Load Image            | 加载人物参考图   |
| OpenPose Preprocessor | 提取人体骨架     |
| Preview Image         | 查看骨架提取结果 |

连接：

```
Load Image
    ↓ IMAGE
OpenPose Preprocessor
    ↓ IMAGE
Preview Image
```

运行后，可以看到人体骨架图。

如果骨架提取不完整，可以尝试更换参考图，或者调整预处理器参数。

#### 3. 加载 ControlNet 模型

添加：

```
Load ControlNet Model
```

在模型列表中选择对应的 SD 1.5 OpenPose ControlNet。

然后添加：

```
Apply ControlNet
```

将 OpenPose 预处理器输出的骨架图、正向提示词、负向提示词以及 ControlNet 模型连接到 Apply ControlNet。

#### 4. 连接完整工作流

传统 SD 1.5 工作流的关键连接关系：

**模型与提示词：**

- Load Checkpoint 的 MODEL → KSampler 的 model。
- Load Checkpoint 的 CLIP → 正向和负向 CLIP Text Encode。
- 正向、负向 CLIP Text Encode 输出 → Apply ControlNet 对应输入。

**ControlNet：**

- Load ControlNet Model → Apply ControlNet 的 control_net。
- OpenPose Preprocessor 的 IMAGE → Apply ControlNet 的 image。
- Apply ControlNet 的 positive、negative → KSampler 对应输入。

**图片生成：**

- Empty Latent Image → KSampler 的 latent_image。
- KSampler → VAE Decode。
- Load Checkpoint 的 VAE → VAE Decode。
- VAE Decode → Save Image。

不同版本可能显示不同的节点名称或端口布局，连接时以节点实际输入输出类型为准。

#### 5. 设置提示词

正向提示词：

```
1girl, full body, standing pose,
wearing a white dress,
beautiful background,
realistic photography,
detailed clothing, natural lighting
```

负向提示词：

```
blurry, low quality, bad anatomy,
extra limbs, extra fingers,
distorted body, deformed hands
```

#### 6. 设置 ControlNet 参数

Apply ControlNet 常见参数：

| 参数          | 作用               |
| ------------- | ------------------ |
| Strength      | 控制强度           |
| Start Percent | 控制开始生效的位置 |
| End Percent   | 控制结束生效的位置 |

入门可以先参考：

```
Strength = 1.0
Start Percent = 0.0
End Percent = 1.0
```

不同 ControlNet 模型的最佳参数不同，这些值只是测试起点。

点击 Queue Prompt 生成图片，观察人物是否按照参考骨架保持相似姿势。

### 4.2、实战二：使用 Canny 控制图片轮廓

OpenPose 主要控制人物姿势，Canny 则更适合控制物体和场景轮廓。

#### 1. 准备图片

选择一张建筑、家具或产品图片。

#### 2. 提取边缘图

添加：

```
Load Image
Canny Edge Preprocessor
Preview Image
```

连接：

```
Load Image
    ↓
Canny Edge Preprocessor
    ↓
Preview Image
```

可以调整预处理器的低阈值和高阈值，观察边缘提取结果。

阈值设置会影响轮廓的多少：

- 阈值较低：可能提取更多细节和边缘。
- 阈值较高：可能过滤部分较弱的边缘。

具体效果与图片内容和预处理器实现有关。

#### 3. 应用 Canny ControlNet

加载与基础模型兼容的 Canny ControlNet。

将边缘图连接到 Apply ControlNet 的 image 输入，并将控制后的正向、负向条件传给 KSampler。

提示词可以尝试：

```
modern white building,
minimalist architecture,
glass windows,
beautiful natural lighting,
realistic architectural photography
```

生成后观察建筑轮廓是否与参考图接近。

### 4.3、实战三：使用 Depth 控制场景空间

Depth 控制主要用于保留场景空间结构。

例如，准备一张室内照片，希望将原本的普通房间转换成现代简约风格，同时尽量保持家具和空间布局。

基本流程：

```
Load Image
    ↓
Depth Preprocessor
    ↓
Preview Depth Map
    ↓
Apply ControlNet
    ↓
KSampler
    ↓
生成图片
```

提示词示例：

```
modern minimalist living room,
white walls, wooden furniture,
soft natural light,
clean interior design,
realistic photography
```

Depth ControlNet 可以帮助模型参考空间结构，但不保证每件家具的位置、尺寸和细节都完全不变。

## 五、ControlNet 重要参数详解

### 5.1. Strength：控制强度

Strength 用于控制 ControlNet 对生成过程的影响程度。

可以先参考：

| Strength | 大致效果                         |
| -------- | -------------------------------- |
| 0.3      | 控制较弱                         |
| 0.5      | 中等控制                         |
| 0.8      | 较强控制                         |
| 1.0      | 强控制                           |
| 大于 1.0 | 可能进一步增强控制，但不一定更好 |

如果生成结果与参考结构差异较大，可以适当提高 Strength。

如果画面过于僵硬，或者无法自然表现提示词，可以尝试降低 Strength。

### 5.2. Start Percent：开始控制时间

Start Percent 决定 ControlNet 从采样过程的哪个阶段开始生效。

通常可以先设置为：

```
Start Percent = 0.0
```

### 5.3. End Percent：结束控制时间

End Percent 决定 ControlNet 在采样过程的哪个阶段停止生效。

例如：

```
End Percent = 1.0
```

表示在整个采样阶段持续提供控制。

如果希望模型在后期有更多自由发挥空间，可以尝试提前结束控制。

注意：不同 ControlNet 实现对这些参数的具体解释和表现可能存在差异。

## 六、ControlNet 与 LoRA 有什么区别？

两者都可以影响生成结果，但控制目标不同。

| 对比     | LoRA                     | ControlNet               |
| -------- | ------------------------ | ------------------------ |
| 主要作用 | 增加风格、人物或元素特征 | 控制图片结构             |
| 输入     | LoRA 模型文件            | 控制图及 ControlNet 模型 |
| 常见用途 | 人物、服装、画风         | 姿势、边缘、深度         |
| 控制方式 | 调整模型参数影响         | 提供额外条件引导生成     |

两者也可以同时使用。

例如：

- LoRA：控制人物画风。
- OpenPose ControlNet：控制人物动作。
- Prompt：描述人物服装和背景。

这样可以同时控制图片风格、人物姿势和生成内容。

## 七、ControlNet 常见问题

### 7.1. 找不到 ControlNet 模型

检查模型是否放在：

```
ComfyUI/models/controlnet/
```

确认模型与当前基础模型架构兼容。

如果仍然找不到，可以刷新模型列表或重启 ComfyUI。

### 7.2. 找不到 OpenPose、Canny 等预处理器

这些预处理器可能来自自定义节点。

检查：

- 是否正确安装自定义节点。
- 是否安装对应 Python 依赖。
- 是否使用 ComfyUI 对应的 Python 环境。
- 启动日志中是否有节点加载错误。

### 7.3. 人物姿势与参考图不一致

可以检查：

- OpenPose 是否正确提取人体关键点。
- Strength 是否过低。
- 参考图是否存在严重遮挡。
- ControlNet 模型是否与基础模型匹配。

### 7.4. 图片结构过于僵硬

可能是控制强度过高，或者控制时间过长。

可以适当降低 Strength，或调整 End Percent。

### 7.5. 显存不足

ControlNet 会增加模型加载和图像处理的资源消耗。

可以尝试：

- 降低生成分辨率。
- 使用较轻量的模型。
- 不同时加载不需要的 ControlNet。
- 减少批量生成数量。
- 关闭其他占用显存的程序。

## 八、本篇总结

本篇学习了 ComfyUI ControlNet 的基本概念、模型准备和使用方法。

需要掌握的知识点：

1. ControlNet 用于控制生成图片的结构和布局。
2. OpenPose 主要控制人物姿势。
3. Canny 主要控制物体和场景轮廓。
4. Depth 主要控制场景空间和远近关系。
5. 预处理器负责提取控制信息，ControlNet 模型负责利用控制信息引导生成。
6. Strength、Start Percent 和 End Percent 会影响控制效果。
7. LoRA 和 ControlNet 可以组合使用。

建议分别使用 OpenPose、Canny 和 Depth 做一次简单测试，理解不同控制方式的区别。

