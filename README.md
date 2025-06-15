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

### Render で Laravel Sail + React + Chakra UI アプリをデプロイする手順（MySQL→PostgreSQL 切り替え）

#### 1. Render アカウント作成・GitHub 連携

-   [Render 公式](https://render.com/) にアクセスし、アカウントを作成
-   GitHub 連携を行う

#### 2. Dockerfile の用意

-   プロジェクトルートに `Dockerfile` を作成し、Sail の内容をベースに本番用に調整します。

    ```dockerfile
    FROM laravelsail/php83-composer:latest

    # Node.js, npmのインストール
    RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
        && apt-get install -y nodejs

    WORKDIR /var/www/html

    COPY . .

    RUN composer install --no-dev --optimize-autoloader
    RUN npm ci && npm run build

    RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

    EXPOSE 8080

    CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port 8080
    ```

#### 3. Render で新しい Web Service を作成

-   「New +」→「Web Service」を選択
-   デプロイしたいリポジトリを選択
-   **Environment**: Docker
-   **Dockerfile Path**: `Dockerfile`
-   **Port**: `8080`

#### 4. PostgreSQL データベースを追加

-   Render の「Add Database」→「PostgreSQL」を選択
-   DB 作成後、接続情報（ホスト名・ユーザー名・パスワード・DB 名）を控える

#### 5. Laravel の DB 設定を PostgreSQL に変更

-   `.env`や Render の環境変数で下記を設定

    ```
    DB_CONNECTION=pgsql
    DB_HOST=（RenderのPostgresホスト名）
    DB_PORT=5432
    DB_DATABASE=（RenderのPostgres DB名）
    DB_USERNAME=（RenderのPostgresユーザー名）
    DB_PASSWORD=（RenderのPostgresパスワード）
    ```

-   `APP_KEY`（ローカルで `php artisan key:generate --show` で取得）
-   `APP_ENV=production`
-   `APP_DEBUG=false`
-   `APP_URL=https://xxxx.onrender.com`（デプロイ後の URL）
-   メール設定など必要なもの

#### 6. マイグレーション・ストレージリンク

-   Render の「Shell」から
    ```
    php artisan migrate --force
    php artisan storage:link
    ```

#### 7. 動作確認

-   発行された URL でアプリが動作するか確認
-   メール送信やファイルアップロードなども必要に応じてテスト

---

**ポイント**

-   `.env`ファイルはリポジトリに含めず、Render の環境変数で管理
-   MySQL 用のマイグレーションやクエリで PostgreSQL 非対応のものがあれば修正
-   Dockerfile で Sail のイメージを利用しつつ、本番用に不要なサービスは省略
-   DB やメールなど外部サービスの設定も忘れずに

参考
Gmail を利用した Laravel のメール送信設定 #Laravel - Qiita
https://qiita.com/hiro5963/items/df062ab19e8ceba4573f

DB_CONNECTION=pgsql
DB_HOST=dpg-d16pjofdiees73der7k0-a
DB_PORT=5432
DB_DATABASE=strange_notepad
DB_USERNAME=strange_notepad_user
DB_PASSWORD=XIaGIWFxnxIHNVEY39APLjHWpXkk8ue1
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=${MAIL_USERNAME}
MAIL_FROM_NAME=魔法のメモ帳
MAIL_HOST=smtp.gmail.com
MAIL_MAILER=smtp
MAIL_PASSWORD=xxxxxxxxxxxxxxxx (16 けた空白無)
MAIL_PORT=587
MAIL_USERNAME=earcra01016.service@gmail.com

### トラブルシューティング

1.

```
Mixed Content: The page at '<URL>' was loaded over HTTPS, but requested an insecure stylesheet '<URL>'. This request has been blocked; the content must be served over HTTPS.Understand this error
```

vite.config.js を以下のように設定

```js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/build/",
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
});
```

2.

```
In Connection.php line 822:

could not find driver (Connection: pgsql, SQL: delete from "cache")

In Connector.php line 66:

could not find driver
```

Dockerfile に PostgreSQL ドライバのインストールを追加してください。

```
# ...existing code...
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo_pgsql pgsql
# ...existing code...
```

3.

```
configure: error: Cannot find libpq-fe.h. Please specify correct PostgreSQL installation path
```

4.

```
   INFO  Configuration cache cleared successfully.
In Connection.php line 822:

  SQLSTATE[42P01]: Undefined table: 7 ERROR:  relation "cache" does not exist
  LINE 1: delete from "cache"
                      ^ (Connection: pgsql, SQL: delete from "cache")

In Connection.php line 593:

  SQLSTATE[42P01]: Undefined table: 7 ERROR:  relation "cache" does not exist
  LINE 1: delete from "cache"
                      ^

==> Exited with status 1
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
In Connection.php line 822:

  SQLSTATE[42P01]: Undefined table: 7 ERROR:  relation "cache" does not exist
  LINE 1: delete from "cache"
                      ^ (Connection: pgsql, SQL: delete from "cache")

In Connection.php line 593:

  SQLSTATE[42P01]: Undefined table: 7 ERROR:  relation "cache" does not exist
  LINE 1: delete from "cache"
                      ^
```

メールのデバッグ時
APP_DEBUG=true
MAIL_MAILER=log

Render の環境変数で
VITE_APP_NAME=${APP_NAME}
APP_NAME=魔法のメモ帳
と設定しても、Vite のビルド時には変数展開が行われません。
（Render の環境変数はシェルのような変数展開を自動でしません）

解決方法

1. 直接値をセットしてください
   VITE_APP_NAME=魔法のメモ帳
   APP_NAME=魔法のメモ帳
2. 変更後、再デプロイしてください
   補足
   Vite の環境変数は.env や Render の環境変数で直接値をセットする必要があります。
   ${APP_NAME}のような参照は効きません。
   直接値をセットすれば、import.meta.env.VITE_APP_NAME で正しく値が取得できます。
