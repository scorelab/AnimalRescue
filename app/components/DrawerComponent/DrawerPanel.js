import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, } from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/FontAwesome";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLOR_PRIMARY } from "../../config/styles";

export default class DrawerPanel extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width:'100%', height:120}} source={require('../../images/dog.jpg')}/>                    
                <View style={styles.box}>
                    <Image style={styles.image} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>Wathsara Daluwatta</Text>
                    </View>
                </View>
                
                <ScrollView style={styles.body}>
                    <TouchableOpacity style={styles.card} onPress={() => this.editPro()}>
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
                    <TouchableOpacity style={styles.card}>
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