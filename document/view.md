# Viewを使う

ViewはHTMLタグでコンテンツ内容を動的に設置するための機能です。

<a id="set"></a>

## # Viewファイルの設置

``views``ディレクトリ内にHTMLファイルでViewファイルを設置します。

**TestView.html**
```html
<h1>Test View Sample</h1>
<p>content text sample text sample text ....</p>
```

<a id="load"></a>

## # Viewのコンテンツをロード

Viewのコンテンツ内容を取得したい場合は``rd2.view.open``関数を使用します。  
引数で取得したいView名を指定するだけです。

```javascript
var content=rd2.view.open("test");
$(".content_area").html(content);
```
