---
title: AI开发之——Gemini开发IOS平台接入
categories:
  - 开发
  - Q-AI
  - Gemini
tags:
  - Gemini
abbrlink: 4f57b981
date: 2024-07-23 12:04:36
---
## 一 准备材料

- 科学入网
- Gemini API密钥
- 项目接入

<!--more-->

## 二 Gemini API密钥

打开如下地址获取API密钥：https://aistudio.google.com/app/apikey?hl=zh-cn

![][1]

说明：

- 打开后如跳转可用区域，说明该网络下，无法使用Gemini API和Google AI Studio
- 将该API密钥保存下来，方便在项目中使用
- 将API密钥放到应用根文件夹的.plist中

## 三 接入流程

### 3.1 将 SDK 软件包添加到您的项目中

1-在 Xcode 中的项目导航器中，右键点击您的项目

2-从上下文菜单中选择**添加软件包**

3-在 *Add Packages* 对话框中，将软件包网址粘贴到搜索栏中

```
https://github.com/google/generative-ai-swift
```

4-点击**添加软件包**。Xcode 现在会将 `GoogleGenerativeAI` 软件包添加到您的项目中

### 3.2 初始化生成模型

1-导入 `GoogleGenerativeAI` 模块：

```
import GoogleGenerativeAI
```

2-初始化生成模型

```
let model = GenerativeModel(name: "gemini-1.5-flash", apiKey: APIKey.default)
```

### 3.3 使用场景

1-根据纯文本输入生成文本

```
import GoogleGenerativeAI

let model = GenerativeModel(name: "gemini-1.5-flash", apiKey: APIKey.default)

let prompt = "Write a story about a magic backpack."
let response = try await model.generateContent(prompt)
if let text = response.text {
  print(text)
}
```

2-根据文本和图片输入生成文本（多模态）

```
import GoogleGenerativeAI

let model = GenerativeModel(name: "gemini-1.5-flash", apiKey: APIKey.default)

let https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai1 = UIhttps://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai(...)
let https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai2 = UIhttps://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai(...)

let prompt = "What's different between these pictures?"

let response = try await model.generateContent(prompt, https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai1, https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai2)
if let text = response.text {
  print(text)
}
```

3-建立多轮对话（聊天）

```
import GoogleGenerativeAI

let config = GenerationConfig(
  maxOutputTokens: 100
)

let model = GenerativeModel(
  name: "gemini-1.5-flash",
  apiKey: APIKey.default,
  generationConfig: config
)

let history = [
  ModelContent(role: "user", parts: "Hello, I have 2 dogs in my house."),
  ModelContent(role: "model", parts: "Great to meet you. What would you like to know?"),
]

// Initialize the chat
let chat = model.startChat(history: history)
let response = try await chat.sendMessage("How many paws are in my house?")
if let text = response.text {
  print(text)
}
```

## 四 界面效果

| ![][2] | ![][3] | ![][4] |
| ------ | ------ | ------ |
| ![][5] | ![][6] |        |

## 五 参考

* [Gemini API使用入门](https://ai.google.dev/gemini-api/docs/get-started/tutorial?hl=zh-cn&lang=swift#kotlin_4)
* [示例-GenerativeAISample](https://github.com/google-gemini/generative-ai-swift/tree/main/Examples/GenerativeAISample)



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-android-api-key.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-ios-1.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-ios-2.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-ios-3.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-ios-4.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-ios-5.png
