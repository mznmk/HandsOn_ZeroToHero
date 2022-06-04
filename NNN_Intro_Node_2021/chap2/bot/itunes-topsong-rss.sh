#!/bin/bash

dirname="/linux-study/bot/itunes-topsong-rss/"
mkdir -p $dirname
filename="$dirname/hourly-ranking-`date +'%Y%m%d%H%M'`.xml"
echo "save done: $filename"
curl -s -o $filename -H "User-Agent: CrawlBot; mika_develop@mznmk.com" https://itunes.apple.com/jp/rss/topsongs/limit=10/xmlhttps://itunes.apple.com/jp/rss/topsongs/limit=10/xml