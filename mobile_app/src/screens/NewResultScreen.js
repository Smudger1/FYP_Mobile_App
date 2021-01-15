import React, {useState}  from 'react';
import { StyleSheet, Linking, View, TouchableOpacity  } from 'react-native';
import {
    IndexPath,
    Layout,
    Text,
    Button,
    Select,
    SelectItem,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';

import {styles} from '../styles'

const BackIcon = (props) => (
    <Icon name='arrow-back' width={24} height={24} fill='#000' {...props} />
);

const NewResultScreen = ({ navigation }) => {

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return(
        <View style={styles.navContainer}>
            <TopNavigation
                accessoryLeft={BackAction}
                title='Enter Test Result'
            />
            <Layout style={styles.containerWNav}>
                <Text category='h4'>Enter the code you received from the testing service by email or SMS with your test result</Text>
            </Layout>
        </View>
    );
}

export default NewResultScreen;
