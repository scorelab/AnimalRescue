import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    stepContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    nextBtn: {
        backgroundColor: '#192f6a',
        borderRadius: 13,
        width: "80%",
        marginHorizontal:10,
        padding:10,
        alignSelf:'center'
    },
    preBtn: {
        backgroundColor: '#192f6a',
        borderRadius: 13,
        width: "80%",
        padding:10,
        marginHorizontal:10,
        alignSelf:'center'
    },
    nextBtnText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    preBtnText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_GRAY,
        borderWidth: 0.8,
        borderStyle: 'dashed',
        width: '90%',
        minHeight: deviceHeight * 0.45

    },
    textStyle: {
        color: '#006381',
        marginTop: 20,
        fontSize: 20,

    },

    descriptiontStyle: {
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        textAlignVertical: 'top',
        textAlign: 'left',
        fontSize: 14,
        marginHorizontal: 12,
        marginVertical: 10,
        padding: 5,
        height: deviceHeight * 0.35
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_GRAY,
        borderWidth: 0.8,
        borderStyle: 'dashed',
        width: '90%',
        minHeight: deviceHeight * 0.47,

    },
    rightIconContainer: {
        marginLeft: 10,
        marginTop: 5,
        borderRadius: 5
    },
    titleArea: {
        width: deviceWidth * 0.5,
        alignItems: "center"
    },

    //Text

    titleFont: {
        fontSize: 18,
        color: "white"
    }



});