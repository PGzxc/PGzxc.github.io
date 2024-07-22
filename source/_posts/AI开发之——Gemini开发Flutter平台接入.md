---
title: AI开发之——Gemini开发Flutter平台接入
categories:
  - 开发
  - Q-AI
  - Gemini
tags:
  - Gemini
abbrlink: a5c688af
date: 2024-07-22 10:04:15
---
## 一 准备材料

* 科学入网
* Gemini API密钥
* 项目接入

<!--more-->

## 二 Gemini API密钥

打开如下地址获取API密钥：https://aistudio.google.com/app/apikey?hl=zh-cn

![][1]

说明：

* 打开后如跳转可用区域，说明该网络下，无法使用Gemini API和Google AI Studio 
* 将该API密钥保存下来，方便在项目中使用

## 三 接入流程

### 3.1 安装SDK软件包

```
dart pub add google_generative_ai
```

### 3.2 初始化生成模型

```
import 'dart:io';
import 'package:google_generative_ai/google_generative_ai.dart';

void main() async {

  // Access your API key as an environment variable (see "Set up your API key" above)
  final apiKey = Platform.environment['API_KEY'];
  if (apiKey == null) {
    print('No \$API_KEY environment variable');
    exit(1);
  }

  // The Gemini 1.5 models are versatile and work with most use cases
  final model = GenerativeModel(model: 'gemini-1.5-flash', apiKey: apiKey);
}
```

### 3.3 使用场景

1-根据纯文本输入生成文本

```
import 'dart:io';

import 'package:google_generative_ai/google_generative_ai.dart';

void main() async {
  // Access your API key as an environment variable (see "Set up your API key" above)
  final apiKey = Platform.environment['API_KEY'];
  if (apiKey == null) {
    print('No \$API_KEY environment variable');
    exit(1);
  }
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  final model = GenerativeModel(model: 'gemini-1.5-flash', apiKey: apiKey);
  final content = [Content.text('Write a story about a magic backpack.')];
  final response = await model.generateContent(content);
  print(response.text);
}
```

2-根据文本和图片输入生成文本（多模态）

```
import 'dart:io';

import 'package:google_generative_ai/google_generative_ai.dart';

void main() async {
  // Access your API key as an environment variable (see "Set up your API key" above)
  final apiKey = Platform.environment['API_KEY'];
  if (apiKey == null) {
    print('No \$API_KEY environment variable');
    exit(1);
  }
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  final model = GenerativeModel(model: 'gemini-1.5-flash', apiKey: apiKey);
  final (firstImage, secondImage) = await (
    File('image0.jpg').readAsBytes(),
    File('image1.jpg').readAsBytes()
  ).wait;
  final prompt = TextPart("What's different between these pictures?");
  final imageParts = [
    DataPart('image/jpeg', firstImage),
    DataPart('image/jpeg', secondImage),
  ];
  final response = await model.generateContent([
    Content.multi([prompt, ...imageParts])
  ]);
  print(response.text);
}
```

3-建立多轮对话（聊天）

```
import 'dart:io';

import 'package:google_generative_ai/google_generative_ai.dart';

Future<void> main() async {
  // Access your API key as an environment variable (see "Set up your API key" above)
  final apiKey = Platform.environment['API_KEY'];
  if (apiKey == null) {
    print('No \$API_KEY environment variable');
    exit(1);
  }
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  final model = GenerativeModel(
      model: 'gemini-1.5-flash',
      apiKey: apiKey,
      generationConfig: GenerationConfig(maxOutputTokens: 100));
  // Initialize the chat
  final chat = model.startChat(history: [
    Content.text('Hello, I have 2 dogs in my house.'),
    Content.model([TextPart('Great to meet you. What would you like to know?')])
  ]);
  var content = Content.text('How many paws are in my house?');
  var response = await chat.sendMessage(content);
  print(response.text);
}
```

## 四 界面

| ![][2] | ![][3]  | ![][4] | ![][5] |
| :----: | :------:|:------:| :-----:|
| ![][6] | ![][7]  | ![][8] | ![][9] |

##  五 参考

* [Gemini API 使用入门](https://ai.google.dev/gemini-api/docs/get-started/tutorial?hl=zh-cn&lang=dart#kotlin_4)
* [示例-flutter_app](https://github.com/google-gemini/generative-ai-dart/tree/main/samples/flutter_app)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-android-api-key.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-text-request-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-text-response-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-img-send-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-img-response-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-img-rec-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-img-rec-result-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-chat-list-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/flutter-gemini-chat-list-9.png