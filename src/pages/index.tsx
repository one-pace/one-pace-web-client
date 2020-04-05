import React from 'react';
import { ApolloClient, useApolloClient, useQuery } from '@apollo/client';
import cookie from 'cookie';
import gql from 'graphql-tag';
import { NextPage, NextPageContext } from 'next';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';

import checkLoggedIn from '../core/checkLoggedIn';
import redirect from '../core/redirect';
import { withApollo } from '../core/withApollo';

interface HomePageContext extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

const GET_ALL_ARCS = gql`
  query {
    databaseGetAllArcs {
      title
      episodes {
        title
        image_url
        part
        streams_hash
      }
    }
  }
`;

const HomePage: any = ({ loggedInUser }) => {
  const apolloClient = useApolloClient();
  const getAllArcs = useQuery(GET_ALL_ARCS);

  const signOut = () => {
    localStorage.removeItem('token');
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1, // Expire the cookie immediately
    });

    // Force a reload of all current queries now that user is logged out,
    // so we don't leave any state around accidentally
    apolloClient.cache.reset().then(() => redirect({}, '/signin'));
  };

  return (
    <Layout title="One Pace">
      <main>
        {/*
        <div>Hello {loggedInUser?.name}!</div>
        <button onClick={signOut} type="button">
          Sign out
        </button>
        */}
        <Carousel title="Arcs" />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Romance Dawn',
            )[0]?.episodes
          }
          title="Romance Dawn"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Orange Town',
            )[0]?.episodes
          }
          title="Orange Town"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Syrup Village',
            )[0]?.episodes
          }
          title="Syrup Village"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Gaimon',
            )[0]?.episodes
          }
          title="Gaimon"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Baratie',
            )[0]?.episodes
          }
          title="Baratie"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Arlong Park',
            )[0]?.episodes
          }
          title="Arlong Park"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Loguetown',
            )[0]?.episodes
          }
          title="Loguetown"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Reverse Mountain',
            )[0]?.episodes
          }
          title="Reverse Mountain"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Whiskey Peak',
            )[0]?.episodes
          }
          title="Whiskey Peak"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Little Garden',
            )[0]?.episodes
          }
          title="Little Garden"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Drum Island',
            )[0]?.episodes
          }
          title="Drum Island"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Alabasta',
            )[0]?.episodes
          }
          title="Alabasta"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Jaya',
            )[0]?.episodes
          }
          title="Jaya"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Skypiea',
            )[0]?.episodes
          }
          title="Skypiea"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Long Ring Long Land',
            )[0]?.episodes
          }
          title="Long Ring Long Land"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Water 7',
            )[0]?.episodes
          }
          title="Water 7"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Enies Lobby',
            )[0]?.episodes
          }
          title="Enies Lobby"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Post-Enies Lobby',
            )[0]?.episodes
          }
          title="Post-Enies Lobby"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Thriller Bark',
            )[0]?.episodes
          }
          title="Thriller Bark"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Sabaody Archipelago',
            )[0]?.episodes
          }
          title="Sabaody Archipelago"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Amazon Lily',
            )[0]?.episodes
          }
          title="Amazon Lily"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Impel Down',
            )[0]?.episodes
          }
          title="Impel Down"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Marineford',
            )[0]?.episodes
          }
          title="Marineford"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Post-War',
            )[0]?.episodes
          }
          title="Post-War"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Return to Sabaody',
            )[0]?.episodes
          }
          title="Return to Sabaody"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Fishman Island',
            )[0]?.episodes
          }
          title="Fishman Island"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Punk Hazard',
            )[0]?.episodes
          }
          title="Punk Hazard"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Dressrosa',
            )[0]?.episodes
          }
          title="Dressrosa"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Zou',
            )[0]?.episodes
          }
          title="Zou"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Whole Cake Island',
            )[0]?.episodes
          }
          title="Whole Cake Island"
        />
        <Carousel
          items={
            getAllArcs.data?.databaseGetAllArcs?.filter(
              (arc: { title: string }) => arc.title === 'Wano',
            )[0]?.episodes
          }
          title="Wano Country"
        />
      </main>
    </Layout>
  );
};

HomePage.getInitialProps = async (context: HomePageContext) => {
  let headers = {};
  if (context.req && context.req.headers) {
    headers = context.req.headers;
  }
  const data = await checkLoggedIn(context.apolloClient, headers);

  console.info(data);

  // If not signed in, go to the sign in page
  if (!data || !data.databaseGetLoggedInUser) return;

  return { loggedInUser: data.databaseGetLoggedInUser };
};

export default withApollo(HomePage);
