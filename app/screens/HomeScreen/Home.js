import React, { Component } from "react";
import { Text, View } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
export default class Home extends Component {

    constructor() {
        super()

    }

    componentDidMount() {

    }


    render() {

        return (


            <View style={{ flex: 1 }}>
                <Header title="Home" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Home Page</Text>
                </View>
            </View>

        )


    }

}

