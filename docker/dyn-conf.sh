#!/bin/sh

# Script running fron nginx image /docker-entrypoint.d/ dir during container start

if [ -n "$DYNAMIC_CONF" ]; then
    # Replace environment variables in JavaScript file
    envsubst < /usr/share/nginx/dyn-conf/dyn-conf-template.js > /usr/share/nginx/html/dyn-conf.js
else
    # Recover the empty file
    cat /usr/share/nginx/dyn-conf/dyn-conf.js > /usr/share/nginx/html/dyn-conf.js
fi
