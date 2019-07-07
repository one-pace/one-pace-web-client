import React from 'react'

export default class About extends React.Component {
  componentDidMount () {
    document.title = 'One Pace | About'
  }
  render () {
    return (
      <div className='about with-padding'>
        <h2>What is One Pace?</h2>
        <p>
          One Pace is a team effort that started in March 2013 with the goal of matching the One Piece manga
          more accurately than Toei&apos;s anime adaptation.
          We cut out filler scenes, non-canon reaction shots, padded sequences,
          and re-order scenes to stay truer to Goda&apos;s manga.
        </p>
        <h2>The Team</h2>
        <table>
          <tbody>
            <tr>
              <td>Galaxy 9000</td>
              <td>Editing</td>
            </tr>
            <tr>
              <td>Sewil</td>
              <td>Editing</td>
            </tr>
            <tr>
              <td>Feeso</td>
              <td>Editing, QC</td>
            </tr>
            <tr>
              <td>Halee</td>
              <td>Music Master</td>
            </tr>
            <tr>
              <td>Datenshi</td>
              <td>Timing</td>
            </tr>
            <tr>
              <td>Grug</td>
              <td>QC</td>
            </tr>
            <tr>
              <td>Pepperjack</td>
              <td>QC</td>
            </tr>
            <tr>
              <td width='50%'>Kaitou Yahiko</td>
              <td>Karaoke Effects</td>
            </tr>
            <tr>
              <td>Rael</td>
              <td>Editing</td>
            </tr>
            <tr>
              <td>Lance</td>
              <td>Timing</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
