import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY } from "../../config/styles" ;

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
 },

 stepContainer:{
     alignItems: 'center'
 },
 nextBtn: {
    backgroundColor: '#192f6a',
    borderRadius: 13,
    width: 70
},
preBtn: {
    backgroundColor: '#192f6a',
    borderRadius: 13,
    width: 70
},
nextBtnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
},
preBtnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
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
titleArea:{
    width:deviceWidth*0.5,
    alignItems:"center"
},

//Text

titleFont:{
    fontSize:18,
    color:"white"
}



});