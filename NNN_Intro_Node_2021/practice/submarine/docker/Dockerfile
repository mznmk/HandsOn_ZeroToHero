# [ base image ]
FROM    --platform=linux/x86_64 node:8.9.4

# [ system update ]
# [ install application ]
RUN     apt-get update; \
        apt-get upgrade; \
        apt-get install -y locales; \
        apt-get install -y tmux vim less;

# [ set system environment ]
RUN     locale-gen ja_JP.UTF-8
RUN     localedef -f UTF-8 -i ja_JP ja_JP
ENV     LANG ja_JP.UTF-8
ENV     TZ Asia/Tokyo

# [ set user environment ]
WORKDIR /projects
# USER    node