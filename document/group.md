# グループについて

グループは各画面をひとまとめにした集団の単位です。

各ページごとで共通で必要な処理をグループ内に記載しておくことで一つにまとめることができます。  
グループは1ページで複数のグループを関連付けることもできます。

ページ数が多くなってきてグループ単位での処理が必要になった場合などに使用します。

## # グループの設置

グループは``app/Group``ディレクトリにjsファイルで設置してください。  
(ファイル名は``XxxGroup.js``が望ましいですが、これは強制ではありません。)

```javascript
rd2.group("app").before(function(){

	console.log("App Group!");

});
```

<a id="add_page"></a>

## # ページとグループを関連付ける

ページにグループを追加する方法は2つあります。

-  ページごとにグループを設定
-  グループ側でページを設定

### ## ページごとにグループを設定

ページから関連付けるグループを設定したい場合はrd2.page.addGroup関数を用いります。

```javascript
rd2.page("top").addGroup("app");
```

1つのページでグループを複数関連付ける場合は下記。

```javascript
rd2.page("top").addGroup([
	"app",
	"group1",
	"group2",
	"group3",
]);
```

または下記。

```javascript
rd2.page("top").addGroup("app").addGroup("group1").addGroup("group2").addGroup("group3");
```

### ## グループ側でページを設定

グループ側から関連付けるページを設定したい場合はrd2.group.addPage関数を用いります。

```javascript
rd2.group("app").addPage("top");
```

1つのグループに複数のページを関連付ける場合は下記。

```javascript
rd2.group("app").addPage([
	"top",
	"aaa",
	"bbb",
	"ccc",
]);
```

または下記。

```javascript
rd2.group("app").addPage("top").addPage("aaa").addPage("bbb").addPage("ccc");
```

<a id="callback"></a>

## # グループコールバックの実装

グループのコールバックは主にページ遷移前後での処理内容を設置するために用いります。

```javascript
rd2.group("app").before(function(){

	console.log("App Group!");

});
```

上記はその一例で、appグループに関連付けられたページに遷移した直前に  
コンソールログ上に「App Group!」が出力される仕様になります。

グループのコールバックには大きく3つに分かれます。

|||
|:--|:--|
|before|グループに関連付けられたページが遷移する直前に実行されるコールバックです。<br>通常はこちらを使用してください|
|after|グループに関連付けられたページの遷移が完了後(=遷移アニメーションが終了後)に実行されるコールバックです。<br>アニメーションがすべて終了してから動作を切り替えたい場合等に使用します。|
|leave|グループに関連付けられたページから離れる直前に実行されるコールバックです。<br>特定の変数値を与えた場合に、そのページから離れる際に変数値をデフォルトに戻す等に使用します。|

### ## beforeコールバック

beforeは**グループに関連付けられたページに遷移する直前に実行されるコールバック**です。  
特別な理由がない限りは通常はこちらを使用してください。

jsファイル上では下記のようにコード記述します。

```javascript
rd2.group("app").before(function(){

	console.log("App Group!");

});
```

beforeメソッドの引数内に実行する関数(ロジック)を記述します。  
上記の場合はappグループに関連付けられたページに遷移する直前で  
コンソールログ上に「App Group!」が出力されます。

### ## afterコールバック

afterは**グループに関連付けられたページの遷移が完了後(=遷移アニメーションが終了後)に実行されるコールバック**です。  
アニメーションがすべて終了してから動作を切り替えたい場合等に使用します。

jsファイル上では下記のようにコード記述します。

```javascript
rd2.group("app").after(function(){

	console.log("App Group!");

});
```

afterメソッドの引数内に実行する関数(ロジック)を記述します。  
上記の場合はappグループに関連付けられたページへの遷移が完了後に  
コンソールログ上に「App Group!」が出力されます。

### ## leaveコールバック

leaveは**グループに関連付けられたページから離れる直前に実行されるコールバック**です。  
beforeやafterと異なり、指定のページ遷移時に実行されるコールバックではなく  
leaveは**指定のページから離れる直前に実行**されます。　　

jsファイル上では下記のようにコード記述します。

```javascript
rd2.group("app").leave(function(){

	console.log("Leave App Group!");

});
```

leaveメソッドの引数内に実行する関数(ロジック)を記述します。  
上記の場合はappグループに関連付けられたページから離れる前に  
コンソールログ上に「Leave App Group!」が出力されます。

用途としては特定の変数値またはポーリング処理等を与えた場合に、
そのグループから離れる際に変数値をデフォルト戻す、またはポーリングを停止する等に使用します。

## # コールバックオブジェクト

コールバックを実装する際に引数としてオブジェクトを使用することができます。

このオブジェクトを使用することでどのページから遷移したかの判別、  
あるいは同期処理を行うことができます。

```javascript
rd2.group("app").before(function(obj){

	console.log(obj);

});
```

<a id="callobj_jugement"></a>

### ## モード(遷移/戻る)の判定

mode変数にモード(遷移/戻る)が格納されています。

```javascript
rd2.group("app").before(function(mode){

	console.log(obj.mode);

});
```

<a id="callobj_move"></a>

### ## 別のページに移動

コールバックオブジェクトのmove関数を使うとさらに別のページに遷移できます。

```javascript
rd2.group("app").before(function(obj){

	obj.move("bbb");

});
```

なお、rd2.redirect.moveを使用した代用した場合は必ず  
直後にwait関数を添えてください。  
(wait関数がない場合、動作に不具合が生じる為この方法は推奨しません。)

```javascript
rd2.group("app").before(function(obj){

	rd2.redirect.move("bbb");
	obj.wait();

});
```

なお上記の場合ページと異なり、リダイレクト先が同じグループを関連付けている場合は永久ループが発生します。  
オブジェクトから遷移先URLを取得できるので、下記のような判定分を設けてください。

```javascript
rd2.group("app").before(function(obj){

	if(obj.page!="bbb"){
		rd2.redirect.move("bbb");
		obj.wait();
	}

});
```

<a id="callobj_async"></a>

### ## 同期処理を行う

コールバックオブジェクトのwait関数とrelease関数を使う事で  
同期処理が可能になります。

下記はページAAAに遷移時に、2秒間待機後に遷移が実行されます。  

waitで停止、releaseで解放されます。

```javascript
rd2.group("app").before(function(obj){

	obj.wait();

	setTimeout(function(){

		obj.release();

	},1000);

});
```

また一定時間後に別のページへ遷移をする場合はwait関数のみで可能です。


```javascript
rd2.group("app").before(function(obj){

	obj.wait();

	setTimeout(function(){
		obj.move("bbb");
	},1000);

});
```

なおwait関数のままで解放しなかった場合、複数のグループ分のコールバックおよび  
ページのコールバックはブロッキングされずにそのまま並列実行されます。

```javascript
rd2.group("app").before(function(obj){

	obj.wait();

});
```

<a id="callback_flow"></a>

## # コールバックの優先順位

ページ遷移時のコールバックは下記の順番で実行されます。  
(コールバックを用意していない場合はそのままスルー)

- group leave callback
- page leave callback
- group before callback
- page before callback
- group after callback
- page after callback

複数グループを関連付けている場合は、コールバックは  
関連付けたグループの順番のまま実行されます。

<a id="methodchain"></a>

## # メソッドチェーンによる連続記述

メソッドチェーンでコールバックなどを連続して記述することも可能です。

```javascript
rd2.group("app").addPage("top").before(function(){

	console.log("App Group Before...");

}).after(function(){

	console.log("App Group After...");

}).leave(function(){

	console.log("Leave By App Group...");

});
```


<a id="set"></a>

## # set関数を用いた記述

set関数を使う事でコールバック等をさらにまとめて記述することも可能です。  

```javascript
rd2.group("app").set({
	addPage:[
		"top",
	],
	before:function(){

		console.log("App Group Before...");

	},
	after:function(){

		console.log("App Group After...");

	},
	leave:function(){

		console.log("Leave App Group...");

	},
});
```