#!/bin/bash

anubis \
  -target "http://localhost:9445" \
  -bind ":8924" \
  -bind-network "tcp" \
  -cookie-expiration-time 12h \
  -og-expiry-time 1s \
  -serve-robots-txt \
  -metrics-bind ":9091" \
  -metrics-bind-network "tcp" \
  -policy-fname "anubis.yaml"
