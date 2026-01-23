

### <font color=red>2. Androidプロジェクト</font>

#### 1—[SwiperAndroid](https://github.com/PGzxc/SwiperAndroid)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：SwiperAndroid(プライベート)
**プロジェクトアドレス**：https://github.com/PGzxc/SwiperAndroid
**ソフトウェアサポート**：Android
**開発ツール**：Android Studio(2025.2.2)+Java(17.0.15)+Gradle(8.14.3)+Kotlin(2.0.21)+Trae
**プロジェクト説明**：独立開発の Android ショートビデオ + 画像ギャラリー閲覧アプリで、Jetpack Compose を採用して現代的な宣言型 UI を実現。製品形態は抖音/小紅書のショートビデオと画像コミュニティを参考にしており、スムーズな動画/画像のスワイプ閲覧、カテゴリ別表示、およびフルスクリーン没入型インタラクティブ体験を提供。     
**機能モジュール**：

* ホーム：同城 / フォロー / おすすめのマルチタブコンテンツフロー、左右スワイプ切り替えに対応
* ギャラリー：画像のウォーターフォール表示、カテゴリ別とページングロードに対応
* 公開：コンテンツ公開エントリー、インタラクティブアニメーションフィードバックを含む
* メッセージ：システム通知とユーザーインタラクションメッセージ
* マイページ：ユーザー情報、作品リストと設定管理

**技術ポイント**：

- アーキテクチャ設計：MVVM アーキテクチャを採用し、ViewModel に基づいて UI とビジネスロジックの分離を実現
- UIフレームワーク：Jetpack Compose を使用して宣言型 UI を構築し、レスポンシブレイアウトとスムーズなアニメーションを実現
- 状態管理：Compose State + LaunchedEffect + ViewModel を通じてページ状態と副作用を管理
- ネットワークとデータ：Retrofit + OkHttp + Gson + Coroutines を統合し、効率的な非同期ネットワークリクエストとデータ解析を実現
- 動画再生：ExoPlayer でリストの自動再生、フルスクリーン切り替え、再生制御(StyledPlayerView)を実現
- 画像処理：Glide で効率的なキャッシュとロードを実現し、長いリストのスクロールパフォーマンスを最適化
- ジェスチャーインタラクション：Compose ジェスチャー API に基づいて画像のズーム、下にスライドして閉じるなどの没入型インタラクティブ体験を実現
- 画面適応：レスポンシブレイアウト + WindowInsets、ノッチスクリーン、システムバー、様々な画面サイズに適応
- ビルドと依存関係：Gradle Kotlin DSL + Version Catalog + Compose BOM で依存関係とバージョンを一元管理
- マルチABIサポート：ABI を合理的に分割し、インストールパッケージサイズと互換性を向上

**プロジェクトプレビュー**

| ![][swiperaz-1] | ![][swiperaz-2] | ![][swiperaz-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperaz-4] | ![][swiperaz-5] | ![][swiperaz-6] |
| ![][swiperaz-7] | ![][swiperaz-8] | ![][swiperaz-9] |

#### 2—[WanAndroid_ComposeUI](https://github.com/PGzxc/WanAndroid_ComposeUI)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：WanAndroid_ComposeUI
**プロジェクトアドレス**：https://github.com/PGzxc/WanAndroid_ComposeUI
**ソフトウェアサポート**：Android
**開発ツール**：Android Studio(2022.2.1)+Java(17.0.6)+Gradle(8.0-bin)+Kotlin(1.7.20)
**プロジェクト説明**：このプロジェクトは、WanAndroid ウェブサイトのオープンソース API に基づいて作成された Android ComposeUI オープンソースアプリです。ComposeUI が提供するレイアウト（Row、Column、Box）とコンポーネント（Text、Button、Card、TabRow など）を活用して、インターフェースレイアウトを迅速に実現し、インターフェースプレビューをタイムリーに確認し、Okhttp3+Retrofit2+Converter-Gson を利用してネットワークリクエストとデータのカプセル化を実行し、個人アプリ開発を迅速に実現します。     
**機能モジュール**：ホーム、ナビゲーション、プロジェクト、メッセージ、マイページ、設定など   
**技術ポイント**：

- Okhttp3+Retrofit2+Converter-Gson に基づいてプロジェクトのネットワークアクセスフレームワークを構築
- PersistentCookieJar に基づいてログイン Cookie を自動保存
- Lifecycle-Viewmodel に基づいて MVVM フレームワークを構築
- navigation-compose に基づいてページナビゲーションを構築
- accompanist-pager に基づいてページングレイアウトサポートを実現
- accompanist-swiperefresh に基づいてページリフレッシュを実現
- accompanist-webview に基づいてウェブページの詳細を表示
- accompanist-flowlayout に基づいてフローレイアウトを実現
- mmkv に基づいて永続的なストレージデータを保存
- material-icons-core、material-icons-extended システムアイコンを使用

**プロジェクトプレビュー**

| ![][com-az-1] | ![][com-az-2]  | ![][com-az-3]  | ![][com-az-4]  |
| ------------- | -------------- | -------------- | -------------- |
| ![][com-az-5] | ![][com-az-6]  | ![][com-az-7]  | ![][com-az-8]  |
| ![][com-az-9] | ![][com-az-10] | ![][com-az-11] | ![][com-az-12] |

#### 3—[Live ](https://github.com/PGzxc/Live)

**プロジェクト帰属** ：個人プロジェクト
**プロジェクト名**：Android プロジェクト—Live
**ソフトウェアサポート**：Android 6.0+
**プロジェクトアドレス**：https://github.com/PGzxc/Live
**開発ツール**：Android Studio + Github
**プロジェクト説明**：Live は個人のオープンソースプロジェクトで、「映客」ライブ配信プラットフォームのインタラクションと機能設計を模倣し、ホームページ、周辺、ライブ配信、フォロー、マイページなどのコアモジュールをカバーしています。プロジェクトは、ライブルームチャット、弾幕、ギフトエフェクトなどのコア機能を実現し、プルダウンリフレッシュと複数のコンテンツ表示レイアウトをサポートしています。     
**機能モジュール**：ホームページ、周辺、ライブ配信、フォロー、マイページなど   
**技術ポイント**：

- Bottom Bar+Fragmentation+DataBinding に基づいて開発フレームワークを構築
- 七牛雲に基づいてストリーミング(PLDroidMediaStreaming)と再生(PLDroidPlayer)を実現
- 環信チャットルームに基づいてライブルームチャットを実現
- BaseRecycleViewAdapterHelper に基づいて複数のレイアウトを実現
- SmartReFreshLayout に基づいてプルダウンリフレッシュとプルアップロードを実現
- HeartLayout に基づいてハートアニメーションを実現
- ViewAnimator に基づいてチャット弾幕とギフトエフェクトを実現
- RAP を使用してインターフェースデータをシミュレート

**プロジェクトプレビュー**

| ![][live-1] | ![][live-2]  | ![][live-3] | ![][live-4] |
| ----------- | ------------ | ----------- | ----------- |
| ![][live-5] | ![][live-6]  | ![][live-7] | ![][live-8] |
| ![][live-9] | ![][live-10] | ![][live-11]| ![][live-12]|
| ![][live-13]| ![][live-14] | ![][live-15]| ![][live-16]|
| ![][live-17]| ![][live-18] | ![][live-19]| ![][live-20]|


<!--swiper-android-->
[swiperaz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-1-rec-play.png
[swiperaz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-2-rec-pause.png
[swiperaz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-3-focus.png
[swiperaz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-4-city.png
[swiperaz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-5-first.png
[swiperaz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-6-big.png
[swiperaz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-7-pub.png
[swiperaz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-8-msg.png
[swiperaz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-9-me.png


<!--android-WanAndroid_ComposeUI-->
[com-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-home-1.png
[com-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-tree-2.png
[com-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-project-3.png
[com-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-msg-4.png
[com-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-msg-5.png
[com-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-msg-6.png
[com-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-me-7.png
[com-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-me-8.png
[com-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-login-9.png
[com-az-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-login-10.png
[com-az-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-setting-11.png
[com-az-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-web-12.png

<!--own project-live-->
[live-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-app-splash-1.png
[live-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-user-login.png
[live-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-recommend-3.png
[live-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-recommend-update-4.png
[live-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-small-video-5.png
[live-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-game-chiji-6.png
[live-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-nearby-live-7.png
[live-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-nearby-live-update-8.png
[live-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-play-type-choice-9.png
[live-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-care-people-10.png
[live-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-care-people-change-11.png
[live-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-me-view-12.png
[live-13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-view-13.png
[live-14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-view-update-14.png
[live-15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-people-info-15.png
[live-16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-gif-choice-16.png
[live-17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-gif-send-17.png
[live-18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-gif-send-18.png
[live-19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-room-input-message-19.png
[live-20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-room-message-20.png
<!--live-chat-->
[live-hx-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-hx-user-register-1.png
[live-hx-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-hx-room-manager-2.png
[live-hx-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-hx-chat-room-3.png