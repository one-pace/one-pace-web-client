import gql from 'graphql-tag';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

interface Headers {
  cookie?: string;
}

const JWT_SECRET = 'WeNeedALegitimateSecretWhichIsSecure';

const getUserId = (headers: Headers) => {
  let token = '';
  if (headers.cookie && typeof headers.cookie === 'string') {
    if (cookie.parse(headers.cookie).token) {
      token = cookie.parse(headers.cookie).token;
    }
  }

  if (token !== '') {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    return (verifiedToken as any).userId;
  }
};

export default (apolloClient: any, headers?: Headers) => {
  return apolloClient
    .query({
      query: gql`
        query getUser($id: ID) {
          databaseGetLoggedInUser(id: $id) {
            id
            profile {
              name
            }
            email
          }
        }
      `,
      variables: {
        id: getUserId(headers),
      },
    })
    .then(({ data }) => ({ ...data }))
    .catch((err: any) => {
      console.warn(err);
    }); // Fail gracefully
};
