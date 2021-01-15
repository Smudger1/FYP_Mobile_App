import React, {useState}  from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity  } from 'react-native';
import { IndexPath, Layout, Text, Card, Button, Select, SelectItem, TopNavigation, TopNavigationAction  } from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';

import {styles} from '../styles'

const PinIcon = (props) => (
    <Icon name='pin-outline' width={30} height={30} fill='#000' {...props} />
);

const BackIcon = (props) => (
    <Icon name='arrow-back' width={24} height={24} fill='#000' {...props} />
);




const HistoryScreen = ({ navigation }) => {

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    const Header = (props) => (
        <View {...props}>
            <Text category="h4"><PinIcon/> The One Eyed Dog</Text>
        </View>
    );


    return(
        <View style={styles.navContainer}>
            <TopNavigation
                accessoryLeft={BackAction}
                title='Check-in History'
            />
            <ScrollView style={styles.containerWNav}>
                <Card style={styles.historyCard} header={Header}>
                    <Text category='h6'>Date: dd/mm/yyyy</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-In: hh:mm</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-Out: hh:mm</Text>
                    <Text>No Current Positive Exposure</Text>
                </Card>
                <Card style={[styles.historyCard, styles.historyCardPosExposure]} header={Header}>
                    <Text category='h6'>Date: dd/mm/yyyy</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-In: hh:mm</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-Out: hh:mm</Text>
                    <Text style={styles.historyCardPosExposureText}>Positive Exposure Registered</Text>
                </Card>
                <Card style={styles.historyCard} header={Header}>
                    <Text category='h6'>Date: dd/mm/yyyy</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-In: hh:mm</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-Out: hh:mm</Text>
                    <Text>No Current Positive Exposure</Text>
                </Card>
                <Card style={styles.historyCard} header={Header}>
                    <Text category='h6'>Date: dd/mm/yyyy</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-In: hh:mm</Text>
                    <Text style={styles.historyCardTime} category='h5'>Checked-Out: hh:mm</Text>
                    <Text>No Current Positive Exposure</Text>
                </Card>
            </ScrollView>
        </View>
    );
}

export default HistoryScreen;
