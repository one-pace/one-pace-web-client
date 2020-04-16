import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { GetStaticProps, NextPage } from 'next';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';

import withApollo from '../core/withApollo';

interface Props {
  arcs: [
    {
      episodes: [
        {
          title: string;
          images?: Array<{
            src: string;
            type: string;
            width: number;
          }>;
          part: number;
          streams_hash: string;
        },
      ];
      title: string;
    },
  ];
}

const GET_ALL_ARCS = gql`
  query getAllArcs {
    databaseGetAllArcs {
      episodes {
        images {
          src
          type
          width
        }
        part
        streams_hash
        title
      }
      title
    }
  }
`;

const HomePage: NextPage<Props> = props => {
  const [arcs, setArcs] = useState(props.arcs);

  useQuery(GET_ALL_ARCS, {
    onCompleted: data => {
      console.info('Fresh data retrieved from server', data);
      if (data.databaseGetAllArcs?.length) {
        setArcs(data.databaseGetAllArcs);
      }
    },
  });

  return (
    <Layout title="One Pace">
      <main>
        {/* <Carousel title="Arcs" /> */}
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Romance Dawn',
            )[0]?.episodes
          }
          title="Romance Dawn"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Orange Town',
            )[0]?.episodes
          }
          title="Orange Town"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Syrup Village',
            )[0]?.episodes
          }
          title="Syrup Village"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Gaimon')[0]
              ?.episodes
          }
          title="Gaimon"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Baratie')[0]
              ?.episodes
          }
          title="Baratie"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Arlong Park',
            )[0]?.episodes
          }
          title="Arlong Park"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Loguetown',
            )[0]?.episodes
          }
          title="Loguetown"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Reverse Mountain',
            )[0]?.episodes
          }
          title="Reverse Mountain"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Whisky Peak',
            )[0]?.episodes
          }
          title="Whisky Peak"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Little Garden',
            )[0]?.episodes
          }
          title="Little Garden"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Drum Island',
            )[0]?.episodes
          }
          title="Drum Island"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Alabasta',
            )[0]?.episodes
          }
          title="Alabasta"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Jaya')[0]
              ?.episodes
          }
          title="Jaya"
        />
        <Carousel
          aspectRatio="4:3"
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Skypiea')[0]
              ?.episodes
          }
          title="Skypiea"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Long Ring Long Land',
            )[0]?.episodes
          }
          title="Long Ring Long Land"
        />
        <Carousel
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Water 7')[0]
              ?.episodes
          }
          title="Water 7"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Enies Lobby',
            )[0]?.episodes
          }
          title="Enies Lobby"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Post-Enies Lobby',
            )[0]?.episodes
          }
          title="Post-Enies Lobby"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Thriller Bark',
            )[0]?.episodes
          }
          title="Thriller Bark"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Sabaody Archipelago',
            )[0]?.episodes
          }
          title="Sabaody Archipelago"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Amazon Lily',
            )[0]?.episodes
          }
          title="Amazon Lily"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Impel Down',
            )[0]?.episodes
          }
          title="Impel Down"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Marineford',
            )[0]?.episodes
          }
          title="Marineford"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Post-War',
            )[0]?.episodes
          }
          title="Post-War"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Return to Sabaody',
            )[0]?.episodes
          }
          title="Return to Sabaody"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Fishman Island',
            )[0]?.episodes
          }
          title="Fishman Island"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Punk Hazard',
            )[0]?.episodes
          }
          title="Punk Hazard"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Dressrosa',
            )[0]?.episodes
          }
          title="Dressrosa"
        />
        <Carousel
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Zou')[0]
              ?.episodes
          }
          title="Zou"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Whole Cake Island',
            )[0]?.episodes
          }
          title="Whole Cake Island"
        />
        <Carousel
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Reverie')[0]
              ?.episodes
          }
          title="Reverie"
        />
        <Carousel
          items={
            arcs?.filter((arc: { title: string }) => arc.title === 'Wano')[0]
              ?.episodes
          }
          title="Wano Country"
        />
        <Carousel
          items={
            arcs?.filter(
              (arc: { title: string }) => arc.title === 'Specials',
            )[0]?.episodes
          }
          title="Specials"
        />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  const getAllArcs = await prisma.arc.findMany({
    select: {
      episodes: {
        orderBy: { part: 'asc' },
        select: {
          images: {
            select: {
              src: true,
              type: true,
              width: true,
            },
          },
          part: true,
          streams_hash: true,
          title: true,
        },
      },
      title: true,
    },
  });

  if (getAllArcs) {
    return {
      props: {
        arcs: getAllArcs,
      },
    };
  }

  return {
    props: { arcs: [] },
  };
};

export default withApollo(HomePage);
