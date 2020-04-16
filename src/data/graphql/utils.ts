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
    // Fields at query / mutation root (level 1)
    sel0.selectionSet.selections.forEach((sel1: ASTSelection) => {
      if (sel1.name.value === '__typename') return;

      if (sel1.selectionSet) {
        // Sub fields of first level fields (level 2)
        sel1.selectionSet.selections.forEach((sel2: ASTSelection) => {
          if (sel2.name.value === '__typename') return;

          if (sel2.selectionSet) {
            sel2.selectionSet.selections.forEach((sel3: ASTSelection) => {
              if (sel3.name.value === '__typename') return;

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

  return select;
};

export { buildSelect };

export default buildSelect;
