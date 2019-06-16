import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/FontAwesome";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLOR_PRIMARY } from "../../config/styles";
import ControlPanel from "../DrawerComponent/DrawerPanel"
import BottomSheet from "../BottomSheetComponent/BottomSheet"

export default class HeaderNavigationBar extends Component {
    editPro = () => {
        this.RBSheet.close();
        alert("Now Navigate");
    }
    render() {
        return (
            <View style={[styles.navigationBar, { height: this.props.height }]}>
                <View style={styles.goBackArea}>
                    <TouchableOpacity
                        onPress={this.props.drawer}                    
                    >
                        <Ionicons name={"bars"} size={25} color={"white"} />
                    </TouchableOpacity>

                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.titleFont}>{this.props.title}</Text>
                </View>
                <View style={styles.goBottomkArea}>
                    {this.props.sort == true ? (
                        <TouchableOpacity                            
                            onPress={() => {
                                this.RBSheet.open();
                            }}
                        >
                            <Ionicons name={"sort"} size={25} color={"white"} />
                        </TouchableOpacity>
                    ) : (
                            <Text style={styles.titleFont}>{this.props.end}</Text>
                        )}

                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    animationType="slide"
                    closeOnSwipeDown={true}
                    height={150}
                    duration={250}
                    customStyles={{
                        container: {
                            // justifyContent: "center",
                            alignItems: "center",
                            width: '100%',
                            backgroundColor: "#000",
                        }
                    }}
                >
                    <BottomSheet />
                </RBSheet>
            </View >
        );
    }
}