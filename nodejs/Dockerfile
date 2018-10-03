FROM node:8
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
EXPOSE 3000
WORKDIR /usr/src/app
ENV NODE_ENV=production
CMD ["npm","start"]
