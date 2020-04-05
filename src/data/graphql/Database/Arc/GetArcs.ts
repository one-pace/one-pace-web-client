import { ArcSelect, PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type Arc {
    id:              String!
    episodes:        [Episode]!
    title:           String!
    description:     String!
    manga_chapters:  String!
    anime_episodes:  String!
    torrent_hash:    String
    resolution:      String!
    image_url:       String
    is_completed:    Boolean!
    is_hidden:       Boolean!
    is_released:     Boolean!
    created_at:      Timestamp
    updated_at:      Timestamp
  }
`,
];

export const queries = [
  `
  # Retrieves all arcs from the database
  databaseGetAllArcs: [Arc]

  # Retrieves one arc from the database
  databaseGetArc(
    id: ID!

    title: String
  ): Arc
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllArcs(
      _parent: any,
      _args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: ArcSelect = buildSelect(ast);

      if (select.episodes) select.episodes = { orderBy: { part: 'asc' } };

      const getAllArcs = await prisma.arc.findMany({
        include: {
          episodes: {
            orderBy: { part: 'asc' },
          },
        },
      });

      return getAllArcs;
    },
    async databaseGetArc(
      _parent: any,
      args: { id: string; title: string },
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: ArcSelect = buildSelect(ast);

      if (select.episodes) select.episodes = { orderBy: { part: 'asc' } };

      const getArc = await prisma.arc.findOne({
        select,
        where: { ...args },
      });

      return getArc;
    },
  },
};
