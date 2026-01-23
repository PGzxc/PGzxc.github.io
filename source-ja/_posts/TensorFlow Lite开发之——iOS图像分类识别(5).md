---
title: TensorFlow Lite开发之——iOS图像分类识别(5)
categories:
  - 开发
  - Q-AI
  - TensorFlow Lite
tags:
  - TensorFlow Lite
abbrlink: d29012f2
date: 2024-07-31 10:12:39
---
## 一 概述

* 图像模型介绍
* iOS开发流程
* 运行数据识别结果

<!--more-->

## 二 图像模型介绍

### 2.1 模型位置

![][1]

### 2.2 模型说明

* 每个模型可以识别1000多种物体特征
* 应用启动后，通过Model选项可以选择Model

## 三 iOS开发流程

### 3.1 将模型放到TFLite文件夹下

![][1]

### 3.2 添加到Bundle Resources

![][2]

### 3.3 在Podfile中添加TensorFlow Lite依赖

```
target 'ImageClassification' do
  # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!
   pod 'TensorFlowLiteTaskVision'
end
```

### 3.4 界面布局

![][3]

### 3.5 定义ImageClassificationHelper用于对图形解析

```
let options = ImageClassifierOptions(modelPath: modelPath)
options.baseOptions.computeSettings.cpuSettings.numThreads = Int(Int32(threadCount))
options.classificationOptions.maxResults = resultCount
options.classificationOptions.scoreThreshold = scoreThreshold

classifier = try ImageClassifier.classifier(options: options)
```

### 3.6 ViewController定义模型

```
enum ModelType: CaseIterable {
  case efficientnetLite0
  case efficientnetLite1
  case efficientnetLite2
  case efficientnetLite3
  case efficientnetLite4

  var modelFileInfo: FileInfo {
    switch self {
    case .efficientnetLite0:
      return FileInfo("efficientnet_lite0", "tflite")
    case .efficientnetLite1:
      return FileInfo("efficientnet_lite1", "tflite")
    case .efficientnetLite2:
      return FileInfo("efficientnet_lite2", "tflite")
    case .efficientnetLite3:
      return FileInfo("efficientnet_lite3", "tflite")
    case .efficientnetLite4:
      return FileInfo("efficientnet_lite4", "tflite")
    }
  }

  var title: String {
    switch self {
    case .efficientnetLite0:
      return "EfficientNet-Lite0"
    case .efficientnetLite1:
      return "EfficientNet-Lite1"
    case .efficientnetLite2:
      return "EfficientNet-Lite2"
    case .efficientnetLite3:
      return "EfficientNet-Lite3"
    case .efficientnetLite4:
      return "EfficientNet-Lite4"
    }
  }
}
```

### 3.7 识别结果

```
extension ViewController: CameraFeedManagerDelegate {

  func didOutput(pixelBuffer: CVPixelBuffer) {
    let currentTimeMs = Date().timeIntervalSince1970 * 1000
    guard (currentTimeMs - previousInferenceTimeMs) >= delayBetweenInferencesMs else { return }
    previousInferenceTimeMs = currentTimeMs
    guard !isInferenceQueueBusy else { return }
    inferenceQueue.async { [weak self] in
      guard let self = self else { return }

      self.isInferenceQueueBusy = true

      // Pass the pixel buffer to TensorFlow Lite to perform inference.
      let result = self.imageClassificationHelper?.classify(frame: pixelBuffer)

      self.isInferenceQueueBusy = false

      // Display results by handing off to the InferenceViewController.
      DispatchQueue.main.async {
        let resolution = CGSize(
          width: CVPixelBufferGetWidth(pixelBuffer), height: CVPixelBufferGetHeight(pixelBuffer))
        self.inferenceViewController?.inferenceResult = result
        self.inferenceViewController?.resolution = resolution
        self.inferenceViewController?.tableView.reloadData()
      }
    }
  }
```

## 四 运行数据识别结果

| 识别结果1 | 识别结果1 | 识别结果1 |
| :-------: | :-------: | :-------: |
|  ![][4]   | ![][5]  |    ![][6] |

## 五 参考

* [TensorFlow-ios快速入门](https://www.tensorflow.org/lite/guide/ios?hl=zh-cn)
* [TensorFlow Lite示例应用](https://www.tensorflow.org/lite/examples?hl=zh-cnhttps://www.tensorflow.org/lite/examples?hl=zh-cn)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-5-ios-model.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensorflow-lite-5-ios-resouces.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-lite-5-ios-layout.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-5-ios-result1.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-5-ios-result2.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/tensor-flow-5-ios-result3.png
