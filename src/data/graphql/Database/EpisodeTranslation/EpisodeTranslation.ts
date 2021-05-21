import { Prisma, PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type EpisodeTranslation {
    created_at:      Timestamp
    description:     String
    episode:         Episode!
    episode_id:      ID!
    id:              ID!
    language:        Language!
    language_id:     ID!
    title:           String!
    updated_at:      Timestamp
  }
`,
];

export const queries = [
  `
  # Retrieves all episode translations from the database
  databaseGetAllEpisodeTranslations: [EpisodeTranslation]

  # Retrieves one episode translation from the database
  databaseGetEpisodeTranslation(
    id: ID!

    title: String
  ): EpisodeTranslation
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllEpisodeTranslations(
      _parent: any,
      _args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.EpisodeTranslationSelect = buildSelect(ast);

      const getAllEpisodeTranslations = await prisma.arcTranslation
        .findMany({
          select,
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetAllEpisodeTranslations encountered an error:',
              err,
            );

          throw new Error(
            'An error occurred fetching EpisodeTranslation data.',
          );
        });

      return getAllEpisodeTranslations;
    },
    async databaseGetEpisodeTranslation(
      _parent: any,
      args: { id: string; title: string },
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.EpisodeTranslationSelect = buildSelect(ast);

      const getEpisodeTranslation = await prisma.arcTranslation
        .findUnique({
          select,
          where: { ...args },
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetEpisodeTranslation encountered an error:',
              err,
            );

          throw new Error(
            'An error occurred fetching EpisodeTranslation data.',
          );
        });

      return getEpisodeTranslation;
    },
  },
};
