import { ArcSelect, PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type Arc {
    anime_episodes:  String!
    created_at:      Timestamp
    description:     String!
    episodes:        [Episode]!
    id:              String!
    images:          [Image]
    is_completed:    Boolean!
    is_hidden:       Boolean!
    is_released:     Boolean!
    manga_chapters:  String!
    resolution:      String!
    torrent_hash:    String
    title:           String!
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

      if (select.episodes) {
        select.episodes['orderBy'] = { part: 'asc' }; // eslint-disable-line dot-notation
      }

      console.info('resolver select\n', select);

      const getAllArcs = await prisma.arc.findMany({
        select,
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
