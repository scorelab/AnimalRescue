import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import NotificationBanner from '../../components/NotificationBanner/notificationBanner';
import styles from './style';
import Swipeout from 'react-native-swipeout';
import Ionicons from "react-native-vector-icons/FontAwesome";
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import { f, auth, storage, database } from "../../config/firebaseConfig";
export default class NotificationScreen extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        data: [
                                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", text: "Lorem ipsum dolor sit amet. ", posted: "2 hours Ago", read: 1 },
                                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 0 },
                                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 1 },
                                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 0 },
                                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 1 },
                                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 1 },
                                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 0 },
                        ],
                        comment: '',
                        rowIndex: null,
                        alterView: false,
                        notifications: [],
                        notificationFinal: []


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

        componentDidMount = () => {
                var userId = f.auth().currentUser.uid;
                var that = this;                
                database.ref('notifications').child(userId).on('value', (function (snapshot) {
                        const exsists = (snapshot.val() != null);
                        if (exsists) {
                                data = snapshot.val();
                                //console.log(data)
                                likes = data.likes;
                                // console.log(likes)
                                comments = data.comments;
                                handles = data.handle;
                                finishes = data.finish;
                                notificationArray = that.state.notifications
                                for (var like in likes) {                                        
                                        // console.log(like)
                                        notificationArray.push({
                                                id: likes[like].id,
                                                flag: likes[like].flag,
                                                status: likes[like].status,
                                                notification: likes[like].notification,
                                                posted: likes[like].posted,
                                                image: likes[like].image
                                        })
                                }
                                console.log(notificationArray)
                                for (var comment in comments) {                                        
                                        notificationArray.push({
                                                id: comments[comment].id,
                                                flag: comments[comment].flag,
                                                status: comments[comment].status,
                                                notification: comments[comment].notification,
                                                posted: comments[comment].posted,
                                                image: comments[comment].image
                                        })
                                }

                                for (var handle in handles) {                                       
                                        notificationArray.push({
                                                id: handles[handle].id,
                                                flag: handles[handle].flag,
                                                status: handles[handle].status,
                                                notification: handles[handle].notification,
                                                posted: handles[handle].posted,
                                                image: handles[handle].image
                                        })
                                }
                                // console.log(notificationArray)
                                for (var finish in finishes) {                                       
                                        notificationArray.push({
                                                id: finishes[finish].id,
                                                flag: finishes[finish].flag,
                                                status: finishes[finish].status,
                                                notification: finishes[finish].notification,
                                                posted: finishes[finish].posted,
                                                image: finishes[finish].image
                                        })
                                }


                                // console.log(that.state.notificationFinal)
                                that.state.notifications.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
                                that.state.notifications.reverse();
                                that.setState({
                                        notificationFinal: [],
                                        notificationFinal: notificationArray,
                                        notifications: []
                                })
                                that.state.notificationFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
                                that.state.notificationFinal.reverse();
                        }

                       
                }), function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                });
        }
        timeConvertor = (timestamp) => {
                var a = new Date(timestamp * 1000);
                var seconds = Math.floor((new Date() - a) / 1000);

                var interval = Math.floor(seconds / 31536000);
                if (interval >= 1) {
                        return interval + ' Year' + this.timePlural(interval);
                }

                var interval = Math.floor(seconds / 2592000);
                if (interval >= 1) {
                        return interval + ' Month' + this.timePlural(interval);
                }

                var interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                        return interval + ' Day' + this.timePlural(interval);
                }

                var interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                        return interval + ' Hour' + this.timePlural(interval);
                }

                var interval = Math.floor(seconds / 60);
                if (interval >= 1) {
                        return interval + ' Minute' + this.timePlural(interval);
                }

                return Math.floor(seconds) + ' Second' + this.timePlural(seconds)
        }
        timePlural = (s) => {
                if (s == 1) {
                        return ' ago'
                } else {
                        return 's ago'
                }
        }

        markRead = (id,flag) => {
                var userId = f.auth().currentUser.uid;
                if(flag == "l"){
                        database.ref('notifications/'+userId+"/likes/"+id).update({status:1})
                }else if (flag == "c"){
                        database.ref('notifications/'+userId+"/comments/"+id).update({status:1})
                }else if(flag == "h"){
                        database.ref('notifications/'+userId+"/handle/"+id).update({status:1})
                }else if(flag == "f"){
                        database.ref('notifications/'+userId+"/finish/"+id).update({status:1})
                }               

        }

        deleteNotification = (id,flag) => {
                var userId = f.auth().currentUser.uid;
                if(flag == "l"){
                        database.ref('notifications/'+userId+"/likes/"+id).update({status:2})
                }else if (flag == "c"){
                        database.ref('notifications/'+userId+"/comments/"+id).update({status:2})
                }else if(flag == "h"){
                        database.ref('notifications/'+userId+"/handle/"+id).update({status:2})
                }else if(flag == "f"){
                        database.ref('notifications/'+userId+"/finish/"+id).update({status:2})
                }               

        }

        viewNotification = (id,flag) => {
                var userId = f.auth().currentUser.uid;
                const { navigate } = this.props.navigation;
                if(flag == "l"){
                        database.ref('notifications/'+userId+"/likes/"+id).update({status:1})
                        navigate('Post', { id: id });
                }else if (flag == "c"){
                        database.ref('notifications/'+userId+"/comments/"+id).update({status:1})
                        navigate('Comment', { id: id })
                }else if(flag == "h"){
                        database.ref('notifications/'+userId+"/handle/"+id).update({status:1})
                        navigate('Post', { id: id })
                }else if(flag == "f"){
                        database.ref('notifications/'+userId+"/finish/"+id).update({status:1})
                        navigate('Post', { id: id })
                }               

        }

        render() {

                return (
                        <View style={{ flex: 1, flexDirection: 'column', }}>
                                <Header title={"Notifications"} height={50} drawer={() => this.props.navigation.openDrawer()} />
                                {/* <TouchableOpacity onPress={() => this.setState({ alterView: true })} style={{ justifyContent: 'flex-end', marginVertical: 10, flexDirection: 'row', marginRight: 10 }}>
                                        <Text style={{ color: "#007bff" }}>Mark All As Read</Text>
                                        <Ionicons name={"check-double"} size={12} color={"#007bff"} />
                                        <Ionicons name={"check"} size={12} color={"#007bff"} />
                                </TouchableOpacity> */}
                                <View style={styles.container}>
                                        <FlatList
                                                style={styles.scrollView}
                                                data={this.state.notificationFinal}
                                                extraData={this.state.rowIndex}
                                                ItemSeparatorComponent={() => {
                                                        return (
                                                                <View style={styles.separator} />
                                                        )
                                                }}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item, index }) => {
                                                        const Notification = item.item;
                                                        var unRead = [
                                                                {
                                                                        component: <Ionicons name={"trash"} size={20} color={"#b00020"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#fff',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { this.deleteNotification(item.id, item.flag) }
                                                                },
                                                                {
                                                                        text: 'Mark As Read',
                                                                        component: <Ionicons name={"check"} size={20} color={"#0D47A1"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#fff',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { this.markRead(item.id, item.flag) }
                                                                }

                                                        ];

                                                        var read = [
                                                                {
                                                                        component: <Ionicons name={"trash"} size={20} color={"#b00020"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#fff',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { this.deleteNotification(item.id, item.flag) }
                                                                }
                                                        ];

                                                        if (item.status == 1) {                                                                
                                                                return (
                                                                        <Swipeout
                                                                                rowIndex={index}
                                                                                sectionId={0}
                                                                                onOpen={() => this.onSwipeOpen(index)}
                                                                                close={this.state.rowIndex !== index}
                                                                                onClose={() => this.onSwipeClose(index)}
                                                                                sensitivity={50}
                                                                                autoClose={true}
                                                                                style={{ width: '100%', backgroundColor: 'transparent' }}
                                                                                right={read}>
                                                                                <NotificationBanner
                                                                                        read={item.status}
                                                                                        image={{ uri: item.image }}
                                                                                        posted={this.timeConvertor(item.posted)}
                                                                                        text={item.notification}
                                                                                        onPress={()=> this.viewNotification(item.id, item.flag)}
                                                                                />
                                                                        </Swipeout>
                                                                );
                                                        } else if(item.status == 0) {
                                                                return (
                                                                        <Swipeout
                                                                                rowIndex={index}
                                                                                sectionId={0}
                                                                                onOpen={() => this.onSwipeOpen(index)}
                                                                                close={this.state.rowIndex !== index}
                                                                                onClose={() => this.onSwipeClose(index)}
                                                                                sensitivity={50}
                                                                                autoClose={true}
                                                                                style={{ width: '100%', backgroundColor: 'transparent' }}
                                                                                right={unRead}>
                                                                                <NotificationBanner
                                                                                        read={item.status}
                                                                                        image={{ uri: item.image }}
                                                                                        posted={this.timeConvertor(item.posted)}
                                                                                        text={item.notification}
                                                                                        onPress={()=> this.viewNotification(item.id, item.flag)}
                                                                                />
                                                                        </Swipeout>
                                                                );
                                                        }

                                                }} />
                                </View>

                        </View>
                );
        }
}
