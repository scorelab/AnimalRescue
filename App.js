
import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, DrawerItem } from "react-navigation";
import { StyleSheet, SafeAreaView, View, Container, ScrollView } from 'react-native';
import Ionicons from "react-native-vector-icons/FontAwesome";
import Home from "./app/screens/HomeScreen/Home";
import Auth from "./app/screens/AuthScreen/Auth";
import Profile from "./app/screens/ProfileScreen/Profile";
import NewPost from "./app/screens/NewPostScreen/NewPost";
import Notification from "./app/screens/NotificationScreen/notificationScreen";
import Post from "./app/screens/PostScreen/Post";
import Comment from "./app/screens/CommentScreen/Comment";
import ContronPanel from "./app/components/DrawerComponent/DrawerPanel"
import { Badge } from 'react-native-elements';
import {f} from "./app/config/firebaseConfig";
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2
    }
  }

  click = () => {
    this.setState({
      count: 0
    })
  }
  componentDidMount() {

  }

  logout = () => {
    // alert("pressed")
    //this.props.navigation.navigate('Auth');
    f.auth().signOut();
  }
  render() {
    const AppStack = createMaterialTopTabNavigator(
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
          tabBarPosition: 'bottom',
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
          tabBarPosition: 'bottom',
          activeTintColor: "#83b4ff",
          inactiveTintColor: "white",
          showIcon: true,
          labelStyle: {
            fontSize: 9,
          },
          style: {
            backgroundColor: '#192f6a',
            color: '#fff',
            height: 55
          }
        },
      }
    );

    
   
    const CustumDrawerComponent = (props) => (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ContronPanel logout={() => this.logout()} />
      </SafeAreaView>
    )
    const AppDrawerNavigator = createDrawerNavigator({
      Dashboard: AppStack
    }, {
        contentComponent: CustumDrawerComponent
      }
    );

    const Stack = createStackNavigator(
      {
        Post: {
          screen: Post
        },

        Comment: {
          screen: Comment
        },
        App: AppDrawerNavigator
      }, {
        initialRouteName: "App",
        headerMode: "none"
      }
    )

    const SwitchNav = createSwitchNavigator({
      Auth: {
        screen: Auth
      },
      Dashboard: Stack
    })
    const AppContainer = createAppContainer(SwitchNav);

    return (
      <AppContainer />

    );
  }
}

