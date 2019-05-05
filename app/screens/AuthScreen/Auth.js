import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { SocialIcon } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            size: { width, height },
        };
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }


    componentDidMount() {

    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1,flexDirection:'column',backgroundColor:'#192f6a'  }} onLayout={this._onLayoutDidChange}>                
                <Carousel
                    delay={5000}
                    style={{ flex: 0.6, width: '100%' }}
                    autoplay
                    pageInfo
                    onAnimateNextPage={(p) => console.log(p)}
                >
                    <View style={{ flex: 1, width: '100%' }}>
                        <ImageBackground source={require("../../images/cat.jpg")} style={{ width: '100%', height: '100%' }}>

                        </ImageBackground>

                    </View>
                    <View style={{ flex: 1, width: '100%' }}>
                        <ImageBackground source={require("../../images/dog.jpg")} style={{ width: '100%', height: '100%' }}>

                        </ImageBackground>

                    </View>
                    <View style={{ flex: 1, width: '100%' }}>
                        <ImageBackground source={require("../../images/hen.jpg")} style={{ width: '100%', height: '100%' }}>

                        </ImageBackground>
                    </View>
                </Carousel>
                <View style={{alignSelf: 'center', alignItems: 'center', position: 'absolute', bottom:10}}>
                    <TouchableOpacity onPress={() => navigate('App')} style={{alignSelf: 'center', alignItems: 'center'}}>
                        <SocialIcon style={{ width: 200,alignSelf:'center' }} title='Sign Up With Facebook' button type='facebook' />
                    </TouchableOpacity>
                </View>
            </View>

        )


    }

}

export default Auth;