import React from 'react';
import Home from '../app/screens/HomeScreen/Home';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});

