# バリデーションについて

xxxxxでは入力データのチェック用にバリデーションオブジェクトが用意されています。  
基本的に入力フォームからSubmitされた際にバリデーションチェックを行ってください。

<a id="set"></a>

## # バリデーションの設置

``app/Validate``ディレクトリに別jsファイルを作成してそこに記述します。

**TestValidate.js**
```javascript
rd2.validate("test").set({
	name:[
		{
			rule:"required",
			message:"nameが未入力です",
		}
	],
	value:[
		{
			rule:"required",
			message:"valueが未入力です",
		},
		{
			rule:"alphaNumeric",
			message:"半角英数字のみで入力してください",
		},
	],
});
```

<a id="verify"></a>

## # バリデーションの実行

バリデーションの実行はverifyメソッドを使用して簡単に実行することができます。  
引数にリクエストデータを渡して、戻り値にバリデーションの結果が返されます。  
(エラーがない場合はnullを返します。)

```javascript
rd2.form("test").callSubmit(function(data){

	var vres=rd2.validate("test").verify(data);

	console.log(vres);

});
```

エラーメッセージも表示させたい場合はerrorOutputメソッドを使用することで自動的にエラーメッセージが出力されます。  

```javascript
rd2.form("test").callSubmit(function(data){

	var vres=rd2.validate("test").errorOutput(data);

	console.log(vres);

});
```

ただし``rd2.form.set``メソッドを使用して書く入力フォームを形成した場合にのみ適用できます。  
詳しい内容は[こちらを](form.md#set)参照してください。


<a id="vrule"></a>

## # デフォルトのバリデーションルール

デフォルトでバリデーションルールを予めプリセットされています。  
単純なルールであればこちらのルールを指定してください。

排他的な条件など複雑なルールの場合のみカスタムバリデーションを設置してください。  
カスタムバリデーションの設置方法については[こちらを参照](#custom)。

<a id="vrule_required"></a>

### ## 必須項目(required)

```javascript
{
	rule:"required",
	message:"未入力です"
}
```

<a id="vrule_alphanumeric"></a>

### ## 半角英数字のみ許可(alphaNumeric)

```javascript
{
	rule:"alphaNumeric",
	message:"半角英数字のみで入力してください"
}
```

第二引数に特殊文字を許可することも可能。

```javascript
{
	rule:["alphaNumeric","+=@.,"],
	message:"半角英数字と「+」「=」「@」「.」「,」のみで入力してください"
}
```

<a id="vrule_numeric"></a>

### ## 半角数字のみ許可(numeric)

```javascript
{
	rule:"numeric",
	message:"半角数字のみで入力してください"
}
```

第二引数に特殊文字を許可することも可能。

```javascript
{
	rule:["numeric","+=@.,"],
	message:"半角数字と「+」「=」「@」「.」「,」のみで入力してください"
}
```

<a id="vrule_length"></a>

### ## 指定文字数のみ許可(length)

```javascript
{
	rule:["length",20],
	message:"20文字で入力してください"
}
```

<a id="vrule_minlength"></a>

### ## 指定文字数以上のみ許可(minLength)

```javascript
{
	rule:["minLength",6],
	message:"6文字以上で入力してください"
}
```

<a id="vrule_maxlength"></a>

### ## 指定文字数以下のみ許可(maxLength)

```javascript
{
	rule:["maxLength",100],
	message:"100文字以下で入力してください"
}
```

<a id="vrule_betweenlength"></a>

### ## 指定文字数の範囲のみ許可(betweenLength)

```javascript
{
	rule:["betweenLength",6,100],
	message:"6～100文字の範囲で入力してください"
}
```

<a id="vrule_value"></a>

### ## 指定値のみ許可(value)

```javascript
{
	rule:["value",20],
	message:"20を入力してください"
}
```

<a id="vrule_minvalue"></a>

### ## 指定値以上のみ許可(minValue)

```javascript
{
	rule:["minValue",6],
	message:"6以上を入力してください"
}
```

<a id="vrule_maxvalue"></a>

### ## 指定値以下のみ許可(maxValue)

```javascript
{
	rule:["maxValue",100],
	message:"100以下を入力してください"
}
```

<a id="vrule_betweenvalue"></a>

### ## 指定値の範囲のみ許可(betweenValue)

```javascript
{
	rule:["betweenValue",6,100],
	message:"6～100の範囲を入力してください"
}
```

<a id="vrule_selectedcount"></a>

### ## 指定選択個数のみ許可(selectedCount)

```javascript
{
	rule:["selectedCount",6],
	message:"6種類を選択してください"
}
```

<a id="vrule_minselectedcount"></a>

### ## 指定選択個数以上のみ許可(minSelectedCount)

```javascript
{
	rule:["minSelectedCount",4],
	message:"最低4種類以上を選択してください"
}
```

<a id="vrule_maxselectedcount"></a>

### ## 指定選択個数以下のみ許可(maxSelectedCount)

```javascript
{
	rule:["maxSelectedCount",20],
	message:"最大20種類は選択してください"
}
```

<a id="vrule_betweenselectedCount"></a>

### ## 指定選択個数の範囲のみ許可(betweenSelectedCount)

```javascript
{
	rule:["betweenSelectedCount",4,20],
	message:"選択できるのは4～20種類です"
}
```

<a id="vrule_like"></a>

### ## あいまい検索(like)

```javascript
{
	rule:["like","%likes%"],
	message:"値に「likes」が含まれていません"
}
```

<a id="vrule_any"></a>

### ## 指定リストの範囲のみ許可(any)

```javascript
{
	rule:["any",["00","01","02"]],
	message:"00,01,02のいずれかのみを入力してください"
}
```

<a id="vrule_date"></a>

### ## 日付フォーマットのみ許可(date)

```javascript
{
	rule:"date",
	message:"不正な日付フォーマットです"
}
```

<a id="vrule_mindate"></a>

### ## 日付フォーマット+指定日付以上のみ許可(minDate)

```javascript
{
	rule:["minDate","2020/10/21"],
	message:"既定の日付より前は指定できません"
}
```

<a id="vrule_maxdate"></a>

### ## 日付フォーマット+指定日付以下のみ許可(maxDate)

```javascript
{
	rule:["maxDate","2021/11/21"],
	message:"既定の日付より先は指定できません"
}
```

<a id="vrule_betweendate"></a>

### ## 日付フォーマット+指定日付の範囲のみ許可(betweenDate)

```javascript
{
	rule:["betweenDate","2020/10/21","2021/11/21"],
	message:"既定の期間で指定してください"
}
```

<a id="vrule_isint"></a>

### ## 整数値のみ許可(isInt)

```javascript
{
	rule:"isInt",
	message:"整数値を指定してください"
}
```

<a id="vrule_isbool"></a>

### ## ブール値(0と1)のみ許可(isBool)

```javascript
{
	rule:"isBool",
	message:"ブール値を指定してください"
}
```

<a id="vrule_isemail"></a>

### ## メールフォーマットのみ許可(isEmail)

```javascript
{
	rule:"isEmail",
	message:"メール形式が不正と判断しました"
}
```

<a id="vrule_istel"></a>

### ## 電話番号のみ許可(isTel)

```javascript
{
	rule:"isTel",
	message:"電話番号を入力してください"
}
```

<a id="vrule_isip"></a>

### ## IPアドレスのみ許可(isIp)

```javascript
{
	rule:"isIp",
	message:"IPアドレスを入力してください"
}
```

<a id="vrule_isurl"></a>

### ## URLのみ許可(isUrl)

```javascript
{
	rule:"isUrl",
	message:"URLを入力してください"
}
```

<a id="vrule_regex"></a>

### ## 指定の正規表現のみ許可(regex)

```javascript
{
	rule:["regex","a.z"],
	message:"a～zの3桁の文字列で入力してください"
}
```

<a id="vrule_iszipjp"></a>

### ## (※日本向け)郵便番号フォーマットのみ許可(isZipJP)

```javascript
{
	rule:"isZipJp",
	message:"国内向け郵便番号ではありません"
}
```

<a id="vrule_iskatakana"></a>

### ## (※日本向け)カタカナ表記のみ許可(isKatakana)

```javascript
{
	rule:"isKatakana",
	message:"全角カタカナのみで入力して下さい"
}
```

<a id="vrule_ishiragana"></a>

### ## (※日本向け)ひらがな表記のみ許可(isHiragana)

```javascript
{
	rule:"isHiragana",
	message:"全角ひらがなのみで入力して下さい"
}
```

<a id="custom"></a>

## # カスタムバリデーションの設置と実行

カスタムバリデーションは``rd2.validate.addCustom``関数を使って設置できます。

```javascript 
rd2.validate("test").addCustom("custom1",function(value,arg1,arg2){

	return true;

});
```

引数valueはデータの値、arg1およびarg2は追加の条件項目となります。

必ず戻り値(true/false)によりバリデーション結果を返す必要があります。

例としてname属性に対して「001」以外の入力が必要なカスタムバリデーションを実装するに  
まず下記のようにバリデーションを設置します。

**TestValidate.js**
```javascript
rd2.validate("test").set({
	name:[
		{
			rule:"required",
			message:"nameが未入力です",
		},
		{
			rule:"custom1",
			message:"「001」以外の入力が必要です",
		}
	],
	value:[
		{
			rule:"required",
			message:"valueが未入力です",
		},
		{
			rule:"alphaNumeric",
			message:"半角英数字のみで入力してください",
		},
	],
}).addCustom("custom1",function(value){

	if(!value){
		return true;
	}

	if(value=="001"){
		return false;
	}

	return true;

});
```

あとは普通にバリデーションを実行する際に、name属性値に「001」を入力して  
エラーメッセージが表示されればカスタムバリデーションが有効になっている証となります。

カスタムバリデーションで他の項目値を判定用に用いる場合は   
```this.value```関数を使って値を取得できます。

```javascript
rd2.validate("test").addCustom("custom1",function(value){

	if(!value){
		return true;
	}

	// valueの値を取得
	var value2=this.value("value");

	if(value2=="001"){
		return false;
	}

	return true;

});
```
