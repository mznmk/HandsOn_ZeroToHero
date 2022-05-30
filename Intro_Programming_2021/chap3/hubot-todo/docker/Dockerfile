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

# [ install node.js package ]
RUN yarn global add yo@3.0.0
RUN yarn global add generator-hubot@1.1.0
RUN yarn global add coffeescript@1.12.7

# [ install application ]
RUN apt-get install -y less

# [ set user environment ]
RUN useradd hubot-todo -m
USER hubot-todo
USER node
WORKDIR /home/hubot-todo