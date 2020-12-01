FROM ubuntu:18.04 as builder

# Install any needed packages
RUN apt-get update && apt-get install -y curl git gnupg

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

WORKDIR /apps
COPY . .

RUN npm install yarn -g
RUN yarn && NODE_ENV=production yarn build:www
CMD ["ls", "-al", "build"]

# ===========================================================
FROM nginx:stable

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /apps/packages/apps/build /usr/share/nginx/html