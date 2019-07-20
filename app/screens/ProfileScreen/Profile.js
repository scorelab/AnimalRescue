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
import Video from 'react-native-video';
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
            pending: [],
            pendingFinal: [],
            finish: [],
            finishedFinal: [],
            uploading: false,
            progress: 0,
        }
        this.video = Video;

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
                var finishedData = data.finished
                var handleData = data.handle

                var postArray = that.state.post
                var handleFinal = that.state.pending
                var finishedFinal = that.state.finish

                for (var posts in postData) {
                    let postOBJ = postData[posts]
                    postArray.push({
                        image: postOBJ.image,
                        status: postOBJ.status,
                        posted: postOBJ.posted,
                        id: postOBJ.id,
                        type: postOBJ.type
                    })
                }

                for (var handles in handleData) {
                    let handleOBJ = handleData[handles]
                    handleFinal.push({
                        image: handleOBJ.image,
                        posted: handleOBJ.posted,
                        id: handleOBJ.id,
                        type: handleOBJ.type
                    })
                }

                for (var finish in finishedData) {
                    let postOBJ = finishedData[finish]
                    finishedFinal.push({
                        image: postOBJ.image,
                        posted: postOBJ.posted,
                        id: postOBJ.id,
                    })
                }
                that.setState({
                    postFinal: that.state.post,
                    finishedFinal: that.state.finish,
                    pendingFinal: that.state.pending
                })
                // console.log(that.state.post);
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
            newProfileImage: null
        })
    }
    saveProfilePicture = async () => {
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
                database.ref('users').child(userId).update({ dp: downloadURL });
                that.setState({
                    newProfileImage: null,
                    progress: 0,
                    uploading: false,
                    profilePicture: downloadURL
                })
            }, function (error) {
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

    saveCoverPicture = async () => {
        var uri = this.state.newCoverPhoto
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

        var uploadTask = storage.ref('users/coverPictures/' + userId).child(filePath).put(blob);

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
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                database.ref('users').child(userId).update({ cover: downloadURL });
                that.setState({
                    newCoverPhoto: null,
                    progress: 0,
                    uploading: false,
                    coverPicture: downloadURL
                })
            }, function (error) {
                console.log(error)
            })
        })

    }


    renderSection = () => {
        if (this.state.active == 1) {
            this.state.postFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
            this.state.postFinal.reverse();

            this.state.pendingFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
            this.state.pendingFinal.reverse();

            this.state.finishedFinal.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
            this.state.finishedFinal.reverse();

            return this.state.postFinal.map((data, index) => {
                if (data.status <= 2) {
                    return (
                        <TouchableScale onPress={() => this.props.navigation.navigate('Post', { id: data.id })}>
                            <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { backgroundColor: COLOR_GRAY }]}>
                                {data.type == 0 ? (
                                    <ImageBackground source={{ uri: data.image }} style={styles.imageSquare}>
                                        {/* <View style={[styles.imageLabel, { backgroundColor: 'red' }]}>
                                            <Text style={styles.imageLabelText}>Active</Text>
                                        </View> */}
                                    </ImageBackground>
                                ) : (
                                        <Video
                                            ref={(ref) => {
                                                this.player = ref
                                            }}
                                            source={{ uri: data.image }}
                                            volume={10}
                                            repeat={true}
                                            resizeMode="cover"
                                            // fullscreen={true}                                   
                                            controls={false}
                                            style={styles.imageSquare}
                                        />

                                    )}

                            </View>
                        </TouchableScale>
                    )
                } else if (data.status == 1) {
                    return (
                        <TouchableScale onPress={() => this.props.navigation.navigate('Post', { id: data.id })}>
                            <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                                <ImageBackground source={{ uri: data.image }} style={styles.imageSquare}>
                                    {/* <View style={[styles.imageLabel, { backgroundColor: '#4885ed' }]}>
                                        <Text style={styles.imageLabelText}>Ongoing</Text>
                                    </View> */}
                                </ImageBackground>
                            </View>
                        </TouchableScale>
                    )
                } else {
                    return (
                        <TouchableScale onPress={() => this.props.navigation.navigate('Post', { id: data.id })}>
                            <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                                <ImageBackground source={{ uri: data.image }} style={styles.imageSquare}>
                                    {/* <View style={[styles.imageLabel, { backgroundColor: 'green' }]}>
                                        <Text style={styles.imageLabelText}>Finished</Text>
                                    </View> */}
                                </ImageBackground>
                            </View>
                        </TouchableScale>
                    )
                }

            });
        } else if (this.state.active == 2) {
            return this.state.pendingFinal.map((data, index) => {
                return (
                    <TouchableScale>
                        <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                            {data.type == 0 ? (
                                <Image source={{ uri: data.image }} style={styles.imageSquare} />
                            ) : (
                                    <Video
                                        ref={(ref) => {
                                            this.player = ref
                                        }}
                                        source={{ uri: data.image }}
                                        volume={10}
                                        repeat={true}
                                        resizeMode="cover"
                                        // fullscreen={true}                                   
                                        controls={false}
                                        style={styles.imageSquare}
                                    />

                                )}

                        </View>
                    </TouchableScale>
                )
            });
        } else if (this.state.active == 3) {
            return this.state.finishedFinal.map((data, index) => {
                return (
                    <TouchableScale onPress={() => this.props.navigation.navigate('Post', { id: data.id })}>
                        <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                            <Image source={{ uri: data.image }} style={styles.imageSquare} />
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
                    {this.state.newCoverPhoto == null ? (
                        <View style={styles.header}>
                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.state.coverPicture }} />
                            <TouchableScale style={styles.editCover} onPress={() => this.editCoverPicture()}>
                                <Ionicons name={'camera'} size={20} color={'#000'} />
                                <Text> EDIT</Text>
                            </TouchableScale >
                        </View>
                    ) : (
                            <View style={styles.header}>
                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.state.newCoverPhoto }} />
                                <TouchableScale style={styles.editCover} onPress={() => this.saveCoverPicture()}>
                                    <Ionicons name={'check'} size={20} color={'#000'} />
                                    <Text> Save</Text>
                                </TouchableScale >
                                <TouchableScale style={styles.cancleCover} onPress={() => this.setState({ newCoverPhoto: null })}>
                                    <Ionicons name={'times'} size={20} color={'#000'} />
                                    <Text> Cancel</Text>
                                </TouchableScale >
                            </View>
                        )}

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
                            <View style={styles.photoArea}>
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