'use strict';

const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける xss 脆弱性のテスト
// ( content 以外は適当な値を設定 )
const html = pug.renderFile('./views/posts.pug', {
  posts: [
    {
      id: 1,
      content: "<script>alert('test');</script>",
      postedBy: 'guest1',
      trackingCookie: "6810017664159257_a79874335941b1fd29195c17a356dd4548da3b1a",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes("&lt;script&gt;alert('test');&lt;/script&gt;"));
console.log('テストが正常に完了しました');