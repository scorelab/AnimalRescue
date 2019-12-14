import React from 'react';
import Post from '../app/screens/PostScreen/Post';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<Post />).toJSON();
    expect(tree).toMatchSnapshot();
});

