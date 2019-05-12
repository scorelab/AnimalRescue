
import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer,createMaterialTopTabNavigator  } from "react-navigation";
import { StyleSheet, TouchableOpacity, View, Container } from 'react-native';
import Ionicons from "react-native-vector-icons/FontAwesome";
import Home from "./app/screens/HomeScreen/Home";
import Auth from "./app/screens/AuthScreen/Auth";
import Profile from "./app/screens/ProfileScreen/Profile";
import NewPost from "./app/screens/NewPostScreen/NewPost";
import Notification from "./app/screens/NotificationScreen/notificationScreen";
import Post from "./app/screens/PostScreen/Post";
import Comment from "./app/screens/CommentScreen/Comment";
import { Badge } from 'react-native-elements';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count:2
    }
  }  

  click = () =>{
    this.setState({
      count:0
    })
  }
  componentDidMount(){
    
  }
  render() {
    const AppStack = createMaterialTopTabNavigator (
      {
        Home: { screen: Home },
        New: { screen: NewPost },
        Profile: { screen: Profile },
        Notification: {
          screen: Notification,
          navigationOptions: {
            tabBarLabel: "Notifications",                        
            tabBarIcon: ({ tintColor }) => (
              <View>
                {this.state.count > 0 ? (
                  <View>
                    <Ionicons name="bell" size={20} color={tintColor} />
                    <Badge status="error" value={this.state.count} containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
                  </View>
                ) : (
                    <View>
                      <Ionicons name="bell" size={20} color={tintColor} />
                    </View>
                  )}
              </View>
    
            )
          },
        }
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarPosition :'bottom',
          tabBarIcon: ({ focused, tintColor }) => {    
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === "Home") {
              iconName = "home";              
            } else if (routeName === "New") {
              iconName = "plus-square";
            } else if (routeName === "Profile") {
              iconName = "user";
            }
            return <Ionicons name={iconName} size={20} color={tintColor} />;
          }
        }),
        tabBarOptions: {
          tabBarPosition:'bottom',
          activeTintColor: "#4885ed",
          inactiveTintColor: "white",
          showIcon :true,
          labelStyle: {
            fontSize: 9,            
          },
          style: {
            backgroundColor: '#192f6a',
            color:'#fff',
            height:55
          }
        },
      }
    );
    
    const Stack = createStackNavigator(
      {
        Auth: {
          screen: Auth
        },
        Post: {
          screen: Post
        },
        Comment: {
          screen: Comment
        },
        App: {
          screen: AppStack,
          navigationOptions: {
            gesturesEnabled: true,
          },
        }
      }, {
        initialRouteName: "Auth",
        headerMode: "none"
      }
    )
    
    const AppContainer = createAppContainer(Stack);
    
    return (

      <AppContainer/>
    );
  }
}

