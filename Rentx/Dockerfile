FROM node:18-alpine

WORKDIR /src

ADD package.json /src

RUN npm install && npm cache clean --force

ADD . /src 

EXPOSE 3333

CMD ["npm","run","dev"] 
