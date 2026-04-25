### <font color=red>一 Harmonyプロジェクト</font>

#### 1—[TeaOrderHM](https://github.com/PGzxc/TeaOrderHM)

**プロジェクト所属**：個人プロジェクト(プライベート)
**プロジェクト名**：TeaOrderHM — Harmony注文アプリ
**プロジェクトURL**：https://github.com/PGzxc/TeaOrderHM
**プラットフォームサポート**：スマートフォン/Pad
**API/SDK**：API Version 21
**開発言語**：ArkTS+ArkUI
**開発ツール**：DevEco Studio 6.0.1 Release
**プロジェクト説明**：ArkTSとArkUIをベースに開発されたHarmony注文アプリで、自作のJavaバックエンドインターフェースとVue管理プラットフォームと連携し、商品閲覧、サイズ選択、ショッピングカート管理、注文履歴確認などの機能を含む完全な注文プロセスを実現しています。
**機能モジュール**：

- 注文ページ ：商品カテゴリ表示、商品リスト閲覧、サイズ選択、ショッピングカート追加
- ショッピングカートページ ：商品数量調整、商品削除、ショッピングカート空にする、精算機能
- 注文履歴ページ ：注文履歴表示、注文詳細確認

**技術的ハイライト**：

- UIレイアウトアーキテクチャ ：Flexレイアウトとコンポーネントを採用してレスポンシブインターフェースを構築し、下部ナビゲーションバーとページコンテンツの合理的なレイアウトを実現
- 一般的なコンポーネント ：List、Button、Image、Textなどの公式コンポーネントを活用してコア機能インターフェースを構築
- 状態管理 ：@Stateデコレータを使用してデータ状態管理を実現し、データの変化とUIの同期を確保
- カスタムコンポーネント ：@Componentデコレータに基づいて再利用可能なページコンポーネントを構築
- ネットワークリクエスト：HttpUtilツールクラスをカプセル化してネットワークリクエストを実現し、GET、POST、PUT、DELETEなどのメソッドをサポート
- データモデル ：Product、Category、CartItem、Orderなどのデータモデルを定義し、データ構造を標準化
- インタラクション体験 ：サイズ選択ポップアップ、ショッピングカート数量調整、即時フィードバックなどのインタラクション機能を実現
- エラー処理メカニズム ：完善な例外捕捉とエラー処理を実装し、アプリの安定性を確保


**プロジェクトプレビュー**

| ![][tea-1] | ![][tea-2] | ![][tea-3] |
| :--------: | :--------: | :--------: |
| ![][tea-4] | ![][tea-5] | ![][tea-6] |
| ![][tea-7] | ![][tea-8] | ![][tea-9] |


#### 2—[SwiperHM](https://github.com/PGzxc/SwiperHM)

**プロジェクト所属**：個人プロジェクト(プライベート)
**プロジェクト名**：SwiperHM — Harmonyショートビデオアプリ
**プロジェクトURL**：https://github.com/PGzxc/SwiperHM
**プラットフォームサポート**：スマートフォン/Pad
**API/SDK**：API Version 17
**開発言語**：ArkTS+ArkUI
**開発ツール**：DevEco Studio 5.0.5 Release
**プロジェクト説明**：TikTokと小紅書を模倣したHarmonyプロジェクトで、api.apiopen.topのオープンインターフェースに基づいて、TikTokスタイルのビデオスワイプ切り替えを実現しています。
**機能モジュール**：ホーム、写真集、投稿、メッセージ、マイページ  
**技術的ハイライト**：

- Flex+Builder+scale+animationに基づいて小紅書スタイルの下部ナビゲーションを構築
- V1、V2状態管理に基づいてデータの変化とUIの同期を監視
- 公式ツールWindowUtilsに基づいて画面とウィンドウに適応
- カスタムコンポーネント：@Builderデコレータ、@Componentデコレータ
- サードパーティライブラリ：axios(ネットワークリクエスト)、pulltorefres(リフレッシュ/さらに読み込み)
- 一般的なコンポーネント：WaterFlow(瀑布流)、Swiper(ビデオスワイプ)、Tabs(ナビゲーションバー)など
- 音声/ビデオ：Videoコンポーネントと状態管理(再生、ループ、準備、開始、エラーなど)

**プロジェクトプレビュー**

| ![][swiperhm-1] | ![][swiperhm-2] | ![][swiperhm-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperhm-4] | ![][swiperhm-5] | ![][swiperhm-6] |
| ![][swiperhm-7] | ![][swiperhm-8] | ![][swiperhm-9] |

#### 3—[WanCJ](https://github.com/PGzxc/WanCJ)

**プロジェクト所属**：個人プロジェクト(オープンソース)
**プロジェクト名**：WanCJ
**プロジェクトURL**：https://github.com/PGzxc/WanCJ
**プラットフォームサポート**：スマートフォン/Pad
**API/SDK**：API Version 12
**開発言語**：蒼颉(.cj)+ArkUI
**開発ツール**：DevEco Studio NEXT Beta1+Node(18.18.2)
**プロジェクト説明**：このプロジェクトは、Harmony開発言語をArkTS(.ets)から蒼颉(.cj)に変換したオープンソースプロジェクトで、UIレイアウトはそのままに、蒼颉でロジックを記述し、ネットワークアクセスモジュール、カスタムコンポーネントなどをカプセル化することで、機能開発を迅速に完成させています。
**機能モジュール**：ホーム、コース、ツール、マイページ  
**技術的ハイライト**：

- Tabs+TabContentに基づいて下部ナビゲーションフレームワークを構築
- ohos.net.httpに基づいてネットワークリクエストを行い、Get、Postリクエストをカプセル化
- データクラスのシリアライゼーションとデシリアライゼーション
- JsonObjectをBeanに変換し、StringをJsonObjectに変換するツールクラスを構築
- @State、@Propなどのデコレータに基づいてネットワークデータを取得し、状態を更新
- @Builderデコレータに基づいてカスタムコンポーネントを作成し、extendで既存コンポーネント(メソッド)を拡張し、コードの再利用を減らす

**プロジェクトプレビュー**

| ![][wancj-1] | ![][wancj-2] | ![][wancj-3] | ![][wancj-4] |
| :----------: | :----------: | :----------: | :----------: |
| ![][wancj-5] | ![][wancj-6] | ![][wancj-7] | ![][wancj-8] |

#### 4—[WanAndroidHM](https://github.com/PGzxc/WanAndroidHM)

**プロジェクト所属**：個人プロジェクト(オープンソース)
**プロジェクト名**：WanAndroidHM
**プロジェクトURL**：https://github.com/PGzxc/WanAndroidHM
**プラットフォームサポート**：スマートフォン/Pad
**API/SDK**：API Version 12
**開発言語**：ArkTS+ArkUI
**開発ツール**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**プロジェクト説明**：このプロジェクトは、WanAndroidウェブサイトのオープンソースAPIをベースに作成されたHarmonyオープンソースhapです。Harmonyのレイアウト、コンポーネント、APIを利用して開発された、Harmony全シリーズをサポートするアプリケーションです。
**機能モジュール**：ホーム、ナビゲーション、プロジェクト、メッセージ、マイページなど  
**技術的ハイライト**：

- Tabs + TabBarを使用して下部ナビゲーションフレームワークを構築し、マルチモジュールの切り替えとページ管理を実現
- @ohos.net.httpに基づいてネットワークリクエストを送信し、Promiseを採用して非同期操作フローを簡素化
- @State、@Propなどのデコレータを通じてネットワークデータのバインディングと状態更新を管理
- @Builder、@Extendなどのデコレータを利用してカスタムコンポーネントをカプセル化し、コードの再利用を減らす
- preferencesとPersistentStorageを使用してユーザーデータの永続化ストレージを実現
- router、Navigatorページルーティングとコンポーネントナビゲーション、およびpageTransitionトランジションアニメーションに基づく
- @ohos/pulltorefresを統合してページのプルダウンリフレッシュとプルアップロード機能を実現

**プロジェクトプレビュー**

| ![][waz-hm-1]  | ![][waz-hm-2]  | ![][waz-hm-3]  | ![][waz-hm-4]  |
| :------------: | :------------: | :------------: | :------------: |
| ![][waz-hm-5]  | ![][waz-hm-6]  | ![][waz-hm-7]  | ![][waz-hm-8]  |
| ![][waz-hm-9]  | ![][waz-hm-10] | ![][waz-hm-11] | ![][waz-hm-12] |
| ![][waz-hm-13] | ![][waz-hm-14] | ![][waz-hm-15] | ![][waz-hm-16] |

#### 5—[BookHM](https://github.com/PGzxc/BookHM)

**プロジェクト所属**：個人プロジェクト(オープンソース)
**プロジェクト名**：BookHM
**プロジェクトURL**：https://github.com/PGzxc/BookHM
**プラットフォームサポート**：スマートフォン/Pad
**API/SDK**：API Version 10
**開発言語**：ArkTS+ArkUI
**開発ツール**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**プロジェクト説明**：これは読書アプリのOpenHarmonyバージョンです。ListとGridを使用して図書情報の表示を処理し、下部にTabsナビゲーションコンポーネントを使用しています。このアプリのデータはローカルデータを模擬して返しています。
**機能モジュール**：読書、本棚、読書、マイページ  
**技術的ハイライト**：

- Tabs+tabBarに基づいて下部ナビゲーションフレームワークを構築
- @State、@Propなどのデコレータに基づいて状態を更新
- `@Watch('changeTab')`に基づいてtabの切り替えを監視し、対応するTabデータを設定
- @Builder、@Extendなどのデコレータに基づいてカスタムコンポーネントを作成し、コードの再利用を減らす
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


<!--tea-hm-->
[tea-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-1-buy-view.png
[tea-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-2-cart-no.png
[tea-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-3-order-old.png
[tea-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-4-buy-mid.png
[tea-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-5-buy-little.png
[tea-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-6-buy-big.png
[tea-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-7-cart-has.png
[tea-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-8-cart-add.png
[tea-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-9-order-has.png

