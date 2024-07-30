---
title: TensorFlow Lite开发之——Android图像分类识别(4)
categories:
  - 开发
  - Q-AI
  - TensorFlow Lite
tags:
  - TensorFlow Lite
abbrlink: 9115dbf4
date: 2024-07-30 09:12:05
---
## 一 概述

* 图像模型介绍
* Android开发流程
* 数据识别结果

<!--more-->

## 二  图像模型介绍

### 2.1 模型位置

![][1]

### 2.2 模型描述

* 本示例使用了4个tensor-flow模型
* Model：介绍了模型相关信息，及该模型可以识别多少分类+识别物种
* Tensors：Inputs(识别图像)和Outputs(图像描述)

## 三 Android开发流程

### 3.1 将模型放到assets目录下

![][1]

### 3.2 添加TensorFlow Lite 依赖

```
implementation 'org.tensorflow:tensorflow-lite-task-vision:0.4.0'
// Import the GPU delegate plugin Library for GPU inference
 implementation 'org.tensorflow:tensorflow-lite-gpu-delegate-plugin:0.4.0'
 implementation 'org.tensorflow:tensorflow-lite-gpu:2.9.0'
```

### 3.3 定义ImageClassfierHelper识别帮助类

1- 根据模型返回对应名称

```
val modelName =
            when (currentModel) {
                MODEL_MOBILENETV1 -> "mobilenetv1.tflite"
                MODEL_EFFICIENTNETV0 -> "efficientnet-lite0.tflite"
                MODEL_EFFICIENTNETV1 -> "efficientnet-lite1.tflite"
                MODEL_EFFICIENTNETV2 -> "efficientnet-lite2.tflite"
                else -> "mobilenetv1.tflite"
            }    
```

2-根据modelName创建imageClassifier 

```
imageClassifier =ImageClassifier.createFromFileAndOptions(context, modelName, optionsBuilder.build())     
```

3-解析图像

```
val tensorImage = imageProcessor.process(TensorImage.fromBitmap(image))
```

4-调用ImageClassifier的classify方法

```
val results = imageClassifier?.classify(tensorImage, imageProcessingOptions)
```

5-ImageClassfierHelper结果回调

```
inferenceTime = SystemClock.uptimeMillis() - inferenceTime
imageClassifierListener?.onResults(
                              results,
                              inferenceTime
)
```

### 3.4 CameraFragment识别界面

1-实现ImageClassfierHelper类(实现类中方法)

```
class CameraFragment : Fragment(), ImageClassifierHelper.ClassifierListener {}
```

2-识别结果并显示

```
   @SuppressLint("NotifyDataSetChanged")
    override fun onResults(
        results: List<Classifications>?,
        inferenceTime: Long
    ) {
        activity?.runOnUiThread {
            // Show result on bottom sheet
            classificationResultsAdapter.updateResults(results)
            classificationResultsAdapter.notifyDataSetChanged()
            fragmentCameraBinding.bottomSheetLayout.inferenceTimeVal.text =
                String.format("%d ms", inferenceTime)
        }
    }
```

## 四 数据识别结果

| 识别结果-开关 | 识别结果-键盘 | 识别结果-鼠标 |
| :-----------: | :-----------: | :-----------: |
|    ![][2]     |    ![][3]     |    ![][4]     |


## 五 参考

* [TensorFlow-Android 快速上手](https://www.tensorflow.org/lite/guide/android?hl=zh-cn)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-4-android-mode.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-4-android-result1.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-4-android-result2.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-4-android-result3.png