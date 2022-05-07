# Intro To Programming 2021

Ｎ予備校のカリキュラム 【2021年度】プログラミング入門 のハンズオン  
https://www.nnn.ed.nico/my_course?courseId=999  


## js-grammer (1章 6-12節)

JavaScript の基本文法を学習した。  


## css-study (1章 13-14節)

CSS の超基礎 を学習した。  
CSS を JavaScript で操作した。  


## assessment (1章 15-19節)

あなたのいいところ診断 を作成した。  

名前を入力し、診断ボタンをクリックすると、ランダムに診断結果を表示する。  
診断結果はツイートすることもできる。  


## httpd (2章 10節)

Python3 で簡易サーバーを立て、「あなたのいいところ診断」をサーバー上で動作させた。  
`python3 -m http.server 8000`  


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


## secret-board (3章 21-27節)

秘密の匿名掲示板 を作成中。  

### モジュール設計

|                    |                                          |
|:------------------:|:----------------------------------------:|
|index.js            |HTTP サーバーを起動する                   |
|lib/router.js       |リクエストを処理を行うハンドラに振り分ける|
|lib/posts-handler.js|/posts のリクエストを処理する             |
|lib/handler-utils.js|その他のリクエストを処理する              |
|lib/post.js         |投稿を追加、取得、削除する                |
