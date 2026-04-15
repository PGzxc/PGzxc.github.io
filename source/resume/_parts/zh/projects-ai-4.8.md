### <font color=red>八 AI项目</font>

#### 1—[FlutterGeminiAI ](https://github.com/PGzxc/FlutterGeminiAI)

**项目归属** ：个人项目(开源)
**项目名称**：FlutterGeminiAI
**项目地址**：https://github.com/PGzxc/FlutterGeminiAI
**软件支持**：Android+IOS
**开发工具**：IDEA 2024.1.3+Flutter(3.22.2) 
**项目描述**：Flutter Gemini AI 是基于 Google Gemini-1.5-Flash 模型打造的多模态 AI 对话应用，支持纯文本及图文混合输入。用户可通过文本或图片与 AI 自然交互，聊天窗口式界面设计，消息分左右两侧展示，界面简洁直观，提升交互体验。
**功能模块**：对话模块  
**技术要点**：

- 接口开发：基于Google Generative AI 提供API支持
- 模型支持：GenerativeModel提供模型配置
- UI构建：基于Flex布局实现响应式界面开发
- 网络请求：使用Google Generative AI SDK进行网络请求及多模态请求
- 异步处理：使用async/await 异步编程处理网络请求等耗时操作
- 自定义组件：自定义底部输入模块(输入框+图片选择+消息发送)
- 图像处理 ：使用 image_picker 包实现图像选择功能
- 根据role选择是左侧Gemini布局还是右边User用户布局
- 发送消息后自动滚动到底部

**项目预览**

| ![][gemai-2] | ![][gemai-3]  | ![][gemai-4] | ![][gemai-5] |
| ------------ | ------------- | ------------ | ------------ |
| ![][gemai-6] | ![][gemai-7]  | ![][gemai-8] | ![][gemai-9] |


#### 2—[ChatLocalHM ](https://github.com/PGzxc/ChatLocalHM)

**项目归属** ：个人项目(私有)
**项目名称**：ChatLocalHM
**项目地址**：https://github.com/PGzxc/ChatLocalHM
**软件支持**：鸿蒙
**开发工具**：DevEco Studio 6.0.1 + Github
**项目描述**：ChatLocalHM 是一款基于 HarmonyOS NEXT(ArkTS）开发的本地大模型 AI 聊天应用。项目通过局域网接入本地部署的Ollama 大模型服务(qwen、llama3 等)，并结合 New-API(OpenAI 协议)实现统一接口调用，支持 流式对话、多模型切换、低延迟响应，在鸿蒙端实现类ChatGPT 的原生交互体验。
**功能模块**：AI对话模块、模型选择、聊天UI、网络通信  
**技术要点**：

- 接口开发：通过new-api将ollama服务转换为OpenAI接口
- 模型切换：基于/v1/models获取模型列表并切换不同大模型
- UI构建：基于Flex布局构建响应式界面开发
- 网络请求：基于Http抽取获取模型及流式聊天网络接口
- 状态管理：基于状态管理机制实现数据与UI绑定及实时更新
- 异步处理：使用asyc/await处理网络请求等异步操作
- 自定义组件：使用@Component装饰器开发可服用组件
- 数据管理：采用LazyDataSource实现聊天消息的懒加载

**项目预览**

| 1-默认模型  | 2-模型选择  | 3-模型切换  | 4-模型聊天  |
| :---------: | :---------: | :---------: | :---------: |
| ![][chat-1] | ![][chat-2] | ![][chat-3] | ![][chat-4] |

<!--FlutterGeminiAI-->

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


<!--ChatLocalHM-->
[chat-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/chatlocal-hm-1-model-list.png
[chat-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/chatlocal-hm-2-model-choice.png
[chat-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/chatlocal-hm-3-model-change.png
[chat-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/chatlocal-hm-4-model-ask.png