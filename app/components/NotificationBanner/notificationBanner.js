import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";

export default class CardView extends Component {
  render() {
    if (this.props.read == 1) {
      return (
        <View style={styles.cardContainerRead}>
          <View style={styles.cardHedear}>
            <TouchableOpacity style={styles.profilePicArea}>
              <Image style={styles.userImage} source={this.props.image} />
            </TouchableOpacity>
            <View style={styles.userDetailArea}>
              <View style={styles.meaasageRow}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={styles.name}>{this.props.name}</Text>
                  <Text style={styles.time}>{this.props.posted}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.meaasageText}>{this.props.text}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.cardContainer}>
          <View style={styles.cardHedear}>
            <TouchableOpacity style={styles.profilePicArea}>
              <Image style={styles.userImage} source={this.props.image} />
            </TouchableOpacity>
            <View style={styles.userDetailArea}>
              <View style={styles.meaasageRow}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={styles.name}>{this.props.name}</Text>
                  <Text style={styles.time}>{this.props.posted}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.meaasageText}>{this.props.text}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }
}
