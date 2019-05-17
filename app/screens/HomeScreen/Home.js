import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Text, StatusBar, Animated, Easing } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import Post from "../../components/HomePostComponent/HomePostComponent";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
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

    setAnimation = () => {
        Animated.timing(this.state.height, {
            duration: 300,
            tension: 100,
            toValue: this.state.visible ? 50 : 0
        }).start()
    };
    handleScroll = (event) => {
        var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';
        if (direction == 'down') {
            this.setState({
                visible: false
            })
            this.setAnimation();
            this.offset = currentOffset;
        } else {
            this.setState({
                visible: true
            });
            this.setAnimation();
            this.offset = currentOffset;
            // show the nav
        }
    }
    onSwipeUp(gestureState) {
        this.setState({
            visible: false
        });
        this.setAnimation();
    }

    onSwipeDown(gestureState) {
        this.setState({
            visible: false
        });
        this.setAnimation();
    }

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

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 70,
            gestureIsClickThreshold: 5
        };
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#00063f" barStyle="light-content" />
                <AnimatedHeader title="Home" height={this.state.height} />
                <GestureRecognizer
                    onSwipeUp={(state) => this.onSwipeUp(state)}
                    onSwipeDown={(state) => this.onSwipeDown(state)}
                    config={config}
                    // style={styles.container}
                    style={styles.tabBarContainer}
                >
                    {/* <View style={styles.tabBarContainer}> */}
                    {this.state.active == 0 ? (
                        <TouchableOpacity onPress={() => this.setState({ active: 0 })} style={styles.tabBarActive}>
                            <Text style={{ color: '#fff' }}>Active</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity onPress={() => this.setState({ active: 0 })} style={styles.tabBar}>
                                <Text style={{ color: '#a0a0a0' }}>Active</Text>
                            </TouchableOpacity>
                        )}


                    {this.state.active == 1 ? (
                        <TouchableOpacity onPress={() => this.setState({ active: 1 })} style={styles.tabBarActive}>
                            <Text style={{ color: '#fff' }}>Pending</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity onPress={() => this.setState({ active: 1 })} style={styles.tabBar}>
                                <Text style={{ color: '#a0a0a0' }}>Pending</Text>
                            </TouchableOpacity>
                        )}

                    {this.state.active == 2 ? (
                        <TouchableOpacity onPress={() => this.setState({ active: 2 })} style={styles.tabBarActive}>
                            <Text style={{ color: '#fff' }}>Finished</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity onPress={() => this.setState({ active: 2 })} style={styles.tabBar}>
                                <Text style={{ color: '#a0a0a0' }}>Finished</Text>
                            </TouchableOpacity>
                        )}
                    {/* </View> */}
                </GestureRecognizer>
                <ScrollView
                    style={{ backgroundColor: 'transparent' }}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.handleScroll}
                // onScrollBeginDrag={() => this.setState({ visible: true })}
                // onScrollEndDrag={() => this.setState({ visible: false })}
                >
                    {this.renderSection()}

                </ScrollView>

            </View >
        )


    }

}

