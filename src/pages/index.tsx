import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { GetServerSideProps, NextPage } from 'next';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';

// import { useTranslation } from '../core/i18n';
import withApollo from '../core/withApollo';

interface Props {
  arcs: [
    {
      anime_episodes: string;
      episodes: [
        {
          anime_episodes: string;
          description?: string;
          duration: string;
          images?: Array<{
            src: string;
            type: string;
            width: number;
          }>;
          manga_chapters: string;
          part: number;
          released_date: string | null;
          resolution: string;
          title: string;
          torrent_hash?: string;
        },
      ];
      manga_chapters: string;
      resolution: string;
      title: string;
    },
  ];
}

interface InitialProps {
  namespacesRequired?: string[];
}

const GET_ALL_ARCS = gql`
  query getAllArcs {
    databaseGetAllArcs {
      anime_episodes
      episodes {
        anime_episodes
        description
        duration
        images {
          src
          type
          width
        }
        manga_chapters
        part
        released_date
        resolution
        title
        torrent_hash
      }
      images {
        alt
        src
        type
        width
      }
      manga_chapters
      resolution
      title
    }
  }
`;

const HomePage: NextPage<Props, InitialProps> = props => {
  const [arcs, setArcs] = useState(props.arcs);

  // const { t } = useTranslation('common');

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
        {arcs?.length && (
          <>
            <Carousel items={arcs} title="Arcs" type="arcs" />
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
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Gaimon',
                )[0]?.episodes
              }
              title="Gaimon"
            />
            <Carousel
              aspectRatio="4:3"
              items={
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Baratie',
                )[0]?.episodes
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
                  (arc: { title: string }) => arc.title === 'Arabasta',
                )[0]?.episodes
              }
              title="Arabasta"
            />
            <Carousel
              aspectRatio="4:3"
              items={
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Jaya',
                )[0]?.episodes
              }
              title="Jaya"
            />
            <Carousel
              aspectRatio="4:3"
              items={
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Skypiea',
                )[0]?.episodes
              }
              title="Skypiea"
            />
            <Carousel
              items={
                arcs?.filter(
                  (arc: { title: string }) =>
                    arc.title === 'Long Ring Long Land',
                )[0]?.episodes
              }
              title="Long Ring Long Land"
            />
            <Carousel
              items={
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Water Seven',
                )[0]?.episodes
              }
              title="Water Seven"
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
                  (arc: { title: string }) =>
                    arc.title === 'Sabaody Archipelago',
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
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Reverie',
                )[0]?.episodes
              }
              title="Reverie"
            />
            <Carousel
              items={
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Wano',
                )[0]?.episodes
              }
              title="Wano"
            />
            <Carousel
              items={
                arcs?.filter(
                  (arc: { title: string }) => arc.title === 'Specials',
                )[0]?.episodes
              }
              title="Specials"
            />
          </>
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  const getAllArcs = await prisma.arc
    .findMany({
      select: {
        episodes: {
          orderBy: { part: 'asc' },
          select: {
            anime_episodes: true,
            description: true,
            duration: true,
            images: {
              select: {
                src: true,
                type: true,
                width: true,
              },
            },
            manga_chapters: true,
            part: true,
            released_date: true,
            resolution: true,
            title: true,
            torrent_hash: true,
          },
        },
        title: true,
      },
    })
    .catch(_err => {
      console.error('An error occurred fetching Arc data.');
    });

  return {
    namespacesRequired: ['common'],
    props: { arcs: getAllArcs || [] },
  };
};

export default withApollo(HomePage);
