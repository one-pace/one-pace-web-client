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

  ast.operation.selectionSet.selections.forEach((sel0: ASTSelection) => {
    sel0.selectionSet.selections.forEach((sel1: ASTSelection) => {
      if (sel1.selectionSet) {
        sel1.selectionSet.selections.forEach((sel2: ASTSelection) => {
          select[sel1.name.value] = {
            select: { [sel2.name.value]: true },
          };
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
