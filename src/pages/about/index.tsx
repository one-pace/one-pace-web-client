import React from 'react';
import { GetStaticProps, NextPage } from 'next';

import s from './About.module.css';

import Layout from '../../components/Layout';

import { useTranslation } from '../../core/i18n';

interface Props {

}

interface InitialProps {
  namespacesRequired?: string[];
}

const AboutPage: NextPage<Props, InitialProps> = props => {
  const { t } = useTranslation('about');

  return (
    <Layout title="About | One Pace">
      <main className={s.root}>
        <section className={s.container}>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
        </section>
      </main>
    </Layout>
  );
};

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['about'],
});

export default AboutPage;
