import React, { Component } from "react";
import { Text, View, TouchableHighlight, FlatList, ScrollView } from "react-native";
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import NotificationBanner from '../../components/NotificationBanner/notificationBanner';
import styles from './style';
import Swipeout from 'react-native-swipeout';
import Ionicons from "react-native-vector-icons/FontAwesome";
export default class NotificationScreen extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        data: [
                                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", text: "Lorem ipsum dolor sit amet, ", posted: "2 hours Ago" },
                                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", posted: "2 hours Ago" },
                                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", text: "Lorem ipsum dolor sit amet, consectetget dolor.", posted: "2 hours Ago" },
                                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli eget dolr.", posted: "2 hours Ago" },
                                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", posted: "2 hours Ago" },
                                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", posted: "2 hours Ago" },
                                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", text: "Lorem ipsum dolor sit amet, et dolor.", posted: "2 hours Ago" },
                        ],
                        comment: '',
                        rowIndex:null


                }
        }
        onSwipeOpen(rowIndex) {
                this.setState({
                        rowIndex: rowIndex
                })                
        }
        onSwipeClose(rowIndex) {
                if (rowIndex === this.state.rowIndex) {
                        this.setState({ rowIndex: null });
                }
        }

        render() {

                return (
                        <View style={{ flex: 1, flexDirection: 'column', }}>
                                <Header title={"Notifications"} />
                                <View style={styles.container}>
                                        <FlatList
                                                style={styles.scrollView}
                                                data={this.state.data}
                                                extraData={this.state.rowIndex}
                                                ItemSeparatorComponent={() => {
                                                        return (
                                                                <View style={styles.separator} />
                                                        )
                                                }}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({item, index}) => {
                                                        const Notification = item.item;
                                                        var swipeBtns = [
                                                                {
                                                                        component: <Ionicons name={"trash"} size={20} color={"white"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#d9534f',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { alert(item.name) }
                                                                },
                                                                {
                                                                        text: 'Mark As Read',
                                                                        component: <Ionicons name={"check"} size={20} color={"white"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#4885ed',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { alert(item.name) }
                                                                }

                                                        ];
                                                        return (
                                                                <Swipeout
                                                                        rowIndex={index}
                                                                        sectionId={0}
                                                                        onOpen={() => this.onSwipeOpen(index)}
                                                                        close={this.state.rowIndex !== index}
                                                                        onClose={() => this.onSwipeClose(index)}
                                                                        sensitivity={1000}
                                                                        autoClose={true}
                                                                        style={{ width: '100%', backgroundColor: 'transparent', }} right={swipeBtns}>
                                                                        <NotificationBanner
                                                                                image={{ uri: item.image }}
                                                                                name={item.name}
                                                                                posted={item.posted}
                                                                                text={item.text}
                                                                        />
                                                                </Swipeout>
                                                        );
                                                }} />
                                </View>
                        </View>
                );
        }
}
