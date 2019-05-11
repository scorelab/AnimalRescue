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
    tabBarContainer:{ 
        flexDirection: 'row', 
        borderWidth: 1.5, 
        borderColor: "#fff", 
        height: 50, 
        width: '100%',
        marginVertical:5
      },
      tabBarActive: {
        width: '33.3%',
        borderColor: '#192f6a',        
        borderBottomWidth: 4.5,        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      tabBar: {
        width: '33.3%',
        backgroundColor: '#fff',
        borderRightWidth: 1.5,
        borderColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
      }, 

});