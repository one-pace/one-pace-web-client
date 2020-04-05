import merge from 'lodash.merge';

import { schema as JSONSchema, resolvers as JSONResolvers } from './JSON';

import {
  schema as TimestampSchema,
  resolvers as TimestampResolvers,
} from './Timestamp';

export const schema = [...JSONSchema, ...TimestampSchema];

export const resolvers = merge(JSONResolvers, TimestampResolvers);
