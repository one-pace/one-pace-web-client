import merge from 'lodash.merge';

/** * Queries ** */
import {
  schema as GetArcsSchema,
  queries as GetArcsQueries,
  resolvers as GetArcsResolver,
} from './Arc/GetArcs';
import {
  schema as GetEpisodesSchema,
  queries as GetEpisodesQueries,
  resolvers as GetEpisodesResolver,
} from './Episode/GetEpisodes';

/** * Mutations ** */
// import {
//   schema as CreateAppInput,
//   mutation as CreateApp,
//   resolvers as CreateAppResolver,
// } from './apps/CreateApp';

export const schema = [...GetArcsSchema, ...GetEpisodesSchema];

export const queries = [...GetArcsQueries, ...GetEpisodesQueries];

export const mutations = [
  // ...CreateApp,
];

export const resolvers = merge(GetArcsResolver, GetEpisodesResolver);
