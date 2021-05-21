import merge from 'lodash.merge';

/** * Queries ** */
import {
  schema as GetArcsSchema,
  queries as GetArcsQueries,
  resolvers as GetArcsResolver,
} from './Arc/GetArcs';
import {
  schema as ArcTranslationSchema,
  queries as ArcTranslationQueries,
  resolvers as ArcTranslationResolver,
} from './ArcTranslation/ArcTranslation';
import {
  schema as GetEpisodesSchema,
  queries as GetEpisodesQueries,
  resolvers as GetEpisodesResolver,
} from './Episode/GetEpisodes';
import {
  schema as EpisodeTranslationSchema,
  queries as EpisodeTranslationQueries,
  resolvers as EpisodeTranslationResolver,
} from './EpisodeTranslation/EpisodeTranslation';
import {
  schema as GetImagesSchema,
  queries as GetImagesQueries,
  resolvers as GetImagesResolver,
} from './Image/GetImages';
import {
  schema as LanguageSchema,
  queries as LanguageQueries,
  resolvers as LanguageResolver,
} from './Language/Language';

/** * Mutations ** */
// import {
//   schema as CreateAppInput,
//   mutation as CreateApp,
//   resolvers as CreateAppResolver,
// } from './apps/CreateApp';

export const schema = [
  ...GetArcsSchema,
  ...ArcTranslationSchema,
  ...GetEpisodesSchema,
  ...EpisodeTranslationSchema,
  ...GetImagesSchema,
  ...LanguageSchema,
];

export const queries = [
  ...GetArcsQueries,
  ...ArcTranslationQueries,
  ...GetEpisodesQueries,
  ...EpisodeTranslationQueries,
  ...GetImagesQueries,
  ...LanguageQueries,
];

export const mutations = [
  // ...CreateApp,
];

export const resolvers = merge(
  GetArcsResolver,
  ArcTranslationResolver,
  GetEpisodesResolver,
  EpisodeTranslationResolver,
  GetImagesResolver,
  LanguageResolver,
);
