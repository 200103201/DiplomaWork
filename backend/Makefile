# The default environment file
ENVIRONMENT_FILE=$(shell pwd)/.env

# The default project directory
PROJECT_DIRECTORY=$(shell pwd)

build-project: composer-install check-env
	- docker exec -ti backend php artisan key:generate
	- docker exec -ti backend php artisan optimize:clear
	- docker exec -ti backend php artisan optimize

composer-install:
	- docker exec -ti backend composer install

optimize:
	- docker exec -ti backend php artisan optimize

clean:
	- docker exec -ti backend php artisan optimize:clear

clean-dependencies:
	- rm -rf vendor

php-fixer:
	- docker exec -ti backend vendor/bin/pint

swagger:
	- docker exec -ti backend php artisan l5-swagger:generate

psalm:
	- docker exec -ti backend vendor/bin/psalm --no-cache

config:
	- docker exec -ti backend php artisan config:cache

check-env:
ifeq (,$(wildcard ./.env))
	cp .env.example .env
endif
