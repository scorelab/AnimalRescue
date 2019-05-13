import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image, ScrollView } from "react-native";
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import NotificationBanner from '../../components/NotificationBanner/notificationBanner';
import styles from './style';
import Swipeout from 'react-native-swipeout';
export default class NotificationScreen extends Component {


        render() {
                let swipeBtns = [
                        {
                                text: 'Delete',
                                backgroundColor: '#d9534f',
                                authoClose: true,
                                buttonWidth:300,
                                sensitivity:100,
                                stye:{width:500},
                                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                onPress: () => { alert("Delete") }
                        }
                        
                ];

                return (
                        <View style={{ flex: 1, flexDirection: 'column', }}>
                                <Header title={"Notifications"} />
                                <View style={styles.container}>
                                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                                                <Swipeout style={{ width: '100%' }} right={swipeBtns}>
                                                        <NotificationBanner
                                                                image={require('../../images/user_image_1.jpg')}
                                                                name="Wathsara Daluwatta"
                                                                posted="5 hours Ago"
                                                                text="Lorem Ipsum is simply dummy  ... "
                                                        />
                                                </Swipeout>
                                                <Swipeout style={{ width: '100%' }} right={swipeBtns}>
                                                        <NotificationBanner
                                                                image={require('../../images/user_image_1.jpg')}
                                                                name="Thuhini Lourdes"
                                                                posted="5 hours Ago"
                                                                text="Lorem Ipsum is simply dummy  ... "
                                                        />
                                                </Swipeout>
                                                <Swipeout style={{ width: '100%' }} right={swipeBtns}>
                                                        <NotificationBanner
                                                                image={require('../../images/user_image_1.jpg')}
                                                                name="Kasun Kavinda"
                                                                posted="5 hours Ago"
                                                                text="Lorem Ipsum is simply dummy  ... "
                                                        />
                                                </Swipeout>
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry ... "
                                                />
                                        </ScrollView>
                                </View>
                        </View>
                );
        }
}
