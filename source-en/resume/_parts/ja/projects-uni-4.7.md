

### <font color=red>七 Uni-appプロジェクト</font>

#### 1—[SwiperUniApp](https://github.com/PGzxc/SwiperUniApp)

**プロジェクト帰属**：個人プロジェクト/プライベート
**プロジェクト名**：SwiperUniApp
**プロジェクトアドレス**：https://github.com/PGzxc/SwiperUniApp
**ソフトウェアサポート**：H5+WeChat Mini Program / Alipay Mini Program+Android+iOS
**開発ツール**：HBuilder X 4.87+WeChat Developer Tools+Android Studio+Xcode+Node.js+Vite
**プロジェクト説明**：独立開発の UniApp ベースのクロスプラットフォームショートビデオ + 画像ギャラリー閲覧アプリで、Vue 3 + TypeScript で構築され、1 つのコードで複数端末に公開され、統一されたビジネスロジックとインタラクティブエクスペリエンスを実現しています。製品形態は、TikTok/Xiaohongshu のショートビデオと画像コミュニティをベンチマークにしており、スムーズな動画と画像のスワイプ閲覧、マルチタブコンテンツフロー、カテゴリー表示、全画面イマーシブインタラクティブエクスペリエンスを提供し、H5、ミニプログラム、Android、iOS などの複数プラットフォームでの運用をサポートしています。  

**機能モジュール**：

* ホーム：ローカル / フォロー / 推奨のマルチタブコンテンツフロー、左右スワイプ切り替えと上下スワイプイマーシブ動画閲覧をサポート
* ギャラリー：画像ウォーターフォール表示、カテゴリーフィルタリングとページネーションロードをサポート、クリックして全画面画像プレビューに入る
* 公開：コンテンツ公開エントリー、ポップアップ形式で表示、インタラクティブアニメーションと状態フィードバックを含む
* メッセージ：システム通知とユーザーインタラクションメッセージ表示、新着メッセージの赤ドットリマインダーをサポート
* ミー：ユーザー情報表示、作品リスト管理、基本設定機能

**技術ポイント**：

- アーキテクチャ設計：UniApp クロスエンド統一アーキテクチャ + 条件付きコンパイル、コード再利用率の向上
- 状態管理：Composition API + ViewModel パターン、明確な状態管理、コンポーネントのデカップリング
- ネットワークとデータ：統一されたネットワークリクエスト層をカプセル化、インターフェース集約、エラー処理、データ解析をサポート
- 動画再生：UniApp 動画コンポーネントベースの再生制御ロジックのカプセル化、ショートビデオの連続スワイプ再生をサポート
- 画像処理：レイジーロードとページネーションレンダリングによるウォーターフォールロード最適化の実現、長いリストのスクロールパフォーマンスの向上
- ジェスチャーインタラクション：動画の上下スワイプ、画像プレビューのズームなどのイマーシブジェスチャーインタラクションの実現
- 画面適応：rpx + Flex を採用してレスポンシブレイアウトを実現、セーフエリアとノッチスクリーンに適応
- ビルドと公開：HBuilderX を使用して H5 / ミニプログラム / App のマルチエンドビルドと公開を実現

**プロジェクトプレビュー**

| ![][swpuni-1] | ![][swpuni-2]  | ![][swpuni-3] | ![][swpuni-4] |
| ------------- | -------------- | ------------- | ------------- |
| ![][swpuni-5] | ![][swpuni-6]  | ![][swpuni-7] | ![][swpuni-8] |
| ![][swpuni-9] | ![][swpuni-10] |               |               |


#### 2—[wanandroid_uni_app](https://github.com/PGzxc/wanandroid_uni_app)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：wanandroid_uni_app(オープンソース)
**プロジェクトアドレス**：https://github.com/PGzxc/wanandroid_uni_app
**ソフトウェアサポート**：H5+WeChat Mini Program+Other Mini Programs
**開発ツール**：HBuilder X 3.8.4.20230531+WeChat Developer Tools+Vue(2.x)
**プロジェクト説明**：このプロジェクトは WanAndroid オープンソース API に基づいており、uni-app を使用して構築され、ユーザーのログインと登録、記事の閲覧、プロジェクトの表示、ナビゲーションの表示、メッセージ通知などの機能を実現し、マルチエンドデプロイをサポートしています。  
**技術ポイント**：

- uni-ui コンポーネントライブラリを使用してページレイアウトとインタラクティブインターフェースを構築
- uni.request に基づいてネットワークリクエストをカプセル化
- uni-api-EventChannel に基づいてページ間のイベント通信を監視
- uni.navigateTo、redirectTo などのルーティング API を通じてページジャンプとナビゲーション制御を実現
- uni.setStorage/uni.getStorage を使用してローカルデータキャッシュを行う
- ページの再利用のために Vue コンポーネントを作成

**プロジェクトプレビュー**

|![][uni-az-1]| ![][uni-az-2]|![][uni-az-3] |![][uni-az-4]|
| ----------- | ------------ | ------------ | ----------- |
|![][uni-az-5]|![][uni-az-6] |![][uni-az-7] |![][uni-az-8]|


<!--swiperuniapp-->

[swpuni-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-1-rec.png
[swpuni-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-2-rec-state.png
[swpuni-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-3-focus.png
[swpuni-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-4-city.png
[swpuni-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-5-first.png
[swpuni-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-6-other.png
[swpuni-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-7-big.png
[swpuni-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-8-pub.png
[swpuni-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-9-msg.png
[swpuni-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-10-me.png

<!--uni-app-wanandroid-->

[uni-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-home-1.png
[uni-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-navigator-2.png
[uni-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-project-3.png
[uni-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-article-web-4.png
[uni-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-mine-login-no-5.png
[uni-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-mine-login-yes-6.png
[uni-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-user-login-7.png
[uni-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-user-register-8.png