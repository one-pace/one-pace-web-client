FROM node:12-buster

# Set a working directory
WORKDIR /usr/src/app

# Copy application files
COPY . .

RUN yarn install --production && yarn prisma generate

# Run the container under "node" user by default
USER node

EXPOSE 3000
CMD ["yarn", "serve"]
