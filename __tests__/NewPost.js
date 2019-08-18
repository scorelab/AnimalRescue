import React from 'react';
import NewPost from '../app/screens/NewPostScreen/NewPost';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<NewPost />).toJSON();
    expect(tree).toMatchSnapshot();
});

