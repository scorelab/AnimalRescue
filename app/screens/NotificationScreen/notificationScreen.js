import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image, ScrollView } from "react-native";
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import NotificationBanner from '../../components/NotificationBanner/notificationBanner';
import styles from './style';
export default class NotificationScreen extends Component {

        render() {
                return (
                        <View style={{ flex: 1, flexDirection: 'column', }}>
                                <Header title={"Notifications"}/>
                                <View style={styles.container}>
                                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                                                <NotificationBanner
                                                        image={require('../../images/user_image_1.jpg')}
                                                        name="Wathsara Daluwatta"
                                                        posted="5 hours Ago"
                                                        text="Lorem Ipsum is simply dummy  ... "
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
