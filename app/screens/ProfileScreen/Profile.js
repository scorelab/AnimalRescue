import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";

class Profile extends React.Component {

    constructor() {
        super()
        
    }

    componentDidMount() {

    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Header title="Profile" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Profile Page</Text>
                </View>
            </View>


        )


    }

}

export default Profile;