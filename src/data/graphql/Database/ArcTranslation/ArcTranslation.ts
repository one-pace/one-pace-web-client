import { Prisma, PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type ArcTranslation {
    arc:             Episode!
    arc_id:          ID!
    created_at:      Timestamp
    description:     String
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
  # Retrieves all arcs from the database
  databaseGetAllArcTranslations: [ArcTranslation]

  # Retrieves one arc from the database
  databaseGetArcTranslation(
    id: ID!

    title: String
  ): ArcTranslation
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllArcTranslations(
      _parent: any,
      _args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.ArcTranslationSelect = buildSelect(ast);

      const getAllArcTranslations = await prisma.arcTranslation
        .findMany({
          select,
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetAllArcTranslations encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching ArcTranslation data.');
        });

      return getAllArcTranslations;
    },
    async databaseGetArcTranslation(
      _parent: any,
      args: { id: string; title: string },
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.ArcTranslationSelect = buildSelect(ast);

      const getArcTranslation = await prisma.arcTranslation
        .findUnique({
          select,
          where: { ...args },
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetArcTranslation encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching ArcTranslation data.');
        });

      return getArcTranslation;
    },
  },
};
