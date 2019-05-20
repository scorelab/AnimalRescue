import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Text, StatusBar, Animated, Easing } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import Post from "../../components/HomePostComponent/HomePostComponent";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import HomeTabBar from "../../components/HomeTabBar/HomeTabBar";
import { f, auth, storage, database } from "../../config/firebaseConfig";
const AnimatedHeader = Animated.createAnimatedComponent(Header);
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            liked: false,
            active: 0,
            isHeaderHidden: false,
            height: new Animated.Value(50),
            visible: true,
            loaded: false,
            post: [],
            postFinal: [],
            data: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
            ],
        }

    }

    componentDidMount = () => {
        var that = this;
        let userId = f.auth().currentUser.uid;
        database.ref('posts').orderByChild('posted').on('value', (function (snapshot) {
            that.setState({
                post: []
            })
            const exist = (snapshot.val() != null);
            if (exist) {
                var data = snapshot.val();
                var postData = data
                var postArray = that.state.post
                for (var posts in postData) {
                    let postOBJ = postData[posts]
                    console.log(postOBJ);
                    database.ref('users').child(postOBJ.userId).once('value').then(function (snapshot) {
                        const exsists = (snapshot.val() != null);
                        if (exsists) {
                            var data = snapshot.val();
                            // console.log(data);
                            postArray.push({
                                image: postOBJ.image,
                                description: postOBJ.description,
                                posted: postOBJ.posted,
                                avatar: data.dp,
                                name: data.first_name + " " + data.last_name,
                                userId: postOBJ.userId
                            })
                            // console.log(that.state.postArray);

                        }
                    })
                }
                that.setState({
                    postFinal: that.state.post,
                    loaded: true
                })
                console.log(that.state.postFinal);
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

    // setAnimation = () => {
    //     Animated.timing(this.state.height, {
    //         duration: 300,
    //         tension: 100,
    //         toValue: this.state.visible ? 50 : 0
    //     }).start()
    // };
    // handleScroll = (event) => {
    //     var currentOffset = event.nativeEvent.contentOffset.y;
    //     var direction = currentOffset > this.offset ? 'down' : 'up';
    //     if (direction == 'down') {
    //         this.setState({
    //             visible: false
    //         })
    //         this.setAnimation();
    //         this.offset = currentOffset;
    //     } else {
    //         this.setState({
    //             visible: true
    //         });
    //         this.setAnimation();
    //         this.offset = currentOffset;
    //         // show the nav
    //     }
    // }
    // onSwipeUp(gestureState) {
    //     this.setState({
    //         visible: false
    //     });
    //     this.setAnimation();
    // }

    // onSwipeDown(gestureState) {
    //     this.setState({
    //         visible: false
    //     });
    //     this.setAnimation();
    // }

    renderSection = () => {

        const { navigate } = this.props.navigation;
        if (this.state.loaded == true) {
            if (this.state.active == 0) {
                return this.state.post.map((data, index) => {
                    return (
                        <Post
                            keyNo={index}
                            name={data.name}
                            avatar={data.avatar}
                            image={data.image}
                            description={data.description}
                            posted={this.timeConvertor(data.posted)}
                            press={() => navigate('Post')}
                            liked={this.state.liked}
                            comment={() => navigate('Comment')}
                            like={() => this.setState({ liked: true })}
                            numberOfLikes={10}
                            numberOfComments={1}

                        />

                    )
                });

            } else if (this.state.active == 1) {
                return this.state.data.map((data, index) => {
                    return (
                        <Post
                            press={() => navigate('Post')}
                            liked={this.state.liked}
                            comment={() => navigate('Comment')}
                            like={() => this.setState({ liked: true })}
                            numberOfLikes={10}
                            numberOfComments={1}
                            name={data.name}
                            posted="2 hours Ago"
                            avatar={data.image}
                        />

                    )
                });
            } else if (this.state.active == 2) {
                return this.state.data.map((data, index) => {
                    return (
                        <Post
                            press={() => navigate('Post')}
                            liked={this.state.liked}
                            comment={() => navigate('Comment')}
                            like={() => this.setState({ liked: true })}
                            numberOfLikes={10}
                            numberOfComments={1}
                            name={data.name}
                            posted="2 hours Ago"
                            avatar={data.image}
                        />

                    )
                });
            }
        }
    }


    render() {

        return (

            <View style={styles.container}>
                <StatusBar backgroundColor="#00063f" barStyle="light-content" />
                <ScrollView
                    style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    stickyHeaderIndices={[1]}
                // showsVerticalScrollIndicator={false}
                // onScroll={this.handleScroll}
                // scrollEventThrottle={60}
                // onScrollBeginDrag={() => this.setState({ visible: true })}
                // onScrollEndDrag={() => this.setState({ visible: false })}
                >
                    <AnimatedHeader title="Home" height={50} drawer={() => this.props.navigation.openDrawer()} />
                    <HomeTabBar
                        active={this.state.active}
                        onPress0={() => this.setState({ active: 0 })}
                        onPress1={() => this.setState({ active: 1 })}
                        onPress2={() => this.setState({ active: 2 })}
                    />

                    {this.renderSection()}

                </ScrollView>


            </View >

        )


    }

}

