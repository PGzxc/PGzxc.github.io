---
title: TensorFlow Lite开发之——TensorFlow Lite模型(2)
categories:
  - 开发
  - Q-AI
  - TensorFlow Lite
tags:
  - TensorFlow Lite
abbrlink: 5c785ba9
date: 2024-07-26 08:30:52
---
## 一 概述

TensorFlow Lite 模型文件的扩展名为“.tflite”，开发时放到资源文件夹中供开发者调用。本文主要介绍三种生成TensorFlow Lite 模型的方式

<!--more-->

## 二   TensorFlow Lite 三种模型

### 2.1 现有TensorFlow Lite模型

![][1]

官方已经训练过的模型，列表如下(19种)

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

### 2.2 创建TensorFlow Lite模型

1-可供训练类型

|  No  |   任务    |                    功效                    |
| :--: | :-------: | :----------------------------------------: |
|  1   | 图像分类  |            将图像分成预定义类别            |
|  2   | 文字分类  |            将文字分成预定义类别            |
|  3   | BERT 问答 | 使用 BERT 在特定上下文中查找给定问题的答案 |

2-图像分类训练示例(Python)

```
# 1-加载输入数据
data = ImageClassifierDataLoader.from_folder('flower_photos/')
train_data, test_data = data.split(0.9)

# 2-自定义TensorFlow模型
model = image_classifier.create(train_data)

# 3-评估模型
loss, accuracy = model.evaluate(test_data)

# 4-导出到Tensorflow Lite模型，并在`Export_dir`中标记文件
model.export(export_dir='/tmp/')
```

### 2.3 将 TensorFlow 模型转换为 TensorFlow Lite 模型

1- TensorFlow Lite 转换器

将 TensorFlow 模型转换为 TensorFlow Lite 模型工具： TensorFlow Lite 转换器

有两种方式：

* Python API：它让您可以更轻松地在模型开发流水线中转换模型、应用优化、添加元数据，并且拥有更多功能。
* 命令行：它仅支持基本模型转换

2- Python API转换方式

2-1 使用 [`tf.lite.TFLiteConverter`](https://www.tensorflow.org/api_docs/python/tf/lite/TFLiteConverter?hl=zh-cn) 转换 TensorFlow 2.x 模型

- [`tf.lite.TFLiteConverter.from_saved_model()`](https://www.tensorflow.org/lite/api_docs/python/tf/lite/TFLiteConverter?hl=zh-cn#from_saved_model)（**推荐**）：转换 [SavedModel](https://www.tensorflow.org/guide/saved_model?hl=zh-cn)。
- [`tf.lite.TFLiteConverter.from_keras_model()`](https://www.tensorflow.org/lite/api_docs/python/tf/lite/TFLiteConverter?hl=zh-cn#from_keras_model)：转换 [Keras](https://www.tensorflow.org/guide/keras/overview?hl=zh-cn) 模型。
- [`tf.lite.TFLiteConverter.from_concrete_functions()`](https://www.tensorflow.org/lite/api_docs/python/tf/lite/TFLiteConverter?hl=zh-cn#from_concrete_functions)：转换[具体函数](https://www.tensorflow.org/guide/intro_to_graphs?hl=zh-cn)。

2-2 使用 [`tf.compat.v1.lite.TFLiteConverter`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/lite/TFLiteConverter?hl=zh-cn) 转换 TensorFlow 1.x 模型

- [`tf.compat.v1.lite.TFLiteConverter.from_saved_model()`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/lite/TFLiteConverter?hl=zh-cn#from_saved_model)：转换 [SavedModel](https://www.tensorflow.org/guide/saved_model?hl=zh-cn)。
- [`tf.compat.v1.lite.TFLiteConverter.from_keras_model_file()`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/lite/TFLiteConverter?hl=zh-cn#from_keras_model_file)：转换 [Keras](https://www.tensorflow.org/guide/keras/overview?hl=zh-cn) 模型。
- [`tf.compat.v1.lite.TFLiteConverter.from_session()`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/lite/TFLiteConverter?hl=zh-cn#from_session)：从会话转换 GraphDef。
- [`tf.compat.v1.lite.TFLiteConverter.from_frozen_graph()`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/lite/TFLiteConverter?hl=zh-cn#from_frozen_graph)：从文件转换 Frozen GraphDef。如果您有检查点，请先将其转换为 Frozen GraphDef 文件，然后使用此 API（如[此处](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/lite/g3doc/r1/convert/python_api.md#checkpoints)所示）

## 三 参考

* [创建 TensorFlow Lite 模型](https://www.tensorflow.org/lite/guide?hl=zh-cn)
* [TensorFlow Lite 示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cn)
* [创建 TensorFlow Lite 模型](https://www.tensorflow.org/lite/guide/model_maker?hl=zh-cn)
* [将 TensorFlow 模型转换为 TensorFlow Lite 模型](https://www.tensorflow.org/lite/convert/index?hl=zh-cn)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensorflow-lite-2-mode-exist.png