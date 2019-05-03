import React from 'react';
import { Text, View } from 'react-native';
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { COLOR_PRIMARY , COLOR_BLACK } from "../../config/styles" ;
import styles from "./style";
class NewPost extends React.Component {

    constructor() {
        super()

    }

    componentDidMount() {

    }


    render() {

        return (

            <View style={{ flex: 1 }}>
                <Header title="New Post" />
                <View style={styles.container}>
                    <ProgressSteps activeStepIconBorderColor={COLOR_PRIMARY} completedProgressBarColor={COLOR_PRIMARY} completedStepIconColor={COLOR_PRIMARY} activeLabelColor={COLOR_PRIMARY} labelColor={COLOR_BLACK}>
                        <ProgressStep label="Photo" previousBtnDisabled={true} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                <Text>This is the content within step 1!</Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Location" previousBtnStyle={styles.nextBtn} previousBtnTextStyle={styles.preBtnText} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                <Text>This is the content within step 2!</Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Information" previousBtnStyle={styles.nextBtn} previousBtnTextStyle={styles.preBtnText} nextBtnStyle={styles.nextBtn} nextBtnTextStyle={styles.nextBtnText}>
                            <View style={styles.stepContainer}>
                                <Text>This is the content within step 3!</Text>
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </View>


        )


    }

}

export default NewPost;