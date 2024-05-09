FROM php:8.2-fpm

LABEL authors="saparbayevzh03@gmail.com"

# Copy composer.lock and composer.json into the working directory
COPY composer.lock composer.json /var/www/html/

# Set working directory
WORKDIR /var/www/html/

# Install packages
RUN apt update -yqq && apt install -y libfreetype6-dev \
    curl g++ build-essential \
    unzip libzip-dev lftp \
    libicu-dev libpq-dev libonig-dev libaio1  \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pcntl intl opcache pdo pdo_pgsql pgsql mbstring zip exif gd \
    && docker-php-ext-enable opcache

# Install composer (php package manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory contents to the working directory
COPY . /var/www/html

# Assign permissions of the working directory to the www-data user
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

USER www-data:www-data

CMD ["php-fpm", "-F"]
