#!/bin/sh

aws s3 rm s3://kinikare-front-production/ --recursive
aws s3 cp build s3://kinikare-front-production/ --recursive