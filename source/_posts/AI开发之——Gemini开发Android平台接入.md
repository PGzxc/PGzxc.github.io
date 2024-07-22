---
title: AI开发之——Gemini开发Android平台接入
categories:
  - 开发
  - Q-AI
  - Gemini
tags:
  - Gemini
abbrlink: 8dcb8226
date: 2024-07-22 09:42:04
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

### 3.1 将SDK依赖添加到项目中(模块应用级)

```
dependencies {
  // ... other androidx dependencies

  // add the dependency for the Google AI client SDK for Android
  implementation("com.google.ai.client.generativeai:generativeai:0.9.0")
}
```

### 3.2 初始化生成模型

```
val generativeModel = GenerativeModel(
    // The Gemini 1.5 models are versatile and work with most use cases
    modelName = "gemini-1.5-flash",
    // Access your API key as a Build Configuration variable (see "Set up your API key" above)
    apiKey = BuildConfig.apiKey
)
```

### 3.3 使用场景

1-根据纯文本输入生成文本

```
val generativeModel = GenerativeModel(
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    modelName = "gemini-1.5-flash",
    // Access your API key as a Build Configuration variable (see "Set up your API key" above)
    apiKey = BuildConfig.apiKey
)

val prompt = "Write a story about a magic backpack."
val response = generativeModel.generateContent(prompt)
print(response.text)
```

2-根据文本和图片输入生成文本（多模态）

```
val generativeModel = GenerativeModel(
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    modelName = "gemini-1.5-flash",
    // Access your API key as a Build Configuration variable (see "Set up your API key" above)
    apiKey = BuildConfig.apiKey
)

val image1: Bitmap = // ...
val image2: Bitmap = // ...

val inputContent = content {
    image(image1)
    image(image2)
    text("What's different between these pictures?")
}

val response = generativeModel.generateContent(inputContent)
print(response.text)
```

3-建立多轮对话（聊天）

```
val generativeModel = GenerativeModel(
    // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
    modelName = "gemini-1.5-flash",
    // Access your API key as a Build Configuration variable (see "Set up your API key" above)
    apiKey = BuildConfig.apiKey
)

val chat = generativeModel.startChat(
    history = listOf(
        content(role = "user") { text("Hello, I have 2 dogs in my house.") },
        content(role = "model") { text("Great to meet you. What would you like to know?") }
    )
)

chat.sendMessage("How many paws are in my house?")
```

## 四 界面

| 主界面 | 文本输入 | 图文输入 | chat上下文聊天 |
| :----: | :------: | :------: | :------------: |
| ![][2] |  ![][3]  |  ![][4]  |     ![][5]     |

##  五 参考

* [Gemini API 使用入门](https://ai.google.dev/gemini-api/docs/get-started/tutorial?hl=zh-cn)
* [示例-Google Generative AI Sample for Android](https://github.com/google-gemini/generative-ai-android/tree/main/generativeai-android-sample)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-android-api-key.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-android-main-page.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-android-text.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-android-text-image.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/gemini-android-chat.png