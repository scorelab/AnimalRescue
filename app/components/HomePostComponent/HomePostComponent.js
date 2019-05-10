import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from 'react-native-elements';
import style from "./styles";
import { BallIndicator } from 'react-native-indicators';
import { COLOR_PRIMARY } from "../../config/styles";
export default class HomePostComponent extends Component {
  render() {
    return (

      <View style={style.cardView}>
        <View style={style.cardTitleBar}>
          <View style={style.userAvatarArea}>
            <Image
              source={require("../../images/user_image_1.jpg")}
              style={style.userAvatarImage}
            />
          </View>
          <View style={style.cardTitleArea}>
            <View style={style.nameLine}>
              <Text style={style.nameFont}>John Doe</Text>
            </View>
            <View style={style.dateTimeLine}>
              <Text>8:00 AM | 01 Jun 2018</Text>
            </View>
          </View>
        </View>

        <View style={style.cardViewBody}>
          <TouchableOpacity style={style.cardViewBody} onPress={this.props.press}>
            <Text style={style.postContentFont} numberOfLines={3} ellipsizeMode={'tail'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
          </Text>
            <View style={style.postImageArea}>
              <Image
                source={require("../../images/dog.jpg")}
                style={style.postImage}
                PlaceholderContent={<BallIndicator color='#192f6a' />}
              />
            </View>
            <View
              style={{
                borderBottomColor: {COLOR_PRIMARY},
                borderBottomWidth: 1
              }}
            />
          </TouchableOpacity>
          <View style={style.likeCommentDisplayArea}>
            <View style={style.row}>
              <Icon name="thumbs-up" size={14} color={COLOR_PRIMARY} />
              <Text style={style.fontColor}> 150</Text>
            </View>
            <Text style={style.fontColor}>10 comments</Text>
          </View>
          <View
            style={{
              borderBottomColor: {COLOR_PRIMARY},
              borderBottomWidth: 0.5
            }}
          />

          <View style={style.row}>
            <View
              style={style.likeCommentArea}
            >
              <TouchableOpacity>
                <Icon name="thumbs-up" size={25} color={COLOR_PRIMARY}/>
              </TouchableOpacity>
            </View>

            <View
              style={style.likeCommentArea}
            >
              <TouchableOpacity>
                <Icon name="comment" size={25} color={COLOR_PRIMARY} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>

    );
  }
}
