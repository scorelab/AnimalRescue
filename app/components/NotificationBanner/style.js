import { StyleSheet, Dimensions } from "react-native";
import { COLOR_GRAY } from "../../config/styles";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",

    },
    scrollView: {
        width: "100%",
        backgroundColor: COLOR_GRAY,

    },
    scrollViewContent: {
        alignItems: "center",
        paddingBottom: 10
    },
    cardContainerRead: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 0.7,
        borderColor: "#192f6a"
        // marginBottom:20,
        // marginTop:10
    },
    cardContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "#e8f6fa",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 0.7,
        borderColor: "#192f6a"
        // marginBottom:20,
        // marginTop:10
    },
    cardHedear: {
        marginLeft: 10,
        marginVertical: 20,
        marginRight: 20,
        marginLeft: 20,
        // marginBottom:10,
        // width:deviceWidth,
        height: "auto",
        flexDirection: "row"
    },
    profilePicArea: {
        alignItems: "center",
        alignSelf: "flex-start",
        marginRight: 10,
        marginLeft: -15,
        overflow: "hidden",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userDetailArea: {
        flex: 0.75,
        paddingLeft: 8,
        flexDirection: "column",
    },
    userNameRow: {
        flex: 0.4,
        paddingTop: 10
    },
    meaasageRow: {
        flex: 0.6,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    badgeCount: {
        backgroundColor: "#3d9bf9",
        height: 20,
        width: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 10,
        right: 10
    },
    imageThumbnails: {
        width: 45,
        height: 45,
        borderRadius: 20,
    },
    detailRow: {
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        marginTop: 10
    },
    thumbnailRow: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30
    },


    nameText: {
        fontSize: 14,
        color: "#4e5861",
        fontWeight: "bold"
    },
    meaasageText: {
        fontSize: 16,
    },
    paraText: {
        fontSize: 16,
        color: "#555f68"
    },
    countText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold"
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },

});