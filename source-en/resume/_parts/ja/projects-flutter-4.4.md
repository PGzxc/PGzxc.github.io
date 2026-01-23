

### <font color=red>4. Flutterプロジェクト</font>

#### 1—[SwiperFlutter](https://github.com/PGzxc/SwiperFlutter)

**プロジェクト帰属** ：個人プロジェクト
**プロジェクト名**：SwiperFlutter(プライベート)
**プロジェクトアドレス**：https://github.com/PGzxc/SwiperFlutter
**ソフトウェアサポート**：Android+IOS+Web+Windows+Mac+Linux
**開発ツール**：IDEA(2025.3.1)+Flutter(3.38.5)+Trae(AIプログラミングアシスタント)
**プロジェクト説明**：Flutter フレームワークに基づいて独立開発されたクロスプラットフォームショートビデオ + 画像テキストコミュニティアプリで、Android / iOS / Web / Windows / macOS / Linux の6つのプラットフォームで動作し、1セットのコードで複数プラットフォームにデプロイ可能。製品形態とインタラクティブ体験は抖音 / 小紅書を参考にしており、動画ストリーム再生、画像のウォーターフォール閲覧、および完全なユーザーインタラクションシステムを実現し、最新の UI と全プラットフォームレスポンシブ適応能力を備えています。     
**機能モジュール**：

* ホーム：抖音スタイルの縦方向動画ストリーム、上下スワイプ切り替え、自動再生、ジェスチャーインタラクションに対応
* ギャラリー：画像のウォーターフォール表示、カテゴリ別閲覧とページングロードに対応
* 公開：ボトム統一公開エントリー、複数種類のコンテンツ公開に対応
* メッセージ：システム通知とユーザーインタラクションメッセージ
* マイページ：個人情報管理と個人コンテンツ表示

**技術ポイント**：

- クロスプラットフォーム開発：Flutter + Dart に基づき、1セットのコードで複数端末に適応
- アーキテクチャ設計：MVVM アーキテクチャを採用し、UI とビジネスロジックの分離を実現し、コードの保守性を向上
- 状態管理：Riverpod を使用してグローバルおよびページ状態を管理し、状態の予測可能性とテスト可能性を保証
- ネットワークとデータ：Dio + インターセプター + データキャッシュ、json_serializable と組み合わせて自動シリアル化
- 動画再生：video_player に基づき、自動再生、ジェスチャー制御、ライフサイクル管理に対応
- 画像最適化：cached_network_image を使用して画像キャッシュを実現し、リストのスクロールパフォーマンスを向上
- ウォーターフォールレイアウト：flutter_staggered_grid_view を通じて画像のウォーターフォール表示を実現
- UI コンポーネント：flutter_svg を使用してベクトルアイコンをサポートし、最新の UI スタイルを構築
- 画面適応：レスポンシブレイアウト方案を採用し、異なる画面サイズと解像度に適応

**プロジェクトプレビュー**

| ![][swiperft-1] | ![][swiperft-2] | ![][swiperft-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperft-4] | ![][swiperft-5] | ![][swiperft-6] |
| ![][swiperft-7] | ![][swiperft-8] | ![][swiperft-9] |

#### 2—[Flutter-WanAndroid ](https://github.com/PGzxc/flutter_wanandroid)

**プロジェクト帰属** ：個人プロジェクト
**プロジェクト名**：Flutter-wanandroid(オープンソース)
**プロジェクトアドレス**：https://github.com/PGzxc/flutter_wanandroid
**ソフトウェアサポート**：Android+IOS
**開発ツール**：IDEA コミュニティ版 2022.1+Flutter(3.0.2) 
**プロジェクト説明**：Flutter-WanAndroid は WanAndroid ウェブサイトのオープン API に基づいて開発されたオープンソースモバイルアプリケーションで、ユーザーに便利な記事閲覧、プロジェクト分類、知識体系などの機能体験を提供することを目的としています。     
**機能モジュール**：ホーム、ナビゲーション、プロジェクト、メッセージ、マイページ、言語、テーマ   
**技術ポイント**：

- GetX+getWidget に基づいて開発フレームワークを構築
- GetX-GetConnect に基づいてネットワークリクエストを構築
- json_serializable+build_runner に基づいてネットワーク返却結果をカプセル化
- shared_preference に基づいてユーザーログイン結果と言語/テーマ設定を保存
- flutter_pulltorefresh に基づいてプルダウンリフレッシュとプルアップロードを実現
- shimmer に基づいてネットワークリクエスト時のプレビュー効果表示を実現
- webview-flutter に基づいてウェブページ効果を表示
- flutter_native_splash に基づいてプロジェクト起動デフォルト画面を設定し、ホワイトスクリーンを防止
- KeepAliveWrapper に基づいてリストアイテムをキャッシュし、複数回のロードを防止
- Google コンポーネント getWidget-badges に基づいて、未読メッセージを表示
- flutter_screenutil を使用して画面適応を行う

**プロジェクトプレビュー**

| ![][w-1] | ![][w-2]  | ![][w-3] | ![][w-4] |
| -------- | --------- | -------- | -------- |
| ![][w-5] | ![][w-6]  | ![][w-7]| ![][w-8] |
| ![][w-9] | ![][w-10] | ![][w-11]| ![][w-12]|
| ![][w-13]| ![][w-14] | ![][w-15]| ![][w-16]|

####  3—[Flutter-zhihu-getx](https://github.com/PGzxc/flutter_zhihu_getx)

**プロジェクト帰属**：個人プロジェクト
**プロジェクト名**：Flutter_zhihu_getx(オープンソース)
**プロジェクトアドレス**：https://github.com/PGzxc/flutter_zhihu_getx
**ソフトウェアサポート**：Android+IOS
**開発ツール**：IDEA コミュニティ版 2022.2.4+Flutter(3.7.3)
**プロジェクト説明**：このプロジェクトは、知乎 App を模倣したクロスプラットフォームオープンソースプロジェクトで、Flutter で構築され、Android と iOS の両端末での実行をサポートしています。プロジェクトは GetX 状態管理フレームワークに基づいており、複数のオープンソース UI コンポーネントライブラリを組み合わせて、ホームページ、推奨、フォロー、Q&A などのコアモジュールを実現しています。     
**機能モジュール**：ホーム、フォロー、公開、会員、マイページ   
**技術ポイント**：

- GetX+nav_sheet に基づいてプロジェクト開発フレームワークを構築
- GetX に基づいてビュー View とコントローラー Controller を分離し、bindings を通じて両者を結合
- flutter_pulltorefresh に基づいてプルダウンリフレッシュとプルアップロードを実現
- staggered_grid_view に基づいて錯開表示の画像リストを実現
- flutter_quill に基づいてリッチテキストエディタを実現
- flutter_tindercard に基づいてスワイプして前のカードを削除し、次のカード情報を取得する機能を実現
- KeepAliveWrapper に基づいてリストアイテムをキャッシュし、複数回のロードを防止
- getwidget、remixicon、font_awesome_flutter に基づいてプロジェクト内のアイコンとコンポーネントを実現

**プロジェクトプレビュー**

| ![][zh-1] | ![][zh-2]  | ![][zh-3] | ![][zh-4] |
| --------- | ---------- | --------- | --------- |
| ![][zh-5] | ![][zh-6]  | ![][zh-7] | ![][zh-8] |
| ![][zh-9] | ![][zh-10] |           |           |


<!--own project-swiper-flutter-->
[swiperft-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-1-rec.png
[swiperft-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-2-rec-state.png
[swiperft-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-3-focus.png
[swiperft-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-4-city.png
[swiperft-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-5-cate.png
[swiperft-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-6-big.png
[swiperft-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-7-pub.png
[swiperft-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-8-msg.png
[swiperft-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-9-me.png

<!--own project-flutter-wanandroid-->
[w-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_login.png
[w-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_register.png
[w-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_home.png
[w-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_left_drawer.png
[w-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_tree.png
[w-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_site.png
[w-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_wx.png
[w-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_project.png
[w-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_message_unread_list.png
[w-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_message_read_list.png
[w-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_me_unlogin.png
[w-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_me_login.png
[w-13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_coin_rank.png
[w-14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_coin_sigin.png
[w-15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_article_webpage.png
[w-16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_message_webpage.png

<!--own project-flutter-zhihu-->
[zh-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-idea.png
[zh-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-idea-refresh.png
[zh-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-recommend.png
[zh-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-hot-rank.png
[zh-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-pub.png
[zh-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-focus.png
[zh-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-vip-find.png
[zh-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-me-unlogin.png
[zh-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-me-login.png
[zh-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-user-login.png