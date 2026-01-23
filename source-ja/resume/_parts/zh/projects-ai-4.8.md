### <font color=red>八 AI项目</font>

#### 1—[FlutterGeminiAI ](https://github.com/PGzxc/FlutterGeminiAI)

**项目归属** ：个人项目
**项目名称**：FlutterGeminiAI
**项目地址**：https://github.com/PGzxc/FlutterGeminiAI
**软件支持**：Android+IOS
**开发工具**：IDEA 2024.1.3+Flutter(3.22.2) 
**项目描述**：Flutter Gemini AI 是基于 Google Gemini-1.5-Flash 模型打造的多模态 AI 对话应用，支持纯文本及图文混合输入。用户可通过文本或图片与 AI 自然交互，聊天窗口式界面设计，消息分左右两侧展示，界面简洁直观，提升交互体验。
**功能模块**：对话模块  
**技术要点**：

- 基于GenerativeModel(model: 'gemini-1.5-flash', apiKey: apiKey)初始化模型
- 基于model.generateContent([Content.text('Text')])输入生成文本
- 基于model.generateContent([Content.multi([prompt, ...imageParts])])图文多模态
- 自定义底部输入模块(输入框+图片选择+消息发送)
- 根据role选择是左侧Gemini布局还是右边User用户布局
- 基于image_picker选择图库图片
- 发送消息后自动滚动到底部

**项目预览**

| ![][gemai-2] | ![][gemai-3]  | ![][gemai-4] | ![][gemai-5] |
| ------------ | ------------- | ------------ | ------------ |
| ![][gemai-6] | ![][gemai-7]  | ![][gemai-8] | ![][gemai-9] |

[gemai-0]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/gemini-price.png
[gemai-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-start-1.png
[gemai-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-text-request-2.png
[gemai-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-text-response-3.png
[gemai-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-img-send-4.png
[gemai-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-img-response-5.png
[gemai-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-img-rec-6.png
[gemai-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-img-rec-result-7.png
[gemai-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-chat-list-8.png
[gemai-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/flutter-gemini-chat-list-9.png


