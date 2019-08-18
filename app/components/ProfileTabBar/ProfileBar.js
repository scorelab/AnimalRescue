import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/FontAwesome";
import styles from "./style";
import { BallIndicator } from "react-native-indicators";
import { COLOR_PRIMARY } from "../../config/styles";
export default class ProfileBar extends Component {


    render() {
        return (
            <View style={styles.tabBarContainer}>
                {/* {this.props.active == 0 ? (
                    <TouchableOpacity onPress={this.props.onPress0} style={styles.tabBarActive}>
                        <Ionicons name={"camera"} size={15} color={"#fff"} />
                        <Text style={{ color: "#fff" }}>Badges</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={this.props.onPress0} style={styles.tabBar}>
                            <Ionicons name={"camera"} size={15} color={"#a0a0a0"} />
                            <Text style={{ color: "#a0a0a0" }}>Badges</Text>
                        </TouchableOpacity>
                    )} */}


                {this.props.active == 1 ? (
                    <TouchableOpacity onPress={this.props.onPress1} style={styles.tabBarActive}>
                        {/* <Ionicons name={"camera"} size={15} color={"#fff"} /> */}
                        <Text style={{ color: "#fff" }}>Posts</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={this.props.onPress1} style={styles.tabBar}>
                            {/* <Ionicons name={"camera"} size={15} color={"#a0a0a0"} /> */}
                            <Text style={{ color: "#a0a0a0" }}>Posts</Text>
                        </TouchableOpacity>
                    )}

                {this.props.active == 2 ? (
                    <TouchableOpacity onPress={this.props.onPress2} style={styles.tabBarActive}>
                        {/* <Ionicons name={"photo"} size={15} color={"#fff"} /> */}
                        <Text style={{ color: "#fff" }}>Pending</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={this.props.onPress2} style={styles.tabBar}>
                            {/* <Ionicons name={"photo"} size={15} color={"#a0a0a0"} /> */}
                            <Text style={{ color: "#a0a0a0" }}>Pending</Text>
                        </TouchableOpacity>
                    )}

                {this.props.active == 3 ? (
                    <TouchableOpacity onPress={this.props.onPress3} style={styles.tabBarActive}>
                        {/* <Ionicons name={"home"} size={15} color={"#fff"} /> */}
                        <Text style={{ color: "#fff" }}>Finished</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={this.props.onPress3} style={styles.tabBar}>
                            {/* <Ionicons name={"home"} size={15} color={"#a0a0a0"} /> */}
                            <Text style={{ color: "#a0a0a0" }}>Finished</Text>
                        </TouchableOpacity>
                    )}

            </View>


        );
    }
}
