import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        // borderWidth: 1.5,
        // borderColor: COLOR_GRAY,
        height: 50,
        backgroundColor: '#192f6a', 
        width: '100%'
    },
    tabBarActive: {
        width: '25%',
        borderColor: '#fff',        
        borderBottomWidth: 4.5,        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#192f6a',
    },
    tabBar: {
        width: '25%',
        backgroundColor: '#192f6a',        
        justifyContent: 'center',
        alignItems: 'center'
    },
});