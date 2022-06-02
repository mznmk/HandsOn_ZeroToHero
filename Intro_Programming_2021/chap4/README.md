# Intro To Programming 2021 - 第４章

Ｎ予備校 【2021年度】プログラミング入門 のハンズオン  
https://www.nnn.ed.nico/my_course?courseId=999  
https://www.nnn.ed.nico/courses/999/chapters/13383  
https://github.com/nnn-training  


## express-study (4章 2節)

何もないディレクトリに express-generator でプロジェクトのテンプレを作成し、Express を導入した。  


## express-api (4章 3節)

helmet というモジュールを導入し、 Express の機能を拡張した。  


## github-oauth (4章 4節)

GitHub を使った外部認証 によるログインシステムを実装した。  


## damage-calc (4章 5節)

テスティングフレームワーク Jest を導入し、テストを機能を実装した。  


## damage-calc (4章 6節)

CIツール GitHub Actions を導入し、自動テストを学習した。  
※ repositoryにpushするたびにテストが走られると困る（学習用repository）ので、  
   .github → github_actions にdirectory名を変更して走らないようにしている。  
   本来はrepositoryのrootに .github/ で配置する。  


## webpack-study (4章 7節)

webpack を導入し、モジュールバンドラーを学習した。  


## dom-manipulation (4章 8節)

jQuery を導入し、DOM 操作のフレームワーク を学習した。  


## ajax-study (4章 9節)

AJAX による クライアント=サーバー 間の通信 (プル型通信) を学習した。  


## websocket-study (4章 10節)

WebSocket による クライアント=サーバー 間の通信 (プッシュ型通信) を学習した。  


## rdb-study (4章 11-15節)

PostgreSQL を導入した。  
データベースの概要を学習した。  
データベース・テーブルの作成方法を学習した。  
簡単なSQLを学習した。  
テーブルの正規化について学習した。  
デーブルの結合について学習した。  
インデックスについて学習した。  
集計関数について学習した。  


## schedule-arranger (4章 16-24節)

Webアプリ「予定調整くん」を作成した。  

### 設計内容

|ファイル                |処理内容                  |
|:----------------------:|:------------------------:|
|routes/login.js         |ログイン処理              |
|routes/logout.js        |ログアウト処理            |
|routes/schedules.js     |予定に関連する処理        |
|routes/availabilities.js|出欠の更新に関する処理    |
|routes/comments.js      |コメントの更新に関する処理|
|models/user.js          |ユーザーの定義と永続化    |
|models/schedule.js      |予定の定義と永続化        |
|models/candidate.js     |候補の定義と永続化        |
|models/availabilitiy.js |出欠の定義と永続化        |
|models/comment.js       |コメントの定義と永続化    |

※ rootユーザーで実行しないとうまくいかないので注意！  
※ `sudo chown -R mika:mika ./schedule-arranger` コマンドで、ローカル側からまとめてUser:Groupを変更して対応している。  

### 実装内容

【16節】  
- プロジェクトの設計(要件定義)  
- GitHubへアプリケーション登録(GitHub認証用)  

【17節】  
- プロジェクトの作成  
- "GitHub認証"の実装  
- "Routerオブジェクト"の実装  
- "Routerオブジェクト"のテストの実装 (--devでインストール)  
   - jest
      テストを実行するモジュール
   - supertest  
      Express の Router オブジェクトをテストするモジュール  
   - pasport-stub  
      GitHub 認証のログイン・ログアウト処理をテスト内で模倣できるモジュール  

【18節】  
- "データモデル"の実装  
- "ユーザーの保存"の実装  

【19節】  
- "予定の作成と表示"の実装  
- "予定作成・表示"のテストを実装  

【20節】  
- "出欠の表示と更新"の実装  
- "出欠の表示と更新"のテストを実装

【21節】  
- webpack/babelの導入  
- "コメントの表示・更新"の実装  
- "コメントの表示・更新"のテストの実装  

【22節】  
- "予定の編集と削除"の実装  
- "予定の編集と削除"のテストの実装  

【23節】  
- デザインの改善  

【24節】  



