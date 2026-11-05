---
title: ComfyUI开发之——ComfyUI工作流与图片保存复用(2.6)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: '555e3539'
date: 2026-11-04 19:31:48
---
## 一、概述

```
前面我们已经学习了 ComfyUI 的基础界面、模型、节点、提示词和采样参数，也完成了第一个文生图工作流。

随着使用时间增加，你可能会遇到这些问题：

- 上次搭建的工作流在哪里？
- 如何保存已经调好的节点和参数？
- 别人分享的工作流怎么导入？
- 生成的图片能不能还原当时的工作流？
- 下载的工作流提示缺少节点，应该怎么办？

这些都属于 ComfyUI 的工作流管理。

这篇文章就从保存、导入、复用、图片管理和 Manager 入门几个方面展开。
```

<!--more-->

## 二、ComfyUI 工作流

### 2.1、ComfyUI 工作流是什么？

工作流（Workflow）可以理解为一套完整的 AI 图片生成流程。

它由多个节点、节点参数以及节点之间的连线组成。

例如，一个经典文生图工作流包含：

```
Load Checkpoint
       |
CLIP Text Encode
       |
Empty Latent Image
       |
    KSampler
       |
VAE Decode
       |
Save Image
```

实际上，一个完整工作流还包含正向提示词、负向提示词、采样参数、图片尺寸以及模型选择等信息。

当你保存工作流时，ComfyUI 会将这些节点及其配置记录下来。

以后再次打开，就可以继续使用之前的生成流程，不需要重新搭建。

### 2.2、如何保存工作流？

ComfyUI 支持将工作流保存为 JSON 文件。

#### 1. 保存工作流

在已经搭建好的文生图画布中，找到顶部菜单中的保存功能。

不同版本的界面可能略有差异，通常可以通过以下方式保存：

- 使用顶部菜单中的 Save。
- 使用快捷键 Ctrl + S。
- 在保存对话框中选择保存位置和文件名。

例如：

```
01-基础文生图-SD15.json
```

建议按照用途给工作流命名，而不是全部使用默认文件名。

#### 2. 工作流文件保存在哪里？

JSON 工作流通常可以保存到电脑任意位置。

建议单独创建一个工作流目录：

```
ComfyUI/
└── workflows/
    ├── 01-基础文生图-SD15.json
    ├── 02-SDXL文生图.json
    ├── 03-FLUX文生图.json
    └── 04-人物图生图.json
```

这里的 `workflows` 是方便管理的示例目录，并不是所有安装方式都默认创建的系统目录。

你也可以将工作流保存在其他位置，例如：

```
D:/AI/ComfyUI_Workflows/
```

这样即使以后更换 ComfyUI 安装目录，也方便迁移和备份。

#### 3. 保存时需要注意什么？

保存工作流时，建议检查：

- 使用的模型名称是否明确。
- 正向和负向提示词是否保留。
- Seed、Steps、CFG 等参数是否正确。
- 图片宽度和高度是否符合预期。
- 是否存在缺失节点。
- 是否依赖额外的模型文件或自定义节点。

需要注意，普通 JSON 工作流通常保存的是节点配置和连接关系，不会自动把所有模型文件打包进去。

别人导入你的工作流后，如果没有对应模型，仍然可能无法正常运行。

### 2.3、如何导入工作流？

如果下载了别人分享的 JSON 工作流，可以通过以下方式导入。

#### 1. 通过 Load 加载

在 ComfyUI 页面中找到 Load 功能，选择本地 JSON 工作流文件。

加载完成后，节点、参数和连线就会显示在画布上。

#### 2. 拖动 JSON 文件

部分版本支持直接将 JSON 工作流文件拖入 ComfyUI 画布。

如果当前版本不支持，可以使用 Load 功能。

#### 3. 从图片恢复工作流

这是 ComfyUI 一个非常实用的功能。

有些 ComfyUI 生成的 PNG 图片会在文件元数据中保存工作流信息。

如果图片包含完整的工作流元数据，就可以将图片直接拖入 ComfyUI 画布，恢复生成时的节点结构和参数。

例如：

```
生成图片.png
       |
       | 拖入 ComfyUI
       ↓
读取图片元数据
       |
       ↓
   恢复工作流
```

不过，需要注意：

- 并不是所有 PNG 图片都包含工作流。
- 图片经过部分平台压缩、转码或重新保存后，元数据可能丢失。
- JPG 等格式通常不能依靠 ComfyUI 默认方式保存完整工作流信息。
- 即使恢复了工作流，也不代表模型文件和自定义节点已经安装。

官方示例页面也提供了带有工作流元数据的图片，可以下载后拖入 ComfyUI 体验。

[ComfyUI 官方示例工作流](https://comfyanonymous.github.io/ComfyUI_examples/)

## 三、如何保存和管理生成图片？

ComfyUI 生成的图片通常保存在：

```
ComfyUI/output/
```

如果没有修改输出配置，Save Image 节点会将图片写入默认输出目录。

例如：

```
ComfyUI/
└── output/
    ├── ComfyUI_00001_.png
    ├── ComfyUI_00002_.png
    └── ComfyUI_00003_.png
```

### 3.1. 修改保存文件名前缀

在 Save Image 节点中，通常可以看到 filename_prefix 参数。

例如：

```
filename_prefix: ComfyUI
```

可以改为：

```
filename_prefix: SD15/portrait
```

生成结果可能会按照对应前缀组织到输出目录下的子目录中。

例如：

```
ComfyUI/output/
└── SD15/
    ├── portrait_00001_.png
    └── portrait_00002_.png
```

具体文件命名规则以当前版本的 Save Image 节点实现为准。

### 3.2. 按用途整理图片

建议按照模型和用途建立分类：

```
AI_Images/
├── SD15/
│   ├── portrait/
│   ├── landscape/
│   └── anime/
├── SDXL/
│   ├── portrait/
│   └── product/
└── FLUX/
    ├── portrait/
    └── design/
```

这样后续查找图片、比较模型效果和制作案例会更加方便。

### 3.3 保留重要图片的生成信息

如果某张图片生成效果不错，建议同时保留：

- 原始 PNG 图片。
- 对应 JSON 工作流。
- 使用的模型名称和版本。
- 提示词。
- Seed 和采样参数。

这样以后想复现图片或调整效果，就不必重新摸索。

## 四、ComfyUI Manager

### 4.1、什么是 ComfyUI Manager？

是 ComfyUI 生态中常用的管理工具，主要用于管理自定义节点及相关依赖。

ComfyUI 本身提供了大量基础节点，但很多复杂工作流还需要额外安装第三方自定义节点。

例如：

- 图片抠图节点。
- 人物姿势识别节点。
- ControlNet 相关节点。
- IP-Adapter 相关节点。
- 图片处理和增强节点。

如果完全手动安装，需要自己查找项目、下载代码、安装依赖，操作起来比较麻烦。

Manager 可以帮助我们更方便地管理这些扩展。

#### 1. Manager 能做什么？

常见功能包括：

| 功能                   | 作用                           |
| ---------------------- | ------------------------------ |
| Custom Nodes Manager   | 查找和安装自定义节点           |
| Installed Custom Nodes | 查看已经安装的节点             |
| Update                 | 更新节点或管理组件             |
| Model 管理             | 部分版本提供模型下载或管理入口 |
| Missing Nodes 检查     | 协助识别工作流缺少的节点       |

不同版本的 Manager 功能和菜单可能有所不同，具体以当前安装版本为准。

#### 2. 如何安装 ComfyUI Manager？

目前常见的安装方式取决于 ComfyUI 的部署类型和 Manager 版本。

对于支持通过自定义节点安装的版本，可以按照以下方式操作：

**第一步：进入自定义节点目录**

```
ComfyUI/custom_nodes/
```

**第二步：获取 Manager 项目**

官方项目地址：

[ComfyUI-Manager GitHub](https://github.com/Comfy-Org/ComfyUI-Manager)

根据项目当前安装说明获取代码。

如果使用 Git，可以在终端执行：

```
cd ComfyUI/custom_nodes
git clone https://github.com/Comfy-Org/ComfyUI-Manager.git
```

**第三步：安装依赖**

进入 Manager 项目目录，按照当前版本 README 的要求安装依赖。

传统 Python 环境可能使用：

```
pip install -r requirements.txt
```

如果使用虚拟环境，需要确保使用的是 ComfyUI 对应的 Python 环境，而不是系统中其他 Python。

**第四步：重启 ComfyUI**

安装完成后，重启 ComfyUI。

如果安装成功，界面中通常会出现 Manager 入口。

注意：ComfyUI Desktop、便携版和手动安装版的安装方式可能不同。部分新版本还提供了内置管理入口或不同的安装方式，应优先遵循官方仓库当前的安装说明，不要机械照搬旧教程。

### 4.2、如何使用 Manager 安装自定义节点？

安装 Manager 后，可以通过它查找需要的自定义节点。

以安装一个图片处理节点为例：

1. 打开 ComfyUI。
2. 进入 Manager。
3. 打开 Custom Nodes Manager。
4. 搜索需要的节点名称。
5. 查看项目说明和兼容要求。
6. 点击安装。
7. 按提示安装 Python 依赖。
8. 重启 ComfyUI。

安装后，可以在画布中搜索对应节点。

#### 安装自定义节点时要注意什么？

第三方节点并不是越多越好。

部分节点可能存在：

- Python 依赖冲突。
- PyTorch 或 CUDA 版本要求。
- 不兼容当前 ComfyUI 版本。
- 项目长期未维护。
- 安装后启动失败。

建议只安装实际需要的节点，并优先选择维护活跃、来源可靠的项目。

尤其是来源不明的第三方代码，不要直接在自己的电脑上执行。

### 4.3、导入工作流时提示缺少节点怎么办？

这是 ComfyUI 初学者经常遇到的问题。

例如，导入别人分享的工作流后，发现某些节点显示异常，或者提示 Missing Nodes。

这通常意味着：

**当前 ComfyUI 环境没有安装该工作流依赖的自定义节点。**

可以按照以下步骤处理：

#### 1. 查看缺失节点名称

先记录缺失节点的名称。

例如：

```
SomeCustomNode
AnotherCustomNode
```

#### 2. 使用 Manager 搜索

打开 Custom Nodes Manager，搜索缺失节点名称。

找到对应项目后，查看项目说明和兼容要求，再决定是否安装。

#### 3. 安装依赖并重启

安装完成后，重启 ComfyUI，再次导入工作流。

#### 4. 检查模型是否完整

如果节点已经安装，但仍然无法执行，还需要检查：

- Checkpoint 是否存在。
- LoRA 是否存在。
- ControlNet 模型是否存在。
- VAE 是否存在。
- 文本编码器是否完整。
- 模型是否与当前工作流兼容。

缺少节点和缺少模型是两种不同的问题，需要分别处理。

## 五、实战：建立自己的工作流库

学习到这里，建议开始整理自己的工作流。

可以创建如下目录：

```
AI_Workflows/
├── 01_Basic/
│   └── SD15_Text2Image.json
├── 02_SDXL/
│   └── SDXL_Text2Image.json
├── 03_FLUX/
│   └── FLUX_Text2Image.json
├── 04_Image/
│   ├── Image2Image.json
│   └── Inpainting.json
└── 05_Advanced/
    ├── ControlNet.json
    └── IPAdapter.json
```

每个工作流最好配一份简单说明：

```
工作流名称：SD15 基础文生图

模型：SD 1.5
图片尺寸：512 × 512
Steps：20
CFG：7
Sampler：Euler
Scheduler：normal

用途：基础人物文生图
依赖：SD 1.5 Checkpoint
```

还可以将效果较好的生成图片和对应工作流放在一起，形成自己的案例库。

### 备份建议

ComfyUI 使用一段时间后，建议重点备份：

- workflows：工作流文件。
- output：重要生成图片。
- models：自己下载的模型。
- custom_nodes：自定义节点及相关配置。
- extra_model_paths.yaml：外部模型路径配置（如果使用）。

其中，模型文件通常体积较大，可以根据硬盘空间决定是否备份到外置硬盘或 NAS。

如果使用 Git 管理工作流，建议只管理 JSON、说明文档等小文件，不要直接将大量模型权重提交到普通 Git 仓库。

## 六、总结

这一篇，我们学习了 ComfyUI 的基础管理方法：

- JSON 文件：保存和分享工作流。
- PNG 元数据：部分生成图片可以恢复原始工作流。
- Load：导入已有工作流。
- Save Image：保存生成结果。
- filename_prefix：帮助整理输出图片。
- ComfyUI Manager：管理自定义节点及相关依赖。
- Missing Nodes：检查并补齐工作流依赖。

从现在开始，建议不要只保存生成图片，还要保存对应的工作流和模型信息。

这样，ComfyUI 就不再只是一个临时生成图片的工具，而是逐渐形成一套可以复用、管理和持续优化的 AI 工作流库。

