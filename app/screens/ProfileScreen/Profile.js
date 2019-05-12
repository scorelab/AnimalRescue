import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Linking, Dimensions } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import ProfileTabBar from "../../components/ProfileTabBar/ProfileBar";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_GRAY } from "../../config/styles";
const { width, height } = Dimensions.get('window');

class Profile extends React.Component {

    constructor() {
        super()
        this.state = {
            newProfileImage: null,
            newCoverPhoto: null,
            active: 0,
            data1: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
                { id: 8, image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { id: 9, image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { id: 10, image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
            ],
            data2: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
            ],
            data3: [
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
                { id: 8, image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { id: 9, image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { id: 10, image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
            ]
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

    renderSection = () => {
        if (this.state.active == 0) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../images/level4.png')} style={{ width: 'auto', height: 'auto' }} />
                </View>
            )

        } else if (this.state.active == 1) {
            return this.state.data1.map((data, index) => {
                return (
                    <TouchableOpacity>
                        <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                            <Image source={{ uri: data.image }} style={{ width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }} />
                        </View>
                    </TouchableOpacity>
                )
            });
        } else if (this.state.active == 2) {
            return this.state.data1.map((data, index) => {
                return (
                    <TouchableOpacity>
                        <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                            <Image source={{ uri: data.image }} style={{ width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }} />
                        </View>
                    </TouchableOpacity>
                )
            });
        } else if (this.state.active == 3) {
            return this.state.data3.map((data, index) => {
                return (
                    <TouchableOpacity>
                        <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                            <Image source={{ uri: data.image }} style={{ width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }} />
                        </View>
                    </TouchableOpacity>
                )
            });
        }

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
                <ScrollView style={{ marginBottom: 60 }} stickyHeaderIndices={[4]} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Image style={{ width: '100%', height: '100%' }} source={require("../../images/dog.jpg")} />
                        <TouchableOpacity style={styles.editCover} onPress={() => this.editCoverPicture()}>
                            <Ionicons name={'camera'} size={20} color={'#000'} />
                            <Text> EDIT</Text>
                        </TouchableOpacity>
                    </View>
                    <Image style={styles.avatar} source={require("../../images/user_image_1.jpg")} />
                    <TouchableOpacity style={styles.editProfilePic} onPress={() => this.editProfilePicture()}>
                        <Ionicons name={'camera'} size={15} color={'#000'} />
                    </TouchableOpacity>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>John Doe</Text>
                        </View>

                    </View>
                    <ProfileTabBar
                        active={this.state.active}
                        onPress0={() => this.setState({ active: 0 })}
                        onPress1={() => this.setState({ active: 1 })}
                        onPress2={() => this.setState({ active: 2 })}
                        onPress3={() => this.setState({ active: 3 })}
                    />
                    {this.state.active == 0 ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center',marginVertical:10 }}>
                            <Image source={require('../../images/level10.png')} style={{ width: 120, height: 120 }} />
                            <Text style={{fontSize:15}}>Animal Helper Level 10</Text>
                        </View>
                    ) : (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {this.renderSection()}
                            </View>
                        )}


                </ScrollView>

            </View>


        )


    }

}

export default Profile;