import React, { Component } from "react";
import { ScrollView, View } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import Post from "../../components/HomePostComponent/HomePostComponent";
import styles from "./style";
export default class Home extends Component {

    constructor() {
        super()

    }

    componentDidMount() {

    }


    render() {

        return (


            <View style={styles.container}>
                <Header title="Home" />
                <ScrollView>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </ScrollView>
            </View>

        )


    }

}

