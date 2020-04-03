module.exports = {
  client: {
    service: {
      name: 'onepace.net',
      url: 'http://localhost:3000/api/graphql',
      // optional headers
      headers: {
        // authorization: 'Bearer lkjfalkfjadkfjeopknavadf',
      },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
