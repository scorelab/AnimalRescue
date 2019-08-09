import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    navigationBar: {
        backgroundColor: COLOR_PRIMARY,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        top: 0,
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
        justifyContent: "center",
        alignItems: "center",
        width: "40%"
    },
    goBackArea: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: 15,
        width: "30%"
    },

    //Text

    titleFont: {
        fontSize: 18,
        color: "white"
    }



});