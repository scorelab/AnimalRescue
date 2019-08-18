import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_GRAY } from "../../config/styles";


export default StyleSheet.create({
  header: {
    backgroundColor: COLOR_GRAY,
    height: 150,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 100,
    backgroundColor: COLOR_GRAY

  },
  editCover: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    alignSelf: "flex-end",
    marginTop: -40,
    width: 75,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR_GRAY
  },
  cancleCover: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    alignSelf: "flex-start",
    marginTop: -30,
    width: 75,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR_GRAY
  },
  editProfilePic: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 75,
    marginTop: 20,
    backgroundColor: COLOR_GRAY,
    height: 30,
    width: 30,
    borderRadius: 15
  },
  editActionView: {
    flexDirection: "row",
    width: 100,
    alignSelf: "center",
    justifyContent: "space-between"
  },
  saveProfilePic: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginLeft: 75,
    marginTop: 20,
    backgroundColor: COLOR_GRAY,
    height: 30,
    width: 30,
    borderRadius: 15
  },
  cancelProfilePicture: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginLeft: "40%",
    marginTop: 20,
    backgroundColor: COLOR_GRAY,
    height: 30,
    width: 30,
    borderRadius: 15
  },
  name: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: -20,
    marginBottom: 10
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    // alignItems:"center",
    // justifyContent:"center"
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
    textAlign: "center"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  tabBarContainer: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: COLOR_GRAY,
    height: 50,
    width: "100%"
  },
  tabBarActive: {
    width: "25%",
    backgroundColor: "#192f6a",
    borderRightWidth: 1.5,
    borderColor: COLOR_GRAY,
    justifyContent: "center",
    alignItems: "center"
  },
  tabBar: {
    width: "25%",
    // backgroundColor: "#192f6a",
    borderRightWidth: 1.5,
    borderColor: COLOR_GRAY,
    justifyContent: "center",
    alignItems: "center"
  },
  imageSquare: {
    overflow: "hidden",
    width: undefined,
    height: undefined,
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 2
  },
  imageLabel: {
    overflow: "hidden",
    alignSelf: "center",
    // rotation: -45,
    // backgroundColor: "green",
    width: "100%",
    marginVertical: "20%",
    height: 15,
    marginRight: "50%"
  },
  imageLabelText: {
    textAlign: "center",
    color: "#fff"
  },
  photoArea: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  progressState: {
    fontSize: 32,
    fontWeight: "600",
    color: "#FFFFFF",
  },



});