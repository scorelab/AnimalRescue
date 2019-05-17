import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button,
    BackHandler
} from 'react-native';
import ModalHeader from "../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar";
import styles from "./style";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';
export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            region: null,
            showNavTitle: false
        }
    }
    componentDidMount = async () => {

        this.watchID = navigator.geolocation.getCurrentPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function           
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.setState({
                region: region,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })

        }, (error) => console.log(error));
    }


    clickEventListener() {
        // Alert.alert("Success", "Product has beed added to cart")
        const { navigate } = this.props.navigation;
        navigate('Comment')
    }

    navBar = () => {
        this.navTitleView.fadeInUp(200)
        this.setState({
            showNavTitle:true
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderImageScrollView
                    maxHeight={200}
                    minHeight={50}
                    headerImage={require("../../images/dog.jpg")}
                    fadeOutForeground
                    style={{marginBottom:5}}
                    // renderHeader={() => <Image source={require("../../images/dog.jpg")} style={styles.image} />}
                    // renderForeground={() => (
                    //     <View style={styles.titleContainer}>
                    //         <Text style={styles.imageTitle}>Dog</Text>
                    //     </View>
                    // )}

                    renderFixedForeground={() => (
                        <Animatable.View
                            style={{ height: 'auto', width: "100%" }}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}
                        >
                            {this.state.showNavTitle == true ? (
                                <ModalHeader title="Post" onPress={() => this.props.navigation.goBack()} />
                            ) : (
                                    <TouchableOpacity>

                                    </TouchableOpacity>
                                )}

                        </Animatable.View>
                    )}
                >

                    <TriggeringView
                        onHide={() => this.navBar()}
                        onDisplay={() => this.navTitleView.fadeOut(200)}
                    >
                    </TriggeringView>
                    <View style={styles.topView}>
                        <View style={styles.informationArea}>
                            <Text style={styles.name}>Dog</Text>
                            <Text style={styles.description}>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                natoque penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Donec quam felis, ultricies nec
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                natoque penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Donec quam felis, ultricies nec
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                natoque penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Donec quam felis, ultricies nec
                                </Text>
                        </View>
                    </View>

                    <View style={styles.topView}>
                        <MapView
                            style={styles.mapContainer}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={this.state.region}
                            showsUserLocation={true}
                            loadingEnabled={true}
                            zoomControlEnabled={true}
                            showsMyLocationButton={true}
                        >
                            {this.state.latitude != null && this.state.latitude != null ? (
                                <Marker
                                    coordinate={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude,
                                        latitudeDelta: 0.00922 * 1.5,
                                        longitudeDelta: 0.00421 * 1.5,
                                    }}
                                    title={"Here is the Animal"}

                                />

                            ) : (
                                    <View></View>
                                )}

                        </MapView>

                    </View>

                    <View style={styles.starContainer}>
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                    </View>
                    <View style={styles.contentColors}>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#00BFFF" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#FF1493" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#00CED1" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#228B22" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#20B2AA" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#FF4500" }]}></TouchableOpacity>
                    </View>
                    <View style={styles.contentSize}>
                        <TouchableOpacity style={styles.btnSize}><Text>S</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSize}><Text>M</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSize}><Text>L</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSize}><Text>XL</Text></TouchableOpacity>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.addToCarContainer}>
                        <TouchableOpacity style={styles.shareButton} onPress={() => this.clickEventListener()}>
                            <Text style={styles.shareButtonText}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>

                </HeaderImageScrollView>
                {/* <ModalHeader title="Post" onPress={() => this.props.navigation.goBack()} />
                <ScrollView style={styles.scroll}>
                    
                </ScrollView> */}
            </View>
        );
    }
}