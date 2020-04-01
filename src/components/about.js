import React, { useEffect } from 'react';

import music from '../media/151.mp3';
import crying from '../media/Eh.mp3';

const About = () => {
  const respects = new Audio(music);
  const tears = new Audio(crying);

  useEffect(() => {
    window.addEventListener('keydown', payRespects);
  }, [window]);

  const payRespects = (event) => {
    if (event.type === 'click' || event.key === 'f' || event.code === 'KeyF') {
      respects.play();
      setTimeout(() => tears.play(), 3500);
    }
  };

  return (
    <div className="about">
      <div>
        <h2>What is One Pace?</h2>
        <p>
          One Pace is a team effort that started in March 2013 with the goal of
          matching the One Piece manga more accurately than Toei&apos;s anime
          adaptation. We cut out filler scenes, non-canon reaction shots, padded
          sequences, and re-order scenes to stay truer to Goda&apos;s manga.
        </p>
        <h2>The Team</h2>
        <table>
          <tbody>
            <tr>
              <td>Galaxy 9000</td>
              <td>Editing, Timing</td>
            </tr>
            <tr>
              <td>Sewil</td>
              <td>Editing, Timing</td>
            </tr>
            <tr>
              <td>Feeso</td>
              <td>
                Editing, <abbr title="Quality Checking">QC</abbr>
              </td>
            </tr>
            <tr>
              <td>Halee</td>
              <td>Music Master, Timing</td>
            </tr>
            <tr>
              <td>Datenshi</td>
              <td>Timing, Graphic Maker</td>
            </tr>
            <tr>
              <td>Grug</td>
              <td>
                <abbr title="Quality Checking">QC</abbr>
              </td>
            </tr>
            <tr>
              <td>Pepperjack</td>
              <td>
                <abbr title="Quality Checking">QC</abbr>
              </td>
            </tr>
            <tr>
              <td width="50%">Kaitou Yahiko</td>
              <td>Timing, Visual Effects Design</td>
            </tr>
            <tr>
              <td>Rael</td>
              <td>Editing</td>
            </tr>
            <tr>
              <td>Lance</td>
              <td>Timing</td>
            </tr>
            <tr>
              <td>Gi-a Fosu</td>
              <td>Webmaster</td>
            </tr>
            <tr>
              <td>DolphinWeabu</td>
              <td>
                <abbr title="Quality Checking">QC</abbr>
              </td>
            </tr>
            <tr>
              <td>Gaijin</td>
              <td>Translation</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>Memorial</h2>
        <p>
          In memory of our beloved team member, Feeso, a good man, and our
          nakama, who stood up for us through thick and thin. After questioning
          from the F.B.I. proved unsuccessful, he was handed over to CP-9 and
          locked up in the lowest level of Impel Down. He has not been heard
          from since.
        </p>
        <div className="pay-respects">
          <button onClick={payRespects}>F</button>
        </div>
        <img alt="" src={require('../images/MasterRoshiSmoking.png')} />
      </div>
    </div>
  );
};

export default About;
