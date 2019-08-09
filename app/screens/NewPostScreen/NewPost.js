import React from 'react';
import { Text, View, Image, TouchableOpacity, PermissionsAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ImagePicker from "react-native-image-picker";
import Search from "../../components/SearchAndFixLocation/searchView.js";
import { ButtonGroup } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { COLOR_PRIMARY, COLOR_BLACK, COLOR_SECONDARY } from "../../config/styles";
import styles from "./style";
import DropdownAlert from 'react-native-dropdownalert';
import ActionSheet from 'react-native-actionsheet'
import { f, auth, storage, database } from "../../config/firebaseConfig";
import Progress from "../../components/Progress/Progress"
import Video from 'react-native-video';
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
            pickedVideo: null,
            region: null,
            currentPlace: null,
            markers: [],
            latitude: null,
            longitude: null,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5,
            selectedAnimal: '',
            description: '',
            progress: 0,
            uploading: false,
            animationState: 'rest',
            postId: this.uniqueId(),
            selectedIndex: 0
        }
        this.mapRef = null;
        this.video = Video;
        this.updateIndex = this.updateIndex.bind(this)

    }
    updateIndex(selectedIndex) {
        this.setState({
            selectedIndex: selectedIndex,
            photoError: true
        })

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
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message:
                        'Animal Rescue App needs access to your Location ' +
                        'so you can filter animals easily.',
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
        ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600, mediaType: 'photo' }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: res.uri,
                    pickedVideo: null,
                    photoError: false
                });
            }
        });

    };

    selectVideo = () => {
        ImagePicker.showImagePicker({ title: "Pick a Video", minWidth: 1920, minHeight: 1080, mediaType: 'video' }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedVideo: res.uri,
                    pickedImage: null,
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
        // console.log(latitude)

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

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    uploadImage = async () => {
        if (this.state.selectedIndex == 0) {
            var uri = this.state.pickedImage
            var that = this;
            var postId = this.state.postId;
            var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(uri)[1];
            var longitude = this.state.longitude;
            var latitude = this.state.latitude;
            this.setState({
                currentFileType: ext,
                uploading: true
            });
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
            var filePath = postId + '.' + that.state.currentFileType;

            var uploadTask = storage.ref('posts/images/' + this.state.selectedAnimal).child(filePath).put(blob);

            uploadTask.on('state_changed', function (snapshot) {
                let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                that.setState({
                    progress: progress
                });
            }, function (error) {
                console.log(error);

            }, function () {
                that.setState({
                    progress: 100
                });
                // alert("done");
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    that.setDatabse(downloadURL, latitude, longitude);
                    console.log(downloadURL);
                }, function (error) {
                    console.log(error)
                })
            })
        } else {
            var uri = this.state.pickedVideo
            var that = this;
            var postId = this.state.postId;
            var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(uri)[1];
            var longitude = this.state.longitude;
            var latitude = this.state.latitude;
            this.setState({
                currentFileType: ext,
                uploading: true
            });
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
            var filePath = postId + '.' + that.state.currentFileType;

            var uploadTask = storage.ref('posts/videos/' + this.state.selectedAnimal).child(filePath).put(blob);

            uploadTask.on('state_changed', function (snapshot) {
                let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                that.setState({
                    progress: progress
                });
            }, function (error) {
                console.log(error);

            }, function () {
                that.setState({
                    progress: 100
                });
                // alert("done");
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    that.setDatabse(downloadURL, latitude, longitude);
                    console.log(downloadURL);
                }, function (error) {
                    console.log(error)
                })
            })
        }
    }

    setDatabse = async (imageURL, latitude, longitude) => {
        alert("come")
        var date = Date.now();
        var postId = this.state.postId
        var userID = f.auth().currentUser.uid;
        var posted = Math.floor(date / 1000)
        const postObj = {
            description: this.state.description,
            animalType: this.state.selectedAnimal,
            userId: userID,
            image: imageURL,
            longitude: longitude,
            latitude: latitude,
            status: 0,
            id: postId,
            posted: posted,
            type: this.state.selectedIndex
        };

        const myPostOBJ = {
            image: imageURL,
            status: 0,
            id: postId,
            posted: posted,
            type: this.state.selectedIndex
        }

        database.ref('/posts/' + postId).set(postObj);
        database.ref('users/' + userID + '/post/' + postId).set(myPostOBJ);
        this.setState({
            imageSelected: false,
            uploading: false,
            progress: 0,
            description: '',
            selectedAnimal: '',
            photoError: true,
            pickedImage: null,
            pickedVideo: null,
            postId: this.uniqueId()
        });
        this.props.navigation.navigate('Post', { id: postId })

    }

    submit = () => {
        if (this.state.selectedAnimal == '') {
            this.dropdown.alertWithType('error', 'Error', 'Please Select An Animal');
        } else if (this.state.description == '') {
            this.dropdown.alertWithType('error', 'Error', 'Please Add The Description');
        } else {
            this.uploadImage();

        }
    }


    render() {
        if (this.state.uploading == true) {
            return (
                <Progress percentage={this.state.progress} />
            )

        } else {
            const buttons = ['photo', 'Video']
            const { selectedIndex } = this.state
            return (
                <ScrollView style={{ flex: 1 }}>
                    <Header title="New Post" height={50} drawer={() => this.props.navigation.openDrawer()} />
                    <View style={styles.container}>
                        <ProgressSteps activeStepIconBorderColor={COLOR_PRIMARY} completedProgressBarColor={COLOR_PRIMARY} completedStepIconColor={COLOR_PRIMARY} activeLabelColor={COLOR_PRIMARY} labelColor={COLOR_BLACK}>
                            <ProgressStep label="Photo" onNext={() => this.checkPhoto()} errors={this.state.photoError} previousBtnDisabled={true} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                                <View style={styles.stepContainer}>
                                    <ButtonGroup
                                        onPress={this.updateIndex}
                                        selectedIndex={selectedIndex}
                                        buttons={buttons}
                                        containerStyle={{ height: 30 }}
                                    />
                                    {this.state.photoError == true ?
                                        this.state.selectedIndex == 0 ? (
                                            <TouchableOpacity style={styles.imageContainer} onPress={() => this.selectPhoto()}>
                                                <Text>Select an Image</Text>
                                            </TouchableOpacity>
                                        ) : (
                                                <TouchableOpacity style={styles.imageContainer} onPress={() => this.selectVideo()}>
                                                    <Text>Select a Video</Text>
                                                </TouchableOpacity>
                                            )


                                        : (
                                            this.state.selectedIndex == 0 ? (
                                                <TouchableOpacity style={styles.imageContainer} onPress={() => this.selectPhoto()}>
                                                    <Image source={{ uri: this.state.pickedImage }} style={{ width: '100%', height: '100%' }} />
                                                </TouchableOpacity>
                                            ) : (
                                                    <TouchableOpacity style={styles.imageContainer} onPress={() => this.selectPhoto()}>
                                                        <Image source={{ uri: this.state.pickedVideo }} style={{ width: '100%', height: '100%' }} />
                                                    </TouchableOpacity>
                                                )



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
                                        {this.state.description.length.toString() <= 70 ? (
                                            <TextInput
                                                style={[styles.descriptiontStyle, { fontSize: 32 }]}
                                                placeholder={'Enter Description Here'}
                                                editable={true}
                                                multiline={true}
                                                numberOfLines={5}
                                                maxlength={750}
                                                value={this.state.description}
                                                onChangeText={(text) => this.setState({ description: text })}
                                            />
                                        ) : (
                                                <TextInput
                                                    style={[styles.descriptiontStyle, { fontSize: 20 }]}
                                                    placeholder={'Enter Description Here'}
                                                    editable={true}
                                                    multiline={true}
                                                    numberOfLines={5}
                                                    maxlength={750}
                                                    value={this.state.description}
                                                    onChangeText={(text) => this.setState({ description: text })}
                                                />
                                            )}


                                    </KeyboardAvoidingView>

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
                            if (index > 0) {
                                this.setState({
                                    selectedAnimal: options[index],
                                });
                            }
                        }}
                    />
                    <DropdownAlert ref={ref => this.dropdown = ref} />
                </ScrollView >


            )
        }


    }

}

export default NewPost;