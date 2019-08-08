import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, } from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/FontAwesome";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLOR_PRIMARY } from "../../config/styles";
import { f, auth, storage, database } from "../../config/firebaseConfig";
export default class DrawerPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            profilePicture: null,
            coverPicture: null         
        }        

    }
    componentDidMount() {      
        
        var that = this;
        let userId = f.auth().currentUser.uid;
        database.ref('users').child(userId).on('value', (function (snapshot) {            
            const exist = (snapshot.val() != null);
            var data = snapshot.val();
            if (exist) {
                that.setState({                    
                    profilePicture: data.dp,
                    coverPicture: data.cover,
                });
            }

        }), function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });


    }

   
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width:'100%', height:120}} source={{ uri: this.state.coverPicture }}/>                    
                <View style={styles.box}>
                    <Image style={styles.image} source={{ uri: this.state.profilePicture }} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{f.auth().currentUser.displayName}</Text>
                    </View>
                </View>
                
                <ScrollView style={styles.body}>
                    <TouchableOpacity style={styles.card}>
                        <Ionicons name={"edit"} size={30} color={"#192f6a"} style={{ marginLeft: 20 }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>Edit Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Ionicons name={"sign-out"} size={30} color={"#192f6a"} style={{ marginLeft: 20 }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Ionicons name={"sign-out"} size={30} color={"#192f6a"} style={{ marginLeft: 20 }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>Help Center</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={this.props.logout}>
                        <Ionicons name={"sign-out"} size={30} color={"#192f6a"} style={{ marginLeft: 20 }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>LogOut</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}