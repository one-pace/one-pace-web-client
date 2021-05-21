import { Prisma, PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type Language {
    arc_translations:     [ArcTranslation]
    code:                 String!
    episode_translations: [EpisodeTranslation]
    id:                   ID!
    name:                 String!
    nameNative:           String
  }
`,
];

export const queries = [
  `
  # Retrieves all episode translations from the database
  databaseGetAllLanguages: [Language]

  # Retrieves one episode translation from the database
  databaseGetLanguage(
    id: ID!

    title: String
  ): Language
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllLanguages(
      _parent: any,
      _args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.LanguageSelect = buildSelect(ast);

      const getAllLanguages = await prisma.arcTranslation
        .findMany({
          select,
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetAllLanguages encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching Language data.');
        });

      return getAllLanguages;
    },
    async databaseGetLanguage(
      _parent: any,
      args: { id: string; title: string },
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.LanguageSelect = buildSelect(ast);

      const getLanguage = await prisma.arcTranslation
        .findUnique({
          select,
          where: { ...args },
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetLanguage encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching Language data.');
        });

      return getLanguage;
    },
  },
};
