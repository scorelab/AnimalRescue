import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./style";
import Video from "react-native-video";

export default class CardView extends Component {
  constructor(props) {
    super(props);
    this.video = Video;

  }
  render() {
    if (this.props.read == 1) {
      return (
        <View style={styles.cardContainerRead}>
          <View style={styles.cardHedear}>
            <View style={styles.profilePicArea}>

              {/* <Video
                ref={(ref) => {
                  this.player = ref
                }}
                source={this.props.image}
                repeat={true}
                fullscreen={true}
                controls={false}
                resizeMode="cover"
                playWhenInactive={false}
                muted={true}
                paused={true}
                style={styles.userImage}

              /> */}
              <Image style={styles.userImage} source={this.props.image} />
            </View>
            <View style={styles.userDetailArea}>
              <View style={styles.meaasageRow}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                  {/* <Text style={styles.name}>{this.props.name}</Text> */}
                  <Text style={styles.time}>{this.props.posted}</Text>
                </View>
                <TouchableOpacity onPress={this.props.onPress}>
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
            <View style={styles.profilePicArea}>
              <Image style={styles.userImage} source={this.props.image} />
            </View>
            <View style={styles.userDetailArea}>
              <View style={styles.meaasageRow}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                  {/* <Text style={styles.name}>{this.props.name}</Text> */}
                  <Text style={styles.time}>{this.props.posted}</Text>
                </View>
                <TouchableOpacity onPress={this.props.onPress}>
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
