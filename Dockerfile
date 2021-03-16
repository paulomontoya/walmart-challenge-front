FROM mhart/alpine-node

WORKDIR /usr/src/app

ARG PORT

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start"]
