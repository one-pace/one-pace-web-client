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

  const EDITING = t('editing');
  const GRAPHICS = t('graphics');
  const MOD = 'Moderator';
  const MUSIC = t('musicer');
  const QC = t('qc');
  const TIMING = t('timing');
  const TRANSLATION = t('translation');
  const VFX = t('vfx');
  const WEB = t('webmaster');
  const WIKI = 'Wiki Council';

  const JPDE = `JP-DE ${TRANSLATION}`;
  const JPEN = `JP-EN ${TRANSLATION}`;
  const JPES = `JP-ES ${TRANSLATION}`;
  const JPFR = `JP-FR ${TRANSLATION}`;
  const JPPT = `JP-PT ${TRANSLATION}`;

  const team = [
    {
      name: 'Akamizu',
      roles: [JPDE],
    },
    {
      name: 'Bastia',
      roles: [JPES, 'Recruiter', TIMING],
    },
    {
      name: 'CyberLariat',
      roles: [MOD, 'Spreadsheeter'],
    },
    {
      name: 'Danpmss',
      roles: ['---'],
    },
    {
      name: 'Datenshi',
      roles: [GRAPHICS, TIMING],
    },
    {
      name: 'DemonRin',
      roles: [GRAPHICS, JPEN],
    },
    {
      name: 'DolphinWeabu',
      roles: [QC],
    },
    {
      name: 'FJATP',
      roles: [JPES],
    },
    {
      name: 'Floa',
      roles: [JPDE],
    },
    {
      name: 'Gaijin',
      roles: [JPEN, QC, WIKI],
    },
    {
      name: 'Galaxy 9000',
      roles: [EDITING, QC, `${TIMING} (Former)`],
    },
    {
      name: 'Gi-a Fosu',
      roles: [WEB],
    },
    {
      name: 'Gigglebot',
      roles: [EDITING, MOD],
    },
    {
      name: 'Grug',
      roles: [QC],
    },
    {
      name: 'Hadohado',
      roles: [JPPT],
    },
    {
      name: 'Halee',
      roles: [MUSIC, `${TIMING} (Former)`, WIKI],
    },
    {
      name: 'Honoka',
      roles: ['---'],
    },
    {
      name: 'ItsKipz',
      roles: [QC],
    },
    {
      name: 'Kaitou Yahiko',
      roles: [GRAPHICS, TIMING, VFX],
    },
    {
      name: 'Lance',
      roles: [TIMING],
    },
    {
      name: 'Meggo',
      roles: [EDITING],
    },
    {
      name: 'Mr. Luffy',
      roles: ['---'],
    },
    {
      name: 'Nagatei',
      roles: [JPES],
    },
    {
      name: 'Naoya',
      roles: ['---'],
    },
    {
      name: 'Ninja',
      roles: [EDITING],
    },
    {
      name: 'Pepperjack',
      roles: [QC, WIKI],
    },
    {
      name: 'PhosCity',
      roles: [TIMING],
    },
    {
      name: 'Puma',
      roles: [JPDE],
    },
    {
      name: 'RedHawk02',
      roles: [MOD],
    },
    {
      name: 'Rael',
      roles: [EDITING],
    },
    {
      name: 'Sewil',
      roles: [EDITING, TIMING, WIKI],
    },
    {
      name: 'Soturno Samurai',
      roles: [JPPT],
    },
    {
      name: 'Umim',
      roles: [JPES],
    },
    {
      name: 'Vô danh',
      roles: [JPDE],
    },
    {
      name: 'Zenef',
      roles: [MOD, QC, WIKI],
    },
  ];

  const formerTeam = [
    {
      name: 'Feeso',
      roles: [EDITING, QC],
    },
  ];

  return (
    <Layout title="About | One Pace">
      <main className={s.root}>
        <section className={s.container}>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
        </section>
        <section className={s.container}>
          <h1>{t('team')}</h1>
          <div className={s.grid}>
            {team.map(m => (
              <div>
                <h3>{m.name}</h3>
                <p>
                  {m.roles.map((r, i: number) =>
                    i < m.roles.length - 1 ? `${r}, ` : r,
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className={s.container}>
          <h1>Former Team Members</h1>
          <div className={s.grid}>
            {formerTeam.map(m => (
              <div>
                <h3>{m.name}</h3>
                <p>
                  {m.roles.map((r, i: number) =>
                    i < m.roles.length - 1 ? `${r}, ` : r,
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['about'],
});

export default AboutPage;
