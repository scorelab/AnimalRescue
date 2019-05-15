import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import Post from "../../components/HomePostComponent/HomePostComponent";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";
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
                <ScrollView showsVerticalScrollIndicator={false}>
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
                <ScrollView showsVerticalScrollIndicator={false}>
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
                <ScrollView showsVerticalScrollIndicator={false}>
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
                <StatusBar backgroundColor="#00063f" barStyle="light-content" />
                {/* <Header title="Home" /> */}
                <View style={styles.tabBarContainer}>
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
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    {this.renderSection()}
                </View>
            </View >

        )


    }

}

