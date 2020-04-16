import merge from 'lodash.merge';

export interface AST {
  operation: ASTSelection;
}

interface ASTSelection {
  name: {
    value: string;
  };
  selectionSet: {
    selections: [ASTSelection];
  };
}

const buildSelect = (ast: AST) => {
  const select = {};

  // RootQuery / Mutation
  ast.operation.selectionSet.selections.forEach((sel0: ASTSelection) => {
    console.info('sel0\n', sel0);

    // Fields at query / mutation root (level 1)
    sel0.selectionSet.selections.forEach((sel1: ASTSelection) => {
      console.info('sel1\n', sel1);
      if (sel1.selectionSet) {
        // Sub fields of first level fields (level 2)
        sel1.selectionSet.selections.forEach((sel2: ASTSelection) => {
          console.info('sel2\n', sel2);

          if (sel2.selectionSet) {
            sel2.selectionSet.selections.forEach((sel3: ASTSelection) => {
              console.info('sel3\n', sel3);
              select[sel1.name.value] = merge(select[sel1.name.value], {
                select: {
                  [sel2.name.value]: {
                    select: {
                      [sel3.name.value]: true,
                    },
                  },
                },
              });
            });
          } else {
            select[sel1.name.value] = merge(select[sel1.name.value], {
              select: {
                [sel2.name.value]: true,
              },
            });
          }
        });
      } else {
        select[sel1.name.value] = true;
      }
    });
  });

  console.info(
    'select is\n',
    require('util').inspect(select, { depth: 5 }),
  );

  return select;
};

export { buildSelect };

export default buildSelect;
