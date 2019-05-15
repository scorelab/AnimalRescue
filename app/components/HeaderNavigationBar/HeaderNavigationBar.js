import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/FontAwesome";
import RBSheet from "react-native-raw-bottom-sheet";

export default class HeaderNavigationBar extends Component {
    render() {
        return (
            <View style={styles.navigationBar}>
                <View style={styles.goBackArea}>
                    <Text style={styles.titleFont}>{this.props.end}</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.titleFont}>{this.props.title}</Text>
                </View>
                <View style={styles.goBackArea}>
                    <TouchableOpacity onPress={() => {
                        this.RBSheet.open();
                    }}>
                        <Ionicons name={"list-alt"} size={25} color={"white"} />
                    </TouchableOpacity>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    animationType="slide"
                    closeOnSwipeDown={true}
                    height={300}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center",
                            width:'100%'
                        }
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.headerContent}>
                                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />
                                <Text style={styles.name}>John Doe</Text>
                            </View>
                        </View>

                        <View style={styles.body}>
                            
                        </View>
                    </View>
                </RBSheet>
            </View >
        );
    }
}