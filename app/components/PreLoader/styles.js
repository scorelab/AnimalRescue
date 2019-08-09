import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#192f6a",
        justifyContent: "center",
        alignItems: "center"
    },
    companyName: {
        fontSize: 32,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    slogan: {
        fontSize: 18,
        fontWeight: "600",
        color: "#228B22",
        marginTop: 10,
    },
    image: {
        marginTop: "40%",
        width: 120,
        height: 150,
        alignSelf: "center"
    }
});