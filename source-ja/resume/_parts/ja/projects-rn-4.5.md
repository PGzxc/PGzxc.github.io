

### <font color=red>5. React Nativeプロジェクト</font>

#### 1—[SwiperRN](https://github.com/PGzxc/SwiperRN)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：SwiperRN（プライベート）
**プロジェクトURL**：https://github.com/PGzxc/SwiperRN
**ソフトウェアサポート**：Android+iOS+Web
**開発ツール**：VS Code+Trae(AIプログラミングアシスタント)+Java(17.0.15)+Node(25.2.1)+Yarn(1.22.22)+react-native(0.81.5)+Expo(54)
**プロジェクト説明**：SwiperRNは、抖音+小紅書を高忠実に再現したクロスプラットフォームのショートビデオ&画像テキストコミュニティアプリです。React Native + Expoエコシステムに基づいて開発され、api.apiopen.topの無料オープンインターフェースを組み合わせることで、フルスクリーン動画の垂直スワイプ、画像ノートのカスケードフロー、動的投稿、メッセージ通知などの完全なソーシャル体験を実現しています。iOS、Android、Webの3つのプラットフォームをサポートし、本当に一度のコーディングでどこでも実行可能で、視覚効果とインタラクティブな体験はネイティブアプリに近いものです。    
**機能モジュール**：

* ホーム：抖音スタイルのフルスクリーン動画垂直スワイプ（Swiper）、自動再生+ジェスチャーポーズ、プルダウンリフレッシュ、プルアップでのさらなる読み込みをサポート
* ギャラリー：小紅書スタイルの2列/3列アダプティブ画像カスケードフロー、動的な高さ、クリックして拡大して詳細を表示
* 投稿：動画、画像の撮影/アルバム選択、複数画像アップロード、リッチテキストタイトル+トピックタグ、インターフェース呼び出しによるワンクリック投稿をサポート
* メッセージ：いいね、コメント、フォロー、システム通知リスト、リアルタイムの赤いドット通知、対応するコンテンツにジャンプ可能
* マイページ：個人ホームページのグリッド/リスト表示作品、お気に入り、下書き、設定とナイトモード切り替え

**技術ポイント**：

- ルーティングとナビゲーション：Expo Routerに基づくファイルシステムルーティングシステムの実装
- カスタムコンポーネント：BottomTabBar中央の隆起ボタンと動的スケーリング効果
- 型システム：TypeScriptに基づく型定義により、コード品質と保守性を確保
- ネットワークリクエスト：ApiService（fetch/axios）をカプセル化してネットワークリクエストを一元管理
- UIレイアウト：画像カスケードフローレイアウトを実装し、列の高さと画像の位置を動的に計算
- ジェスチャーインタラクション：React Native Gesture Handlerによるスワイプ切り替えの実装
- アニメーション効果：React Native AnimatedとReanimatedによる高性能アニメーション
- 適応方案：SafeAreaContextとDimensions APIによるレスポンシブレイアウト
- 動画再生：expo-av + FlatListによる「ビューポートに入ると自動再生 + 離れると一時停止」、次の動画のプリロード
- ビルドと公開：EAS Buildによるマルチ環境アプリケーションのパッケージ化と公開

**プロジェクトプレビュー-Android**

| ![][swiperrn-az-1] | ![][swiperrn-az-2] | ![][swiperrn-az-3] |
| :----------------: | :----------------: | :----------------: |
| ![][swiperrn-az-4] | ![][swiperrn-az-5] | ![][swiperrn-az-6] |
| ![][swiperrn-az-7] | ![][swiperrn-az-8] | ![][swiperrn-az-9] |

**プロジェクトプレビュー-iOS**

| ![][swiperrn-ios-1] | ![][swiperrn-ios-2] | ![][swiperrn-ios-3] |
| :-----------------: | :-----------------: | :-----------------: |
| ![][swiperrn-ios-4] | ![][swiperrn-ios-5] | ![][swiperrn-ios-6] |
| ![][swiperrn-ios-7] | ![][swiperrn-ios-8] |                     |

#### 2—[WanAndroidRN](https://github.com/PGzxc/WanAndroidRN)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：WanAndroidRN（オープンソース）
**プロジェクトURL**：https://github.com/PGzxc/WanAndroidRN
**ソフトウェアサポート**：Android+iOS
**開発ツール**：IntelliJ IDEA+Java(11.0.19)+Node(18.18.2)+Yarn(1.22.19)+react-native(0.72.6)+Expo(49)
**プロジェクト説明**：このプロジェクトは、WanAndroidウェブサイトのオープンAPIに基づいて構築されたReact Nativeオープンソースアプリです。Expo Go開発ツールを活用し、@ant-design/react-native蟻金服UIライブラリを組み合わせることで、AndroidとiOSシステムのクロスプラットフォームサポートを実現し、ユーザーがウェブサイトにアクセスしやすくしています。     
**機能モジュール**：ホーム、ナビゲーション、プロジェクト、メッセージ、マイページなど   
**技術ポイント**：

- React Navigationを使用してボトムナビゲーションフレームワークを構築し、スムーズなページ切り替えを実現
- Fetch APIを採用してネットワークリクエストを行い、Promiseを利用して非同期プロセスを簡素化
- React Hooks（useEffect + useState）を利用してデータ取得と状態更新を実現
- 再利用性の高いカスタムコンポーネントを設計し、コードの保守性と開発効率を向上
- ant-design/react-native-Carouselに基づくカルーセル効果の実装
- ant-design/react-native-Tabsに基づくタブ切り替えの実装

**プロジェクトプレビュー**

| ![][rn-waz-1] | ![][rn-waz-2] | ![][rn-waz-3] |
| ------------- | ------------- | ------------- |
| ![][rn-waz-4] | ![][rn-waz-5] | ![][rn-waz-6] |
| ![][rn-waz-7] | ![][rn-waz-8] | ![][rn-waz-9] |

#### 3—[ZhiHuRN](https://github.com/PGzxc/ZhiHuRN)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：ZhiHuRN（オープンソース+AI）
**プロジェクトURL**：https://github.com/PGzxc/ZhiHuRN
**ソフトウェアサポート**：Android+iOS
**開発ツール**：IntelliJ IDEA+Java(11.0.19)+Node(22.14.0)+Yarn(1.22.22)+react-native(0.76.7)+Expo(52)
**プロジェクト説明**：このプロジェクトは、React Nativeに基づいて開発された知乎風のモバイルアプリケーションです。ログイン登録、ホームページの投稿閲覧と投稿、ディスカバリーページの投稿検索、検索履歴の表示と人気トピックの提示、メッセージ通知、個人情報管理など、多くのコアページ機能が実装されています。      
**機能モジュール**：ログイン登録、ホーム、ディスカバリー、通知、マイページ   
**技術ポイント**：

- React Navigationを使用してボトムナビゲーションフレームワークを構築し、スムーズなページ切り替えを実現
- Reduxに基づいてグローバル状態管理を行い、データの一貫性と反応性を確保
- カスタムコンポーネントを設計・再利用し、コードの再利用性と保守性を向上
- async-storageとexpo-secure-storeを採用してローカルデータの安全なストレージを実現
- expo-image-picker（画像選択）、expo-image-manipulator（画像処理）、expo-file-system（ファイル操作）に基づく実装
- react-native-safe-area-context（セーフエリア処理）、react-native-screens（ネイティブスクリーンコンテナ）に基づく表示とパフォーマンスの問題処理

**プロジェクトプレビュー**

| ![][zh-rn-1] | ![][zh-rn-2]  | ![][zh-rn-3]  | ![][zh-rn-4] |
| :----------: | :-----------: | :-----------: | :----------: |
| ![][zh-rn-5] | ![][zh-rn-6]  | ![][zh-rn-7]  | ![][zh-rn-8] |
| ![][zh-rn-9] | ![][zh-rn-10] | ![][zh-rn-11] |              |


<!--swiperrn-az-->

[swiperrn-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-1-home-1.png
[swiperrn-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-2-home-2.png
[swiperrn-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-3-home-3.png
[swiperrn-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-4-home-4.png
[swiperrn-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-5-home-5.png
[swiperrn-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-6-home-6.png
[swiperrn-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-7-pub.png
[swiperrn-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-8-mg.png
[swiperrn-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-9-me.png

<!--swiperrn-ios-->

[swiperrn-ios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-1-home-1.png
[swiperrn-ios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-2-home-2.png
[swiperrn-ios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-3-home-3.png
[swiperrn-ios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-4-home-4.png
[swiperrn-ios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-5-album.png
[swiperrn-ios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-6-pub.png
[swiperrn-ios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-7-mgs.png
[swiperrn-ios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-8-me.png

<!--rn-waz-->
[rn-waz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-1-home.png
[rn-waz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-2-nav.png
[rn-waz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-3-project.png
[rn-waz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-4-msgunread.png
[rn-waz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-5-msgread.png
[rn-waz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-6-meunlogin.png
[rn-waz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-7-melogin.png
[rn-waz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-8-login.png
[rn-waz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-9-register.png

<!--rn-zhihu-->
[zh-rn-1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-login-1.png
[zh-rn-2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-register-2.png
[zh-rn-3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-login-3.png
[zh-rn-4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-home-4.png
[zh-rn-5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-detail-5.png
[zh-rn-6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-pub-6.png
[zh-rn-7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-fresh-7.png
[zh-rn-8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-dis-8.png
[zh-rn-9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-search-9.png
[zh-rn-10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-msg-10.png
[zh-rn-11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-me-11.png

<!--rn-todo-->
[rn-todo-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-1-login.png
[rn-todo-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-2-register.png
[rn-todo-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-3-todo-empty.png
[rn-todo-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-4-todo-addnil.png
[rn-todo-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-5-todo-choice.png
[rn-todo-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-6-todo-calendar.png