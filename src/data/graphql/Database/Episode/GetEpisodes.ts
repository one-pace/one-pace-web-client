import { Prisma, PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type Episode {
    arc:             Arc!
    arc_id:          String!
    anime_episodes:  String!
    crc32:           String
    created_at:      Timestamp
    description:     String
    duration:        String!
    id:              ID!
    images:          [Image]
    manga_chapters:  String!
    openload:        String
    part:            Int!
    released_date:   String!
    resolution:      String!
    status:          String
    title:           String!
    torrent_hash:    String
    translations:    [EpisodeTranslation]
    updated_at:      Timestamp
  }
`,
];

export const queries = [
  `
  # Retrieves all episodes from the database
  databaseGetAllEpisodes: [Episode]

  # Retrieves one episode from the database
  databaseGetEpisode(
    id: ID

    title: String
  ): Episode
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllEpisodes(
      _parent: any,
      _args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.EpisodeSelect = buildSelect(ast);

      const getAllEpisodes = await prisma.episode
        .findMany({ select })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetAllEpisodes encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching Episode data.');
        });

      return getAllEpisodes;
    },
    async databaseGetEpisode(
      _parent: any,
      args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.EpisodeSelect = buildSelect(ast);

      const getEpisode = await prisma.episode
        .findUnique({
          select,
          where: { ...args },
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetEpisode encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching Episode data.');
        });

      return getEpisode;
    },
  },
};
