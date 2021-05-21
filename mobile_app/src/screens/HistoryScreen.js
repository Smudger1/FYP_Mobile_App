import React, {useState}  from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity  } from 'react-native';
import { List, Text, Card, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';

import {styles} from '../styles'

import { CheckInUtil } from "../../util/CheckInUtil";

const PinIcon = (props) => (
    <Icon name='pin-outline' width={30} height={30} fill='#000' {...props} />
);

const BackIcon = (props) => (
    <Icon name='arrow-back' width={24} height={24} fill='#000' {...props} />
);

class HistoryPopulate extends React.Component{
    constructor(props) {
        super(props);
        this.temp = {
            history: null
        }
        this.state = {
            history: null
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler(){
        this.forceUpdate();
    }

    componentDidMount() {
        this.getHistory();
    }

    async getHistory(){
        const checkIns = new CheckInUtil()

        await checkIns.getCheckInHistory().then(r => this.state.history = r);

        this.forceUpdateHandler();
    }

    renderItemHeader = (headerProps, venueName) => (
        <View {...headerProps}>
            <Text category="h4"><PinIcon/> {venueName}</Text>
        </View>
    );

    renderItem = (checkIn) => (
        <Card
            style={styles.historyCard}
            header={headerProps => this.renderItemHeader(headerProps, checkIn.item.beacon.venue.venueName)}>
            <Text category='h6'>Date: {new Date(checkIn.item.dateIn).toLocaleDateString()}</Text>
            <Text style={styles.historyCardTime} category='h5'>Checked-In:
                {" " + new Date(checkIn.item.dateIn).toLocaleTimeString()}</Text>
            <Text style={styles.historyCardTime} category='h5'>Checked-Out:
                {checkIn.item.dateOut === null ? " N/A" : " " + new Date(checkIn.item.dateOut).toLocaleTimeString()}</Text>
            <Text>No Current Positive Exposure</Text>
        </Card>
    )

    render() {

        let historyCards = null;

        console.log("state", this.state.history);

        if (this.state.history && this.state.history.length > 0 ) {
            this.state.history.reverse(); // Reverse order of data



            historyCards = (
                <List
                    data={this.state.history}
                    renderItem={this.renderItem}
                />
            )

        } else {
            historyCards = (
                <Card style={styles.historyCard}>
                    <Text category='h6'>No Previous Check Ins Found.</Text>
                </Card>
            );
        }

        return (
            <>
                {historyCards}
            </>
        );


    }
}


class HistoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation
    };

    navigateBack = () => {
        this.navigation.goBack();
    };

    BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={this.navigateBack}/>
    );

    render() {
        return (
            <View style={styles.navContainer}>
                <TopNavigation
                    accessoryLeft={this.BackAction}
                    title='Check-in History'
                />
                <ScrollView style={styles.containerWNav}>
                    <HistoryPopulate />
                </ScrollView>
            </View>
        );
    }

}

export default HistoryScreen;
