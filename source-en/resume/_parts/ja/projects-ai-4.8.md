

### <font color=red>8. AIプロジェクト</font>

#### 1—[FlutterGeminiAI ](https://github.com/PGzxc/FlutterGeminiAI)

**プロジェクト帰属** ：個人プロジェクト
**プロジェクト名**：FlutterGeminiAI
**プロジェクトアドレス**：https://github.com/PGzxc/FlutterGeminiAI
**ソフトウェアサポート**：Android+IOS
**開発ツール**：IDEA 2024.1.3+Flutter(3.22.2) 
**プロジェクト説明**：Flutter Gemini AI は Google Gemini-1.5-Flash モデルに基づいて構築されたマルチモーダル AI 対話アプリケーションで、純粋なテキストとテキスト画像混合入力をサポートしている。ユーザーはテキストまたは画像を通じて AI と自然に対話することができ、チャットウィンドウスタイルのインターフェース設計、メッセージの左右両側表示、インターフェースのシンプルさと直観性により、インタラクティブ体験を向上させる。
**機能モジュール**：対話モジュール  
**技術ポイント**：

- GenerativeModel(model: 'gemini-1.5-flash', apiKey: apiKey)に基づいてモデルを初期化
- model.generateContent([Content.text('Text')])に基づいてテキストを入力生成
- model.generateContent([Content.multi([prompt, ...imageParts])])に基づいてテキスト画像マルチモーダル
- カスタムボトム入力モジュール(入力ボックス+画像選択+メッセージ送信)
- roleに基づいて左側Geminiレイアウトまたは右側Userレイアウトを選択
- image_pickerに基づいてギャラリー画像を選択
- メッセージ送信後に自動的に下部までスクロール

**プロジェクトプレビュー**

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