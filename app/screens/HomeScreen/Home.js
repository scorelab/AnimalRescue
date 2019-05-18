import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Text, StatusBar, Animated, Easing } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import Post from "../../components/HomePostComponent/HomePostComponent";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import HomeTabBar from "../../components/HomeTabBar/HomeTabBar";
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

    componentDidMount() {

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
        if (this.state.active == 0) {
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

    render() {

        return (

            <View style={styles.container}>
                <StatusBar backgroundColor="#00063f" barStyle="light-content" />
                <ScrollView
                    style={{ backgroundColor: 'transparent',alignSelf:'center'}}
                    contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
                    stickyHeaderIndices={[1]}                                      
                    // showsVerticalScrollIndicator={false}
                    // onScroll={this.handleScroll}
                    // scrollEventThrottle={60}
                    // onScrollBeginDrag={() => this.setState({ visible: true })}
                    // onScrollEndDrag={() => this.setState({ visible: false })}
                >
                    <AnimatedHeader title="Home" height={50} drawer={() => this.props.navigation.openDrawer()}/>
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

