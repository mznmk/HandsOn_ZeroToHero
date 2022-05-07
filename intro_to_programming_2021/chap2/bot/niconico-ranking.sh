#!/bin/bash

dirname="/linux-study/bot/niconico-ranking-rss"
mkdir -p $dirname
filename="$dirname/hourly-ranking-`date +'%Y%m%d%H%M'`.xml"
echo "save done: $filename"
curl -s -o $filename -H "User-Agent: CrawlBot; mika_develop@mznmk.com" https://www.nicovideo.jp/ranking/genre/all?rss=2.0&lang=ja-jp