import React from 'react';
import Auth from '../app/screens/AuthScreen/Auth';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<Auth />).toJSON();
    expect(tree).toMatchSnapshot();
});

