import React from 'react';
import Profile from '../app/screens/ProfileScreen/Profile';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
});

