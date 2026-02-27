#!/bin/sh

# Install PHP dependencies
echo "Installing composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader


# Install Node dependencies
echo "Installing npm dependencies..."
npm install


# Compile assets
composer run dev

# Set permissions
chown -R www-data:www-data /var/www/html

# Start supervisord
echo "Starting supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
