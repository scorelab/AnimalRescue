import React from 'react';
import { Text, View } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
class NewPost extends React.Component {

    constructor() {
        super()

    }

    componentDidMount() {

    }


    render() {

        return (

            <View style={{ flex: 1 }}>
                <Header title="New Post" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>New Post Page</Text>
                </View>
            </View>


        )


    }

}

export default NewPost;