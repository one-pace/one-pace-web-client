import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

interface AST {
  fields: [
    {
      name: {
        value: string | number;
      };
      value: any;
    },
  ];
  kind: any;
  value: string;
  values: any[];
  name: {
    value: any;
  };
}

interface Variables {
  [x: string]: any;
}

export const schema = [
  `
  scalar JSON

  scalar JSONObject
`,
];

const identity = (value: any) => value;

function ensureObject(value: any) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(
      `JSONObject cannot represent non-object value: ${value}`,
    );
  }

  return value;
}

const parseLiteral = (ast: AST, variables: Variables) => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT:
      // eslint-disable-next-line no-use-before-define
      return parseObject(ast, variables);
    case Kind.LIST:
      return ast.values.map(n => parseLiteral(n, variables));
    case Kind.NULL:
      return null;
    case Kind.VARIABLE: {
      const name = ast.name.value;
      return variables ? variables[name] : undefined;
    }
    default:
      return undefined;
  }
};

const parseObject = (ast: AST, variables: Variables) => {
  const value = Object.create(null);
  ast.fields.forEach(field => {
    // eslint-disable-next-line no-use-before-define
    value[field.name.value] = parseLiteral(field.value, variables);
  });

  return value;
};

export const resolvers = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description:
      'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
    parseValue: identity,
    serialize: identity,
    parseLiteral,
  }),
  JSONObject: new GraphQLScalarType({
    name: 'JSONObject',
    description:
      'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: ensureObject,
    parseValue: ensureObject,
    parseLiteral: (ast: AST, variables: Variables) =>
      ast.kind === Kind.OBJECT ? parseObject(ast, variables) : undefined,
  }),
};
