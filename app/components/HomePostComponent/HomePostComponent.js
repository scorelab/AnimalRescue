import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from 'react-native-elements';
import style from "./styles";
import { BallIndicator } from 'react-native-indicators';
import { COLOR_PRIMARY } from "../../config/styles";
export default class HomePostComponent extends Component {

  plural = (number) => {
    if(number > 1){
      return "s"
    }
  }

  render() {
    return (

      <View style={style.cardView}>
        <View style={style.cardTitleBar}>
          <TouchableOpacity style={style.userAvatarArea} onPress={this.props.profile}>
            <Image
              source={{uri : this.props.avatar}}
              style={style.userAvatarImage}
            />
          </TouchableOpacity>
          <View style={style.cardTitleArea}>
            <View style={style.nameLine}>
              <Text style={style.nameFont}>{this.props.name}</Text>
            </View>
            <View style={style.dateTimeLine}>
              <Text>{this.props.posted}</Text>
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
                borderBottomColor: { COLOR_PRIMARY },
                borderBottomWidth: 1
              }}
            />
          </TouchableOpacity>
          <View style={style.likeCommentDisplayArea}>
            {this.props.numberOfLikes >= 1 ? (
              <View style={style.row}>
                <Icon name="thumbs-up" size={14} color={COLOR_PRIMARY} />
                <Text style={style.fontColor}> {this.props.numberOfLikes}</Text>
              </View>
            ) : (
                <View style={style.row}>

                </View>
              )}

            {this.props.numberOfComments > 0 ? (
              <Text style={style.fontColor}>{this.props.numberOfComments} comment{this.plural(this.props.numberOfComments)}</Text>
            ) : (
                <Text style={style.fontColor}></Text>
              )}

          </View>
          <View
            style={{
              borderBottomColor: { COLOR_PRIMARY },
              borderBottomWidth: 0.5
            }}
          />

          <View style={style.row}>
            <View
              style={style.likeCommentArea}
            >

              {this.props.liked == false ? (
                <TouchableOpacity style={style.row} onPress={this.props.like}>
                  <Icon name="thumbs-up" size={18} />
                  <Text style={{ fontSize: 18 }}> Like</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity style={style.row} onPress={this.props.like}>
                    <Icon name="thumbs-up" size={18} color={COLOR_PRIMARY} />
                    <Text style={{ fontSize: 18, color: COLOR_PRIMARY }}> Like</Text>
                  </TouchableOpacity>
                )}


            </View>

            <View
              style={style.likeCommentArea}
            >
              <TouchableOpacity style={style.row} onPress={this.props.comment}>
                <Icon name="comment" size={18} />
                <Text style={{ fontSize: 18 }}> Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>

    );
  }
}
