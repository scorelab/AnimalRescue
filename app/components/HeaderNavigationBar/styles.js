import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    navigationBar: {
        backgroundColor: COLOR_PRIMARY,
        height: 50,
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
    goBottomkArea: {        
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 15,
        width: "30%"
    }, 
    titleFont: {
        fontSize: 18,
        color: "white"
    },
    container: {
        width: "100%",
        overflow: "scroll",
        backgroundColor: "#000"
    },
    body: {         
        height: "100%",
        backgroundColor: COLOR_GRAY,
    },
    username: {
        color: "#20B2AA",
        fontSize: 22,
        alignSelf: "center",
        marginLeft: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 20
    },
    box: {
        padding: 20,
        backgroundColor: "white",
        flexDirection: "row",
    },
    boxContent: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        color: "#151515",
        marginTop: 12
    },
    description: {
        fontSize: 15,
        color: "#646464",
    },
    buttons: {
        flexDirection: "row",
    },
    button: {
        height: 35,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 50,
        marginRight: 5,
        marginTop: 5,
    },
    view: {
        backgroundColor: "#FF1493",
    },
    profile: {
        backgroundColor: "#1E90FF",
    },
    message: {
        backgroundColor: "#228B22",
    },
    card: {
        shadowColor: "#00000021",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        borderBottomWidth: 1
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 5
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: "center",
        color: "#3399ff",
    },



});