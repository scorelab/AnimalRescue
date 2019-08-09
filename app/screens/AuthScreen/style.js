import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLOR_PRIMARY,
    },
    logo: {
        width: 120,
        height: 150,
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 30,
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
    descriptionContent: {
        padding: 30
    },
    description: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        color: "#FFFFFF",
    },
    buttonContainer: {
        height: 45,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        bottom: 20,
        borderRadius: 30,
    },
    buttonText: {
        color: "#EE82EE",
    }

});