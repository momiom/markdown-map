FROM node:latest

RUN npm install -g pnpm
RUN echo 'alias ll="ls -alh"' >> /root/.bashrc