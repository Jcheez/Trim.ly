#!/bin/sh

cd ../var/app/current/certbot

rm -rf conf

docker compose run --rm certbot \
  certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  -n \
  --agree-tos \
  -d $(/opt/elasticbeanstalk/bin/get-config environment -k CERTBOT_DOMAINS) \
  --email $(/opt/elasticbeanstalk/bin/get-config environment -k CERTBOT_EMAIL)

docker compose restart
