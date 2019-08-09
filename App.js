import React , {Component } from 'react';
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
import { f, database } from "./app/config/firebaseConfig";
console.disableYellowBox = true;

class Noti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            countFinal: 0,
        }
    }

    componentDidMount() {
        var that = this
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userId = f.auth().currentUser.uid;
                database.ref('notifications').child(userId).on('value', (function (snapshot) {
                    const exsists = (snapshot.val() != null);
                    if (exsists) {
                        var data = snapshot.val();
                        likes = data.likes;
                        comments = data.comments;
                        handles = data.handle;
                        finishes = data.finish;
                        var count = that.state.count
                        for (var like in likes) {
                            if (likes[like].status == 0) {
                                count = count + 1;
                            }
                        }
                        for (var comment in comments) {
                            if (comments[comment].status == 0) {
                                count = count + 1;
                            }

                        }

                        for (var handle in handles) {
                            if (handles[handle].status == 0) {
                                count = count + 1;
                            }

                        }
                        for (var finish in finishes) {
                            if (finishes[finish].status == 0) {
                                count = count + 1;
                            }

                        }

                    }
                    that.setState({
                        countFinal: 0,
                        countFinal: count,
                        count: 0
                    })


                }), function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            } else {
                that.setState({
                    loggedin: false
                })
            }
        });
    }
    render() {
        return (
            <View>
                {this.state.countFinal > 0 ? (
                    <View>
                        <Ionicons name="bell" size={20} color={this.props.color} />
                        <Badge status="error" value={this.state.countFinal} containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
                    </View>
                ) : (
                        <View>
                            <Ionicons name="bell" size={20} color={this.props.color} />
                        </View>
                    )}
            </View>
        );
    }
}
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            countFinal: 0,
        }
    }

    click = () => {
        this.setState({
            count: 0
        })
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
                        tabBarIcon: ({ tintColor,focused  }) => (
                            <Noti color={tintColor} />

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
                    backBehavior: 'none', 
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
                <ContronPanel />
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