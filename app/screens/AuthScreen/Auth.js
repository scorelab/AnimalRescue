import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native';

class Auth extends React.Component {

    constructor() {
        super()
        
    }

    componentDidMount() {

    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                 <TouchableOpacity onPress={() => navigate('App')}>
                    <Text>Auth Page</Text>
                </TouchableOpacity> 
            </View>

        )


    }

}

export default Auth;