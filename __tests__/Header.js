import React from 'react';
import Header from '../app/components/HeaderNavigationBar/HeaderNavigationBar';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
});





