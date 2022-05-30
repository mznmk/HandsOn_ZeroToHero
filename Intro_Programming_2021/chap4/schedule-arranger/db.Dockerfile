# [ base image ]
FROM    --platform=linux/x86_64 postgres:12

# [ update / install application ]
RUN     apt-get update; \
        apt-get upgrade; \
        apt-get install -y curl; \
        apt-get install -y locales;

# [ set system environment ]
RUN     locale-gen ja_JP.UTF-8
RUN     localedef -f UTF-8 -i ja_JP ja_JP
ENV     LANG ja_JP.UTF-8
ENV     TZ Asia/Tokyo

# [ set user environment ]
USER    postgres