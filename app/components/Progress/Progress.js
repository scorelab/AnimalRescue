import React, { Component } from "react";
import { Text, View, Image, ProgressBarAndroid } from "react-native";
import styles from "./styles";
import * as Progress from 'react-native-progress';
import { COLOR_PRIMARY } from "../../config/styles";
export default class Pregress extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require("../../images/ara.png")} style={styles.image} />
                <Text style={styles.companyName}>Animal Rescue App</Text>
                <Text style={styles.slogan}>All life is important, no matter how small.</Text>                
                <ProgressBarAndroid
                    styleAttr="Large"
                    indeterminate={false}                    
                    style={{height:80 , borderRadius:50}}
                    color="#fff"
                /> 
                <Text style={styles.companyName}>{this.props.percentage}%</Text>               
            </View>
        );
    }
}