import { PrismaClient } from '@prisma/client';

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
      const select = buildSelect(ast);

      const getAllImages = await prisma.image.findMany({ select });

      return getAllImages;
    },
    async databaseGetImage(
      _parent: any,
      args: { id?: string; src?: string },
      { prisma }: { prisma: PrismaClient },
      ast: AST,
    ) {
      const select = buildSelect(ast);

      const getImage = await prisma.image.findOne({
        select,
        where: { ...args },
      });

      return getImage;
    },
  },
};
