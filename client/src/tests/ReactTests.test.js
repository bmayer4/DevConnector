import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from '../components/common/TextFieldGroup';

import { shallow } from 'enzyme';

it('renders without crashing', () => {

  shallow(<Spinner />);

});