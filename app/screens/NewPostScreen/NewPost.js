import React from 'react';
import { Text, View, Image, TouchableOpacity, PermissionsAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ImagePicker from "react-native-image-picker";
import Search from "../../components/SearchAndFixLocation/searchView.js";
import SimplePicker from 'react-native-simple-picker';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { COLOR_PRIMARY, COLOR_BLACK, COLOR_SECONDARY } from "../../config/styles";
import styles from "./style";
import Snackbar from 'react-native-snackbar';
import DropdownAlert from 'react-native-dropdownalert';
import ActionSheet from 'react-native-actionsheet'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


// Labels is optional
const labels = ['Cat', 'Dog', 'Monkey'];
const options = ['Cancel', 'Cat', 'Dog', 'Monkey', 'Bird', 'Fish', 'Pig', 'Cow', 'Goat'];
class NewPost extends React.Component {

    constructor() {
        super()
        this.state = {
            photoError: true,
            locationError: true,
            Location: false,
            Information: false,
            pickedImage: null,
            region: null,
            currentPlace: null,
            markers: [],
            latitude: null,
            longitude: null,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5,
            selectedAnimal: '',
            description: '',
            animationState: 'rest',
        }
        this.mapRef = null;

    }

    componentDidMount = async () => {
        this.requestCameraPermission();
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.setState({
                region: region,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
            if (this.state.longitude != null && this.state.latitude != null) {
                this.setState({
                    locationError: false
                })
            }
            // this.mapView.animateToRegion(region, 1000);

        }, (error) => console.log(error));
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

    handleLocationSelected = (data, { geometry }) => {
        const {
            location: { lat: latitude, lng: longitude }
        } = geometry;
        let region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        }
        this.setState({
            latitude,
            longitude,
            region: region,
        });

        this.mapView.animateToRegion(region, 1000);
    };

    checkPhoto = () => {
        if (this.state.photoError == true) {
            this.dropdown.alertWithType('error', 'Error', 'Please Select An Image');

        }
    }

    checkLocation = () => {
        if (this.state.longitude == null && this.state.latitude == null) {
            this.dropdown.alertWithType('error', 'Error', 'Please Select The Location');

        }
    }

    submit = () => {
        if (this.state.selectedAnimal == '') {
            this.dropdown.alertWithType('error', 'Error', 'Please Select An Animal');
        } else if (this.state.description == '') {
            this.dropdown.alertWithType('error', 'Error', 'Please Add The Description');
        } else {
            const { navigate } = this.props.navigation;
            alert(this.state.selectedAnimal + "\n " + this.state.description + "\n " + this.state.longitude + " \n" + this.state.latitude + "\n " + this.state.pickedImage)
            this.setState({
                photoError: true,
                selectedAnimal: '',
                description: '',
                pickedImage: null
            })
            this.dropdown.alertWithType('success', 'Success', 'Post Creted Successfully');
        }
    }

    render() {
        return (

            <ScrollView style={{ flex: 1 }}>
                <Header title="New Post" height={50} />
                <View style={styles.container}>
                    <ProgressSteps activeStepIconBorderColor={COLOR_PRIMARY} completedProgressBarColor={COLOR_PRIMARY} completedStepIconColor={COLOR_PRIMARY} activeLabelColor={COLOR_PRIMARY} labelColor={COLOR_BLACK}>
                        <ProgressStep label="Photo" onNext={() => this.checkPhoto()} errors={this.state.photoError} previousBtnDisabled={true} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
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

                        <ProgressStep label="Location" onNext={() => this.checkLocation()} error={this.state.locationError} previousBtnStyle={styles.nextBtn} previousBtnTextStyle={styles.preBtnText} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                <MapView
                                    style={styles.mapContainer}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={this.state.region}
                                    showsUserLocation={true}
                                    loadingEnabled={true}
                                    zoomControlEnabled={true}
                                    showsMyLocationButton={true}
                                    ref={ref => { this.mapView = ref }}
                                    onPress={(e) => this.setState({
                                        longitude: e.nativeEvent.coordinate.longitude,
                                        latitude: e.nativeEvent.coordinate.latitude,
                                        locationError: false
                                    })}
                                >
                                    {this.state.latitude != null && this.state.latitude != null ? (
                                        <Marker draggable
                                            coordinate={{
                                                latitude: this.state.latitude,
                                                longitude: this.state.longitude
                                            }}
                                            title={"Here is the Animal"}

                                        />
                                    ) : (
                                            <View></View>
                                        )}
                                </MapView>
                                <Search onLocationSelected={this.handleLocationSelected} />
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Information" onSubmit={() => this.submit()} previousBtnStyle={styles.nextBtn} previousBtnTextStyle={styles.preBtnText} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                {this.state.selectedAnimal == '' ? (
                                    <Text
                                        style={styles.textStyle}
                                        onPress={() => {
                                            this.ActionSheet.show()
                                        }}
                                    >
                                        Click here to select Animal Type
                                </Text>
                                ) : (
                                        <Text
                                            style={styles.textStyle}
                                            onPress={() => {
                                                this.ActionSheet.show()
                                            }}
                                        >
                                            {this.state.selectedAnimal}
                                        </Text>
                                    )}
                                <KeyboardAvoidingView behavior="padding" enabled={true}>
                                    <TextInput
                                        style={styles.descriptiontStyle}
                                        placeholder={'Enter Description Here'}
                                        editable={true}
                                        multiline={true}
                                        numberOfLines={5}
                                        maxlength={750}
                                        onChangeText={(text) => this.setState({ description: text })}
                                    />

                                </KeyboardAvoidingView>

                                {/* <SimplePicker
                                    ref={'picker'}
                                    options={options}
                                    confirmTextStyle={{ color: COLOR_PRIMARY, fontSize: 16 }}
                                    cancelTextStyle={{ color: 'red' }}
                                    itemStyle={styles.textStyle}
                                    onSubmit={(option) => {
                                        this.setState({
                                            selectedAnimal: option,
                                        });
                                    }}
                                /> */}
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Select The Animal Type ?'}
                    options={options}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={0}
                    onPress={(index) => {
                        if(index>0){
                            this.setState({
                                selectedAnimal: options[index],
                            });
                        }                        
                    }}
                />
                <DropdownAlert ref={ref => this.dropdown = ref} />
            </ScrollView>


        )


    }

}

export default NewPost;