import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:COLOR_GRAY
    },  
    overlay: {
        // 
        flex:1,
        width:'100%',
        height:deviceHeight,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
      },
    

});