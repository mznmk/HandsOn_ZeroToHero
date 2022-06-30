# SNZK Intro NestJS

Udemy  
NestJS入門 TypeScriptではじめるサーバーサイド開発  
https://www.udemy.com/course/nestjs-t/  


## About Course

Node.js上で動作するバックエンドフレームワークであるNestJSを短期集中でしっかりマスターしよう！  

## Reference

Dockerを利用してNestJS＋TypeORM+MySQLの環境構築する  
https://zenn.dev/senri/articles/331162304a78e0  

## Environment Setup

### Node.js

node:16.13.1-alpine コンテナを利用した  
(普通のコンテナ(debian)だとバグって動かない)  

### Nest.js

- インストール  
    ```sh
    npm i -g @nestjs/cli
    ```
- 新規プロジェクトの雛形を作成する  
    ```sh
    nest new project-name
    ```
- devモードで起動する  
    (起動しながらでもコードの修正を反映してくれる)  
    ```sh
    npm run start:dev
    ```


## ⭐ Course Contents ⭐


### Section 1: イントロダクション

✅ 受講完了: 1回  


### Section 2: NestJSの基本

✅ 受講完了: 1回  

※ node-alpineコンテナじゃないと失敗する  
※ コンテナ内でプロジェクトを作成しようとすると失敗する  
※ generate は g でもOK  

- dockerコンテナを立ち上げる  
    ```sh
    docker-compouse up -d --build
    ```
- 新規プロジェクトの雛形を作成する  
    ```sh
    docker-compose exec api nest genetate frea-market
    ```
- 新規モジュールの雛形を作成する  
    ```sh
    docker-compose exec api nest generate module items
    ```
- 新規コントローラーの雛形を作成する  
    (`--no-spec`: テストファイルを作成しないオプション)  
    ```sh
    docker-compose exec api nest generate controller items --no-spec
    ```
- 新規サービスの雛形を作成する  
    (`--no-spec`: テストファイルを作成しないオプション)  
    ```sh
    docker-compose exec api nest generate service items --no-spec
    ```
- devモードで起動する  
    (起動しながらでもコードの修正を反映してくれる)  
    ```sh
    docker-compose exec api npm run start:dev
    ```


### Section 3: バリデーションと例外処理

✅ 受講完了: 1回  

- UUID作成ライブラリーをインストールする  
    ```sh
    docker-compose exec api npm install --save uuid
    ```
- Validationに必要なライブラリーをインストールする  
    ```sh
    docker-compose exec api npm install --save class-validator class-transformer
    ```


### Section 4: データベース

✓ 受講途中:  


### Section 5: セキュリティ


### Section 6: テスト



