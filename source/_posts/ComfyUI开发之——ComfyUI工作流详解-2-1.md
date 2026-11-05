---
title: ComfyUI开发之——ComfyUI工作流详解(2.1)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 9075b64d
date: 2026-11-04 19:28:57
---
## 一 概述

```
本文介绍：拆解默认文生图节点与数据流向

上一篇，我们已经从空白画布搭建了第一个 ComfyUI 文生图工作流，
了解了 Checkpoint、CLIP Text Encode、KSampler、VAE Decode 等节点的连接方式。

但工作流能运行，并不代表我们真正理解了它。

ComfyUI 与普通图形界面工具最大的区别，就是它通过节点和连线传递数据。
每个节点负责一项任务，前一个节点的输出会成为后一个节点的输入。

这篇文章就以经典SD 1.5文生图工作流为例，拆解节点之间的数据传递关系，理解一张图片究竟是如何生成的。

注意：本文讲解的是 SD 1.5 经典文生图工作流。SDXL、FLUX、Qwen Image 等模型的节点结构和数据流可能不同，不能直接照搬。
```

<!--more-->

## 二、先看懂整个工作流

### 2.1 文生图工作流组成

```
经典文生图工作流主要由以下几个部分组成：

1. 加载模型：提供模型、文本编码器和 VAE。
2. 编码提示词：将正向和负向提示词转换为条件数据。
3. 准备画布：创建指定尺寸的潜空间数据。
4. 采样生成：根据模型、提示词和初始潜空间进行去噪计算。
5. 解码图片：将潜空间数据转换为普通图片。
6. 保存图片：将生成结果保存到本地。
```

### 2.2 整体流程理解

整体流程可以简单理解为：

```
                   Load Checkpoint
                  /       |        \
              MODEL     CLIP       VAE
                |       /   \        |
                |      /     \       |
                |  正向提示词 负向提示词 |
                |      |       |     |
                |  CONDITIONING  CONDITIONING
                |      |       |
                |      +---+---+
                |          |
Empty Latent Image         |
        |                  |
        +-------> KSampler <+
                     |
                  LATENT
                     |
                 VAE Decode <--- VAE
                     |
                   IMAGE
                     |
                 Save Image
```

这张图展示了数据的主要流向。接下来，我们从节点输出的数据类型开始理解。

## 三、认识工作流中的六种核心数据

### 3.1 6中核心数据

在 ComfyUI 中，节点之间传递的不只是普通文本和图片，还包括模型对象、条件数据以及潜空间数据。

|   数据类型   |      作用      |          通俗理解          |
| :----------: | :------------: | :------------------------: |
|    MODEL     |    扩散模型    |   负责生成图片的核心模型   |
|     CLIP     |   文本编码器   |       负责理解提示词       |
| CONDITIONING |    条件数据    |   提示词经过编码后的结果   |
|    LATENT    |   潜空间数据   |  尚未解码成普通图片的数据  |
|     VAE      | 编码与解码模型 | 负责潜空间与图片之间的转换 |
|    IMAGE     |    图片数据    |  可以预览和保存的普通图片  |

其中，最容易混淆的是 CONDITIONING、LATENT 和 IMAGE。

### 3.2 六种核心数据详解

```
1. MODEL：模型数据：
由 Load Checkpoint 节点输出，提供图像生成所需的模型计算能力。
它不是生成好的图片，也不是模型文件的简单路径，而是 ComfyUI 加载后的模型对象。

2. CLIP：文本编码器：
CLIP 负责将文本提示词转换为模型能够使用的条件信息。
在经典 SD 1.5 工作流中，Load Checkpoint 会输出 CLIP，
随后连接到两个 CLIP Text Encode 节点，分别处理正向和负向提示词。

3. CONDITIONING：条件数据

CLIP Text Encode 节点输出的就是 CONDITIONING。

例如输入：
a beautiful girl, long hair, blue dress, realistic photography

节点会将这些文字编码成模型可以使用的条件数据。

正向提示词用于告诉模型希望生成什么；负向提示词用于表达希望避免的内容。
它们最终分别连接到 KSampler 的 positive 和 negative 输入端口。

4. LATENT：潜空间数据

LATENT 不是普通图片，而是模型在潜空间中处理的数据。
Empty Latent Image 节点会根据设置的宽度、高度和批量数量，创建初始潜空间数据。
KSampler 在此基础上进行采样和去噪，输出处理后的 LATENT。

5. VAE：图片编码与解码模型

VAE 的主要作用是完成潜空间数据与普通图片数据之间的转换。
在文生图工作流中，最常见的是使用 VAE Decode，将 KSampler 输出的 LATENT 解码为 IMAGE。

6. IMAGE：普通图片数据

IMAGE 是可以直接预览、保存或继续进行图片处理的数据。
VAE Decode 输出 IMAGE 后，就可以连接 Save Image 节点保存到本地。
```

## 四、逐个节点追踪数据流向

理解了数据类型，再回到工作流中，看看每个节点具体做了什么。

### 4.1 Load Checkpoint：加载模型

这个节点通常有三个主要输出：

- MODEL：扩散模型。
- CLIP：文本编码器。
- VAE：图片编码与解码模型。

它相当于整个工作流的数据来源。

一个 Checkpoint 加载后，其他节点就可以使用它提供的模型资源。

### 4.2 CLIP Text Encode：编码提示词

正向和负向提示词分别使用一个 CLIP Text Encode 节点。

两个节点都需要连接 Load Checkpoint 输出的 CLIP。

```
Load Checkpoint
       |
      CLIP
       |
   +---+---+
   |       |
正向编码  负向编码
   |       |
   |       |
positive negative
    \     /
     KSampler
```

这里要注意：

- 输入的是普通文本。
- 输出的是 CONDITIONING。
- 正向和负向编码结果不能直接当作图片使用。

修改提示词后，节点会重新生成对应的条件数据，影响后续采样结果。

### 4.3 Empty Latent Image：创建初始画布

这个节点主要负责设置生成图片的尺寸和批量数量。

例如：

```
width: 512
height: 512
batch_size: 1
```

它输出的是 LATENT 数据，而不是一张已经生成好的 512×512 图片。

可以把它理解为：先确定生成任务使用多大的潜空间画布，再交给 KSampler 进行后续计算。

### 4.4 KSampler：核心采样节点

KSampler 是经典文生图工作流中最重要的节点之一。

它接收四类主要输入：

| 输入         | 来源                  | 作用               |
| ------------ | --------------------- | ------------------ |
| model        | Load Checkpoint       | 提供生成模型       |
| positive     | 正向 CLIP Text Encode | 提供正向条件       |
| negative     | 负向 CLIP Text Encode | 提供负向条件       |
| latent_image | Empty Latent Image    | 提供初始潜空间数据 |

KSampler 根据模型、正负条件和采样参数，对潜空间数据进行多步采样与去噪，最终输出新的 LATENT 数据。

可以简单理解为：

**模型负责生成，提示词负责引导，采样参数负责控制生成过程。**

注意，Empty Latent Image 创建的是初始潜空间数据，KSampler 才是执行实际采样和去噪计算的核心环节。

### 4.5 VAE Decode：将潜空间转换为图片

KSampler 输出 LATENT 后，还不能直接作为普通图片保存。

这时需要使用 VAE Decode。

它接收两个输入：

- samples：KSampler 输出的 LATENT。
- vae：Load Checkpoint 输出的 VAE。

经过解码后，输出 IMAGE 数据。

```
KSampler
   |
 LATENT
   |
VAE Decode <--- VAE
   |
 IMAGE
```

如果没有正确连接 VAE，或者使用了不匹配的 VAE，就可能出现解码异常或图片效果不理想等问题。

### 4.6. Save Image：保存生成结果

最后，将 VAE Decode 输出的 IMAGE 连接到 Save Image。

执行工作流后，ComfyUI 会将生成的图片保存到输出目录，默认通常是：

```
ComfyUI/output/
```

这样，一次完整的文生图任务就结束了。

## 五、ComfyUI 是按照从左到右的顺序执行吗？

### 5.1 执行顺序

```
不完全是。

这是初学者容易产生的一个误解。

ComfyUI 并不是简单地按照节点在画布上的位置，
从左到右依次执行，而是根据节点之间的依赖关系组织执行流程。
```

### 5.2 示例

例如：

```
Load Checkpoint
       |
       +----> CLIP Text Encode
       |               |
       |               |
       |             KSampler
       |               |
       +------------> VAE Decode
                       |
                    Save Image
```

如果某个节点需要使用另一个节点的输出，ComfyUI 就需要先完成对应的上游计算。

因此：

- 节点放在画布左边，不代表一定先执行。
- 节点放在画布右边，也不代表一定后执行。
- 真正决定数据依赖关系的是连线。

画布上的位置主要是为了方便我们阅读和管理工作流。

## 六、如何判断连线和数据类型是否正确？

### 6.1 连线区分

```
ComfyUI 的节点端口和连线通常会通过颜色辅助区分数据类型。

不同版本、主题和节点可能存在视觉差异，因此不要只依赖颜色判断，优先查看端口名称和节点类型。
```

### 6.2 检查情况

排查工作流时，可以重点检查以下几种情况：

|       问题        |            可能原因             |      检查方法      |
| :---------------: | :-----------------------------: | :----------------: |
| KSampler 没有模型 |          MODEL 未连接           |  检查 model 输入   |
|  提示词不起作用   | CLIP 或 CONDITIONING 未正确连接 |  检查两个编码节点  |
|   无法生成图片    |   LATENT 未连接或尺寸设置异常   | 检查 latent_image  |
|   图片无法解码    |    VAE 或 LATENT 未正确连接     |  检查 VAE Decode   |
|   模型加载失败    |    模型文件缺失或架构不匹配     | 检查模型路径和类型 |
|   节点无法连接    |     输入输出数据类型不兼容      |    检查端口类型    |

特别注意：LATENT 和 IMAGE 是两种不同的数据类型。

KSampler 输出的是 LATENT，Save Image 需要的是 IMAGE，中间必须经过 VAE Decode 转换。

## 七、动手练习：观察数据流变化

理解节点关系后，可以做几个简单实验，加深印象。

### 7.1 练习一：修改提示词

修改正向提示词，观察生成结果的变化。

例如：

```
a beautiful girl, long hair, blue dress
```

改成：

```
a beautiful girl, short hair, red dress
```

观察 CLIP Text Encode 输出的条件数据发生变化后，最终图片有什么不同。

### 7.2 练习二：修改图片尺寸

在 Empty Latent Image 中修改：

```
512 × 512
```

改成：

```
768 × 512
```

观察生成图片的尺寸和构图变化。

### 7.3 练习三：固定 Seed

```
在 KSampler 中设置固定 Seed，其他参数保持不变，再修改提示词或采样参数。

这样可以更直观地观察不同条件对生成结果的影响。
```

### 7.4 练习四：观察 VAE 的作用

```
在兼容的前提下，尝试更换 VAE，比较解码后的图片效果。

不要随意混用不同模型架构的 VAE，否则可能出现不兼容问题。
```

## 八、总结

这一篇，我们从数据流向的角度重新认识了 ComfyUI 的经典文生图工作流。

### 8.1 主线

最重要的是记住这条主线：

```
加载模型
   ↓
编码提示词
   ↓
准备初始潜空间
   ↓
KSampler 采样与去噪
   ↓
VAE Decode 解码
   ↓
Save Image 保存
```

### 8.2 核心数据

同时要理解六种核心数据：

- MODEL：生成模型。
- CLIP：文本编码器。
- CONDITIONING：提示词编码后的条件数据。
- LATENT：潜空间数据。
- VAE：潜空间与图片之间的转换模型。
- IMAGE：普通图片数据。

当你能够看懂节点的输入、输出和数据依赖关系，

就不再只是照着教程连接节点，而是开始真正理解 ComfyUI 的工作方式。

