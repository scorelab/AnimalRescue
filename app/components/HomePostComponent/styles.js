import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_LIGHT, COLOR_GRAY } from "../../config/styles";

var {height, width} = Dimensions.get("window");

let cardViewHeight = height * 0.7;
let cardViewWidth = width * 0.95;
let cardTitleBarHeight = height * 0.1;
let userAvatarImageHeight = height * 0.1;
let userAvatarImageWidth = height * 0.1;
let cardNameLineHeight = cardTitleBarHeight * 0.3; 

export default StyleSheet.create({
cardView: {
    backgroundColor: COLOR_LIGHT,
    maxHeight: cardViewHeight,
    width: cardViewWidth,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom:15,
    marginTop:10,
    borderRadius:5,
    padding:10

},
cardTitleBar: {    
    height: cardTitleBarHeight,
    width: cardViewWidth,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom:5,
    paddingLeft:10,   

},
userAvatarArea: {    
    height: userAvatarImageHeight,
    width: userAvatarImageWidth
},
userAvatarImage: {
    height: userAvatarImageHeight,
    width: userAvatarImageWidth,
    borderRadius: userAvatarImageHeight
},
cardTitleArea: {
    flexDirection:"column",
    marginLeft: 10,
    marginRight:10
},
nameLine: {
    marginTop:10,
    height: cardNameLineHeight,

},
dateTimeLine: {
    backgroundColor: COLOR_LIGHT
},
cardViewBody: {
    backgroundColor: COLOR_LIGHT,    
    width:'100%'    
},
postImageArea: {
    width:'100%',
    marginTop: 5,
    backgroundColor:COLOR_GRAY,
        
},

postVideoArea: {
    width:'100%',
    marginTop: 5,    
    justifyContent:'center',
    alignItems:'center', 
    overflow: 'hidden'    
    
},
postImage: {
    width:'100%',
    height:225,        
    backgroundColor:COLOR_GRAY   
},
postVideo: {
    width:'100%',
    height:225,
    paddingHorizontal:10,
    overflow: 'hidden',    
},

nameFont: {
    fontSize:16,
    lineHeight:16,
    fontWeight:"bold"
},
postContentFont: {
    textAlign:"justify"
    
},
likeCommentArea: {
    width: "50%",
    height: 25,
    paddingLeft: 50,
    marginTop: 10,
    
},
likeCommentDisplayArea:{ 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
},
row:{ 
    flexDirection: 'row', 
},
fontColor:{
    color:"#000000"
},
fontColorLove:{
    color:"#a83f39"
}

});