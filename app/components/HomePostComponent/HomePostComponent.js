import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from 'react-native-elements';
import style from "./styles";
import { BallIndicator } from 'react-native-indicators';
import { COLOR_PRIMARY } from "../../config/styles";
import TouchableScale from "react-native-touchable-scale";
import Video from 'react-native-video';
export default class HomePostComponent extends Component {
  constructor(props) {
    super(props);
    this.video = Video;

  }
  plural = (number) => {
    if (number > 1) {
      return "s"
    }
  }

  render() {
    return (

      <View key={this.props.keyNo} style={style.cardView}>
        <View style={style.cardTitleBar}>
          <TouchableOpacity style={style.userAvatarArea} onPress={this.props.profile}>
            <Image
              source={{ uri: this.props.avatar }}
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
          <TouchableScale style={style.cardViewBody} onPress={this.props.press}>
            <Text style={style.postContentFont} numberOfLines={3} ellipsizeMode={'tail'}>
              {this.props.description}
            </Text>
            <View style={style.postImageArea}>
              {this.props.type == 0 ? (
                <Image
                  source={{ uri: this.props.image }}
                  style={style.postImage}
                  PlaceholderContent={<BallIndicator color={COLOR_PRIMARY} />}
                />
              ) : (

                  <Video
                    ref={(ref) => {
                      this.player = ref
                    }}
                    source={{ uri: this.props.image }}
                    repeat={true}
                    fullscreen={true}
                    controls={false}
                    playWhenInactive={true}
                    style={style.postVideo}

                  />
                )}

            </View>
            <View
              style={{
                borderBottomColor: { COLOR_PRIMARY },
                borderBottomWidth: 1
              }}
            />
          </TouchableScale>
          <View style={style.likeCommentDisplayArea}>
            {this.props.numberOfLikes >= 1 ? (
              <View style={style.row}>
                <Icon name="heart" size={14} color={'#a83f39'} />
                <Text style={style.fontColorLove}> {this.props.numberOfLikes}</Text>
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
                  <Icon name="heart" size={18} />
                  <Text style={{ fontSize: 18 }}> Like</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity style={style.row} onPress={this.props.like}>
                    <Icon name="heart" size={18} color={'#a83f39'} />
                    <Text style={{ fontSize: 18, color: '#a83f39' }}> Love</Text>
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
