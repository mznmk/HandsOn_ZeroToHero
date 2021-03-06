# NNN Intro Node 2021 - 第３章

Ｎ予備校 【2021年度】プログラミング入門 のハンズオン  
https://www.nnn.ed.nico/my_course?courseId=999  
https://www.nnn.ed.nico/courses/999/chapters/13382  
https://github.com/nnn-training  


## nodejs (3章 2節)

簡単な JavaScript を書き、Node.js で動かした。  


## algorithm (3章 3節)

フィボナッチ数列・トリボナッチ数列 を実装したあと、計算量の爆発を抑えるためにメモ化再帰で書き直した。   


## adding-up (3章 4節)

全国47都道府県における2010年・2015年の人口データ（CSVファイル）を読み込み、2010年→2015年の 人口変化率を集計して出力した。  


## yarn-training (3章 5節)

Node.js のパッケージマネージャー yarn の使い方を覚えた。  
ローカルで作成した 自作ライブラリー を yarn でインストールして利用した。  


## hubot-study (3章 7節)

ボット作成フレームワーク hubot で bot のサンプルを作成し、Slackで作動させた。  


## todo hubot-todo (3章 8-9,11節)

Slack用の タスク管理Bot を作成した。  
Create Read Update Delete の実装、assert によるテストの実装を行った。  

- Slack用 hubot プロジェクトの作成  
	```sh
	yo hubot --adapter=slack
	```
- 自作パッケージ todo を yarn でインストールする  
	```sh
	yarn add ./todo
	```
- ボットを動かすための JSファイル を作成する  
	```sh
	touch scripts/todo-bot.js
	```
- hubot 実行する / Slack へ接続して hubot を実行する  
	https://slack.com/apps -> hubot  
	```sh
	bin/hubot
	env HUBOT_SLACK_TOKEN=xoxb-XXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXX bin/hubot --adapter slack
	```


## seventeen (3章 8節)

配列に含まれる整数が17で割り切れるものだけにする seventeen モジュールを実装した。  


## async-io-problem (3章 10節)

Promise async/await などを利用し、 同期処理/非同期処理 を学習した。  


## nodejs-http1 nodejs-http2 (3章 12-18節)

簡単なアンケートフォームを作成した。  
nodejs-http1: GET POST でデータをやり取りする、クライアントサーバー型の基本部分を作成した。  
nodejs-http2: テンプレートエンジン pug を利用して nodejs-http1 を書き換え、認証も導入した。Herokuへのアップロードも学習した。  

- Heroku アカウントへログイン  
  ```sh
  heroku login
  ```
- アプリのディレクトリに移動して Heroku アプリを作成する  
  ```sh
  heroku create
  ```
- GitHubリポジトリ と Heroku の連携  
  ```sh
  heroku git:remote -a nodejs-http2   # <- AppName
  ```

- Heroku 上の Container Registry へログイン  
  ```sh
  heroku container:login
  ```
- イメージをビルドし、Container Registry にプッシュする  
  ```sh
  heroku container:push web
  ```
- イメージをアプリにリリースする  
  ```sh
  heroku container:release web
  ```
- アプリをブラウザで開く  
  ```sh
  heroku open
  ```


## cookie-study (3章 19節)

cookie への値のセット、cookie からの値の取得 を学習した。  


## redirect-study (3章 20節)

リダイレクトさせる方法を学習した。  
次にやる 秘密の匿名掲示板 の設計を学習した。  

|ファイル            |処理内容                                  |
|:------------------:|:----------------------------------------:|
|index.js            |HTTP サーバーを起動する                   |
|lib/router.js       |リクエストを処理を行うハンドラに振り分ける|
|lib/posts-handler.js|/posts のリクエストを処理する             |
|lib/handler-utils.js|その他のリクエストを処理する              |
|lib/post.js         |投稿を追加、取得、削除する                |


## secret-board (3章 21-27節 29-34節)

秘密の匿名掲示板 を作成した。  

【21節】  
フォームによる投稿機能 を実装した。  

【22節】  
認証された投稿の一覧表示機能 を実装した。  

【23節】  
データベースへの保存機能 を実装した。  
PostgreSQL コンテナのデータベースを secret-board-db にマウントして永続化した。  

【24節】  
トラッキング Cookie の実装 を行った。  

【25節】  
削除機能 を実装した。  

【26節】  
管理者機能 を実装した。  

【27節】  
デザインの改善 を行った。  


## os-command-injection (3章 28節)

OS コマンド・インジェクション を体験した。  


## secret-board (3章 21-27節 29-34節)

秘密の匿名掲示板 を作成した。  

【29節】  
XSS脆弱性の対策 を行った。  

【30節】  
パスワードの脆弱性の対策 を行った。  
password-challenger を使い、パスワードの総当り攻撃 を行ってみた。  

【31節】
セッション固定化攻撃脆弱性の対策 を行った。  
(users.htpasswdのパスワードが違うものに変更された 元々のものは.orgとしてある)  

【32節】
より堅牢なセッション管理 を行った。  

【33節】
CSRF脆弱性の対策 を行った。  
csrf-study に外部サイトを作成し、CSR脆弱性を攻撃してみた。  

【34節】
Heroku への安全な公開 を学習した。  

