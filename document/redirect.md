# リダイレクトについて

<a id="move"></a>

## # 任意のページへ移動

```javascript
rd2.redirect.move("bbb");
```

<a id="back"></a>

## # 1つ前のページに戻る

```javascript
rd2.redirect.back();
```

<a id="option"></a>

## # リダイレクトのオプション

リダイレクト時でのオプション指定は  
move関数の第二引数、またはbackの引数を指定することで

<a id="opt_animation"></a>

### ## アニメーションの有効/無効または変更

```javascript
rd2.redirect.move("bbb",{
	animation:"slide-top",
});
```

<a id="animation"></a>

## # アニメーションの有効/無効

無効はこちら

```javascript
rd2.redirect.stopAnimation();
```

有効はこちら

```javascript
rd2.redirect.startAnimation();
```

<a id="animation_change"></a>

## # アニメーションの変更

```javascript
rd2.redirect.changeAnimation('slide-top');
```

デフォルトのアニメーションに戻す場合は下記

```javascript
rd2.redirect.revertAnimation();
```

<a id="enabled"></a>

## # ボタン操作の有効/無効

ボタン操作(戻るボタンとリンクボタン)を一時的に無効にしたい場合はdisable関数でtrueを指定してください。

```javascript
rd2.redirect.disable(true);
```

ボタン操作(戻るボタンとリンクボタン)を有効に戻す場合はdisable関数でfalseを指定してください。

```javascript
rd2.redirect.disable(false);
```

なおページ遷移が実行完了後は自動的に戻るボタンとリンクボタンの無効化は解除されます。

<a id="clear_redirect_cache"></a>

## # ページ遷移履歴のクリア

ページ遷移の履歴をクリアにしたい場合はresetRedirectCache関数を使用してください。

```javascript
rd2.redirect.resetRedirectCache();
```


