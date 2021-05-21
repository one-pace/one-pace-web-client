import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { GetServerSideProps, NextPage } from 'next';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';

// import { useTranslation } from '../core/i18n';
import AppContext from '../context';
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
          translations?: Array<{
            description?: string;
            language: {
              code: string;
            };
            title: string;
          }>;
        },
      ];
      manga_chapters: string;
      resolution: string;
      title: string;
      translations?: Array<{
        description?: string;
        language: {
          code: string;
        };
        title: string;
      }>;
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
        translations {
          description
          language {
            code
          }
          title
        }
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
      translations {
        language {
          code
        }
        title
      }
    }
  }
`;

const HomePage: NextPage<Props, InitialProps> = props => {
  const { language } = useContext(AppContext);

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
        {arcs?.length && (
          <>
            <Carousel items={arcs} title="Arcs" type="arcs" />
            {arcs?.map((arc) => {
              let aspectRatio: '16:9' | '4:3' = '16:9';

              if (arc.resolution === '480p' || arc.title === 'Romance Dawn')
                aspectRatio = '4:3';

              let title = arc.title;

              if (arc.translations?.length) {
                arc.translations.some(tl => {
                  if (tl.language.code === language) {
                    if (tl.title) title = tl.title;
                    // if (tl.description) description = tl.description;

                    return true;
                  }

                  return false;
                });
              }

              return (
                <Carousel
                  aspectRatio={aspectRatio}
                  items={arc.episodes}
                  title={title}
                />
              )
            })}
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
            translations: {
              select: {
                description: true,
                language: {
                  select: {
                    code: true,
                  },
                },
                title: true,
              },
            },
          },
        },
        title: true,
        translations: {
          select: {
            // description: true,
            language: {
              select: {
                code: true,
              },
            },
            title: true,
          },
        },
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
