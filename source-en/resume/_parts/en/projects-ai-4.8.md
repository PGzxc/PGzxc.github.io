

### <font color=red>8. AI Projects</font>
#### 1—[FlutterGeminiAI ](https://github.com/PGzxc/FlutterGeminiAI)

**Project Ownership** ：Personal Project (Open Source)
**Project Name**：FlutterGeminiAI
**Project URL**：https://github.com/PGzxc/FlutterGeminiAI
**Platform Support**：Android+iOS
**Development Tools**：IDEA 2024.1.3+Flutter(3.22.2) 
**Project Description**：Flutter Gemini AI is a multimodal AI conversation application built on the Google Gemini-1.5-Flash model, supporting both plain text and mixed text-image input. Users can naturally interact with AI through text or images, with a chat window-style interface design where messages are displayed on both left and right sides, providing a clean and intuitive interface that enhances the interaction experience.
**Functional Modules**：Conversation Module  
**Technical Highlights**：

- API Development: Based on Google Generative AI API support
- Model Support: GenerativeModel for model configuration
- UI Construction: Responsive interface development based on Flex layout
- Network Requests: Using Google Generative AI SDK for network requests and multimodal requests
- Asynchronous Processing: Using async/await for asynchronous programming to handle time-consuming operations like network requests
- Custom Components: Custom bottom input module (input box + image selection + message sending)
- Image Processing: Using image_picker package to implement image selection functionality
- Layout based on role: Left-side Gemini layout or right-side User layout based on role
- Automatic scrolling to bottom after sending messages

**Project Preview**

| ![][gemai-2] | ![][gemai-3]  | ![][gemai-4] | ![][gemai-5] |
| ------------ | ------------- | ------------ | ------------ |
| ![][gemai-6] | ![][gemai-7]  | ![][gemai-8] | ![][gemai-9] |


#### 2—[ChatLocalHM ](https://github.com/PGzxc/ChatLocalHM)

**Project Ownership** ：Personal Project (Private)
**Project Name**：ChatLocalHM
**Project URL**：https://github.com/PGzxc/ChatLocalHM
**Platform Support**：HarmonyOS
**Development Tools**：DevEco Studio 6.0.1 + Github
**Project Description**：ChatLocalHM is a local large model AI chat application developed based on HarmonyOS NEXT (ArkTS). The project accesses locally deployed Ollama large model services (qwen, llama3, etc.) through the local network and implements unified interface calls with New-API (OpenAI protocol), supporting streaming dialogue, multi-model switching, and low-latency responses, achieving a ChatGPT-like native interaction experience on HarmonyOS.
**Functional Modules**：AI Conversation Module, Model Selection, Chat UI, Network Communication  
**Technical Highlights**：

- API Development: Converting Ollama services to OpenAI interface through new-api
- Model Switching: Getting model list and switching between different large models based on /v1/models
- UI Construction: Building responsive interface development based on Flex layout
- Network Requests: Extracting model and streaming chat network interfaces based on Http
- State Management: Implementing data and UI binding and real-time updates based on state management mechanism
- Asynchronous Processing: Using async/await to handle asynchronous operations like network requests
- Custom Components: Developing reusable components using @Component decorator
- Data Management: Implementing lazy loading of chat messages using LazyDataSource

**Project Preview**

| 1-Default Model  | 2-Model Selection  | 3-Model Switching  | 4-Model Chat  |
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