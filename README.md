## 開発上のルール

+ 文字コード
  + UTF-8を使用する。
+ インデント
  + インデントはタブを使用する。
+ 命名規則
  + 大原則として変数名がちょっとくらい長くなってもいいので、わかりやすい変数名を付けよう。  
  わかりやすい変数名を付けることは効率のいいプログラムを作る第1歩だ。
  + 変数名、関数名、メソッド名は基本的にキャメルケースで  
例)webExtensionAddon  
上記例のように2つ目の英単語ごとに頭文字を大文字にする。  
  + 定数は全部大文字の単語の間にアンダーバーを記入する  
例)TICKET_URL
  + クラス名はアッパーキャメルケース(パスカルケース)  
例)WebExtensionModal  
上記のように1つ目の頭文字から大文字にする。

+ プロジェクトの権限について
  + プロジェクトのメンバーの権限としてMaster、Developerを扱います。
  + Master Branchにはプロテクトをかけております。
  + MasterへのmergeにはMaster権限を持った人しかできません。  
  したがってmergeの場合はMaster権限を持った人へMerge requestを出しましょう。
  + Developer権限の人は自由にBranchをつくれるのでそちらで作業をします。
  
+ バージョンの管理
  + XUL+XPCOMからWebExtensionへ変更するためVer 2.0.0から始める  
  
| 2     | . 0   | .0    |
| :---: | :---: | :---: |
| 3桁目 | 2桁目 | 1桁目 |

  + 3桁目は大規模な修正や変更の場合にバージョンを上げる。  
  →この桁を上げた場合は2桁目と1桁目を0に戻す
  + 2桁目は機能の追加をした場合に上げる。  
  →この桁を上げた場合は1桁目を0に戻す
  + 1桁目はバグの修正場合や、細微な修正の場合に上げる。  
  
+ WebExtension開発の環境について
  + エディタにはVSCodeの使用をおすすめします。
  + JavaScriptの静的解析ツールであるESLintを入れるとエラーがわかりやすいです。
    + 導入方法
    1. VSCodeの拡張にてESLintをインストールする。
    1. `X:\Tool\visual studio code`にある`nodejs.zip`を`C:\Users\【ユーザ名】\AppData\Roaming`に解凍する。
    1. `C:\Users\【ユーザ名】\AppData\Roaming`に空のnpmというフォルダを作成する。
    1. エクスプローラーにて`コントロール パネル\ユーザー アカウント\ユーザー アカウント`を開き左下の環境変数の変更を開く。
    1. 上にある`【ユーザ名】のユーザー環境変数`の`Path`の末尾に下記を追記する  
        **間違えても既存のパスを消さないこと。**
        + C:\Users\【ユーザ名】\AppData\Roaming\nodejs;
        + C:\Users\【ユーザ名】\AppData\Roaming\npm;
    1.  そのあとにcmdを起動して下記でバージョンが表示されることを確認
        + node -v
        + npm -v
    1. cmdにて`npm i -g eslint`を実行
    1. `C:\Users\【ユーザ名】\`のフォルダを開く
    1. `.eslintrc.json`の名前でテキストを作成する。
        これでeslintのグローバルな設定を行う。
    1. 下記内容を入力、これでVSCodeでJavaScriptファイルを開くとLintで構文チェックが実行されるようになる。

```json
    {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals":{
        "chrome": false
    },
    "rules": {
        "no-console":0,
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes":0,
        "semi": [
            "error",
            "always"
        ]
    }
}
```

  + web-extの導入
    + 導入することでWebExtensionのLintとVSCodeでソースを修正して保存する度に自動的にアドオンをリロードして適用することができます。
    + 導入方法
      + cmdにて`npm i -g web-ext`のコマンドを実行してweb-extをインストールする。
    + 使用方法
      + VSCodeのターミナルで`web-ext run -f=firefoxdeveloperedition -p=dev-edition-default`のコマンドを入れることでFirefxo Developer Edtionを立ち上げてアドオンがインストールされた状態で起動する。
      + VScodeを閉じるかターミナルの箇所でctrl+Cのコマンドでアドオンの実行を停止、上記コマンドで開かれたFirefoxは閉じられる。
      + `web-ext lint`で現在のmanifest.jsonなどの構文チェックを実施する。
        + iconなどのパスの判定に不具合があって、ファイルが見つからないとエラーを出しますが、気にしないでいいです。

+ DRY原則を遵守しよう  

> DRY原則をもう一度 -コンカレント・エンジニアリング- - Qiita より引用開始  
  
  
-----

DRY原則。  
WebフレームワークRuby on Railsが基本理念のひとつとして採用している有名なソフトウェア開発原則です。 
素晴らしい原則なのですが、最近Railsを始めた人や新卒のエンジニアさんなど、DRY原則を誤認してしまう人が非常に多い為、DRY原則に関する説明をQiitaにまとめておくことにします。

## よくある間違った認識

DRY原則を誤認しているとはどういうことなのか？  
最も多いのが**「DRYとはコードを重複させないという意味である」**と認識しているケースです。  
当然、コードを重複させないという部分もDRYの一部ではあるのですが、これではソースコードだけに着目しているので、OAOO(Once And Only Once)原則に近い考え方になってしまいます。

### OAOOとは何か

厳密な定義を書かないと斧が飛んできそうですが、長文になってしまうのであえて一言で説明すると、「コードを重複させない」という原則です。  
まさにDRY原則の間違った解釈と同じですね。  

しかしそんなOAOOでも、

> I think that OnceAndOnlyOnce is a great concept but cannot be taken perfectly literally.. as for example in the documentation, sometimes points need to be repeated in different ways on different pages to ensure the safety of the readers (repeating warnings and such things). Also in code sometimes we have no other choice but to repeat something to make code clearer.... consider
> 引用元: Portland Pattern Repository(OnceAndOnlyOnce)

と、言われるようにあらゆる状況で適用できる原則ではないと言及されています。  



## DRYとは何か

「コードを重複させない」がDRYでないのなら、実際はどういう意味なのでしょうか。  
DRYは「Don’t Repeat Yourself」の略語であり、Andy HuntとDave Thomasが書籍「達人プログラマー―システム開発の職人から名匠への道」で提唱したソフトウェア開発原則です。  
以下は達人プログラマーからの引用になります。  

> 信頼性の高いソフトウェアを開発して、開発そのものを簡単に理解したりメンテナンスできるようにする唯一の方法は、DRY原則に従うことです。  
> **すべての知識はシステム内において、単一、かつ明確な、そして信頼できる表現になっていなければならない。**

> 何故これがDRY原則なのでしょうか？
 DRY原則を破るということは、同じ知識を２箇所以上に記述することです。  
この場合、片方を変更するのであれば、もう片方も変更しなければならないのです。  
さもなければ異星人のコンピュータのようにプログラムは矛盾につまづくことになるのです。  
これはあなたが覚えていられるかどうかという問題なのではありません。  
これはあなたが忘れてしまった時の問題なのです。  

 このDRY原則は本書中のコーディングに関係のない部分でも何度も登場します。  
我々はこれが達人プログラマーの道具箱の中にある道具のうちで最も重要なものの一つであると考えています。  

> 引用元: 達人プログラマー―システム開発の職人から名匠への道

なるほど、確かに誤認しやすそうな解説ですね。  
著者のDave Thomas自身も、DRY原則は達人プログラマーの中で最も誤認されやすい原則だと語っています。  


> Dave Thomas:
Most people take DRY to mean you shouldn't duplicate code. That's not its intention. The idea behind DRY is far grander than that.
DRY says that every piece of system knowledge should have one authoritative, unambiguous representation. Every piece of knowledge in the development of something should have a single representation. A system's knowledge is far broader than just its code. It refers to database schemas, test plans, the build system, even documentation.
引用元: artima developer

つまりDRYは、単に「コードを重複させない」という原則ではなく、DBスキーマ、テスト、ビルドシステム、ドキュメントなども対象になっており、ソフトウェア開発全体において「**情報を重複させない**」という原則なのです。  


今までDRY原則を誤認していた人は「なるほど、それなら情報を重複させずに開発すればいいんだ」と考えたはずです。  
しかし、Railsのコードを眺めるとDRYに反している部分が多数ある事に疑問を持つはずです。  
例えば、 db/schema.rb 。  
このファイルにはDBスキーマの定義が記述されているのに、DB本体にもDBスキーマ定義があるのだから、DRYではないのでは？

## DRY原則が有用でない場合

情報が重複していたらそれはDRYとは言えないのでは？
素直に考えるとそうなってしまうのですが、先程のケースは例外です。  
そう、DRY原則には例外が存在します。  

db/schema.rbの例だと、DBスキーマの定義が実際のDBスキーマ上の定義と重複していますが、このファイルはRailsのジェネレータによって自動生成されたものです。  
ファイル自体は情報として重複していますが、それを生成する過程は自動化されている為、DRY原則に反しないのです。  

他にもミラーリング、単体テスト、バージョン管理等、DRY原則が有用でない場合は多数あり、状況によってDRY原則が有効ではなくなるという事が分かりますね。  


## やり過ぎなDRY

また、過剰過ぎるDRYも良しとされません。  
極端な例ですが、以下のようなリファクタリングをしてしまう人がいます。  


```rb
# Before
class User < ActiveRecord::Base
  def some_method1 p1, p2
    # ....
  end
  def some_method2
    # ....
  end
  def some_method3 p3
    # ....
  end
end

# ※当然、状況次第ではこのようなリファクタリングが正しい場合もあります

# After
class User < ActiveRecord::Base
  def all_method p1, p2, p3, context
    case context
    when 'some_method1'
      # ....
    when 'some_method2'
      # ....
    end
  end
end
```

簡略化して書いているのでまだシンプルなロジックに見えますが、この思想で1つのメソッドにビジネスロジックを集約していくと破綻が目に見えていますよね。  
どのロジックを通るにしても、集約した全てのロジックに依存関係が生まれてしまう。  
いわゆる密結合です。  


>同じオブジェクトにある2つのメソッドがある同じ仕事をしているとき、私たちはそれら2つのメソッドが委譲する第三のメソッドを抽出します。  
もとの2つのメソッドはいずれも抽出されたメソッドに結合しており、間接的ですがお互い結合しています。  
これは単一オブジェクトのコンテキストにおいては、まったく論理的であって危険はないように見えます。  
しかし、2つのオブジェクトを横断した同様の振舞いを考えるとどうでしょう？重複をなくすため、私たちはそれらが依存する新しいオブジェクトを導入することになるか、よくあることですが、さらにひどくて悲惨なことに、あるオブジェクトをほかのオブジェクトに依存させます。  
後者のアプローチでは、関係のないオブジェクト間に依存関係を作ってしまうことが多く、やがて進化の妨げになります。  
新しいオブジェクトを導入すると、システム全体の界面が増えてしまい、導入時やリファクタリング時に余計な検討や配慮を必要とします。  

引用元: InfoQ DRY原則の利用:コードの重複と密結合の間

DRYは素晴らしい考えですが、やり過ぎると密結合を生んでしまう。  
密結合が進むと修正時に影響範囲が増えてしまうんですね。  

まさに手段が目的状態。  
コード上のDRYを守る為に自分自身が作業をRepeatしてしまっては元も子もないでしょう。  


## 最後に

これだけは抑えてほしいのは、OAOO原則からの引用になりますがDRY原則も全く同じで、

> OnceAndOnlyOnce is not a pattern. OnceAndOnlyOnce is a principle. 
> 引用元: Portland Pattern Repository(OnceAndOnlyOnce)

ということ。  

DRY原則は素晴らしいコンセプトですが、結局のところ「原則」であり、あらゆる状況において適応できるものではないのです。  

ソフトウェア開発原則は他にも多数存在するわけで、それぞれコンテキストによって用法・容量を正しく守って使いましょうということでした。  


----------------------------
> 引用おわり