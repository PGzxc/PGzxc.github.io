

### <font color=red>6. Kotlin Multiplatform Mobileプロジェクト</font>

#### 1—[SwiperKMP](https://github.com/PGzxc/SwiperKMP)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：SwiperKMP（プライベート）
**プロジェクトURL**：https://github.com/PGzxc/SwiperKMP
**ソフトウェアサポート**：クロスプラットフォーム（Android、iOS、JVM、Web）
**開発ツール**：IDEA(2025.3.1)+Compose Multiplatform(1.9.3)+Gradle(8.14.3)+AS+Xcode
**プロジェクト説明**：独立開発のクロスプラットフォームショートビデオ+画像ギャラリー閲覧アプリで、Compose Multiplatformを採用して一度のコーディングで複数プラットフォームで動作する最新の宣言型UIを実現。製品形態はTikTok/レディースガジェットのショートビデオと画像コミュニティを参考にしており、スムーズな動画/画像のスワイプ閲覧、カテゴリ別表示、フルスクリーン没入型インタラクティブ体験を提供し、Android、iOS、JVMなどの複数プラットフォームをサポート。    
**機能モジュール**：

* ホーム：地域/フォロー/おすすめのマルチタブコンテンツフロー、左右スワイプ切り替えに対応
* ギャラリー：画像のウォーターフォール表示、カテゴリ別とページングロードに対応
* 投稿：コンテンツ投稿エントリー、インタラクティブアニメーションフィードバックを含む
* メッセージ：システム通知とユーザーインタラクションメッセージ
* マイページ：ユーザー情報、作品リストと設定管理

**技術ポイント**：

- アーキテクチャ設計：クロスプラットフォームアーキテクチャを採用し、Kotlin Multiplatformに基づいてコード共有を実現し、プラットフォーム固有のコードを分離
- UIフレームワーク：Compose Multiplatformを使用して宣言型UIを構築し、クロスプラットフォームのレスポンシブレイアウトとスムーズなアニメーションを実現
- 状態管理：Compose State + LaunchedEffect + ViewModelを通じてクロスプラットフォームのページ状態と副作用を管理
- ネットワークとデータ：Ktor + Kotlinx Serialization + Coroutinesで効率的な非同期ネットワークリクエストとデータ解析を実現
- 動画再生：クロスプラットフォーム動画再生、AndroidはExoPlayerを使用、JVMはJavaFXを使用
- 画像処理：Coilでクロスプラットフォームの効率的なキャッシュとロードを実現し、長いリストのスクロールパフォーマンスを最適化
- ジェスチャーインタラクション：ComposeジェスチャーAPIに基づいてクロスプラットフォームで一貫した画像のズーム、下にスライドして閉じるなどの没入型インタラクティブ体験を実現
- 画面適応：レスポンシブレイアウト+プラットフォーム固有のWindowInsets処理、ノッチスクリーン、システムバー、様々な画面サイズに適応
- ビルドと依存関係：Gradle Kotlin DSL + Version Catalogでクロスプラットフォームの依存関係とバージョンを一元管理
- マルチプラットフォームサポート：Android、iOS、JVM、Webのマルチプラットフォームビルド、プラットフォーム固有のコードの最小化

**プロジェクトプレビュー-Android**

| ![][swkmp-az-1]  | ![][swkmp-az-2]  | ![][swkmp-az-3] |
| :--------------: | :--------------: | :-------------: |
| ![][swkmp-az-4]  | ![][swkmp-az-5]  | ![][swkmp-az-6] |
| ![][swkmp-az-7]  | ![][swkmp-az-8]  | ![][swkmp-az-9] |
| ![][swkmp-az-10] | ![][swkmp-az-11] |                 |


**プロジェクトプレビュー-IOS**

| ![][swkmp-ios-1]  | ![][swkmp-ios-2]  | ![][swkmp-ios-3] |
| :---------------: | :---------------: | :--------------: |
| ![][swkmp-ios-4]  | ![][swkmp-ios-5]  | ![][swkmp-ios-6] |
| ![][swkmp-ios-7]  | ![][swkmp-ios-8]  | ![][swkmp-ios-9] |
| ![][swkmp-ios-10] | ![][swkmp-ios-11] |                  |



#### 2—[WanAndroidKMP](https://github.com/PGzxc/WanAndroidKMP)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：WanAndroidKMP
**プロジェクトURL**：https://github.com/PGzxc/WanAndroidKMP
**ソフトウェアサポート**：Android+IOS+Desk(Mac/Windows/Linux)
**開発ツール**：Android Studio(2022.3.1)+Java(17.0.6)+Gradle(8.0.2-bin)+Kotlin(1.9.0)
**プロジェクト説明**：本プロジェクトはWanAndroid APIに基づいて開発され、Compose Multiplatformを採用してクロスプラットフォームインターフェースを構築し、ユーザーログイン、登録、記事閲覧、プロジェクト、ナビゲーション、メッセージなどのコア機能をサポート。複数のプラットフォームに適応。     
**機能モジュール**：ホーム、ナビゲーション、プロジェクト、メッセージ、マイページ、設定など   
**技術ポイント**：

- テンプレートcompose-multiplatform-templateに基づいてプロジェクトを作成
- NavigationBarに基づいてボトムナビゲーションフレームワークを構築
- ネットワーク部分：ktor-coreコアライブラリ+ktor-serialization-kotlinx-jsonシリアライゼーション
- Navigatorに基づいてインターフェース間のナビゲーションを実現
- kamel-imageに基づいてネットワーク画像を表示・ロード
- kstore-fileとkstoreに基づいてクロスプラットフォームのファイルとデータストレージを実現
- compose.materialIconsExtendedに基づいてIconsアイコンを表示

**プロジェクトプレビュー**

Androidスクリーンショット

| ![][kmpwaz-az-1] | ![][kmpwaz-az-2] | ![][kmpwaz-az-3] |
| :--------------: | :--------------: | :--------------: |
| ![][kmpwaz-az-4] | ![][kmpwaz-az-5] | ![][kmpwaz-az-6] |
| ![][kmpwaz-az-7] | ![][kmpwaz-az-8] | ![][kmpwaz-az-9] |

IOSスクリーンショット

| ![][kmpwaz-ios-1] | ![][kmpwaz-ios-2] | ![][kmpwaz-ios-3] |
| :---------------: | :---------------: | :---------------: |
| ![][kmpwaz-ios-4] | ![][kmpwaz-ios-5] | ![][kmpwaz-ios-6] |
| ![][kmpwaz-ios-7] | ![][kmpwaz-ios-8] | ![][kmpwaz-ios-9] |


<!--WanAndroid-az-->
[kmpwaz-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-home-1.png
[kmpwaz-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-navigator-2.png
[kmpwaz-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-project-3.png
[kmpwaz-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-msg-4.png
[kmpwaz-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-msg-5.png
[kmpwaz-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-me-6.png
[kmpwaz-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-me-7.png
[kmpwaz-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-login-8.png
[kmpwaz-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-register-9.png
<!--WanAndroid-ios-->
[kmpwaz-ios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-home-1.png
[kmpwaz-ios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-navigator-2.png
[kmpwaz-ios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-project-3.png
[kmpwaz-ios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-msg-4.png
[kmpwaz-ios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-msg-5.png
[kmpwaz-ios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-me-6.png
[kmpwaz-ios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-me-7.png
[kmpwaz-ios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-login-8.png
[kmpwaz-ios-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-register-9.png

<!--swiperkmp-az-->
[swkmp-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-1-home.png
[swkmp-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-2-pause.png
[swkmp-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-3-focus.png
[swkmp-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-4-city.png
[swkmp-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-5-album.png
[swkmp-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-6-other.png
[swkmp-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-7-big.png
[swkmp-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-8-pub.png
[swkmp-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-9-msg.png
[swkmp-az-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-10-me.png
[swkmp-az-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-11-me2.png

<!--swiperkmp-ios-->
[swkmp-ios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-1-home.png
[swkmp-ios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-2-pause.png
[swkmp-ios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-3-focus.png
[swkmp-ios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-4-city.png
[swkmp-ios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-5-album.png
[swkmp-ios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-6-other.png
[swkmp-ios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-7-big.png
[swkmp-ios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-8-pub.png
[swkmp-ios-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-9-msg.png
[swkmp-ios-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-10-me.png
[swkmp-ios-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-11-me2.png