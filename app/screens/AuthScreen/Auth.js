import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, ImageBackground,ScrollView,Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { SocialIcon } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import styles from "./style";
import PreLoader from "../../components/PreLoader/PreLoader"
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
            // <PreLoader/>
            <View style={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("../../images/ara.png")} />
                    <Text style={styles.companyName}>Animal Rescue App</Text>
                    <Text style={styles.slogan}>All life is important, no matter how small.</Text>
                    <View style={styles.descriptionContent}>
                        <Text style={styles.description}>
                        A common sight on today’s streets is the number of abandoned animals languishing on the streets suffering with 
                        injuries and disease. Animal Rescue App Connect animal lovers, vets, and other NGOs in real time with the Animals That Actually Need the Help
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate('App')} style={[styles.buttonContainer]}>
                        <SocialIcon style={{ width: 200,alignSelf:'center' }} title='Continue With Facebook' button type='facebook' />
                    </TouchableOpacity>                   
                </View>
            </View>
       

        )


    }

}

export default Auth;