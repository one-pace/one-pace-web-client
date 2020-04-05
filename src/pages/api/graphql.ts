/* eslint-disable operator-linebreak */

import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
// import getConfig from 'next/config';

import schema from '../../data/schema';

// const { serverRuntimeConfig } = getConfig();

const prisma = new PrismaClient();

const JWT_SECRET = 'WeNeedALegitimateSecretWhichIsSecure';

const getUserId = (req: any) => {
  const authorization =
    req.headers && (req.headers.authorization || req.headers.Authorization)
      ? req.headers.authorization || req.headers.Authorization
      : '';

  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    return (verifiedToken as any).userId;
  }
  return authorization;
};

const __DEV__ = process.env.NODE_ENV !== 'production';

const apolloServer = new ApolloServer({
  ...schema,
  uploads: false,
  introspection: __DEV__,
  playground: __DEV__,
  debug: __DEV__,
  context: ({ req }) => {
    const user = getUserId(req);
    return { req, user, prisma };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
