# [ base image ]
FROM --platform=linux/x86_64 ubuntu:18.04

# [ system update ]
RUN apt-get update; apt-get upgrade;
RUN yes | unminimize;

# [ set environment ]
RUN locale-gen ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV TZ Asia/Tokyo

# [ install application ]
RUN apt-get install -y curl vim tmux tcpdump;

# [ set working directory ]
WORKDIR /linux-study
