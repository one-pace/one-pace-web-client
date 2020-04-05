import { PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type Episode {
    id:              ID!
    arc:             Arc!
    arc_id:          String!
    title:           String!
    description:     String
    part:            Int!
    manga_chapters:  String!
    anime_episodes:  String!
    crc32:           String
    torrent_hash:    String
    streams_hash:    String
    resolution:      String!
    released_date:   String!
    image_url:       String
    status:          String
    openload:        String
    created_at:      Timestamp
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
      const select = buildSelect(ast);

      const getAllEpisodes = await prisma.episode.findMany({ select });

      return getAllEpisodes;
    },
    async databaseGetEpisode(
      _parent: any,
      args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select = buildSelect(ast);

      const getEpisode = await prisma.episode.findOne({
        select,
        where: { ...args },
      });

      return getEpisode;
    },
  },
};
