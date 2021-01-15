# ダイアログを使う

ダイアログはモーダルウィンドウのように別ウィンドウで表示させる機能です。  
ページ内とは別でダイアログを簡単に実装することができます。

<a id="setting">

## # ダイアログの設置

ダイアログを表示するには下記のように``rd2.dialog()``メソッドを使用すると簡単に設置できます。  
下記でダイアログ名**dialog1**のダイアログ画面が表示されます。

```javascript
rd2.dialog("dialog1").open();
```

実際はボタン押した際などのイベントハンドラ上でダイアログ表示のコードを記述します。

```javascript
$(".open_dialog").on("click",function(){

    rd2.dialog("dialog1").open();

});
```


ダイアログを表示するにはダイアログ画面用のHTMLが別途必要になります。
``dialog``ディレクトリ内に``{ダイアログ名}.html``でファイルを作成してその中に表示するHTMLコードを記述します。

```html
<h2>Hello Dialog</h2>
```

上記の場合、ダイアログが開いた時点で「Hello Dialog」が表示されます。

## # ダイアログ表示時のコールバック

```javascript
rd2.dialog("dialog1").open(function(obj){

    obj.dialog.find(".exit").on("click",function(){
        obj.close();
    })

});
```

引数には専用のオブジェクトが返されます。  
上記の場合ダイアログ内にあるクラス属性exitのボタンを押すとダイアログが終了します。

## # ダイアログ画面オブジェクトの取得

ダイアログ画面のDOM要素オブジェクトはコールバックの引数にあるdialogで取得できます。

```javascript
rd2.dialog("dialog1").open(function(obj){

    console.log(obj.dialog);

});
```


## # ダイアログを閉じる

ダイアログ画面内にクラス属性closedのボタンを設置し。それを押すことでダイアログが閉じます。

```html
<h2>Hello Dialog</h2>
<hr>
<a class="closed">Close</a>
```

自動的にダイアログを閉じたい場合は、ダイアログ表示コールバックの引数(オブジェクト)にあるcloseメソッドを使用してください。

```javascript
rd2.dialog("dialog1").open(function(obj){

    setTimeout(function(){
        obj.close();
    },3000);

});
```
```