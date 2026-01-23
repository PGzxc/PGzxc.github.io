

### <font color=red>3. iOSプロジェクト</font>

#### 1—[SwiperIOS](https://github.com/PGzxc/SwiperIOS)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：SwiperIOS(非公開)
**プロジェクトアドレス**：https://github.com/PGzxc/SwiperIOS
**ソフトウェアサポート**：iOS
**開発ツール**：MacOS(15.7.3)+Xcode(26.2)+Swift(6.2.3)+Trae(AIプログラミングアシスタント)
**プロジェクト説明**：SwiperIOS は、抖音 + 小紅書を高忠実に模倣したネイティブ iOS ショートビデオ・画像テキストコミュニティアプリで、Swift + SwiftUI で開発されています。api.apiopen.top の無料オープンインターフェースを組み合わせて、フルスクリーン動画の垂直スワイプ、画像のカスケードフロー閲覧、投稿ポップアップ、メッセージ通知などのソーシャル体験を実現しています。MVVMアーキテクチャと統一ネットワーク層のカプセル化を採用し、ダークイマーシブビジョンとジェスチャーインタラクションはネイティブアプリに近いものとなっています。
**機能モジュール**：

* ホーム：垂直スワイプ(Swiper)フルスクリーン動画、ビューポートに入ると自動再生、離れると自動一時停止、末尾で自動ページングロード
* ギャラリー：2列の適応カスケードフロー、動的な列幅と間隔、画像をクリックしてフルスクリーン拡大、ピンチズーム対応
* 投稿：ボトムミドルの隆起した投稿ボタンでポップアップをトリガー、アルバム/カメラ/テキスト入力を提供
* メッセージ：リストページとボトムナビゲーションの赤ドット通知
* マイ：個人ページの基本構造、今後作品、コレクション、下書き、設定に拡張可能

**技術ポイント**：

- ルーティングとナビゲーション：SwiftUI TabView + コンポーネント化ファイル構造、トップタブとボトムナビゲーションを実現
- 垂直ページング：UIPageViewController 垂直ページングをカプセル化、インデックス同期と切り替え通知
- カスタムコンポーネント：BottomTabBar 中央隆起投稿ボタン、選択アイテムの弾性スケールアニメーション
- アーキテクチャと状態：MVVM + ObservableObject/@Published、ビューとデータフローのデカップリング
- ネットワーク層：APIService をカプセル化してリクエストを一元管理、基盤の APIClient は Alamofire + ObjectMapper ベース
- データマッピング：汎用レスポンスモデル + ビジネスモデル JSON マッピング、旧/新フィールド対応
- インターフェースレイアウト：ギャラリーカスケードフローの動的列幅と間隔、2列スタッガードによる視覚的密度の最適化
- 適応とイマージョン：GeometryReader + safeAreaInsets レスポンシブレイアウト、コンテンツがステータスバーを貫通
- 動画再生：AVPlayer ビューポート進入自動再生/離脱一時停止、バッファー表示とループ再生
- ビルドと依存関係：CocoaPods 依存関係管理、Fastlane スクリプト化マルチ環境パッケージングと公開

プロジェクトプレビュー

| ![][swiperios-1] | ![][swiperios-2] | ![][swiperios-3] |
| :--------------: | :--------------: | :--------------: |
| ![][swiperios-4] | ![][swiperios-5] | ![][swiperios-6] |
| ![][swiperios-7] | ![][swiperios-8] | ![][swiperios-9] |

#### 2—[WanAndroid_SwiftUI](https://github.com/PGzxc/WanAndroid_SwiftUI)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：WanAndroid_SwiftUI
**プロジェクトアドレス**：https://github.com/PGzxc/WanAndroid_SwiftUI
**ソフトウェアサポート**：iOS
**開発ツール**：MacOS(13.4)+Xcode(14.3.1)+Swift(5.8.1)
**プロジェクト説明**：このプロジェクトは、WanAndroid ウェブサイトのオープン API に基づいて開発された iOS アプリです。SwiftUI を使用してインターフェースを構築し、HStack、VStack、ZStack などのレイアウトと一般的なコンポーネントを通じて、UI 構築とリアルタイムプレビューを迅速に実現しています。ネットワーク層では、Alamofire と AlamofireObjectMapper を組み合わせてデータリクエストとモデルマッピングを実現しています。  
**機能モジュール**：ホーム、ナビゲーション、プロジェクト、メッセージ、マイなど   
**技術ポイント**：

- TabView+NavigationStack を使用してプロジェクトのメインフレームワークを構築
- API インターフェースとルーティング管理をカプセル化、BaseURL、メソッド、パス、パラメータを含み、ネットワークリクエストの一元管理を実現
- Alamofire でネットワークリクエストを送信、AlamofireObjectMapper を組み合わせてレスポンスデータを Swift モデルに解析
- MVVM アーキテクチャ設計に基づき、ObservableObject を利用してデータとビューのバインディングを簡素化
- SDWebImageSwiftUI を統合してネットワーク画像の効率的なロードとキャッシュを実現
- AppStorage を通じてユーザーデータの永続化ストレージを実現
- environmentObject を利用してグローバルアプリケーション状態を共有・管理
- ImageCarousel に基づいて SwiftUI ホームカルーセルを実現

**プロジェクトプレビュー**

|![][swift-waz-1]| ![][swift-waz-2]|![][swift-waz-3] |![][swift-waz-4] |
| -------------- | --------------- | --------------  | --------------  |
|![][swift-waz-5]|![][swift-waz-6] |![][swift-waz-7] |![][swift-waz-8] |
|![][swift-waz-9]|![][swift-waz-10]|![][swift-waz-11]|![][swift-waz-12]|

#### 3—[ZhiHuSwiftUI](https://github.com/PGzxc/ZhiHuSwiftUI)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：ZhiHuSwiftUI(オープンソース+AI)
**プロジェクトアドレス**：https://github.com/PGzxc/ZhiHuSwiftUI
**ソフトウェアサポート**：iOS
**開発ツール**：MacOS(15.3.2)+Xcode(16.2)+Swift(6.0.3)
**プロジェクト説明**：これは SwiftUI で開発された iOS 版知乎コミュニティクライアントで、MVVM アーキテクチャを採用し、完全なコミュニティ機能を備えています。ホームページでは投稿リストと詳細を表示可能、マーケット欄ではトピックとコラムを展示、投稿ボタンでユーザーが記事や質問を投稿可能、メッセージリスト欄ではいいね、コメント、フォローなどのインタラクティブ情報を表示、またパーソナルセンターもあり、ユーザーが個人事務を管理しやすいようになっています。  
**機能モジュール**：ホーム、マーケット、投稿、メッセージ、マイなど   
**技術ポイント**：

- TabView+NavigationStack を使用してプロジェクトのメインフレームワークを構築
- MVVM アーキテクチャ(Model + View + ViewModel)を採用してデータとビューのデカップリングを簡素化
- URLSession と async/await を利用して効率的なネットワークリクエストと非同期プログラミングを実現
- UserDefaults を通じてデータの永続化ストレージを実現
- @StateObject、@Published、@EnvironmentObject を使用して状態管理とデータ共有を行う
- カスタムコンポーネント View を作成し、コードの再利用性を向上
- Mock で一時データをシミュレート

**プロジェクトプレビュー**

| ![][ios-zh-1] | ![][ios-zh-2]  | ![][ios-zh-3]  | ![][ios-zh-4]  |
| ------------- | -------------- | -------------- | -------------- |
| ![][ios-zh-5] | ![][ios-zh-6]  | ![][ios-zh-7]  | ![][ios-zh-8]  |
| ![][ios-zh-9] | ![][ios-zh-10] | ![][ios-zh-11] | ![][ios-zh-12] |


<!--IOS-Swiperios-->
[swiperios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-1-home-play.png
[swiperios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-2-home-state.png
[swiperios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-3-focus-state.png
[swiperios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-4-home-city.png
[swiperios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-5-album.png
[swiperios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-6-album-big.png
[swiperios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-7-pub.png
[swiperios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-8-msg.png
[swiperios-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-9-me.png


<!--IOS-Wanandroid-SwiftUI-->
[swift-waz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-1-home.png
[swift-waz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-2-tree.png
[swift-waz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-3-treetab.png
[swift-waz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-4-project.png
[swift-waz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-unread-5.png
[swift-waz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-read-6.png
[swift-waz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-info-7.png
[swift-waz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-me-info-8.png
[swift-waz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-me-info-no-9.png
[swift-waz-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-login-10.png
[swift-waz-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-register-11.png
[swift-waz-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-12-web.png

<!--IOS SwiftUI版本—仿知乎-->

[ios-zh-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-1-login.png
[ios-zh-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-2-register.png
[ios-zh-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-3-home.png
[ios-zh-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-4-home-detail.png
[ios-zh-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-5-market.png
[ios-zh-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-6-market-detail.png
[ios-zh-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-7-pub.png
[ios-zh-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-8-msg.png
[ios-zh-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-9-msg-detail.png
[ios-zh-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-10-me.png
[ios-zh-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-11-me-edit.png
[ios-zh-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-12-set.png