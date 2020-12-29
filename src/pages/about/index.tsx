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

  const CODING = 'Coding';
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

  const KTIMING = `Karaoke ${TIMING}`;

  const team = [
    {
      name: 'Bastia',
      roles: ['Recruiter', TIMING],
    },
    {
      name: 'CyberLariat',
      roles: [MOD, 'Spreadsheeter'],
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
      name: 'Gaijin',
      roles: [JPEN, QC, WIKI],
    },
    {
      name: 'Galaxy 9000',
      roles: [EDITING, QC],
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
      name: 'Halee',
      roles: [MUSIC, WIKI],
    },
    {
      name: 'Kaitou Yahiko',
      roles: [GRAPHICS, KTIMING, TIMING, VFX],
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
      name: 'RedHawk02',
      roles: [MOD],
    },
    {
      name: 'Sewil',
      roles: [CODING, EDITING, TIMING, WIKI],
    },
    {
      name: 'TheFVguy',
      roles: [QC, TIMING],
    },
    {
      name: 'Zenef',
      roles: [MOD, QC, WIKI],
    },
  ];

  const esTeam = [
    {
      name: 'Bastia',
      roles: [JPES],
    },
    {
      name: 'FJATP',
      roles: [JPES],
    },
    {
      name: 'LucasGirau',
      roles: [JPES],
    },
    {
      name: 'Nagatei',
      roles: [JPES],
    },
    {
      name: 'Umim',
      roles: [JPES],
    },
  ];

  const frTeam = [
    {
      name: 'BabOu1331',
      roles: [JPFR],
    },
    {
      name: 'TrixJoestar',
      roles: [JPFR],
    },
    {
      name: 'Val*',
      roles: [JPFR],
    },
    {
      name: 'Void42',
      roles: [JPFR],
    },
    {
      name: 'Zorohack',
      roles: [JPFR],
    },
  ];

  const deTeam = [
    {
      name: 'Akamizu',
      roles: [JPDE],
    },
    {
      name: 'Floa',
      roles: [JPDE],
    },
    {
      name: 'Puma',
      roles: [JPDE],
    },
    {
      name: 'Vô danh',
      roles: [JPDE],
    },
  ];

  const ptTeam = [
    {
      name: 'Hadohado',
      roles: [JPPT],
    },
    {
      name: 'Naoya7',
      roles: [JPPT],
    },
    {
      name: 'Soturno Samurai',
      roles: [JPPT],
    },
  ];

  const formerTeam = [
    {
      name: 'Danpmss',
      roles: [JPES, QC],
    },
    {
      name: 'Dumbird',
      roles: [EDITING],
    },
    {
      name: 'Feeso',
      roles: [EDITING, QC, WIKI],
    },
    {
      name: 'Galaxy 9000',
      roles: [TIMING],
    },
    {
      name: 'Halee',
      roles: [TIMING],
    },
    {
      name: 'Honoka',
      roles: [QC],
    },
    {
      name: 'ItsKipz',
      roles: [QC],
    },
    {
      name: 'Madiev',
      roles: [MUSIC],
    },
    {
      name: 'Mr. Luffy',
      roles: [QC],
    },
    {
      name: 'Rael',
      roles: [EDITING],
    },
    {
      name: 'Tom',
      roles: [EDITING],
    },
    {
      name: 'Victor',
      roles: [EDITING],
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
          <h1>Spanish Team</h1>
          <div className={s.grid}>
            {esTeam.map(m => (
              <div>
                <h3>{m.name}</h3>
              </div>
            ))}
          </div>
        </section>
        <section className={s.container}>
          <h1>French Team</h1>
          <div className={s.grid}>
            {frTeam.map(m => (
              <div>
                <h3>{m.name}</h3>
              </div>
            ))}
          </div>
        </section>
        <section className={s.container}>
          <h1>German Team</h1>
          <div className={s.grid}>
            {deTeam.map(m => (
              <div>
                <h3>{m.name}</h3>
              </div>
            ))}
          </div>
        </section>
        <section className={s.container}>
          <h1>Portuguese Team</h1>
          <div className={s.grid}>
            {ptTeam.map(m => (
              <div>
                <h3>{m.name}</h3>
              </div>
            ))}
          </div>
        </section>
        <section className={s.container}>
          <h1>Former Team Roles</h1>
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
