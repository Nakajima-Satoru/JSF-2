# 送信リクエストについて

送信リクエストは``rd2.request``オブジェクトから送信できます。  
ここでのリクエストは全てAjaxによる通信のみとなります。  

<a id="send"></a>

## # 通常の送信リクエスト

リクエストを送信したい場合は``rd2.request.send``関数を使います。  
send関数は単純なJQueryの``$.ajax``のラッパーです。

```javascript
rd2.request.send({
	url:"https://www.xxxxxxxxx.jp/yyyyy/",
	method:"post",
	success:function(data){

		console.log(data);

	},
});
```

<a id="poling"></a>

## # ポーリングの実行/停止

一定時間毎のポーリングによりリクエストを送信したい場合は``rd2.request.poling``関数を使います。  

```javascript
var interval=2000;
rd2.request.poling('test_poling',2000,{
	url:"https://www.xxxxxxxxx.jp/yyyyy/",
	method:"post",
	success:function(data){

		console.log(data);

	},
});
```

引数は順に**ポーリング名**、**送信間隔**、**送信リクエスト内容**をそれぞれ設置するだけです。  
送信リクエスト内容は``rd2.request.send``の通常リクエストと同じ引数の内容を設定します。

この関数が設定された時点でポーリング名による専用のプロセスを自動的に保持します。  
ポーリングを停止させたい場合は``rd2.request.polingExit``関数にてポーリング名を  
指定することで停止させることができます。

```javascript
rd2.request.polingExit('test_poling');
```

<a id="long_poling"></a>

## # ロングポーリングの実行/停止

xxxxxではロングポーリングのリクエストも簡単に設置できます。  
ここでのロングポーリングとはサーバー側にて何らかのアクションが発生した際もしくは一定時間が経過後に  
スレッドを強制的に終了してレスポンスを返す仕様のポーリングを指します。

ロングポーリングはサーバー側APIでは一定時間毎でのアクションのチェックと、  
上限時間が過ぎた場合に強制的に終了してレスポンスを返すロジックを通してください。

例えばPHPの場合、下記のように2秒毎でスリープを設けたのちこれを最大60件行った段階で  
何もなければレスポンスを返すようなものを設けます。  
(コメントアウトのcheck logic部分にレコード取得またはメッセージ取得のコードを記述して  
もし取得できた場合はループを抜けてメッセージ付きでレスポンスを返してください。)

```php
<?php

$maxCount=60;

for($v1=0;$v1<$maxCount;$v1++){

	/**
	 *  check logic .....
	 */

	sleep(2);

}

echo json_encode([]);

```

あとはクライアント側で``rd2.request.longPoling``関数を指定します。

```javascript
var interval=2000;
rd2.request.longPoling('test_poling',{
	url:"https://www.xxxxxxxxx.jp/yyyyy/",
	method:"post",
	success:function(data){

		console.log(data);

	},
});
```

longPoling関数ではレスポンスが返却されてコールバックを実行完了後に、  
すぐ同じリクエストを再送して待機状態を作ります。

ロングポーリングの終了は``rd2.request.longPolingExit``関数を使ってポーリング名を指定します。

```javascript
rd2.request.longPolingExit('test_poling');
```