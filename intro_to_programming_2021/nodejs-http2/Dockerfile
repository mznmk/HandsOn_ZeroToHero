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

# [ install application ]
RUN apt-get install -y tmux vim less

# [ install node.js application ]
RUN yarn add pug@2.0.4
RUN yarn global add pug-cli

# [ set user environment ]
WORKDIR /app

# ========== for uploading into heroku ==========

# [ set user environment ]
COPY . /app

# [ entrypoint ]
CMD ["sh", "run.sh"]