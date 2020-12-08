# フォームについて

xxxxxでは送信フォーム用のオブジェクトである``rd2.form``を用意しています。

このオブジェクトを使用することでタグを入力せずに簡単に入力フォームの設置
またはデフォルトの入力値のセットや、  
送信リクエスト時のコールバックを簡単に設定することができます。

<a id="readme"></a>

## # フォーム送信について

xxxxxではSPA(Single-Page-Action)を維持するために、  
**フォームタグからの直接のリクエスト送信はされない仕様となっています。**

submitコールバックに処理を移すまでに留める仕様になっており  
実際に外部リクエストを送信したい場合は、別途送信リクエスト用のオブジェクト``rd2.request``を  
使ってリクエストを行います。  
(``rd2.request``はAjax通信を行うオブジェクトをラッパーしている為、xxxxxからのリクエスト送信は**全てAjax通知**のみとなります。)

<a id="set"></a>

## # フォームの実装

フォームの実装は2通りの方法があります。

一つは単純にHTMLタグで各入力フォームを直接記述する方法です。

``pages``のページに入力フォーム用のページ(Testform.html)を設置してそこにHTMLタグを記述するだけです。

**Testform.html**
```html
<form id="test">
	<p>name</p>
	<input type="text" name="name">
	<p>value</p>
	<input type="text" name="value">
	<input type="submit" value="Send">
</form>
```

formタグに必ず一意のIDを指定してください。

これだけでフォーム設置は完了となります。  
あとは送信ボタンを押したときにsubmitコールバックを用意しておけば  
そのコールバックの内容が実行されます。

もう一つの方法は``rd2.form.set``関数を使用することで  
自動的にフォームタグを生成します。

``pages``のページに入力フォーム用のページ(Testform.html)を設置してそこに下記のようにfield属性タグを設置します。

**Testform.html**
```html
<form id="test">
	<p>name</p>
	<div field="name"></div>
	<p>value</p>
	<div field="value"></div>
	<div field="submit"></div>
</form>
```

``app/Page``ディレクトリに上記入力フォームのjsファイルを設置後(testformPage.js)、  
beforeコールバックを設置してその中で下記のコードを記載します。

**TestformPage.js**
```javascript
rd2.page("testform").before(function(obj){

	rd2.form("test").set({
		name:{
			type:"text",
		},
		value:{
			type:"text",
		},
		submit:{
			type:"submit",
			value:"send",
		},
	});

});
```

あとはビルド後にtestformページに遷移した時点で、フォームタグが生成されます。  

これのメリットはフォームタグを直接記述しなくて済むため、  
入力欄の設置個所のみをfield属性タグを設置してそれの入力欄を指定するだけであるという点です。

<a id="setdata"></a>

## # 入力値のセット

フォームに予め入力値をセットしたい場合は、``rd2.form.setdata``関数を使用することで簡単にセットできます。

**Testform.html**
```html
<form id="test">
	<p>name</p>
	<div field="name"></div>
	<p>value</p>
	<div field="value"></div>
	<div field="submit"></div>
</form>
```

ページ遷移時のコールバックに下記コードを記述します。

**TestformPage.js**
```javascript
rd2.page("testform").before(function(obj){

	rd2.form("test").set({
		name:{
			type:"text",
		},
		value:{
			type:"text",
		},
		submit:{
			type:"submit",
			value:"send",
		},
	});

	rd2.form("test").setData({
		name:"default name",
		value:"default value",
	});

});
```

メソッドチェーンによる記述も可能です。

**TestformPage.js**
```javascript
rd2.page("testform").before(function(obj){

	rd2.form("test").set({
		name:{
			type:"text",
		},
		value:{
			type:"text",
		},
		submit:{
			type:"submit",
			value:"send",
		},
	}).setData({
		name:"default name",
		value:"default value",
	});

});
```

ラジオボタンやチェックボックスでの初期選択値もセット可能です。  
チェックボックスの場合は配列値で複数選択が可能。

**Testform.html**
```html
<form id="test">
	<p>name</p>
	<div field="name"></div>
	<p>value</p>
	<div field="value"></div>
	<p>radio</p>
	<div field="radio"></div>
	<p>category</p>
	<div field="category"></div>
	<div field="submit"></div>
</form>
```

**TestformPage.js**
```javascript
rd2.page("testform").before(function(obj){

	rd2.form("test").set({
		name:{
			type:"text",
		},
		value:{
			type:"text",
		},
		radio:{
			type:"radio",
			select:{
				0:"aaa",
				1:"bbb",
				2:"ccc",
			},
		},
		checkbox:{
			type:"checkbox",
			select:{
				0:"category 0",
				1:"category 1",
				2:"category 2",
			}
		}
		submit:{
			type:"submit",
			value:"send",
		},
	}).setData({
		name:"default name",
		value:"default value",
		radio:1,
		checkbox:[0,2],
	});

});
```

なおフォームタグを直接記述した場合でも入力値のセットは可能です。

**Testform.html**
```html
<form id="test">
	<p>name</p>
	<input type="text" name`="name">
	<p>value</p>
	<input type="text" name`="value">
	<p>radio</p>
	<label>
		<input type="radio" name="radio" value="0">
		aaa
	</label>
	<label>
		<input type="radio" name="radio" value="1">
		bbb
	</label>
	<label>
		<input type="radio" name="radio" value="2">
		ccc
	</label>
	<p>category</p>
	<label>
		<input type="checkbox" name="checkbox[]" value="0">
		category 0
	</label>
	<label>
		<input type="checkbox" name="checkbox[]" value="1">
		category 1
	</label>
	<label>
		<input type="checkbox" name="checkbox[]" value="2">
		category 2
	</label>
	<input type="submit" value="Send">
</form>
```

**TestformPage.js**
```javascript
rd2.page("testform").before(function(obj){

	rd2.form("test").setData({
		name:"default name",
		value:"default value",
		radio:1,
		checkbox:[0,2],
	});

});
```

<a id="callback"></a>

## # フォームコールバックの実装

<a id="callback_submit"></a>

### ## submitコールバック


Submitボタンを押した時またはSubmitが実行された際に実行させるコールバック(Submitコールバック)は``rd2.form.callSubmit``関数を使って設置できます。

Submitコールバックは``app/Submit``ディレクトリ内に別jsファイルすることを推奨します。  
ファイル名は``XXXXSubmit.js``とします。

**TestSubmit.js**
```javascript
rd2.form("test").callSubmit(function(){
	console.log("Test Form Submit!");
});
```

上記の場合、入力フォームからSendボタンを押した際に、  
コンソールログ上に「Test Form Submit!」が出力されます。

基本的にSubmitコールバック上で送信データを引数で取得できるので  
それを元に入力チェック(バリデーション)を行ってから、外部API等にリクエスト送信を行います。

xxxxxでは**フォームのSubmitボタンを押した際はフォームタグからの直接リクエスト送信はされない仕様となっています。**  
外部リクエストを送信したい場合は、別途送信リクエスト用のオブジェクト``rd2.request``を  
使ってリクエストを行ってください。

<a id="callback_reset"></a>

### ## resetコールバック

フォームのリセットボタンを押した時またはリセットが実行された際に実行させるコールバック(Resetコールバック)は``rd2.form.callReset``関数を使って設置できます。

Resetコールバックは``app/Reset``ディレクトリ内に別jsファイルすることを推奨します。  
ファイル名は``XXXXReset.js``とします。

**TestReset.js**
```javascript
rd2.form("test").callReset(function(){
	console.log("Test Form Submit!");
});
```

上記の場合、入力フォームからSendボタンを押した際に、  
コンソールログ上に「Test Form Submit!」が出力されます。

通常のフォームのリセット処理はコールバック実行に行われる為、  
それ以外の処理を同時に行わせたい場合等にこのコールバックを使用します。

<a id="callbackobject"></a>

## # コールバックオブジェクト

<a id="callobj_files"></a>

### ## 送信データの取得

送信データはコールバックの引数にオブジェクトとして返されます。

**TestReset.js**
```javascript
rd2.form("test").callReset(function(obj){
	console.log(obj);
});
```

<a id="callobj_files"></a>

### ## ファイル添付形式について

ファイル添付データはファイルデータをbase64変換テキストでセットし直されます。  
その他、ファイルサイズやファイル形式などの情報が別途加わります。


<a id="submit"></a>

## # Submitの実行

Submitボタンを押してではなく、任意でSubmitを実行したい場合はsubmit関数を使用します。

```javascript
rd2.form("test").submit();
```

<a id="reset"></a>

## # Resetの実行

Resetボタンを押してではなく、任意でリセットを実行したい場合はreset関数を使用します。

```javascript
rd2.form("test").reset();
```
