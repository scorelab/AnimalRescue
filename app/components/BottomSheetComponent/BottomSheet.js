import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, } from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLOR_PRIMARY } from "../../config/styles";

export default class BottomShet extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.card} onPress={this.props.time}>
                    <Ionicons name={"av-timer"} size={30} color={"#192f6a"} style={{ marginLeft: 20 }} />
                    <View style={styles.cardContent}>
                        <Text style={styles.name}>Sort By Time</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={this.props.distance}>
                    <Ionicons name={"map-marker-distance"} size={30} color={"#192f6a"} style={{ marginLeft: 20 }} />
                    <View style={styles.cardContent}>
                        <Text style={styles.name}>Sort By Distance</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}