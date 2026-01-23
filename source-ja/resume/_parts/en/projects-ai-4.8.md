

### <font color=red>8. AI Projects</font>

#### 1—[FlutterGeminiAI ](https://github.com/PGzxc/FlutterGeminiAI)

**Project Ownership** ：Personal Project
**Project Name**：FlutterGeminiAI
**Project Address**：https://github.com/PGzxc/FlutterGeminiAI
**Software Support**：Android+IOS
**Development Tools**：IDEA 2024.1.3+Flutter(3.22.2) 
**Project Description**：Flutter Gemini AI is a multimodal AI dialogue application built based on the Google Gemini-1.5-Flash model, supporting pure text and mixed text-image input. Users can interact naturally with AI through text or images, with a chat window-style interface design, messages displayed on the left and right sides, and a clean and intuitive interface to enhance the interactive experience.
**Functional Modules**：Dialogue Module  
**Technical Points**：

- Initialize the model based on GenerativeModel(model: 'gemini-1.5-flash', apiKey: apiKey)
- Generate text input based on model.generateContent([Content.text('Text')])
- Text-image multimodal based on model.generateContent([Content.multi([prompt, ...imageParts])])
- Custom bottom input module (input box + image selection + message sending)
- Choose left-side Gemini layout or right-side User layout based on role
- Select gallery images based on image_picker
- Auto-scroll to bottom after sending messages

**Project Preview**

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