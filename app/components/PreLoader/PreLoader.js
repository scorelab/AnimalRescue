import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import { WaveIndicator } from "react-native-indicators";
export default class PreLoader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require("../../images/ara.png")} style={styles.image} />
                <Text style={styles.companyName}>Animal Rescue App</Text>
                <Text style={styles.slogan}>All life is important, no matter how small.</Text>
                <WaveIndicator size={100} color={"#fff"} />
            </View>
        );
    }
}