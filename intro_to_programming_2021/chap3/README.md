# Intro To Programming 2021 - 第３章

Ｎ予備校 【2021年度】プログラミング入門 のハンズオン  
https://www.nnn.ed.nico/my_course?courseId=999  


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

