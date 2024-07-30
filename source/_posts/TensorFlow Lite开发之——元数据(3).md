---
title: TensorFlow Lite开发之——元数据(3)
categories:
  - 开发
  - Q-AI
  - TensorFlow Lite
tags:
  - TensorFlow Lite
abbrlink: '91231969'
date: 2024-07-27 10:25:18
---
## 一 概述

* 元数据
* 元数据模型
* 添加元数据
* 读取元数据

<!--more-->

## 二  元数据

元数据是与模型功能及其输入/输出信息有关的重要信息来源。元数据包含以下两个部分

* 人员可读部分，用于传达使用模型时的最佳做法
* 机器可读部分，供代码生成器使用

## 三 元数据模型

![][1]

说明：

* 该模型文件为“foo_with_metadata.tflite”
* 模型文件分为两个部分："too.tflite"模型文件和关联ZIP文件

## 四 添加元数据

### 4.1 使用到的工具

```
pip install tflite-support
```

### 4.2 添加源数据包含

![][2]

三个部分说明：

* **模型信息** - 模型的总体说明以及许可条款等项目信息
* **输入信息** - 输入以及诸如归一化等所需预处理的描述
* **输出信息** - 输出以及诸如标签映射等所需后处理的描述

## 五 读取元数据

### 5.1 概念

* Metadata Extractor 库是从不同平台的模型中读取元数据和关联文件的便捷工具
* 可以使用 FlatBuffers 库以其他语言构建自己的元数据提取工具

### 5.2 示例(Java读取元数据)

1-添加依赖

```
dependencies {
    implementation 'org.tensorflow:tensorflow-lite-metadata:0.1.0'
}
```

2-初始化 `MetadataExtractor` 对象

```
public MetadataExtractor(ByteBuffer buffer);
```

3-判断是否满足解析版本及是否有元数据

```
//1-验证是否满足所需元数据解析器最低版本的条件
public final boolean isMinimumParserVersionSatisfied();
2-检查模型是否有元数据
public boolean hasMetadata();
```

4-获取元数据

```
public int getInputTensorCount();
public TensorMetadata getInputTensorMetadata(int inputIndex);
public QuantizationParams getInputTensorQuantizationParams(int inputIndex);
public int[] getInputTensorShape(int inputIndex);
public int getoutputTensorCount();
public TensorMetadata getoutputTensorMetadata(int inputIndex);
public QuantizationParams getoutputTensorQuantizationParams(int inputIndex);
public int[] getoutputTensorShape(int inputIndex);
```

## 六 参考

* [向 TensorFlow Lite 模型添加元数据](https://www.tensorflow.org/lite/guide?hl=zh-cn)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-3-model-with-metadata.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-3-model-meta.png