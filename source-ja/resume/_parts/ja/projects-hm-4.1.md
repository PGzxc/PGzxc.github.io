

### <font color=red>1. Harmonyプロジェクト</font>

#### 1—[SwiperHM](https://github.com/PGzxc/SwiperHM)

**プロジェクト帰属**：個人プロジェクト(非公開)
**プロジェクト名**：SwiperHM
**プロジェクトアドレス**：https://github.com/PGzxc/SwiperHM
**ソフトウェアサポート**：Harmony全シリーズ
**APIバージョン**：API Version 17
**開発言語**：ArkTS+ArkUI
**開発ツール**：DevEco Studio 5.0.5 Release
**プロジェクト説明**：TikTok・レディースガジェットを模倣したHarmonyプロジェクトで、api.apiopen.topのオープンインターフェースに基づき、TikTokスタイルの動画スワイプ切り替えを実装しています 
**機能モジュール**：ホーム、ギャラリー、公開、メッセージ、マイページ   
**技術ポイント**：

- Flex+Builder+scale+animationに基づいてレディースガジェットスタイルのボトムナビゲーションを構築
- V1、V2状態管理に基づいてデータ変更とUI同期を監視
- 公式ツールWindowUtilsに基づいて画面とウィンドウを適応
- カスタムコンポーネント：@Builderデコレータ、@Componentデコレータ

* サードパーティライブラリ：axios(ネットワークリクエスト)、pulltorefres(リフレッシュ/ページング)
* 一般的なコンポーネント：WaterFlow(カスケードフロー)、Swiper(動画スワイプ)、Tabs(ナビゲーションバー)など
* 音声・動画：Videoコンポーネントと状態管理(再生、ループ、準備、開始、エラーなど)

**プロジェクトプレビュー**

| ![][swiperhm-1] | ![][swiperhm-2] | ![][swiperhm-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperhm-4] | ![][swiperhm-5] | ![][swiperhm-6] |
| ![][swiperhm-7] | ![][swiperhm-8] | ![][swiperhm-9] |

#### 2—[WanCJ](https://github.com/PGzxc/WanCJ)

**プロジェクト帰属**：個人プロジェクト(オープンソース)
**プロジェクト名**：WanCJ
**プロジェクトアドレス**：https://github.com/PGzxc/WanCJ
**ソフトウェアサポート**：Harmony全シリーズ
**APIバージョン**：API Version 12
**開発言語**： Cangjie(.cj)+ArkUI
**開発ツール**：DevEco Studio NEXT Beta1+Node(18.18.2)
**プロジェクト説明**：このプロジェクトは、Harmony開発言語をArkTS(.ets)からCangjie(.cj)に変換したオープンソースプロジェクトで、UIレイアウトは変更せず、Cangjieでロジックを記述し、ネットワークアクセスモジュール、カスタムコンポーネントなどをカプセル化した上で、機能開発を迅速に完成させています     
**機能モジュール**：ホーム、コース、ツール、マイページ   
**技術ポイント**：

- Tabs+TabContentに基づいてボトムナビゲーションフレームワークを構築
- ohos.net.httpに基づいてネットワークリクエストを実行し、Get、Postリクエストをカプセル化
- データクラスのシリアライゼーションとデシリアライゼーション
- ツールクラスを構築してJsonObjectをBeanに、StringをJsonObjectに変換
- @State、@Propなどのデコレータに基づいてネットワークデータを取得し、状態を更新
- @Builderデコレータに基づいてカスタムコンポーネントを作成し、extendで既存コンポーネント(メソッド)を拡張し、再利用コードを削減

**プロジェクトプレビュー**

| ![][wancj-1] | ![][wancj-2] | ![][wancj-3] | ![][wancj-4] |
| :----------: | :----------: | :----------: | :----------: |
| ![][wancj-5] | ![][wancj-6] | ![][wancj-7] | ![][wancj-8] |

#### 3—[WanAndroidHM](https://github.com/PGzxc/WanAndroidHM)

**プロジェクト帰属**：個人プロジェクト(オープンソース)
**プロジェクト名**：WanAndroidHM
**プロジェクトアドレス**：https://github.com/PGzxc/WanAndroidHM
**ソフトウェアサポート**：Harmony全シリーズ
**APIバージョン**：API Version 12
**開発言語**：ArkTS+ArkUI
**開発ツール**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**プロジェクト説明**：このプロジェクトは、WanAndroidウェブサイトのオープンAPIに基づいて作成されたHarmonyオープンソースhapです。Harmonyのレイアウト、コンポーネント、APIを利用して開発された、Harmony全シリーズをサポートするアプリケーションです。     
**機能モジュール**：ホーム、ナビゲーション、プロジェクト、メッセージ、マイページなど   
**技術ポイント**：

- Tabs + TabBarを使用してボトムナビゲーションフレームワークを構築し、マルチモジュール切り替えとページ管理を実現
- @ohos.net.httpに基づいてネットワークリクエストを送信し、Promiseを採用して非同期操作フローを簡素化
- @State、@Propなどのデコレータを通じてネットワークデータのバインディングと状態更新を管理
- @Builder、@Extendなどのデコレータを利用してカスタムコンポーネントをカプセル化し、再利用コードを削減
- preferencesとPersistentStorageを使用してユーザーデータの永続化ストレージを実現
- router、Navigatorページルーティングとコンポーネントナビゲーション、およびpageTransitionトランジションアニメーションに基づく
- @ohos/pulltorefresを統合してページのプルダウンリフレッシュとプルアップロード機能を実現

**プロジェクトプレビュー**

| ![][waz-hm-1]  | ![][waz-hm-2]  | ![][waz-hm-3]  | ![][waz-hm-4]  |
| :------------: | :------------: | :------------: | :------------: |
| ![][waz-hm-5]  | ![][waz-hm-6]  | ![][waz-hm-7]  | ![][waz-hm-8]  |
| ![][waz-hm-9]  | ![][waz-hm-10] | ![][waz-hm-11] | ![][waz-hm-12] |
| ![][waz-hm-13] | ![][waz-hm-14] | ![][waz-hm-15] | ![][waz-hm-16] |

#### 4—[BookHM](https://github.com/PGzxc/BookHM)

**プロジェクト帰属**：個人プロジェクト(オープンソース)
**プロジェクト名**：BookHM
**プロジェクトアドレス**：https://github.com/PGzxc/BookHM
**ソフトウェアサポート**：Harmony全シリーズ
**APIバージョン**：API Version 10
**開発言語**：ArkTS+ArkUI
**開発ツール**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**プロジェクト説明**：これは読書アプリのOpenHarmonyバージョンです。ListとGridを使用して図書情報の表示を処理し、下部にTabsナビゲーションコンポーネントを使用しています。このアプリのデータは、ローカルデータを使用して模擬的に返しています。
**機能モジュール**：読書、ブックシェルフ、読書、マイページ   
**技術ポイント**：

- Tabs+tabBarに基づいてボトムナビゲーションフレームワークを構築
- @State、@Propなどのデコレータに基づいて状態を更新
- `@Watch('changeTab')`に基づいてtab切り替えを監視し、対応するTabデータを設定
- @Builder、@Extendなどのデコレータに基づいてカスタムコンポーネントを作成し、再利用コードを削減
- router、Navigatorページルーティングとコンポーネントナビゲーション、およびpageTransitionトランジションアニメーションに基づく

**プロジェクトプレビュー**

| ![][hm-read-1] | ![][hm-read-2] | ![][hm-read-3] |
| -------------- | -------------- | -------------- |
| ![][hm-read-4] | ![][hm-read-5] | ![][hm-read-6] |


<!--hm-swiperhm-->
[swiperhm-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-rec-1.png
[swiperhm-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-rec-2.png
[swiperhm-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-focus-3.png
[swiperhm-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-focus-4.png
[swiperhm-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-5.png
[swiperhm-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-6.png
[swiperhm-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-7.png
[swiperhm-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-8.png
[swiperhm-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-pub-9.png

<!--hm-wancj-->
[wancj-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-1-home-normal.png
[wancj-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-2-home-fresh.png
[wancj-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-3-course.png
[wancj-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-4-course-list.png
[wancj-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-5-tool.png
[wancj-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-6-me.png
[wancj-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-7-me-data.png
[wancj-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-8-login.png
[wancj-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-9-register.png

<!--hm-waz-->
[waz-hm-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-splash-0.png
[waz-hm-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-home-1.png
[waz-hm-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-nav-2.png
[waz-hm-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-navlist-3.png
[waz-hm-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-project-4.png
[waz-hm-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-msg-5.png
[waz-hm-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-msg-6.png
[waz-hm-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-me-7.png
[waz-hm-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-me-8.png
[waz-hm-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-login-9.png
[waz-hm-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-register-10.png
[waz-hm-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-me-set-11.png
[waz-hm-13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-home-refresh-12.png
[waz-hm-14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-home-loadmore-13.png
[waz-hm-15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-rank-14.png
[waz-hm-16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-coin-15.png

<!--hm-read-->
[hm-read-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_1_read.png
[hm-read-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_2_book_pro.png
[hm-read-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_3_book_rec.png
[hm-read-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_4_voice_his.png
[hm-read-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_5_voice_per.png
[hm-read-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_6_me.png