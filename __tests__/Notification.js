import React from 'react';
import Notifications from '../app/components/NotificationBanner/notificationBanner';
import 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
    const tree = renderer.create(<Notifications />).toJSON();
    expect(tree).toMatchSnapshot();
});





