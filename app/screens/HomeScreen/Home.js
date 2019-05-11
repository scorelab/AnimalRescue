import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import Post from "../../components/HomePostComponent/HomePostComponent";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Swipeable from 'react-native-gesture-handler/Swipeable';
export default class Home extends Component {

    constructor() {
        super()
        this.state = {
            liked: false,
            active: 0
        }

    }

    componentDidMount() {

    }

    onSwipeLeft() {
        if (this.state.active != 2) {
            var active = this.state.active;
            active = active + 1;
            this.setState({
                active: active
            })
        } else {
            this.setState({
                active: 0
            })
        }


    }

    onSwipeRight() {
        if (this.state.active != 0) {
            var active = this.state.active;
            active = active - 1;
            this.setState({
                active: active
            })
        } else {
            this.setState({
                active: 2
            })
        }
    }
    renderSection = () => {
        
        const { navigate } = this.props.navigation;
        if (this.state.active == 0) {
            return (
                <ScrollView>
                    <Post
                        press={() => navigate('Post')}
                        liked={this.state.liked}
                        comment={() => navigate('Comment')}
                        like={() => this.setState({ liked: true })}
                        numberOfLikes={10}
                        numberOfComments={1}
                    />

                </ScrollView>
            )

        } else if (this.state.active == 1) {
            return (
                <ScrollView>
                    <Post
                        press={() => navigate('Post')}
                        liked={this.state.liked}
                        comment={() => navigate('Comment')}
                        like={() => this.setState({ liked: true })}
                        numberOfLikes={10}
                        numberOfComments={1}
                    />
                    <Post />
                </ScrollView>
            )
        } else if (this.state.active == 2) {
            return (
                <ScrollView>
                    <Post
                        press={() => navigate('Post')}
                        liked={this.state.liked}
                        comment={() => navigate('Comment')}
                        like={() => this.setState({ liked: true })}
                        numberOfLikes={10}
                        numberOfComments={1}
                    />
                    <Post />
                    <Post />
                    <Post />
                </ScrollView>
            )
        }
    }

    render() {
      
        return (
            <View style={styles.container}>
                <Header title="Home" />
                <View style={styles.tabBarContainer}>
                    {this.state.active == 0 ? (
                        <TouchableOpacity onPress={() => this.setState({ active: 0 })} style={styles.tabBarActive}>
                            <Ionicons name={'camera'} size={15} color={'#000'} />
                            <Text style={{ color: '#000' }}>Badges</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity onPress={() => this.setState({ active: 0 })} style={styles.tabBar}>
                                <Ionicons name={'camera'} size={15} color={'#696969'} />
                                <Text style={{ color: '#696969' }}>Badges</Text>
                            </TouchableOpacity>
                        )}


                    {this.state.active == 1 ? (
                        <TouchableOpacity onPress={() => this.setState({ active: 1 })} style={styles.tabBarActive}>
                            <Ionicons name={'camera'} size={15} color={'#000'} />
                            <Text style={{ color: '#000' }}>Post</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity onPress={() => this.setState({ active: 1 })} style={styles.tabBar}>
                                <Ionicons name={'camera'} size={15} color={'#696969'} />
                                <Text style={{ color: '#696969' }}>Post</Text>
                            </TouchableOpacity>
                        )}

                    {this.state.active == 2 ? (
                        <TouchableOpacity onPress={() => this.setState({ active: 2 })} style={styles.tabBarActive}>
                            <Ionicons name={'photo'} size={15} color={'#000'} />
                            <Text style={{ color: '#000' }}>Mentoring</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity onPress={() => this.setState({ active: 2 })} style={styles.tabBar}>
                                <Ionicons name={'photo'} size={15} color={'#696969'} />
                                <Text style={{ color: '#696969' }}>Mentoring</Text>
                            </TouchableOpacity>
                        )}
                </View>
                <View style={{flex: 1, backgroundColor: 'transparent'}}>
                    {this.renderSection()}
                </View>
            </View >

        )


    }

}

