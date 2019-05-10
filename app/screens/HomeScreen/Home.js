import React, { Component } from "react";
import { ScrollView, View } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import Post from "../../components/HomePostComponent/HomePostComponent";
import styles from "./style";
export default class Home extends Component {

    constructor() {
        super()
        this.state = {
            liked: false
        }

    }

    componentDidMount() {

    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header title="Home" />
                <ScrollView>
                    <Post
                        press={() => navigate('Post')}
                        liked={this.state.liked}
                        comment={() => navigate('Comment')}
                        like={() => this.setState({ liked: true })}
                    />
                    <Post />
                    <Post />
                    <Post />
                </ScrollView>
            </View>

        )


    }

}

