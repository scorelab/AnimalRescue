import React from 'react';
import PreLoader from '../app/components/PreLoader/PreLoader';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', async () => {
    const tree = await renderer.create(<PreLoader />).toJSON();
    expect(tree).toMatchSnapshot();
});





