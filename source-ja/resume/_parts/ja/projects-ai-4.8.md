

### <font color=red>8. AIプロジェクト</font>

#### 1—[FlutterGeminiAI ](https://github.com/PGzxc/FlutterGeminiAI)

**プロジェクト所属** ：個人プロジェクト(オープンソース)
**プロジェクト名**：FlutterGeminiAI
**プロジェクトURL**：https://github.com/PGzxc/FlutterGeminiAI
**プラットフォームサポート**：Android+iOS
**開発ツール**：IDEA 2024.1.3+Flutter(3.22.2) 
**プロジェクト説明**：Flutter Gemini AI は Google Gemini-1.5-Flash モデルをベースに構築されたマルチモーダル AI 会話アプリケーションで、プレーンテキストとテキスト画像混合入力をサポートしています。ユーザーはテキストまたは画像を通じて AI と自然に対話することができ、チャットウィンドウスタイルのインターフェース設計により、メッセージが左右両側に表示され、インターフェースがシンプルで直感的で、インタラクション体験が向上します。
**機能モジュール**：会話モジュール  
**技術的ハイライト**：

- API開発：Google Generative AI の API サポートに基づく
- モデルサポート：GenerativeModel によるモデル構成
- UI構築：Flex レイアウトに基づくレスポンシブインターフェース開発
- ネットワークリクエスト：Google Generative AI SDK を使用したネットワークリクエストとマルチモーダルリクエスト
- 非同期処理：async/await を使用した非同期プログラミングによるネットワークリクエストなどの時間のかかる操作の処理
- カスタムコンポーネント：カスタム下部入力モジュール（入力ボックス + 画像選択 + メッセージ送信）
- 画像処理：image_picker パッケージを使用した画像選択機能の実装
- ロールに基づくレイアウト：ロールに基づいた左側の Gemini レイアウトまたは右側の User レイアウト
- メッセージ送信後の自動的な下部スクロール

**プロジェクトプレビュー**

| ![][gemai-2] | ![][gemai-3]  | ![][gemai-4] | ![][gemai-5] |
| ------------ | ------------- | ------------ | ------------ |
| ![][gemai-6] | ![][gemai-7]  | ![][gemai-8] | ![][gemai-9] |


#### 2—[ChatLocalHM ](https://github.com/PGzxc/ChatLocalHM)

**プロジェクト所属** ：個人プロジェクト(プライベート)
**プロジェクト名**：ChatLocalHM
**プロジェクトURL**：https://github.com/PGzxc/ChatLocalHM
**プラットフォームサポート**：HarmonyOS
**開発ツール**：DevEco Studio 6.0.1 + Github
**プロジェクト説明**：ChatLocalHM は HarmonyOS NEXT (ArkTS) ベースで開発されたローカル大規模モデル AI チャットアプリケーションです。このプロジェクトはローカルネットワークを通じてローカルにデプロイされた Ollama 大規模モデルサービス（qwen、llama3 など）にアクセスし、New-API（OpenAI プロトコル）を組み合わせて統一インターフェース呼び出しを実装し、ストリーミング対話、マルチモデル切り替え、低遅延応答をサポートし、HarmonyOS 上で ChatGPT のようなネイティブインタラクション体験を実現します。
**機能モジュール**：AI会話モジュール、モデル選択、チャットUI、ネットワーク通信  
**技術的ハイライト**：

- API開発：new-api を介して Ollama サービスを OpenAI インターフェースに変換
- モデル切り替え：/v1/models に基づくモデルリストの取得と異なる大規模モデルへの切り替え
- UI構築：Flex レイアウトに基づくレスポンシブインターフェース開発の構築
- ネットワークリクエスト：Http に基づくモデルとストリーミングチャットネットワークインターフェースの抽出
- 状態管理：状態管理メカニズムに基づくデータと UI のバインディングおよびリアルタイム更新の実装
- 非同期処理：async/await を使用したネットワークリクエストなどの非同期操作の処理
- カスタムコンポーネント：@Component デコレータを使用した再利用可能なコンポーネントの開発
- データ管理：LazyDataSource を使用したチャットメッセージの遅延ロードの実装

**プロジェクトプレビュー**

| 1-デフォルトモデル  | 2-モデル選択  | 3-モデル切り替え  | 4-モデルチャット  |
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