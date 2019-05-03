import React from 'react';
import { Text, View, Image, TouchableOpacity, PermissionsAndroid, KeyboardAvoidingView } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ImagePicker from "react-native-image-picker";
import Search from "../../components/SearchAndFixLocation/searchView.js";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { COLOR_PRIMARY, COLOR_BLACK } from "../../config/styles";
import styles from "./style";
class NewPost extends React.Component {

    constructor() {
        super()
        this.state = {
            photoError: true,
            Location: false,
            Information: false,
            pickedImage: null,
            region: null,
            currentPlace: null,
            markers: [],
            latitude:null,
            longitude:null,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5

        }

    }

    componentDidMount = async () => {
        this.requestCameraPermission();
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
              latitude:       position.coords.latitude,
              longitude:      position.coords.longitude,
              latitudeDelta:  0.00922*1.5,
              longitudeDelta: 0.00421*1.5
            }           
            this.setState({
                region:region,
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
            })

            
          }, (error)=>console.log(error));
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
                                            <Image source={{ uri: this.state.pickedImage }} style={{ width: '100%', height: '100%' }} />
                                        </TouchableOpacity>

                                    )}

                            </View>
                        </ProgressStep>

                        <ProgressStep label="Location" previousBtnStyle={styles.nextBtn} previousBtnTextStyle={styles.preBtnText} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                <MapView
                                    style={styles.mapContainer}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={this.state.region}
                                    showsUserLocation={true}
                                    loadingEnabled={true}
                                    zoomControlEnabled={true}
                                    showsMyLocationButton={true}
                                    onPress={(e) => this.setState({
                                        longitude:e.nativeEvent.coordinate.longitude,
                                        latitude:e.nativeEvent.coordinate.latitude
                                    })}
                                >
                                {this.state.latitude !=null && this.state.latitude != null?(
                                    <Marker draggable
                                        coordinate={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude
                                        }}
                                        title={"Here is the Animal"}                                     
                                        
                                    />
                                ):(
                                    <View></View>
                                )}
                                    
                                </MapView>

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