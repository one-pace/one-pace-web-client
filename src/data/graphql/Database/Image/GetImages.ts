import { Prisma, PrismaClient } from '@prisma/client';

import { AST, buildSelect } from '../../utils';

export const schema = [
  `
  type Image {
    alt:             String
    arc:             Arc
    episode:         Episode
    id:              ID!
    src:             String!
    type:            String!
    width:           String!
  }
`,
];

export const queries = [
  `
  # Retrieves all images from the database
  databaseGetAllImages: [Image]

  # Retrieves one image from the database
  databaseGetImage(
    id: ID

    src: String
  ): Image
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllImages(
      _parent: any,
      _args: any,
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.ImageSelect = buildSelect(ast);

      const getAllImages = await prisma.image
        .findMany({ select })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetAllImages encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching Image data.');
        });

      return getAllImages;
    },
    async databaseGetImage(
      _parent: any,
      args: { id?: string; src?: string },
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select: Prisma.ImageSelect = buildSelect(ast);

      const getImage = await prisma.image
        .findUnique({
          select,
          where: { ...args },
        })
        .catch(err => {
          if (err)
            console.error(
              '[GraphQL] databaseGetImage encountered an error:',
              err,
            );

          throw new Error('An error occurred fetching Image data.');
        });

      return getImage;
    },
  },
};
