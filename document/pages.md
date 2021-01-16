# ページについて

xxxxxにおいて、ページは各画面ごとの単位を指します。  
xxxxxでは1つのindex.htmlであたかもページ遷移が行われているかのように再現しており(Single-Page-Action)、  
その際の切り替わった各画面ごとの単位を指します。  
pagesディレクトリにhtmlファイルを設置することでそれが一つのページとして自動的に展開されます。

ページへの移動やそのアニメーション等の動作、   
各コールバックの実行は全てxxxxxのコアライブラリにセットされているロジックが受け持つ形となる為、  
複雑なアクションの発火やそのコールバック記述などを行う手間を省くとができます。

<a id="setting"></a>

## # ページの設置

ページの設置方法は簡単です。  
プロジェクト内の``pages``ディレクトリにHTMLファイルを設置するだけです。

例として初期画面であるTopページを設置してみましょう。

``Pages``ディレクトリに``Top.html``を設置します。

```html
<p>Top Page....</p>
```

これだけでページ設置は完了です。

あとはビルド後に「Top Page....」のTOP画面が表示されるはずです。

## # ページの遷移

ページを遷移させる場合は初期画面であるページ(現段階ではTopページ)とは別に、  
遷移先のページを別途設置する必要があります。

ここでは例として``Pages``ディレクトリに``Aaa.html``を設置して、  
Topページから遷移する方法を記述します。

まずは``Aaa.html``に下記コードを記述します。  
(これが遷移先のページコンテンツとします。)

```html
<p>Page AAA....</p>
```

``Top.html``内で下記のリンクタグを設置します。

```html
<p>Top Page...</p>
<a url="aaa">move aaa</a>
```

ビルド後に「Top Page....」のTOP画面と「move aaa」のリンクボタンが表示されるので、  
あとは「move aaa」のボタンを押してください。

追加した``Aaa.html``のページ内容に遷移します。

戻る場合はブラウザの「戻る」ボタン(スマホアプリの「戻る」ボタン)を押してTop画面に戻ります。

このようにページを順次増やしていくことで、様々な機能を有するアプリを作成することができます。

<a id="callback"></a>

## # コールバックの実装

ページのコールバックは主にページ遷移前後での処理内容を設置するために用いります。

コールバックは``app/Page``ディレクトリ内にjsファイル(スクリプトファイル)として設置します。

```javascript
rd2.page("top").before(function(obj){

	console.log("Top Page...");

});
```

上記はその一例で、TOPページに遷移直前にコンソールログ上に「Top Page...」が出力される仕様になります。

ページのコールバックには大きく3つに分かれます。

|||
|:--|:--|
|before|ページが遷移する直前に実行されるコールバックです。<br>通常はこちらを使用してください|
|after|ページの遷移が完了後(=遷移アニメーションが終了後)に実行されるコールバックです。<br>アニメーションがすべて終了してから動作を切り替えたい場合等に使用します。|
|leave|ページから離れる直前に実行されるコールバックです。<br>特定の変数値を与えた場合に、そのページから離れる際に変数値をデフォルトに戻す等に使用します。|

<a id="callback_before"></a>

### ## beforeコールバック

beforeは**ページが遷移する直前に実行されるコールバック**です。  
特別な理由がない限りは通常はこちらを使用してください。

jsファイル上では下記のようにコード記述します。

```javascript
rd2.page("top").before(function(){

	console.log("Top Page...");

});
```

beforeメソッドの引数内に実行する関数(ロジック)を記述します。  
上記の場合はTopページ遷移直前でコンソールログ上に「Top Page...」が出力されます。

<a id="callback_after"></a>

### ## afterコールバック

afterは**ページの遷移が完了後(=遷移アニメーションが終了後)に実行されるコールバック**です。  
アニメーションがすべて終了してから動作を切り替えたい場合等に使用します。

jsファイル上では下記のようにコード記述します。

```javascript
rd2.page("top").after(function(){

	console.log("Top Page...");

});
```

afterメソッドの引数内に実行する関数(ロジック)を記述します。  
上記の場合はTopページ遷移が完了後にコンソールログ上に「Top Page...」が出力されます。

<a id="callback_leave"></a>

### ## leaveコールバック

leaveは**ページから離れる直前に実行されるコールバック**です。  
beforeやafterと異なり、指定のページ遷移時に実行されるコールバックではなく  
leaveは**指定のページから離れる直前に実行**されます。

jsファイル上では下記のようにコード記述します。

```javascript
rd2.page("top").leave(function(){

	console.log("Good Bye Top Page...");

});
```

leaveメソッドの引数内に実行する関数(ロジック)を記述します。  
上記の場合はTopページから離れる前にコンソールログ上に「Good Bye Top Page...」が出力されます。

用途としては特定の変数値またはポーリング処理等を与えた場合に、
そのページから離れる際に変数値をデフォルト戻す、またはポーリングを停止する等に使用します。

<a id="callbackobject"></a>

## # コールバックオブジェクト

コールバックを実装する際に引数としてオブジェクトを使用することができます。

このオブジェクトを使用することでどのページから遷移したかの判別、  
あるいは同期処理を行うことができます。

```javascript
rd2.page("top").before(function(obj){

	console.log(obj);

});
```

<a id="callobj_jugement"></a>

### ## モード(遷移/戻る)の判定

mode変数にモード(遷移/戻る)が格納されています。

```javascript
rd2.page("aaa").before(function(mode){

	console.log(obj.mode);

});
```

<a id="callobj_move"></a>

### ## 別のページに移動

コールバックオブジェクトのmove関数を使うとさらに別のページに遷移できます。

```javascript
rd2.page("aaa").before(function(obj){

	obj.move("bbb");

});
```

なお、rd2.redirect.moveを使用した代用した場合は必ず  
直後にwait関数を添えてください。  
(wait関数がない場合、動作に不具合が生じる為この方法は推奨しません。)

```javascript
rd2.page("aaa").before(function(obj){

	rd2.redirect.move("bbb");
	obj.wait();

});
```

<a id="callobj_async"></a>

### ## 同期処理を行う

コールバックオブジェクトのwait関数とrelease関数を使う事で  
同期処理が可能になります。

下記はページAAAに遷移時に、2秒間待機後に遷移が実行されます。  

waitで停止、releaseで解放されます。

```javascript
rd2.page("aaa").before(function(obj){

	obj.wait();

	setTimeout(function(){

		obj.release();

	},1000);

});
```

また一定時間後に別のページへ遷移をする場合はwait関数のみで可能です。


```javascript
rd2.page("aaa").before(function(obj){

	obj.wait();

	setTimeout(function(){
		obj.move("bbb");
	},1000);

});
```

<a id="callobj_pageobj"></a>

### ## ページオブジェクトを取得

pageObj変数に遷移したページのオブジェクトがセットされています。  
これを用いることで遷移時にJQueryの記述を用いてオブジェクトからページコンテンツ内容の変更が可能となります。

```javascript
rd2.page("aaa").before(function(obj){

	obj.pageObj.text("change Text Sample....");
	
});
```

<a id="addgroup"></a>

## # 関連グループの追加

ページに対してグループを関連付けるにはaddGroup関数を使用して下さい。

```javascript
rd2.page("aaa").addGroup("app");
```

配列値で複数グループを関連付けることもできます。

```javascript
rd2.page("aaa").addGroup([
	"app",
	"group1",
	"group2",
]);
```

グループについての詳細は[こちらを参照してください](group.md)。

<a id="methodchain"></a>

## # メソッドチェーンによる連続記述

メソッドチェーンでコールバックなどを連続して記述することも可能です。

```javascript
rd2.page("top").addGroup("app").before(function(){

	console.log("Top Page Before...");

}).after(function(){

	console.log("Top Page After...");

}).leave(function(){

	console.log("Good By Top Page...");

});
```

<a id="set"></a>

## # set関数を用いた記述

set関数を使う事でコールバック等をさらにまとめて記述することも可能です。  

```javascript
rd2.page("top").set({
	addGroup:[
		"app",
	],
	before:function(){

		console.log("Top Page Before...");

	},
	after:function(){

		console.log("Top Page After...");

	},
	leave:function(){

		console.log("Good By Top Page...");

	},
});
```