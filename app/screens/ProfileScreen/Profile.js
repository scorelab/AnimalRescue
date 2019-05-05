import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView , Linking} from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import styles from "./style";

class Profile extends React.Component {

    constructor() {
        super()

    }

    componentDidMount() {
        
    }

    openMap = () => {
        var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=5.95492,80.554956"
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header title="Profile" />
                <ScrollView>
                    <View style={styles.header}>
                        <Image style={{ width: '100%', height: '100%' }} source={require("../../images/dog.jpg")} />
                    </View>
                    <Image style={styles.avatar} source={require("../../images/user_image_1.jpg")} />
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>John Doe</Text>
                            <Text style={styles.info}>UX Designer / Mobile developer</Text>
                            <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Post')}>
                                <Text>Opcion 1</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>

            </View>


        )


    }

}

export default Profile;