import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, ImageBackground, Alert, Image, StatusBar } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { SocialIcon } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import styles from "./style";
import PreLoader from "../../components/PreLoader/PreLoader"
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { f, auth } from "../../config/firebaseConfig.js";
class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            size: { width, height },
            loggedin:"checking"
        };
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
        const defaults = {
            uid,
            token,
            dp,
            ageRange: [20, 30],
            ratings: 5,
            numOfChcances: 1
        };
        f.database()
            .ref("users")
            .child(uid)
            .update({ ...userData, ...defaults });
    };


    componentDidMount() {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.props.navigation.navigate('App')
            } else {
                that.setState({
                    loggedin: false
                })
            }
        });
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            // <PreLoader/>
            <View style={styles.scrollContainer}>
                <StatusBar backgroundColor="#192222" barStyle="default" />
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
                        <SocialIcon style={{ width: 200, alignSelf: 'center' }} title='Continue With Facebook' button type='facebook' />
                    </TouchableOpacity>
                </View>
            </View>


        )


    }

}

export default Auth;