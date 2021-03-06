# SNZK Intro NestJS

Udemy  
NestJS入門 TypeScriptではじめるサーバーサイド開発  
https://www.udemy.com/course/nestjs-t/  


## About Course

Node.js上で動作するバックエンドフレームワークであるNestJSを短期集中でしっかりマスターしよう！  

## Reference

Dockerを利用してNestJS＋TypeORM+MySQLの環境構築する  
https://zenn.dev/senri/articles/331162304a78e0  

Typeorm でマイグレーションをしよう  
https://qiita.com/qualitia_cdev/items/eb8f2c614c0435b9a120  

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

✅ 受講完了: 1回  

pgadminにアクセスできないので使わないことにした  

- TypeORMとPostgreSQLドライバーをインストールする  
    (このバージョンに固定しないと動作しない可能性がある)  
    ```sh
    docker-compose exec nest npm install --save typeorm@0.2.45 @nestjs/typeorm@8.0.2 pg
    ```
- TypeORMの雛形を作成する(この講義ではこれを使わず手動で行った)  
    ```sh
    docker-compose exec npx typeorm init
    ```
- migrationファイルを作成する  
    ```sh
    docker-compose exec nest npx typeorm migration:generate -n CreateItem
    ```
    次のエラーが出た場合はschemaをdropしてからやり直す  
    No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command  
    ```sh
    docker-compose exec nest npx typeorm schema:drop
    ```
- migrationを実行する(npm run start:dev でコンパイルする必要がある)  
    ```sh
    docker-compose exec nest npx typeorm migration:run
    ```


### Section 5: セキュリティ

✓ 受講途中:  

migrationがうまくいかないのでいったん諦める  
未来の自分の託す！  

- authモジュール/コントローラー/サービスの雛形を作成する  
    ```sh
    docker-compose exec nest nest g module auth
    docker-compose exec nest nest g controller auth --no-spec
    docker-compose exec nest nest g service auth --no-spec
    ```
- migrationファイルを作成し実行する  


### Section 6: テスト



