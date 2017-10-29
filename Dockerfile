FROM node:alpine
EXPOSE 3000

COPY node_modules /speciale-tool/node_modules
COPY package.json /speciale-tool/package.json
COPY build/source /speciale-tool/build/source
