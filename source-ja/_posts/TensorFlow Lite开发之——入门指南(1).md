---
title: TensorFlow Lite开发之——入门指南(1)
categories:
  - 开发
  - Q-AI
  - TensorFlow Lite
tags:
  - TensorFlow Lite
abbrlink: 5728f423
date: 2024-07-25 09:38:33
---
## 一 概述

* TensorFlow Lite介绍
* TensorFlow Lite特性
* 开发流程

<!--more-->

## 二 TensorFlow Lite介绍

### 2.1 TensorFlow与TensorFlow Lite

1-TensorFlow

* 端到端机器学习平台
* 主要编程语言：Python
* 借助 TensorFlow，轻松创建可在任何环境中运行的机器学习模型
* TensorFlow用于推进研究并构建 AI 赋能的应用

2-TensorFlow Lite

* TensorFlow Lite 是一个移动端库
* 可用于在移动设备、微控制器和其他边缘设备上部署模型
* 适用于移动设备和边缘用例的 TF Lite 优化模型和设备端机器学习解决方案

### 2.2 TensorFlow Lite介绍

* TensorFlow Lite 是一组工具
* 可帮助开发者在移动设备、嵌入式设备和 loT 设备上运行模型，以便实现设备端机器学习

## 三 TensorFlow Lite特性

### 3.1 优势

1. 延时（数据无需往返服务器）
2. 隐私（没有任何个人数据离开设备）
3. 连接性（无需连接互联网）
4. 大小（缩减了模型和二进制文件的大小）
5. 功耗（高效推断，且无需网络连接）

### 3.2 支持平台

*  [Android](https://www.tensorflow.org/lite/guide/android?hl=zh-cn)设备
*  [iOS](https://www.tensorflow.org/lite/guide/ios?hl=zh-cn) 设备
* [嵌入式 Linux](https://www.tensorflow.org/lite/guide/python?hl=zh-cn)
* [微控制器](https://www.tensorflow.org/lite/microcontrollers?hl=zh-cn)

## 四 开发流程

### 4.1 添加依赖

1-android端 

```
dependencies {
    implementation 'org.tensorflow:tensorflow-lite:0.0.0-nightly'
}
```

2-ios端

```
use_frameworks!
pod 'TensorFlowLiteSwift'
```

### 4.2 创建 TensorFlow Lite 模型

TensorFlow Lite 模型由“.tflite”文件扩展名标识，通过以下方式生成TensorFlow Lite 模型

* 使用现有的 TensorFlow Lite 模型
* 创建 TensorFlow Lite 模型
* 将 TensorFlow 模型转换为 TensorFlow Lite 模型

### 4.3 运行推断

执行 TensorFlow Lite 模型，根据输入数据进行预测

## 五  TensorFlow Lite示例项目

|  No  |         模型         |                         描述                         |                             示例                             |
| :--: | :------------------: | :--------------------------------------------------: | :----------------------------------------------------------: |
|  1   |       自动补全       |         使用Keras语言模型为文本输入生成建议          | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  2   |       图像分类       |    识别数百个对象，包括人、活动、动物、植物和地点    | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  3   |       对象检测       |        使用边界框检测多个对象。比如侦测狗和猫        | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  4   |       姿势估计       |                 比如单人或多人的姿势                 | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  5   |       语言识别       |             通过识别关键字来识别语音指令             | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  6   |       手势识别       |                使用网络摄像头识别手势                | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  7   |         分割         | 通过极为准确的定位功能和语义标签，精确确定对象的形状 | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  8   |       文本分类       |      将自由文本归类到预定义组中。包括污辱性内容      | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  9   |      设备端建议      |       根据用户选择的事件提供个性化的设备端建议       | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  10  | 自然语言处理回答问题 |        通过BERT根据给定文本段落的内容回答问题        | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  11  |      数字分类器      |                  对手写数字进行分类                  | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  12  |       风格迁移       |      在输入图像上应用任意样式，创建新的艺术图像      | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  13  |       智能回复       |            生成回复建议以输入对话聊天消息            | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  14  |       超分辨率       |           根据低分辨率图像生成超分辨率图像           | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  15  |       音频分类       |               使用麦克风对音频进行分类               | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  16  |       视频分类       |               识别视频片段中的人体动作               | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  17  |       强化学习       |               使用强化学习训练游戏代理               | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  18  |     光学字符识别     |        借助TensorFlow Lite，从图像中提取文字         | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |
|  19  |      设备端训练      |            在设备上训练TensorFlow Lite模             | [示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn) |

## 六 参考

* [TensorFlow官网](https://www.tensorflow.org/?hl=zh-cn)
* [TensorFlow Lite官网](https://www.tensorflow.org/lite?hl=zh-cn)
* [TensorFlow Lite指南](https://www.tensorflow.org/lite/guide?hl=zh-cn)
* [TensorrFlow Lite示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn)

