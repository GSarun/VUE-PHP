# ใช้ PHP 8.2-FPM (Alpine Linux) เป็น base
FROM php:8.2-fpm-alpine

# ติดตั้ง dependencies ที่จำเป็นสำหรับ PECL และไดรเวอร์ SQLSRV
# เราต้องการ unixodbc-dev
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS unixodbc-dev \
    && pecl install sqlsrv pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv \
    && apk del .build-deps