import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({

    container: {
        width: "100%",        
        backgroundColor: "#fff",
        flex:1
    },

    body: {        
        height: "100%",
        backgroundColor: "#fff",
    },
    username: {
        color: "#20B2AA",
        fontSize: 22,
        alignSelf: "center",
        marginLeft: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop:-30,
        marginLeft:30
    },
    box: {        
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
        fontSize: 16,
        color: "#151515",
        padding:5
        
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