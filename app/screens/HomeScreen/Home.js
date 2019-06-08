import React, { Component } from "react";
import { ScrollView, View, ProgressBarAndroid, FlatList, StatusBar, Animated, RefreshControl } from 'react-native';
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
            refreshing: false,
            liked: false,
            active: 0,
            isHeaderHidden: false,
            height: new Animated.Value(50),
            visible: true,
            loaded: false,
            activePost: [],
            activePostFinal: [],
            pendingPost: [],
            pendingPostFinal: [],
            finishedPost: [],
            finishedPostFinal: [],
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
        const userId = f.auth().currentUser.uid;
        database.ref('posts').orderByChild('posted').on('value', (function (snapshot) {
            const exist = (snapshot.val() != null);
            if (exist) {                
                var data = snapshot.val();
                var postData = data
                var activePostArray = that.state.activePost
                var pendingPostArray = that.state.pendingPost
                var finishedPostArray = that.state.finishedPost
                for (var posts in postData) {
                    let postOBJ = postData[posts]
                    console.log(postOBJ);                    
                    
                    database.ref('users').child(postOBJ.userId).once('value').then(function (snapshot) {
                        const exsists = (snapshot.val() != null);
                        if (exsists) {
                            var data = snapshot.val();
                            var likes = postOBJ.likes
                            var count = 0;
                            var userLike = 0
                            for (var liker in likes) {
                                console.log(liker);
                                if (liker == userId) {
                                    userLike += 1;
                                }
                                count += 1
                            }

                            if (postOBJ.status == 0) {
                                activePostArray.push({
                                    id: postOBJ.id,
                                    image: postOBJ.image,
                                    description: postOBJ.description,
                                    posted: postOBJ.posted,
                                    avatar: data.dp,
                                    name: data.first_name + " " + data.last_name,
                                    userId: postOBJ.userId,
                                    like: userLike > 0,
                                    likecount: count                                                                   
                                })
                            } else if (postOBJ.status == 1) {
                                pendingPostArray.push({
                                    id: postOBJ.id,
                                    image: postOBJ.image,
                                    description: postOBJ.description,
                                    posted: postOBJ.posted,
                                    avatar: data.dp,
                                    name: data.first_name + " " + data.last_name,
                                    userId: postOBJ.userId,
                                    like: userLike > 0,
                                    likecount: count
                                })
                            } else {
                                finishedPostArray.push({
                                    id: postOBJ.id,
                                    image: postOBJ.image,
                                    description: postOBJ.description,
                                    posted: postOBJ.posted,
                                    avatar: data.dp,
                                    name: data.first_name + " " + data.last_name,
                                    userId: postOBJ.userId,
                                    like: userLike > 0,
                                    likecount: count
                                })
                            }
                            console.log(activePostArray);
                            that.setState({
                                activePostFinal: activePostArray,
                                pendingPostFinal: pendingPostArray,
                                finishedPostFinal: finishedPostArray,
                                loaded: true,
                                activePost: [],
                                pendingPost: [],
                                finishedPost: []
                            })
                            that.state.activePostFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
                            that.state.activePostFinal.reverse();

                            hat.state.pendingPostFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
                            that.state.pendingPostFinal.reverse();

                            hat.state.finishedPostFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
                            that.state.finishedPostFinal.reverse();
                        }

                    })

                }
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

    setLike = (status, postID) => {
        if (status == false) {
            var userId = f.auth().currentUser.uid;
            var set = 1;
            likeObj = {
                userId: userId,
                status: 1
            }
            database.ref("posts/" + postID + '/likes/' + userId).set(likeObj);
        } else {
            var userId = f.auth().currentUser.uid;
            database.ref("posts/" + postID + '/likes/' + userId).remove();
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

    commentCount = (id) => {
              
        database.ref('comments').child(id).once('value').then(function (snapshot) {
            return snapshot.numChildren()
        });
    }
    renderSection = () => {
        this.state.activePostFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
        this.state.activePostFinal.reverse();

        this.state.pendingPostFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
        this.state.pendingPostFinal.reverse();

        this.state.finishedPostFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
        this.state.finishedPostFinal.reverse();
        const { navigate } = this.props.navigation;

        if (this.state.active == 0) {
            return this.state.activePostFinal.map((data, index) => {
                return (
                    <Post
                        keyNo={index}
                        name={data.name}
                        avatar={data.avatar}
                        image={data.image}
                        description={data.description}
                        posted={this.timeConvertor(data.posted)}
                        press={() => navigate('Post', { id: data.id })}
                        liked={data.like}
                        comment={() => navigate('Comment', { id: data.id })}
                        like={() => this.setLike(data.like, data.id)}
                        numberOfLikes={data.likecount}
                        numberOfComments={1}

                    />

                )
            });

        } else if (this.state.active == 1) {
            return this.state.pendingPostFinal.map((data, index) => {
                return (
                    <Post
                        keyNo={index}
                        name={data.name}
                        avatar={data.avatar}
                        image={data.image}
                        description={data.description}
                        posted={this.timeConvertor(data.posted)}
                        press={() => navigate('Post', { id: data.id })}
                        liked={data.like}
                        comment={() => navigate('Comment')}
                        like={() => this.setLike(data.like, data.id)}
                        numberOfLikes={data.likecount}
                        numberOfComments={1}

                    />
                )
            });
        } else if (this.state.active == 2) {
            return this.state.finishedPostFinal.map((data, index) => {
                return (
                    <Post
                        keyNo={index}
                        name={data.name}
                        avatar={data.avatar}
                        image={data.image}
                        description={data.description}
                        posted={this.timeConvertor(data.posted)}
                        press={() => navigate('Post', { id: data.id })}
                        liked={data.like}
                        comment={() => navigate('Comment')}
                        like={() => this.setLike(data.like, data.id)}
                        numberOfLikes={data.likecount}
                        numberOfComments={1}

                    />
                )
            });
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
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

                    {this.state.loaded == true ? this.renderSection() :
                        <View style={styles.overlay}>
                            <ProgressBarAndroid
                                styleAttr="Large"
                                indeterminate={false}
                                style={{ height: 80, borderRadius: 50 }}
                                color="#fff"
                            />
                        </View>
                    }


                </ScrollView>


            </View >

        )


    }

}

