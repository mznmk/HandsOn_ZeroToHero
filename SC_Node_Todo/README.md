# SC Node Todo

Udemy  
【Node.js入門】Node.jsとMongoDBを連携してTodoアプリを１から構築してみよう  
https://www.udemy.com/course/nodejs-mongodb-todoapp/  


## About this course

サーバーサイド言語のNode.jsとMongoDBを連携してWebAPIを作成し、データベースに保存できるTodoアプリの作り方を図解を用いて分かりやすく説明します。  


## Environment Setup


### install Express

BackEndのフレームワーク Express をインストールする  
```sh
$ yarn add express
```

### install nodemon

テストサーバー nodemon をインストールする  
ソースを監視して自動でサーバーを再起動してくれるので便利  
```sh
$ yarn add nodemon
```
package.jsonに以下を追加すると、  
`yarn run dev` でnodemonが起動できるようになる  
```sh
"scripts": {
  "dev": "nodemon index.js"
},
```

### install Postman

WebAPI開発用ツール Postman をローカルにインストールする  
```sh
$ sudo snap install postman
```

### install mongoose

```sh
npm install mongoose
```

### execute nodemon

```sh
npm run dev
```

## Course Contents


### Section 1: はじめに

✅ 受講完了: 1回  


### Section 2: Node.jsの開発環境を構築しよう

✅ 受講完了: 1回  


### Section 3: まずはWebAPIから自作してみよう

✅ 受講完了: 1回  

- `Express` `nodemon` をインストールする  
- `Postman` をインストールする  


### Section 4: MongoDBの基礎を理解しよう

✅ 受講完了: 1回  


### Section 5: 【実践編】Todoアプリ(バックエンド編)

✓ 受講途中:  

mongoコンテナとの接続がうまく行かないのでいったん諦める  
未来の自分の託す！  

- `Express` `nodemon` をインストールする  
- `Postman` をインストールする  
- `mongoose` をインストールする  
- `dotenv` をインストールする  


### Section 6: 【実践編】Todoアプリ(フロントエンド編)


### Section 7: 【実践編】Todoアプリ(タスク編集編)


### Section 8: 【実践編】Todoアプリ(デプロイ編)

