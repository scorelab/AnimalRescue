import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
class Profile extends React.Component {

    constructor() {
        super()
        this.state = {
            newProfileImage:null,
            newCoverPhoto:null
        }

    }
    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message:
                        'Animal Rescue App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    componentDidMount() {
        this.requestCameraPermission();
    }

    editProfilePicture = () => {
        ImagePicker.showImagePicker({ title: "Pick a Profile Picture", maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    newProfileImage: res.uri,                    
                });
            }
        });
    }

    editCoverPicture = () => {
        ImagePicker.showImagePicker({ title: "Pick a Cover Photo", maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    newCoverPhoto: res.uri,                    
                });
            }
        });
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
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header title="Profile" />
                <ScrollView>
                    <View style={styles.header}>
                        <Image style={{ width: '100%', height: '100%' }} source={require("../../images/dog.jpg")} />
                        <TouchableOpacity style={styles.editCover} onPress={()=> this.editCoverPicture()}>
                            <Ionicons name={'camera'} size={20} color={'#000'} />
                            <Text> EDIT</Text>
                        </TouchableOpacity>
                    </View>
                    <Image style={styles.avatar} source={require("../../images/user_image_1.jpg")} />
                    <TouchableOpacity style={styles.editProfilePic} onPress={()=> this.editProfilePicture()}>
                        <Ionicons name={'camera'} size={20} color={'#000'} />
                    </TouchableOpacity>
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