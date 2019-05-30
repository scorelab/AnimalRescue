import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import ModalHeader from "../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import Swipeout from 'react-native-swipeout';
import { f, auth, storage, database } from "../../config/firebaseConfig";
export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.navigation.state.params.id,
            comments: [],
            commentsFinal: [],
            loaded: false,
            data: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
            ],
            comment: '',
            rowIndex: null
        }
    }

    componentDidMount = () => {
        let params = this.props.navigation.state.params;
        // console.log(params)        
        if (params) {
            database.ref('posts').child(this.state.postId).child('userId').once('value').then(function (snapshot) {
                const exist = (snapshot.val() != null);
                if (exist) data = snapshot.val();
                // console.log(data)
                that.setState({
                    authorId: data
                });
            });

            var that = this;
            let userId = f.auth().currentUser.uid;
            database.ref('comments').child(this.state.postId).on('value', (function (snapshot) {
                const exist = (snapshot.val() != null);
                console.log("comment " + exist)
                if (exist) {
                    let data = snapshot.val();
                    //console.log(data)
                    var commentData = data
                    var commentArray = that.state.comments
                    for (var comments in commentData) {
                        let cmtOBJ = commentData[comments]
                        database.ref('users').child(cmtOBJ.authorId).once('value').then(function (snapshot) {
                            const exsists = (snapshot.val() != null);
                            if (exsists) {
                                var data = snapshot.val();
                                console.log(data)
                                commentArray.push({
                                    id:cmtOBJ.commentId,
                                    pid: that.state.postId,
                                    posted: cmtOBJ.posted,
                                    comment: cmtOBJ.comment,
                                    avatar: data.dp,
                                    name: data.first_name + " " + data.last_name,
                                    userId: cmtOBJ.authorId
                                })
                            }
                            that.setState({
                                commentsFinal: commentArray,
                                loaded: true,
                                comments: []
                            })
                            that.state.commentsFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
                            that.state.commentsFinal.reverse();
                        })

                    }
                    console.log(that.state.commentsFinal);

                }

            }), function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }

    }
    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
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
    postComment = () => {
        var userId = f.auth().currentUser.uid;
        var comment = this.state.comment;
        var postId = this.state.postId;
        var newCommentId = this.uniqueId();
        var authorId = this.state.authorId;
        var date = Date.now();
        var posted = Math.floor(date / 1000)

        var newCommentObject = {
            commentId:newCommentId,
            authorId: userId,
            posted: posted,
            comment: comment
        }
        database.ref('/comments/' + postId + '/' + newCommentId).set(newCommentObject);
        // alert(this.state.comment);
        this.setState({
            comment: ''
        })
        this.textInput.clear()
    }

    deleteComment = (id,index) => {
        database.ref('/comments/' + this.state.postId + '/' + id).remove();
        this.onSwipeClose(index);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ModalHeader title="Comments" onPress={() => this.props.navigation.goBack()} />
                <FlatList
                    style={styles.root}
                    data={this.state.commentsFinal}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    extraData={this.state.rowIndex}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const comments = item;
                        var swipeBtns = [
                            {
                                component: <Ionicons name={"trash"} size={20} color={"#b00020"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                backgroundColor: '#fff',
                                authoClose: true,
                                buttonWidth: 300,
                                sensitivity: 100,
                                stye: { width: 500 },
                                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                onPress: () => { this.deleteComment(comments.id,index) }
                            }

                        ];
                        return (
                            <Swipeout
                                rowIndex={index}
                                sectionId={0}
                                onOpen={() => this.onSwipeOpen(index)}
                                close={this.state.rowIndex !== index}
                                onClose={() => this.onSwipeClose(index)}
                                style={{ width: '100%', backgroundColor: 'transparent' }}
                                right={swipeBtns}>
                                <View style={styles.container}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image style={styles.image} source={{ uri: comments.avatar }} />
                                    </TouchableOpacity>
                                    <View style={styles.content}>
                                        <View style={styles.contentHeader}>
                                            <Text style={styles.name}>{comments.name}</Text>
                                            <Text style={styles.time}>
                                                {this.timeConvertor(comments.posted)}
                                            </Text>
                                        </View>
                                        <Text rkType='primary3 mediumLine'>{comments.comment}</Text>
                                    </View>
                                </View>
                            </Swipeout>
                        );
                    }} />
                <View style={styles.footer}>
                    <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
                        <TextInput style={styles.inputs}
                            placeholder="Write a Comment..."
                            underlineColorAndroid='transparent'
                            multiline={true}
                            onChangeText={(text) => this.setState({ comment: text })}
                            ref={input => { this.textInput = input }} />
                    </KeyboardAvoidingView>

                    <TouchableOpacity style={styles.btnSend} onPress={() => this.postComment()}>
                        <Ionicons name="paper-plane" size={25} color={"#192f6a"} />
                        {/* <Image source={{ uri: "https://png.icons8.com/small/75/ffffff/filled-sent.png" }} style={styles.iconSend} /> */}
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

