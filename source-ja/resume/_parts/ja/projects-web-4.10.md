### <font color=red>十 Webフロントエンドプロジェクト</font>

#### 1—[tea-admin-panel  ](https://github.com/PGzxc/tea-admin-panel)

**プロジェクト所属** ：個人プロジェクト(プライベート)
**プロジェクト名**：TeaOrderAPI - 飲茶注文管理システム
**プロジェクトURL**：https://github.com/PGzxc/tea-admin-panel
**プラットフォームサポート**：モダンブラウザ(Chrome、Firefox、Safari、Edge)
**開発ツール**：Visual Studio Code + Vite 8.0 
**開発言語** ：Vue 3 + JavaScript
**プロジェクト説明**：Vue 3 + Element Plus をベースに構築された飲茶店のバックエンド管理システムで、Spring Boot バックエンドサービスと連携し、商品管理、注文処理、座席監視、データ統計などのコア機能を実現します。システムはフロントエンドとバックエンドの分離アーキテクチャを採用し、Axios を通じて API 呼び出しを行い、商品画像アップロード、座席状態のリアルタイム更新、注文状態の遷移などのビジネスシーンをサポートします。
**機能モジュール**：

-  ダッシュボード ：データ概要、ビジネス指標の表示
-  商品管理 ：商品 CRUD、画像アップロード、カテゴリ管理 
-  注文管理 ：注文リスト、状態更新、詳細表示
-  座席管理 ：座席グリッドビュー、状態管理、追加/削除
-  システム設定 ：基本設定、データ統計

**技術的ハイライト**：

- Vue 3 コンポジション API ベース：ref、computed、watch などの API を通じてコンポーネント状態を管理
- Element Plus コンポーネントライブラリ：テーブル、フォーム、ダイアログ、ボタンなどのコンポーネントを使用して管理インターフェースを構築
- Axios HTTP クライアント：統一 API 呼び出しをカプセル化し、リクエスト/レスポンスインターセプト、エラー処理を処理
- Vue Router ルーティング管理：ページナビゲーション、ルーティング遅延ロードを実現し、ファーストスクリーン読み込みパフォーマンスを最適化
- Vite ビルドツール：ES Module を活用して高速開発と本番ビルドの最適化を実現
- Pinia 状態管理：クロスコンポーネント共有状態を管理し、データ永続化を実現
- RESTful API デザイン：REST 規範に従い、HTTP メソッドを使用して操作セマンティクスを表現
- フロントエンドとバックエンドの分離アーキテクチャ：Vite プロキシ設定でクロスドメイン問題を解決し、独立した開発とデプロイを実現

**プロジェクトプレビュー**

| ![][tea-1] | ![][tea-2] | ![][tea-3] |
| :--------: | :--------: | :--------: |
| ![][tea-4] | ![][tea-5] |            |

<!--画像-->

[tea-1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-1-home.png
[tea-2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-2-cart.png
[tea-3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-3-order.png
[tea-4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-4-seat.png
[tea-5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-5-setting.png
