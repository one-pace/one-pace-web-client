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
import {
  schema as GetImagesSchema,
  queries as GetImagesQueries,
  resolvers as GetImagesResolver,
} from './Image/GetImages';

/** * Mutations ** */
// import {
//   schema as CreateAppInput,
//   mutation as CreateApp,
//   resolvers as CreateAppResolver,
// } from './apps/CreateApp';

export const schema = [
  ...GetArcsSchema,
  ...GetEpisodesSchema,
  ...GetImagesSchema,
];

export const queries = [
  ...GetArcsQueries,
  ...GetEpisodesQueries,
  ...GetImagesQueries,
];

export const mutations = [
  // ...CreateApp,
];

export const resolvers = merge(
  GetArcsResolver,
  GetEpisodesResolver,
  GetImagesResolver,
);
