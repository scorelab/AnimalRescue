import React from 'react';
import { Text, View,Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ImagePicker from "react-native-image-picker";
import { COLOR_PRIMARY, COLOR_BLACK } from "../../config/styles";
import styles from "./style";
class NewPost extends React.Component {

    constructor() {
        super()
        this.state = {
            photoError: true,
            Location: false,
            Information: false,
            pickedImage: null
        }

    }

    componentDidMount = () => {
        this.requestCameraPermission();
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

    selectPhoto = () => {
        ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: res.uri,
                    photoError: false
                });
            }
        });

    };

    render() {

        return (

            <View style={{ flex: 1 }}>
                <Header title="New Post" />
                <View style={styles.container}>
                    <ProgressSteps activeStepIconBorderColor={COLOR_PRIMARY} completedProgressBarColor={COLOR_PRIMARY} completedStepIconColor={COLOR_PRIMARY} activeLabelColor={COLOR_PRIMARY} labelColor={COLOR_BLACK}>
                        <ProgressStep label="Photo" errors={this.state.photoError} previousBtnDisabled={true} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                {this.state.photoError == true ? (
                                    <TouchableOpacity style={styles.imageContainer} onPress={() => this.selectPhoto()}>
                                        {/* <View style={styles.imageContainer}> */}
                                        <Text>Select an Image</Text>
                                        {/* </View> */}
                                    </TouchableOpacity>
                                ) : (
                                        <TouchableOpacity style={styles.imageContainer} onPress={() => this.selectPhoto()}>
                                            <Image source={{ uri: this.state.pickedImage }} style={{width:'100%',height:'100%'}}/>
                                        </TouchableOpacity>

                                    )}

                            </View>
                        </ProgressStep>
                        <ProgressStep label="Location" previousBtnStyle={styles.nextBtn} previousBtnTextStyle={styles.preBtnText} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                <Text>This is the content within step 2!</Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Information" previousBtnStyle={styles.nextBtn} previousBtnTextStyle={styles.preBtnText} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                <Text>This is the content within step 3!</Text>
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </View>


        )


    }

}

export default NewPost;