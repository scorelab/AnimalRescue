import React from 'react';
import { Text, View, Image, ScrollView, Linking, Dimensions, ImageBackground, ProgressBarAndroid } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import ProfileTabBar from "../../components/ProfileTabBar/ProfileBar";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { BallIndicator } from 'react-native-indicators';
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_GRAY } from "../../config/styles";
const { width, height } = Dimensions.get('window');
import { f, auth, storage, database } from "../../config/firebaseConfig";
import TouchableScale from "react-native-touchable-scale";
class Profile extends React.Component {

    constructor() {
        super()
        this.state = {
            newProfileImage: null,
            newCoverPhoto: null,
            profilePicture: null,
            coverPicture: null,
            name: null,
            active: 0,
            post: [],
            postFinal: [],
            uploading: false,
            progress:0,
            data1: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", status: 0 },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar2.png", status: 1 },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", status: 2 },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar4.png", status: 2 },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar5.png", status: 1 },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar6.png", status: 1 },
                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar7.png", status: 1 },
                { id: 8, image: "https://bootdey.com/img/Content/avatar/avatar1.png", status: 2 },
                { id: 9, image: "https://bootdey.com/img/Content/avatar/avatar2.png", status: 0 },
                { id: 10, image: "https://bootdey.com/img/Content/avatar/avatar3.png", status: 0 },
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
        this.setState({
            name: f.auth().currentUser.displayName
        })
        var that = this;
        let userId = f.auth().currentUser.uid;
        database.ref('users').child(userId).on('value', (function (snapshot) {
            that.setState({
                post: []
            })
            const exist = (snapshot.val() != null);
            var data = snapshot.val();
            if (exist) {
                that.setState({
                    profileData: data,
                    profilePicture: data.dp,
                    coverPicture: data.cover,

                });
                var postData = data.post
                var postArray = that.state.post
                for (var posts in postData) {
                    let postOBJ = postData[posts]
                    postArray.push({
                        image: postOBJ.image,
                        status: postOBJ.status,
                        posted: postOBJ.posted,
                        id: postOBJ.id
                    })
                }
                that.setState({
                    postFinal: that.state.post
                })
                console.log(that.state.post);
            }

        }), function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });


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

    cancelProfilePicture = () => {
        this.setState({
            newProfileImage:null
        })
    }
    saveProfilePicture = async() => {
        var uri = this.state.newProfileImage
        var that = this;
        var userId = f.auth().currentUser.uid;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];

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
        var filePath = userId + '.' + that.state.currentFileType;

        var uploadTask = storage.ref('users/profilePictures/' + userId).child(filePath).put(blob);

        uploadTask.on('state_changed', function (snapshot) {
            let progress = ((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(0);
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
                database.ref('users').child(userId).update({ dp: downloadURL });
                that.setState({
                    newProfileImage:null,
                    progress:0,
                    uploading:false,
                    profilePicture:downloadURL
                })
                // that.setDatabse(downloadURL);
                // console.log(downloadURL);
            },function(error){
                console.log(error)
            })
        })
        
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
        if (this.state.active == 1) {
            return this.state.postFinal.map((data, index) => {
                if (data.status == 0) {
                    return (
                        <TouchableScale>
                            <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                                <ImageBackground source={{ uri: data.image }} style={{ overflow: 'hidden', width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }}>
                                    <View style={{ overflow: 'hidden', alignSelf: 'center', rotation: -45, backgroundColor: 'red', marginVertical: '20%', width: '100%', height: 15, marginRight: '50%' }}>
                                        <Text style={{ textAlign: 'center', color: '#fff' }}>Active</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableScale>
                    )
                } else if (data.status == 1) {
                    return (
                        <TouchableScale>
                            <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                                <ImageBackground source={{ uri: data.image }} style={{ overflow: 'hidden', width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }}>
                                    <View style={{ overflow: 'hidden', alignSelf: 'center', rotation: -45, backgroundColor: '#4885ed', width: '100%', marginVertical: '20%', height: 15, marginRight: '50%' }}>
                                        <Text style={{ textAlign: 'center', color: '#fff' }}>Ongoing</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableScale>
                    )
                } else {
                    return (
                        <TouchableScale>
                            <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                                <ImageBackground source={{ uri: data.image }} style={{ overflow: 'hidden', width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }}>
                                    <View style={{ overflow: 'hidden', alignSelf: 'center', rotation: -45, backgroundColor: 'green', width: '100%', marginVertical: '20%', height: 15, marginRight: '50%' }}>
                                        <Text style={{ textAlign: 'center', color: '#fff' }}>Finished</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableScale>
                    )
                }

            });
        } else if (this.state.active == 2) {
            return this.state.data1.map((data, index) => {
                return (
                    <TouchableScale>
                        <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                            <Image source={{ uri: data.image }} style={{ width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }} />
                        </View>
                    </TouchableScale>
                )
            });
        } else if (this.state.active == 3) {
            return this.state.data3.map((data, index) => {
                return (
                    <TouchableScale>
                        <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                            <Image source={{ uri: data.image }} style={{ width: undefined, height: undefined, flex: 1, marginHorizontal: 1, marginVertical: 2 }} />
                        </View>
                    </TouchableScale>
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
                <Header title="Profile" height={50} drawer={() => this.props.navigation.openDrawer()} />
                <ScrollView style={{ marginBottom: 50 }} stickyHeaderIndices={[4]} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.state.coverPicture }} />
                        <TouchableScale style={styles.editCover} onPress={() => this.editCoverPicture()}>
                            <Ionicons name={'camera'} size={20} color={'#000'} />
                            <Text> EDIT</Text>
                        </TouchableScale >
                    </View>
                    {this.state.newProfileImage == null ? (
                        <Image style={styles.avatar} source={{ uri: this.state.profilePicture }} />
                    ) : (
                            <Image style={styles.avatar} source={{ uri: this.state.newProfileImage }} />
                        )}
                    {this.state.newProfileImage == null ? (
                        <TouchableScale style={styles.editProfilePic} onPress={() => this.editProfilePicture()}>
                            <Ionicons name={'camera'} size={15} color={'#000'} />
                        </TouchableScale>
                    ) : (
                            <View style={styles.editActionView}>                                
                                <TouchableScale style={styles.cancelProfilePicture} onPress={() => this.cancelProfilePicture()}>
                                    <Ionicons name={'times'} size={15} color={'#000'} />
                                </TouchableScale>
                                <TouchableScale style={styles.saveProfilePic} onPress={() => this.saveProfilePicture()}>
                                    <Ionicons name={'check'} size={15} color={'#000'} />
                                </TouchableScale>
                            </View>
                        )}



                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{this.state.name}</Text>
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
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <Image source={require('../../images/level10.png')} style={{ width: 120, height: 120 }} />
                            <Text style={{ fontSize: 15 }}>Animal Helper Level 10</Text>
                        </View>
                    ) : (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {this.renderSection()}
                            </View>
                        )}


                </ScrollView>
                {this.state.uploading == true ? (
                    <View style={styles.overlay}>
                        <ProgressBarAndroid
                            styleAttr="Large"
                            indeterminate={false}
                            style={{ height: 80, borderRadius: 50 }}
                            color="#fff"
                        />
                        <Text style={styles.progressState}>{this.state.progress}%</Text>   
                    </View>
                    
                ) : (
                        <View></View>
                    )}

            </View>


        )


    }

}

export default Profile;