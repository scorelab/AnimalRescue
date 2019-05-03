
import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/FontAwesome";
import Home from "./app/screens/HomeScreen/Home";
import Auth from "./app/screens/AuthScreen/Auth";
import Profile from "./app/screens/ProfileScreen/Profile";
import NewPost from "./app/screens/NewPostScreen/NewPost";

console.disableYellowBox = true;
const AppStack = createBottomTabNavigator(
  {
    Home: { screen: Home },
    New : { screen: NewPost },
    Profile: {screen:Profile}   
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "NewPost") {
          iconName = "plus";
        }  else if (routeName === "Profile") {
          iconName = "user";
        }       
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "#00649d",
      inactiveTintColor: "white",
      style: {
        backgroundColor: '#192f6a',
      }
    },
  }  
);

const Stack = createStackNavigator(
  {
      Auth:{
          screen:Auth
      },        
      App:{
        screen:AppStack
      }        
  },{
      initialRouteName:"Auth",         
      headerMode:"none"
  }
)

const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {  
  render() {
    return (         
      <AppContainer/>
    );
  }
}

 