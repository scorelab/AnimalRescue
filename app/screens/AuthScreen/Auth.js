import React from "react";
import { Text, View, TouchableOpacity, Dimensions, Alert, Image, StatusBar, PermissionsAndroid } from "react-native";
import Carousel from "react-native-looped-carousel";
import { SocialIcon } from "react-native-elements";
const { width, height } = Dimensions.get("window");
import styles from "./style";
import PreLoader from "../../components/PreLoader/PreLoader"
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { f, auth, webClinetID } from "../../config/firebaseConfig.js";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin";
class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            size: { width, height },
            loggedin: "checking"
        };
    }

    requestLocationPermision = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    title: "Camera Permission",
                    message:
                        "Animal Rescue App needs access to your Location " +
                        "so you can find animals near you.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
    componentDidMount() {
        this.requestLocationPermision();
        GoogleSignin.configure({
            webClientId: webClinetID,
            offlineAccess: true
        });
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.props.navigation.navigate("App")
            } else {
                that.setState({
                    loggedin: false
                })
            }
        });
    }
    onPressLogin = async () => {
        LoginManager.logInWithReadPermissions([
            "public_profile",
            "user_birthday",
            "email",
            "user_photos"
        ]).then(result => this._handleCallBack(result), function (error) {
            alert("Login fail with error: " + error);
        });
    }
    _handleCallBack(result) {
        let _this = this;
        if (result.isCancelled) {
            alert("Login cancelled");
        } else {
            AccessToken.getCurrentAccessToken().then(data => {
                const token = data.accessToken;
                fetch(
                    "https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,gender,birthday&access_token=" +
                    token
                )
                    .then(response => response.json())
                    .then(json => {
                        const imageSize = 120;
                        const facebookID = json.id;
                        const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`;
                        this.authenticate(data.accessToken).then(function (result) {
                            const { uid } = result;
                            _this.createUser(uid, json, token, fbImage);
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
        }
    }

    authenticate = token => {
        const provider = f.auth.FacebookAuthProvider;
        const credential = provider.credential(token);
        let ret = f.auth().signInWithCredential(credential);
        return ret;
    };

    createUser = (uid, userData, token, dp) => {
        this.setState({
            loggedin: "checking"
        })
        const defaults = {
            uid,
            token,
            dp,
            cover: "https://firebasestorage.googleapis.com/v0/b/animal-res-app.appspot.com/o/Cover%2Fdog.jpg?alt=media&token=1ad5a80a-b436-4288-8f7c-a5b8c80edda0"

        };
        f.database()
            .ref("users")
            .child(uid)
            .update({ ...userData, ...defaults });

        this.props.navigation.navigate("App")

    };

    _signIn = async () => {
        var that = this;
        try {
            await GoogleSignin.hasPlayServices();
            GoogleSignin.signIn()
                .then(data => {
                    const credential = f.auth.GoogleAuthProvider.credential(
                        data.idToken,
                        data.accessToken
                    );
                    console.log(data)
                    f.auth()
                        .signInWithCredential(credential)
                        .then(user => {
                            const newUser = {
                                first_name: user.displayName,
                                last_name: "",
                                uid: user.uid
                            };

                            that.createGoogleUser(user.uid, newUser, user.photoURL);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    };

    createGoogleUser = (uid, userData, dp) => {
        const defaults = {
            uid,
            dp,
            ageRange: [20, 30],
            ratings: 5,
            numOfChcances: 1,
            cover: "https://firebasestorage.googleapis.com/v0/b/animal-res-app.appspot.com/o/Cover%2Fdog.jpg?alt=media&token=1ad5a80a-b436-4288-8f7c-a5b8c80edda0"
        };
        f.database()
            .ref("users")
            .child(uid)
            .update({ ...userData, ...defaults });

        this.props.navigation.navigate("App");
    };

    render() {        
        if (this.state.loggedin == "checking") {
            return (
                <PreLoader />
            )
        } else if (this.state.loggedin == false) {
            return (
                // <PreLoader/>
                <View style={styles.scrollContainer}>
                    <StatusBar backgroundColor="#00063f" barStyle="light-content" />
                    <View style={styles.container}>
                        <Image style={styles.logo} source={require("../../images/ara.png")} />
                        <Text style={styles.companyName}>Animal Rescue App</Text>
                        <Text style={styles.slogan}>All life is important, no matter how small.</Text>
                        <View style={styles.descriptionContent}>
                            <Text style={styles.description}>
                                A common sight on today’s streets is the number of abandoned animals languishing on the streets suffering with
                                injuries and disease. Animal Rescue App Connect animal lovers, vets, and other NGOs in real time with the Animals That Actually Need the Help
                        </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onPressLogin()} style={[styles.buttonContainer]}>
                            <SocialIcon style={{ width: 200, alignSelf: "center" }} title="Continue With Facebook" button type="facebook" />
                        </TouchableOpacity>
                        <GoogleSigninButton
                            style={{ width: 200, height: 48, borderRadius: 50 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                            disabled={this.state.isSigninInProgress} />
                    </View>
                </View>


            )
        }

    }

}

export default Auth;