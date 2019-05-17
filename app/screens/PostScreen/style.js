import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_LIGHT } from "../../config/styles";


export default StyleSheet.create({
    container: {
        flex: 1,

    },
    scroll: {
        marginBottom: 0
    },
    Img: {
        width: "100%",
        height: 200,
    },
    topView: {
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    informationArea: {
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 30,
        justifyContent: 'center'
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8,
        borderStyle: 'dashed',
        width: '100%',
        minHeight: 200,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: 'bold'
    },
    price: {
        marginTop: 10,
        fontSize: 18,
        color: "green",
        fontWeight: 'bold'
    },
    description: {
        textAlign: 'center',
        marginTop: 10,
        color: "#696969",
    },
    star: {
        width: 40,
        height: 40,
    },
    btnColor: {
        height: 30,
        width: 30,
        borderRadius: 30,
        marginHorizontal: 3
    },
    btnSize: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: '#778899',
        borderWidth: 1,
        marginHorizontal: 3,
        backgroundColor: 'white',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starContainer: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    contentColors: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    contentSize: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30
    },
    shareButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    shareButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    addToCarContainer: {
        marginHorizontal: 30
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#192f6a",
    },
    profile: {
        flexDirection: 'row',
        marginTop: 15,        
        alignItems:'center',
        justifyContent:'center'
    },
    profileName: {
        fontSize: 18,
        color: "#696969",
        fontWeight: '600',
        alignSelf: 'center',
        marginLeft: 10
    },
    image: {
        height: 250,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    
});