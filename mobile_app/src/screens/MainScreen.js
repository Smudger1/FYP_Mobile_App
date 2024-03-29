import React, {useState}  from 'react';
import { StyleSheet, PermissionsAndroid, Linking, View, TouchableOpacity  } from 'react-native';
import { IndexPath, Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';

import {styles} from '../styles'
import WifiManager from "react-native-wifi-reborn";

import {WifiUtils} from '../../util/WifiUtils';
import {CheckInUtil} from "../../util/CheckInUtil";

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

class CheckInArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex : (new IndexPath(0)),
            venuesList: this.props.venues,
            //venuesList: [{"BeaconAddr": "DC:A6:32:86:F2:B6", "VenueID": "243a885b-7b91-491d-a300-b499e2cd7847", "VenueName": "One Eyed Dog"}, {"BeaconAddr": "DC:A6:32:86:F2:B2", "VenueID": "143a885b-7b91-491d-a300-b499e2cd7847", "VenueName": "TestVenue"}],
            intervalID: null,
            count: 0,
            isCheckedIn: false,
            wifiList: null,
            venues: null,
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };

    componentDidMount() {
        this.requestFineLocationPermission();
        this.getWifiList();

    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    requestFineLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Check-In Location Permission",
                    message:
                        "COVID Check-In needs access to your fine location " +
                        "so you can check-in to the correct venue.",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Wifi Scanning Enabled");
                return true;
            } else {
                console.log("Wifi Scanning Denied");
                return false;
            }
        } catch (err) {
            console.warn(err);
        }
    };

    getWifiList = async () => {

        WifiManager.setEnabled(true); // Enables WiFi on device
        await WifiManager.reScanAndLoadWifiList()// Scans for WiFi points
            .then( async (data) => {
                this.state.wifiList = data

                // Time for new scan
                this.intervalID = setTimeout( async () => {await this.getWifiList().bind(this)}, 30000);

                let wifiUtils = new WifiUtils(data);
                let newVenueList = await wifiUtils.getBeacons(); // Verifies beacons

                console.log(newVenueList)
                if (newVenueList !== undefined) {
                    newVenueList.sort(); // Sorts returned list
                    if (newVenueList !== this.state.venuesList) { // If different force update and modify list
                        this.state.venuesList = newVenueList;
                        this.forceUpdateHandler();
                    }
                }
            })
            .catch((error) => {
                console.log("An error occurred: ", error);
            });
    }

    getVenueNameList() {
        let venueNameList = [];

        if (this.state.venuesList != undefined && this.state.venuesList != []) {

            this.state.venuesList.forEach(function (venue, index) {
                venueNameList.push(venue.venue.venueName);
            });
        } else{
            return false;
        }
        return venueNameList;
    }

    createCheckIn = async () => {
        const checkInUtil = new CheckInUtil();

        await checkInUtil.createNewCheckIn("DC:A6:32:86:F2:B4").then(r => console.log(r));

        this.state.isCheckedIn = true;
        this.forceUpdate();
    }

    checkOut = async () => {
        const checkInUtil = new CheckInUtil();

        await checkInUtil.checkOut().then(r => console.log(r));

        this.state.isCheckedIn = false;
        this.forceUpdate();
    }

    renderOption = (title) => (
        <SelectItem title={title}/>
    )

    render() {
        console.log(this.state.selectedIndex);

        let data = this.getVenueNameList();

        console.log("state", this.state.venuesList)
        console.log("data" , data)

        if (!data){
            this.state.disabled = 1;
            data = ["None"];
        }

        const displayValue = data[this.state.selectedIndex.row];

        return(
            <Layout style={[styles.layout, {flex: 2, justifyContent: 'center'}]} level="2">
                <>
                    {this.state.isCheckedIn ? ( // Is already checked in
                        <View>
                            <Text
                                style={styles.textStatus}>{this.state.isCheckedIn ? "Currently Checked-In To..." : "Not Currently Checked-In"}</Text>

                            <Select
                                style={styles.select}
                                size="large"
                                placeholder='Default'
                                value={displayValue}
                                disabled={true}
                                accessoryLeft={PinIcon}
                                selectedIndex={this.state.selectedIndex}
                                onSelect={(index) => {(this.state.selectedIndex = index); this.forceUpdate()}}>
                                {data.map(this.renderOption)}
                            </Select>

                            <Button size='giant' status='warning' onPress={() => {
                                this.checkOut().then(r => console.log(r));
                            }}>Check-Out</Button>
                        </View>
                    ) : ( // Not currently checked in
                        <View>
                            <Text style={styles.textStatus}>Not Currently Checked-In</Text>

                            <Select
                                style={styles.select}
                                size="large"
                                placeholder='Default'
                                value={displayValue}
                                accessoryLeft={PinIcon}
                                selectedIndex={this.state.selectedIndex}
                                onSelect={(index) => {(this.state.selectedIndex = index); this.forceUpdate()}}>
                                {data.map(this.renderOption)}
                            </Select>

                            <Button size='giant' status='info' onPress={() => {
                                this.createCheckIn().then(r => console.log(r));
                            }}>Check-In</Button>
                        </View>
                    )}
                </>
            </Layout>
        );
    }
}

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };

    loadInBrowser() {
        Linking.openURL(adviceURL).catch(err => console.error("Couldn't load page", err));
    };

    render() {

        return (

            <Layout style={styles.container}>

                <CheckInArea />

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
