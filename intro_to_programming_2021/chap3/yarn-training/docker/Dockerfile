# [ base image ]
# https://hub.docker.com/layers/node/library/node/14.15.4/images/sha256-b8d2ef090217608906ea216440100fe32ff1c124d8f0c18813ca5d727f094eda?context=explore
FROM --platform=linux/x86_64 node:14.15.4

# [ system update ]
RUN apt-get update

# [ set environment ]
RUN apt-get install -y locales
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG ja_JP.UTF-8
ENV TZ Asia/Tokyo

# [ set working directory ]
WORKDIR /nodejs-study