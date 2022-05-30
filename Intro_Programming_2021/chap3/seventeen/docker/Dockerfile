# [ base image ]
FROM --platform=linux/x86_64 node:14.15.4

# [ system update ]
RUN apt-get update

# [ set system environment ]
RUN apt-get install -y locales
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG ja_JP.UTF-8
ENV TZ Asia/Tokyo

# [ set user environment ]
WORKDIR /seventeen