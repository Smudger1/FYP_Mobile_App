import React, {useState}  from 'react';
import { StyleSheet, PermissionsAndroid, Linking, View, TouchableOpacity  } from 'react-native';
import { IndexPath, Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';

import {styles} from '../styles'
import WifiManager from "react-native-wifi-reborn";

import {WifiUtils} from '../../util/WifiUtils';

const PinIcon = () => (
    <Icon name='pin-outline' width={24} height={24} fill='#000'/>
);
const InfoIcon = () => (
    <Icon name='info-outline' width={50} height={50} fill='#000'/>
);
const ClipBoardIcon = () => (
    <Icon name='clipboard-outline' width={50} height={50} fill='#000'/>
);
const ClockIcon = () => (
    <Icon name='clock-outline' width={50} height={50} fill='#000'/>
);

const adviceURL = "https://www.gov.uk/coronavirus";

class LocationSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex : (new IndexPath(0)),
            wifiList: null,
            intervalID: null,
            count: 0,
        }
    }


    renderOption = (title) => (
        <SelectItem title={title}/>
    )

    render() {
        console.log(this.state.selectedIndex);

        const data = [
            'The One Eyed Dog',
            'Fat Fox',
            'The Deco',
        ];

        const displayValue = data[this.state.selectedIndex.row];

        return(
            <Select
                style={styles.select}
                size="large"
                placeholder='Default'
                value={displayValue}
                disabled={this.props.disabled}
                accessoryLeft={PinIcon}
                selectedIndex={this.state.selectedIndex}
                onSelect={(index) => {(this.state.selectedIndex = index); this.forceUpdate()}}>
                {data.map(this.renderOption)}
            </Select>
        );
    }
}

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation
        this.state = {
            isCheckedIn: false,
            selectedIndex : (new IndexPath(0)),
            wifiList: null,
            intervalID: null,
            count: 0,
        }
    }

    componentDidMount() {
        this.getWifiList();

    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }


    getWifiList = async () => {

        WifiManager.setEnabled(true);
        await WifiManager.reScanAndLoadWifiList()
            .then((data) => {
                this.state.wifiList = data
                this.intervalID = setTimeout( async () => {await this.getWifiList().bind(this)}, 5000);
                //console.log(data);
                let wifiUtils = new WifiUtils(data);
                console.log(wifiUtils.getBeacons());

            });
    }

    loadInBrowser() {
        Linking.openURL(adviceURL).catch(err => console.error("Couldn't load page", err));
    };

    render() {
        return (

            <Layout style={styles.container}>

                <Layout style={[styles.layout, {flex: 2, justifyContent: 'center'}]} level="2">
                    <>
                        {this.state.isCheckedIn ? (
                            <View>
                                <Text
                                    style={styles.textStatus}>{this.state.isCheckedIn ? "Currently Checked-In To..." : "Not Currently Checked-In"}</Text>

                                <LocationSelector disabled="1"/>

                                <Button size='giant' status='warning' onPress={() => {
                                    this.state.isCheckedIn = false;
                                    this.forceUpdate();
                                }}>Check-Out</Button>
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.textStatus}>Not Currently Checked-In</Text>

                                <LocationSelector/>

                                <Button size='giant' status='info' onPress={() => {
                                    this.state.isCheckedIn = true;
                                    this.forceUpdate();
                                }}>Check-In</Button>
                            </View>
                        )}
                    </>
                </Layout>

                <Layout style={[styles.layout, {alignContent: 'center'}]} level="2">

                    <TouchableOpacity style={styles.directionCards} onPress={() => this.navigation.navigate('History')}>
                        <View style={styles.iconBox}><ClockIcon/></View>
                        <View style={styles.titleBox}><Text category="h4">Check-In History</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.directionCards} onPress={() => this.navigation.navigate('NewResult')}>
                        <View style={styles.iconBox}><ClipBoardIcon/></View>
                        <View style={styles.titleBox}><Text category="h4">Enter Test Result</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.directionCards} onPress={() => this.loadInBrowser()}>
                        <View style={styles.iconBox}><InfoIcon/></View>
                        <View style={styles.titleBox}><Text category="h4">Check Advice</Text></View>
                    </TouchableOpacity>
                </Layout>

            </Layout>
        );
    }
}

export default MainScreen;
