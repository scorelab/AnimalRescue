import React from 'react';
import {Text, View } from 'react-native';

class NewPost extends React.Component {

    constructor() {
        super()
        
    }

    componentDidMount() {

    }


    render() {

        return (
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                <Text>New Post Page</Text>
            </View>

        )


    }

}

export default NewPost;