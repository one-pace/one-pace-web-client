/* eslint-env jest */
/* eslint-disable jsx-a11y/alt-text */

import React from 'react';
import renderer from 'react-test-renderer';
// import { configure, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import Image from './Image';
import logo from '../Header/Lodus-logo-final.svg';
import nate1x from '../RapportSection/profile-nate-hobi-lg.png';
import nate1xW from '../RapportSection/profile-nate-hobi-lg.webp';
import nate2x from '../RapportSection/profile-nate-hobi-lg@2x.png';
import nate2xW from '../RapportSection/profile-nate-hobi-lg@2x.webp';
import nate3x from '../RapportSection/profile-nate-hobi-lg@3x.png';
import nate3xW from '../RapportSection/profile-nate-hobi-lg@3x.webp';
import nate4x from '../RapportSection/profile-nate-hobi-lg@4x.png';
import nate4xW from '../RapportSection/profile-nate-hobi-lg@4x.webp';

// configure({ adapter: new Adapter() });

describe('Image', () => {
  test('renders correctly by itself', () => {
    const image = renderer
      .create(<Image alt="Logo" src={logo} height="70" width="180" />)
      .toJSON();

    expect(image).toMatchSnapshot();
  });

  test('renders correctly with children', () => {
    const image = renderer
      .create(
        <Image alt="Nate Hobi" color="transparent" src={nate1x}>
          <picture>
            <source
              srcSet={`${nate1xW} 1x, ${nate2xW} 2x, ${nate3xW} 3x, ${nate4xW} 4x`}
              type="image/webp"
            />
            <img
              srcSet={`${nate2x} 2x, ${nate3x} 3x, ${nate4x} 4x`}
              type="image/png"
            />
          </picture>
        </Image>,
      )
      .toJSON();

    expect(image).toMatchSnapshot();
  });
});
