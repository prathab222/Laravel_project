# Stage 1: Build
FROM php:8.4-fpm AS build

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    libzip-dev \
    unzip \
    git \
    libonig-dev \
    libicu-dev \
    libxml2-dev \
    libbz2-dev \
    libcurl4-openssl-dev \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql intl bcmath bz2 gd mbstring zip soap curl ftp dom xml pcntl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Stage 2: Production
FROM php:8.4-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    libpng16-16t64 \
    libjpeg62-turbo \
    libfreetype6 \
    libzip5 \
    libicu76 \
    libonig5 \
    libxml2 \
    libbz2-1.0 \
    libcurl4 \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Copy extensions from build stage
COPY --from=build /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=build /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy application
COPY ./demo-app .

RUN chown -R www-data:www-data /var/www/html/ && \
    mkdir -p /var/www/html/storage/framework/cache/data \
             /var/www/html/storage/framework/sessions \
             /var/www/html/storage/framework/views \
             /var/www/html/storage/logs \
             /var/www/html/bootstrap/cache && \
    chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80 5173 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
