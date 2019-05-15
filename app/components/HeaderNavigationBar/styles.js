import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    navigationBar: {
        backgroundColor: COLOR_PRIMARY,
        height: 55,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    leftIconContainer: {
        marginLeft: 10,
        marginTop: 5,
        borderRadius: 5
    },
    rightIconContainer: {
        marginLeft: 10,
        marginTop: 5,
        borderRadius: 5
    },
    titleArea: {
        justifyContent: 'center',
        alignItems: "center",
        width: '40%'
    },
    goBackArea: {
        // alignSelf:'flex-end',
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        marginRight: 15,
        width: '27%'
    },
    container:{
        width:'100%',
        overflow:'scroll'
    },
    header: {
        backgroundColor: "#20B2AA",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        padding: 30,
        backgroundColor: "#E6E6FA",
    },
    //Text

    titleFont: {
        fontSize: 22,
        color: "white"
    },
    username: {
        color: "#20B2AA",
        fontSize: 22,
        alignSelf: 'center',
        marginLeft: 10
    }



});