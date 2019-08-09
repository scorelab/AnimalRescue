import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import { BallIndicator } from "react-native-indicators";
import { COLOR_PRIMARY } from "../../config/styles";
export default class HomeTabBar extends Component {


    render() {
        return (
            <View style={styles.tabBarContainer}>
                {this.props.active == 0 ? (
                    <TouchableOpacity onPress={this.props.onPress0} style={styles.tabBarActive}>
                        <Text style={{ color: "#fff" }}>Active</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={this.props.onPress0} style={styles.tabBar}>
                            <Text style={{ color: "#a0a0a0" }}>Active</Text>
                        </TouchableOpacity>
                    )}


                {this.props.active == 1 ? (
                    <TouchableOpacity onPress={this.props.onPress1} style={styles.tabBarActive}>
                        <Text style={{ color: "#fff" }}>Pending</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={this.props.onPress1} style={styles.tabBar}>
                            <Text style={{ color: "#a0a0a0" }}>Pending</Text>
                        </TouchableOpacity>
                    )}

                {this.props.active == 2 ? (
                    <TouchableOpacity onPress={this.props.onPress2} style={styles.tabBarActive}>
                        <Text style={{ color: "#fff" }}>Finished</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={this.props.onPress2} style={styles.tabBar}>
                            <Text style={{ color: "#a0a0a0" }}>Finished</Text>
                        </TouchableOpacity>
                    )}
            </View>



        );
    }
}
