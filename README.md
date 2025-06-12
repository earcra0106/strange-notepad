# 魔法のメモ帳

### 実装済み

-   基本的なメモ帳の CRUD 機能
-   ユーザ管理機能(Laravel Breeze)

### 実装予定

-   OpenAI の API を利用し、メモ帳の内容をある特性で変化させる機能
-   メモ帳が持つ特性を解き明かすゲーム的機能
-   解き明かしたメモ帳を他のユーザと共有する機能
-   解き明かしたメモ帳を投稿するコミュニティ機能

### 関連(まとまり次第追記します)

Laravel Sail
Docker Desktop
React
Inertia
Chakra-UI

laravel-debugbar
composer require --dev barryvdh/laravel-debugbar

### Laravel Sail でキャッシュをクリアする方法

以下のコマンドを実行します:

```bash
sail artisan cache:clear
sail artisan config:clear
sail artisan route:clear
sail artisan view:clear
```

必要に応じて各種キャッシュをクリアしてください。

npm install react-icons
npm install react-confetti
