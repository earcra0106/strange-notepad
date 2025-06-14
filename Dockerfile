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

CMD php artisan config:clear && php artisan cache:clear && php artisan view:clear && php artisan migrate --force && php artisan storage:link && php artisan serve --host 0.0.0.0 --port 8080