import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_GRAY } from "../../config/styles";


export default StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 150,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 100
  },
  editCover: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: -40,
    width: 75,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR_GRAY
  },
  editProfilePic: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 75,
    marginTop: 20,
    backgroundColor: COLOR_GRAY,
    height: 30,
    width: 30,
    borderRadius: 15
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: -20,
    marginBottom: 20
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
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
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});